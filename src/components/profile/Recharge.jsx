/**
 * 个人中心 - 重值
 */
import React, { Component, PropTypes } from 'react'
import css from './recharge.less'
import { Link } from 'react-router'

export class Recharge extends Component {
	render() {
		return (
			<div className={css.container}>
				<div className={css.item}>
					<div className={css.label}>储蓄卡</div>
					<div className={css.item_right}>
						<p className={css.card}>交通银行（1011）</p>
						<p className={css.tips}>单日交易限额 ¥ 50000.00</p>
					</div>
				</div>
				<div className={css.item}>
					<div className={css.label}>金额(元)</div>
					<div className={css.item_right}>
						<input type="number" placeholder="请输入金额" ref="myAmountInput"/>
					</div>
				</div>
				<Link to="/profile" className={css.next}>下一步</Link>
			</div>
		)
	}
}

Recharge.defaultProps = {

}

Recharge.propTypes = {

}