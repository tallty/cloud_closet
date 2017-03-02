import React, { Component } from 'react';
import Toolbar from '../common/Toolbar';
import css from './cart.less';

export default class Cart extends Component {
  state = {
    selectAll: false,
    clothes: [
      {
        id: 1,
        img: '/src/images/goods_example.png',
        title: 'DOLCE&GABBANA  印花包臀短裙'
      }, {
        id: 2,
        img: '/src/images/goods_example.png',
        title: 'DOLCE&GABBANA  印花包臀短裙'
      }
    ],
    slected: []
  }

  componentWillMount() {
    this.setState({ slected: Array(this.state.clothes.length).fill().map((_, i) => i) });
  }

  handleSelectAll() {
    this.setState({ selectAll: !this.state.selectAll });
    // TOOD 处理全选反选
  }

  showList() {
    const { clothes } = this.state;
    const list = [];
    clothes.forEach((item, index, obj) => {
      list.push(
        <li key={index}>
          <div className={css.item}>
            <img src={item.img} alt="衣服" />
            <img src="/src/images/icon_close.svg" alt="关闭" className={css.close} />
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
    const { selectAll } = this.state;
    const string = selectAll ? '取消全选' : '全选';
    return (
      <div className={css.container}>
        <Toolbar url="/MyCloset" title="配送篮">
          <span onClick={this.handleSelectAll.bind(this)}>{string}</span>
        </Toolbar>
        <div className={css.content}>
          <ul>
            {this.showList()}
          </ul>
        </div>
        <div className={css.footActions}>
          <div className={css.left}>合计：<span>4 </span>件</div>
          <div className={css.right}>配送</div>
        </div>
      </div>
    )
  }
}
