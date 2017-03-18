/**
* 个人中心 - 发票 - 开票记录
*/
import React, { Component, PropTypes } from 'react';
import SuperAgent from 'superagent';
import css from './ReceiptRecord.less';
import Toolbar from '../../common/ToolBar';
import {Link} from 'react-router';
import { Spiner } from '../../common/Spiner';

const { string, number, arrayOf, shape } = PropTypes;

export class ReceiptRecord extends Component {
  state = {
    receipts: {
      money: '200',
      date: '2017-03-15',
      type: '普通发票',
      balance: '300'
    }
  }

  //开票记录列表
  getReceipts(page) {
    SuperAgent 
      .get('http://closet-api.tallty.com/receipts?page=${page}')
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, resualt) => {
        if (resualt.ok) {
          const obj = resualt.body;
          this.setState({receipts: obj.receipts.reverse() });
        } else {
  
        }
      })
  }

  getReceiptList() {
    const { receipts } = this.state
    const list = [];

    receipts.forEach((receipt, index, obj) => {
      list.push(
        <div className={css.content_detail} key={index}>
          <div>
            <ul>
                <li><span className={css.money}>{this.state.money}元</span></li>
                <li><span className={css.types}>{this.state.type}</span></li>
            </ul>
          </div>
          <div>
            <ul>
                <li>
                  <p className={css.balances}>开票额度剩余{this.state.balance}元
                  </p>
                  <p className={css.dates}>开票日期：{this.state.date}</p>
                </li>
                <li><img src="src/images/receipt_success.png" alt="" className={css.img_style}/></li>
            </ul>
          </div>
        </div>
      )
    })
    return list 
  }

  // 空列表样式
  getReceiptsNone() {
    return (
      <div className={css.receipts_none}>
        <img src="/src/images/orders_none.png" alt="无开票记录" />
        <p>您还没有相关的开票记录</p>
      </div>
    )
  }
  render() {
    const Receipts = this.getReceiptList();
    return (
      <div className={css.container}>
        <Toolbar url="/#" title="开票记录" theme="dark" className={css.tops} />
        <div className={css.content}>
          { Receipts.length > 0 ? Receipts : this.getReceiptsNone()}
        </div>
      </div>
    );
  }
}

ReceiptRecord.defaultProps = {
  Receipts: []
}
ReceiptRecord.propTypes = {
  Receipts: arrayOf(
    shape({
      id: number,
      money: number,
      balance: number,
      date: string,
      type: string
    })
  )
}
