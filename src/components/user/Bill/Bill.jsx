import React, { Component } from 'react';
import css from './bills.less';
import Toolbar from '../../common/Toolbar'

export class Bill extends Component {
  state = {
    bill: null
  }

  componentWillMount() {
    let bill = JSON.parse(sessionStorage.bill);
    this.setState({ bill: bill });  
  }

  getDetail(detail) {
    let list = [];
    let i = 0;
    for (let item of detail) {
      list.push(
        <p className={css.row_p} key={i}>
          <span>{`${item[0]}x${item[1]}`}</span>
        </p>
      );
      i++;
    }
    return list;
  }

  render() {
    let { bill } = this.state;
    return (
      <div className={css.container}>
        <Toolbar title="账户详情" url="/bills"/>

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
          <a href="tel:400-123-2345">我对账单有疑问</a>
        </div>
      </div>
    );
  }
}
