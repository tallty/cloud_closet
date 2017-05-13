/**
 * 个人中心 - 我的账单
 */
import React, { Component } from 'react'
import css from './bills.less'
import Toolbar from '../../common/Toolbar'
import { Spiner } from '../../common/Spiner'
import classNames from 'classnames/bind'
import Agent from 'superagent'
import { withRouter, Link } from 'react-router'
import StateNone from '../../common/StateNone'

const cx = classNames.bind(css)

class Bills extends Component {
  state = {
    bills: null
  }

  componentDidMount() {
    this.fetchData();
  }

  getBills() {
    let bills = []
    for (const bill of this.state.bills) {
      bills.push(
        <Link
          to={`/bills/${bill.id}`}
          className={css.bill}
          key={bill.id}
        >
          <p>
            <span className={css.desc}>{bill.operation}</span>
            <span className={css.time}>{bill.date}</span>
          </p>
          <p>
            <span className={css.balance}>余额：{bill.balance}</span>
            <span className={css.money}>{bill.change_output}</span>
          </p>
        </Link>
      );
    }
    if (bills.length === 0) {
      bills = <StateNone desc="您暂时还没有任何账单记录" />
    }
    return bills;
  }

  fetchData() {
    Agent
      .get('http://closet-api.tallty.com/purchase_logs')
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.closet_token)
      .set('X-User-Phone', localStorage.closet_phone)
      .end((err, res) => {
        if (!err || err === null) {
          this.setState({ bills: res.body.purchase_logs.reverse() });
        }
      })
  }

  render() {
    const { bills } = this.state;
    return (
      <div className={css.container}>
        <Toolbar title="账户账单" url="/user" />
        <div className={css.list}>
          {bills ? this.getBills() : <Spiner />}
        </div>
      </div>
    )
  }
}

export default withRouter(Bills);
