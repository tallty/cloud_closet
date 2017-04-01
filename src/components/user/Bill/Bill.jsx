import React, { Component } from 'react';
import css from './bills.less';
import Toolbar from '../../common/Toolbar'
import { Link } from 'react-router';
import Agent from 'superagent';

export class Bill extends Component {
  state = {
    bill: {}
  }

  componentWillMount() {
    this.getBill();
  }

  getBill() {
    Agent
      .get(`http://closet-api.tallty.com/purchase_logs/${this.props.params.id}?random=${Math.random()}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (!err || err === null) {
          this.setState({ bill: res.body });
        }
      })
  }

  loadDetail(detail) {
    let value;
    if (detail) {
      value = detail.map((item, index) => (
        <p className={css.row_p} key={index}><span>{item}</span></p>
      ));
    }
    return value;
  }

  render() {
    const { bill } = this.state;
    return (
      <div className={css.container}>
        <Toolbar title="账单详情" url="/bills" />

        <div className={css.detail}>
          <p className={css.top1}>{bill.operation_type}</p>
          <p className={css.top2}>{bill.change_output}</p>
          <p className={css.row_p}>付款方式 <span>{bill.payment_method}</span></p>
          <p className={css.row_p}>账户余额 <span>￥{bill.balance}</span></p>
          <p className={css.row_p}>交易说明 <span>{bill.operation}</span></p>
          {this.loadDetail(bill.detail)}
        </div>

        <div className={css.detail_footer}>
          <p className={css.row_p}>交易时间 <span>{bill.date} {bill.time}</span></p>
          <Link to={`/order?id=${bill.order_id}`}>我对账单有疑问</Link>
        </div>
      </div>
    );
  }
}
