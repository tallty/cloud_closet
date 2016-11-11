/**
 * 个人中心 - 发票
 */
import React, { Component } from 'react'
import css from './receipt.less'
import Toolbar from '../common/Toolbar'
import {Link} from 'react-router'

export class Receipt extends Component {
	state = {
		money: 6800
	}

	render() {
		let tips = this.state.money ? "可开发票额度" : "（暂不可开，单张发票需大于50元）"
		let money = this.state.money ? `${this.state.money}元` : "--"
		return (
			<div className={css.container}>
				<Toolbar url="/user" title="发票">
					<Link to="/receipt">开票记录</Link>
				</Toolbar>
				<div className={css.content}>
					<div className={css.money}>{money}</div>
					<p className={css.tips}>{tips}</p>
					<div className={css.content}>
						<button>我要开票</button>
						<ul>
							<li>最高额度仅限实际充值或信用卡的订单费用，不包含任何优惠券、赠送金额、体验券等优惠活动费用</li>
							<li>您可开1张或多张，单张发票不得低于50元</li>
							<li>非钻石卡用户，10个工作日内处理（不含邮寄时间）</li>
							<li>钻石卡用户，3个工作日内处理（不含邮寄时间）</li>
							<li>开票金额大于或等于1000元可为您免费邮寄</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

Receipt.defaultProps = {

}
Receipt.propTypes = {

}
