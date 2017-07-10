import React, { Component } from 'react';
import Toolbar from '../common/Toolbar';
import { message } from 'antd';
import SuperAgent from 'superagent';
import { withRouter } from 'react-router';
import css from './cart.less';
import StateNone from '../common/StateNone';

class Cart extends Component {
  state = {
    selectAll: true,
    clothes: []
  }

  componentWillMount() {
    this.getCartClothes();
  }

  getCartClothes() {
    SuperAgent
      .get('http://closet-api.tallty.com/garments/basket')
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.closet_token)
      .set('X-User-Phone', localStorage.closet_phone)
      .end((err, res) => {
        if (!err || err === null) {
          const data = res.body.garments.map(item => {
            return { ...item, isSelected: true }
          });
          this.setState({ clothes: data });
        } else {
          message.error('获取配送列表失败');
        }
      })
  }

  handleSelectAll() {
    const { clothes, selectAll } = this.state;
    if (clothes.length === 0) {
      message.warning('配送蓝空空如也，赶快添加衣服去吧');
      return;
    }
    let cache = [];
    // TOOD 处理全选反选
    if (this.state.selectAll) {
      cache = clothes.map(item => {
        return { ...item, isSelected: false }
      });
    } else {
      cache = clothes.map(item => {
        return { ...item, isSelected: true }
      });
    }
    this.setState({ clothes: cache, selectAll: !selectAll });
  }

  handleSelect(index) {
    const data = this.state.clothes;
    data[index].isSelected = !data[index].isSelected;
    this.setState({
      clothes: data
    })
  }

  handleRemove(index) {
    const { clothes } = this.state;
    const obj = clothes[index];
    SuperAgent
      .post('http://closet-api.tallty.com/garments/get_out_of_basket')
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.closet_token)
      .set('X-User-Phone', localStorage.closet_phone)
      .send({ 'garment_ids': [obj.id] })
      .end((err, res) => {
        if (!err || err === null) {
          clothes.splice(index, 1);
          this.setState({ clothes: clothes });
          message.success('移出配送篮成功');
        } else {
          message.error('移出配送篮失败');
        }
      })
  }

  beginDispatch() {
    const garments = this.state.clothes.filter(item => item.isSelected);
    if (garments.length <= 0) {
      message.error('请先选择要配送的衣服');
      return;
    }
    // cahce clothes
    const str = JSON.stringify(garments);
    sessionStorage.setItem('dispatchGarments', str);
    this.props.router.push('/dispatching');
  }

  showList() {
    const { clothes } = this.state;
    const list = [];
    clothes.forEach((item, index, obj) => {
      const klass = item.isSelected ? css.item_active : css.item;
      list.push(
        <li key={index}>
          <div className={css.klass} onClick={this.handleSelect.bind(this, index)}>
            <img src={item.cover_image} alt="衣服" className={css.photo} />
            <img src="/src/images/icon_close.svg" alt="关闭" className={css.close} onClick={this.handleRemove.bind(this, index)} />
            <div className={css.text}>
              <span>{item.title}</span>
            </div>
          </div>
        </li>
      );
    });
    return list;
  }

  render() {
    const { selectAll, clothes } = this.state;
    const string = selectAll ? '取消全选' : '全选';
    const url = this.props.location.query.back_url;
    const count = clothes.filter(item => item.isSelected).length;
    return (
      <div className={css.container}>
        <Toolbar url={url} title="配送篮1">
          <span onClick={this.handleSelectAll.bind(this)}>{string}</span>
        </Toolbar>
        <div className={css.content}>
          {
            clothes.length > 0 ?
              <ul>
                {this.showList()}
              </ul> :
              <StateNone desc="您还没有添加一件衣服" />
          }
        </div>
        <div className={css.footActions}>
          <div className={css.left}>已选：<span>{count} </span>件</div>
          <div className={css.right} onClick={this.beginDispatch.bind(this)}>配送</div>
        </div>
      </div>
    )
  }
}

export default withRouter(Cart);
