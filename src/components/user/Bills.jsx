/**
 * 个人中心 - 我的账单
 */
import React, { Component } from 'react'
import css from './bills.less'
import Toolbar from '../common/Toolbar'
import classNames from 'classnames/bind'

const cx = classNames.bind(css)

export class Bills extends Component {
	
	getBills() {
		let bills = []
		for (let i = 0; i< 16; i++) {
			bills.push(
				<div className={css.bill} key={i}>
					<img src="src/images/bill.png" alt=""/>
				</div>
			)
		}
		return bills
	}

	render() {
		let container = cx({
      'scrollContainer': true,
      'container': true
    })
    let height = document.body.clientHeight - 60;
		return (
			<div>
				<Toolbar title="账户账单" url="/user"/>
				<div className={container} style={{height: height}}>
					{ this.getBills() }
				</div>
			</div>
		)
	}
}
