// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Affix, Row, Col, Icon, Button, Card, Input, message } from 'antd'
import { Link, withRouter } from 'react-router'
import SuperAgent from 'superagent'
import classnames from 'classnames'
import PopWindow from '../../common/PopWindow'
import { Spiner } from '../../common/Spiner'
import Picker from 'react-mobile-picker';
import styles from '../closet_tab/ClosetTab.less'
import css from './Manage.less'
import Toolbar from '../../common/Toolbar';

class Manage extends Component {
  state = {
    id: this.props.location.query.id,
    pop: false,
    popTitle: '',
    closetTitle: '',
    update_key: '',
    update_value: '',
    selectedIds: [],
    garments: [],
    isPickerShow: false,
    canMoveClosets: [],
    valueGroups: {
      closet: ''
    },
    optionGroups: {
      closet: []
    }
  }

  componentWillMount() {
    this.getMoveableClosets();
    this.getGarments();
  }

  getGarments() {
    SuperAgent
      .get(`http://closet-api.tallty.com/exhibition_chests/${this.state.id}?random=${Math.random()}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (!err || err === null) {
          this.setState({ garments: res.body.garments, closetTitle: res.body.custom_title })
        } else {
          message.error('获取衣柜信息失败');
        }
      })
  }

  getMoveableClosets() {
    SuperAgent
      .get(`http://closet-api.tallty.com/exhibition_chests/${this.state.id}/the_same_store_method`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (!err || err === null) {
          const closets = res.body.exhibition_chests;
          const options = {
            closet: closets.map(item => item.custom_title)
          }
          this.setState({
            optionGroups: options,
            canMoveClosets: closets
          })
        } else {
          message.error('获取可转移衣柜信息失败');
        }
      })
  }

  beginMoveClothes() {
    const { selectedIds, valueGroups, canMoveClosets } = this.state;
    const targetCloset = canMoveClosets.filter(item => item.custom_title === valueGroups.closet)[0];
    SuperAgent
      .post(`http://closet-api.tallty.com/exhibition_chests/${this.state.id}/move_garment`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .send({ 'garment_ids': selectedIds, 'to_exhibition_chest_id': targetCloset.id })
      .end((err, res) => {
        if (!err || err === null) {
          const obj = res.body;
          const { garments } = this.state;
          this.setState({
            selectedIds: [],
            garments: garments.filter(item => !item.isSelected)
          })
          this.togglePicker();
          message.success('移动衣服成功');
        } else {
          message.error('移动衣服失败，请稍后重试。');
          this.togglePicker();
        }
      })
  }

  addToCart() {
    if (this.state.selectedIds.length <= 0) {
      message.warning('请先选择要配送的衣服');
      return;
    }
    const { selectedIds } = this.state;
    SuperAgent
      .post('http://closet-api.tallty.com/garments/add_them_to_basket')
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .send({ 'garment_ids': selectedIds })
      .end((err, res) => {
        if (!err || err === null) {
          const { garments } = this.state;
          this.setState({
            selectedIds: [],
            garments: garments.filter(item => !item.isSelected)
          })
          message.success('加入配送蓝成功');
        } else {
          message.error('加入配送蓝失败，请稍后重试。');
        }
      })
  }

  getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

  // Update the value in response to user picking event
  handleChange = (name, value) => {
    this.setState(({ valueGroups }) => ({
      valueGroups: {
        ...valueGroups,
        [name]: value
      }
    }));
  };

  togglePicker = () => {
    if (this.state.optionGroups.closet.length <= 0) {
      message.warning('没有可使用的衣柜');
      return;
    }
    if (this.state.selectedIds.length <= 0) {
      message.warning('请先选择要移动的衣服');
      return;
    }
    this.setState(({ isPickerShow }) => ({
      isPickerShow: !isPickerShow
    }));
  }

  handleSelectClothe(index) {
    const data = this.state.garments;
    data[index] = { ...data[index], isSelected: !data[index].isSelected };
    const ids = data.filter(item => item.isSelected).map(item => item.id);
    this.setState({ garments: data, selectedIds: ids });
  }

  initList() {
    const list = [];
    this.state.garments.forEach((garment, i, obj) => {
      list.push(
        <Col span={12} className={styles.left_tab} key={garment.id}>
          <div style={{ color: '#fff' }}>
            <Card className={styles.card_tab}
              style={garment.isSelected ? { outline: "3px solid #ECC17D" } : {}}
              onClick={this.handleSelectClothe.bind(this, i)}>
              {/* 添加新增标签*/}
              {garment.is_new ? <div className={styles.new_tab}>New</div> : null}
              {/* 添加衣服展示卡片模块*/}
              <div className={styles.card_pic_content}>
                <img alt="example" src={garment.cover_image} />
              </div>
              <div className={styles.card_tab_title}>
                <p className={styles.brand} ></p>
                <p className={styles.good_type} >{garment.title}</p>
                <sub className={styles.time_line}>入库时间：{this.parseTime(garment.put_in_time, "yyyy-MM-dd")}</sub><br />
              </div>
            </Card>
          </div>
        </Col>
      )
    })
    return list;
  }

  parseTime(x, y) {
    var x = new Date(x)
    var z = {
      y: x.getFullYear(),
      M: x.getMonth() + 1,
      d: x.getDate(),
      h: x.getHours(),
      m: x.getMinutes(),
      s: x.getSeconds()
    };
    return y.replace(/(y+|M+|d+|h+|m+|s+)/g, function (v) {
      return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2))
    });
  }

  /**
   * [hidePopWindow 隐藏弹出框]
   */
  hidePopWindow() {
    console.log("=====弹出框关闭=====")
    this.setState({ pop: false })
  }

  /**
   * [handlePopInputChange 弹出框表单监听]
   */
  handlePopInputChange(e) {
    this.setState({ update_value: e.target.value })
  }

  changename() {
    this.setState({
      pop: true,
      popTitle: '修改名称',
      update_key: 'user_info[nickname]',
      update_value: ''
    })
  }

  updateClosetName() {
    SuperAgent
      .put(`http://closet-api.tallty.com/exhibition_chests/${this.state.id}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .send({ 'exhibition_chest': { 'custom_title': this.state.update_value } })
      .end((err, res) => {
        if (!err || err === null) {
          this.setState({
            closetTitle: this.state.update_value,
            pop: false
          })
        } else {
          message.error('修改名称失败');
        }
      })
  }

  render() {
    const tab_height = document.body.clientHeight - 100;
    const { garments, pop, update_key, update_value, popTitle, isPickerShow, optionGroups, valueGroups, closetTitle, selectedIds } = this.state
    const maskStyle = {
      display: isPickerShow ? 'block' : 'none'
    };
    const pickerModalClass = classnames(
      css.picker_modal,
      isPickerShow ? css.picker_modal_toggle : ''
    );
    return (
      <div className={styles.Manage_content}>
        <div className={styles.tool_bar}>
          <Link className={styles.back} to={`/closet_tabs?id=${this.props.location.query.id}`} >
            <Icon type="left" />
          </Link>
          <div className={styles.title}>
            <p>{closetTitle}</p>
          </div>
          <div className={styles.menu} onClick={this.changename.bind(this)} >重命名</div>
        </div>

        <div className={styles.closet_container} style={{ height: tab_height }}>
          <div className={styles.tab_content}>
            <Row className={styles.tag_content}>
              <Col span={24}>
                <Button type="primary" className={styles.tag} onClick={this.show_type}>裙装</Button>
                <Button type="primary" className={styles.tag} onClick={this.show_type}>外套</Button>
                {/*<Button type="primary" className={styles.ellipsis_btn}><Icon type="ellipsis" className={styles.ellipsis_icon} /></Button>*/}
              </Col>
            </Row>
          </div>

          <div className={styles.cloth_number}>
            {`数量（${garments.length})`}
            <Link to={`/cart?back_url=/manage?id=${this.state.id}`} className={styles.cart}>
              <img src="/src/images/icon_cart.svg" alt="cart" />
              <div className={styles.dot}></div>
            </Link>
          </div>

          <Row gutter={9} className={styles.my_colset_tab_content}>
            {this.initList()}
          </Row>

        </div>
        <Row className={css.tab_footer}>
          <Col span={12}>
            <Button type="primary" className={css.moveBtn} onClick={this.togglePicker.bind(this)}>移动衣服</Button>
          </Col>
          <Col span={12}>
            <Button type="primary" className={css.distribution_btn} onClick={this.addToCart.bind(this)}>加入配送</Button>
          </Col>
        </Row>
        <Row className={css.dispatch_footer_modal}>
          <Col span={24}>
            <div className={css.picker_modal_container}>
              <div className={css.picker_modal_mask} style={maskStyle} onClick={this.togglePicker.bind(this)}></div>
              <div className={pickerModalClass}>
                <header className={css.popWindowHeader}>
                  <button className={css.headerBtn} onClick={this.togglePicker.bind(this)}>取消</button>
                  <button className={css.headerBtn} onClick={this.beginMoveClothes.bind(this)}>确认移动</button>
                </header>
                {
                  optionGroups.closet.length > 0 ?
                    <Picker
                      optionGroups={optionGroups}
                      valueGroups={valueGroups}
                      onChange={this.handleChange} /> : <Spiner />
                }
              </div>
            </div>
          </Col>
        </Row>
        {/* 弹出框：修改资料 */}
        <PopWindow show={pop} onCancel={this.hidePopWindow.bind(this)}>
          <div className={css.popContainer}>
            <p className={css.title}>{popTitle}</p>
            <Input size="large" value={update_value} onChange={this.handlePopInputChange.bind(this)} />
            <Button className={css.update} onClick={this.updateClosetName.bind(this)}>更新</Button>
          </div>
        </PopWindow>
      </div>
    );
  }
}

export default withRouter(Manage);
