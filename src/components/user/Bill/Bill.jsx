import React, { Component } from 'react';
import css from './bills.less';
import Toolbar from '../../common/Toolbar'
import { Link } from 'react-router';

export class Bill extends Component {
  state = {
    bill: null
  }

  componentWillMount() {
    const obj = JSON.parse(sessionStorage.bill);
    this.setState({ bill: obj });
  }

  getDetail(detail) {
    return detail.map((item, index) => (
      <p className={css.row_p} key={index}><span>{item}</span></p>
    ))
  }

  render() {
    const { bill } = this.state;
    return (
      <div className={css.container}>
        <Toolbar title="账户详情" url="/bills" />

        <div className={css.detail}>
          <p className={css.top1}>{bill.operation_type}</p>
          <p className={css.top2}>{bill.change_output}</p>
          <p className={css.row_p}>付款方式 <span>{bill.payment_method}</span></p>
          <p className={css.row_p}>账户余额 <span>￥{bill.balance}</span></p>
          <p className={css.row_p}>交易说明 <span>{bill.operation}</span></p>
          {this.getDetail(bill.detail)}
        </div>

        <div className={css.detail_footer}>
          <p className={css.row_p}>交易时间 <span>{bill.date} {bill.time}</span></p>
          <Link to={`/order?id=${bill.order_id}`}>我对账单有疑问</Link>
        </div>
      </div>
    );
  }
}
