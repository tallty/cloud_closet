/**
* 个人中心 - 发票 - 开票记录
*/
import React, {Component} from 'react';
import css from './ReceiptRecord.less';
import Toolbar from '../../common/ToolBar';
import {Link} from 'react-router';

export class ReceiptRecord extends Component {
  state = {
    money: '200',
    date: '2017-03-15',
    type: '普通发票',
    balance: '300'
  }
  render() {
    let money = this.state.money
    let date = this.state.date
    let type = this.state.type
    let balance = this.state.balance
    return (
      <div>
        <Toolbar url="/#" title="开票记录" theme="dark"></Toolbar>
        <div className={css.content}>
          <div className={css.money}>{money}元</div>
          <div className={css.type}>{type}</div>
          <div className={css.balance}>开票额度剩余{balance}元</div>
          <div className={css.date}>开票日期：{date}</div>
        </div>
      </div>
    );
  }
}
ReceiptRecord.defaultProps = {}
ReceiptRecord.propTypes = {}
