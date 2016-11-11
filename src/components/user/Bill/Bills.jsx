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

	fetchData() {
		Agent
			.get(`http://closet-api.tallty.com/purchase_logs`)
			.set('Accept', 'application/json')
			.set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
      	if (!err || err === null) {
					console.log("获取账单成功");
					console.dir(res.body);
					this.setState({ bills: res.body.purchase_logs.reverse() });
      	} else {
      		console.log("获取账单失败");
      	}
      })
	}
	
	getBills() {
		let bills = []
		for(let bill of this.state.bills) {
			bills.push(
				<div className={css.bill} key={bill.id} 
						 onClick={this.handleClick.bind(this, bill)}>
					<p>
						<span className={css.kind}>{bill.operation_type}</span>
						<span className={css.money}>{bill.change_output}</span>
						<span className={css.date}>{bill.what_day[0]}</span>
					</p>
					<p>
						<span className={css.desc}>{bill.operation}</span>
						<span className={css.time}>{bill.what_day[1]}</span>
					</p>
				</div>
			);
		}
		return bills;
	}

	handleClick(bill) {
		let bill_str = JSON.stringify(bill);
		sessionStorage.setItem('bill', bill_str);
		this.props.router.replace('/bill');
	}

	render() {
		const { bills } = this.state;
		return (
			<div className={css.container}>
				<Toolbar title="账户账单" url="/user"/>
				<div className={css.list}>
					{bills ? this.getBills() : <Spiner/>}
				</div>
			</div>
		)
	}
}

export default withRouter(Bills);
