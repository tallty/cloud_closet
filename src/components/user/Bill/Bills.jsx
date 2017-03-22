/**
 * 个人中心 - 我的账单
 */
import React, { Component } from 'react'
import css from './bills.less'
import Toolbar from '../../common/Toolbar'
import { Spiner } from '../../common/Spiner'
import classNames from 'classnames/bind'
import Agent from 'superagent'
import { withRouter } from 'react-router'

const cx = classNames.bind(css)

class Bills extends Component {
  state = {
    bills: null
  }

  componentDidMount() {
    this.fetchData();
  }

  getBills() {
    const bills = []
    for (const bill of this.state.bills) {
      bills.push(
        <div
          className={css.bill}
          key={bill.id}
          onClick={this.handleClick.bind(this, bill)}
        >
          <p>
            <span className={css.desc}>{bill.operation}</span>
            <span className={css.time}>{bill.date}</span>
          </p>
          <p>
            <span className={css.balance}>余额：{bill.balance}</span>
            <span className={css.money}>{bill.change_output}</span>
          </p>
        </div>
      );
    }
    return bills;
  }

  fetchData() {
    Agent
      .get('http://closet-api.tallty.com/purchase_logs')
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (!err || err === null) {
          console.log(res.body);
          this.setState({ bills: res.body.purchase_logs.reverse() });
        }
      })
  }

  handleClick(bill) {
    sessionStorage.setItem('bill', JSON.stringify(bill));
    this.props.router.replace('/bill');
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
