/**
 * 预约清单 - 生成订单
 */
import React, { Component } from 'react'
import css from './order.less'
import { Toolbar } from '../../common/Toolbar'
import { Spiner } from '../../common/Spiner'
import { Link } from 'react-router'
import { InClothes } from './InClothes'
import { Row, Col } from 'antd'
import SuperAgent from 'superagent'

const nurseWay = new Map([
	['every', '每次护理'], ['one', '一次护理'], ['no', '不护理']
]);

export class Order extends Component {
	state = {
		order: null
	}

	componentWillMount() {
		let order_str = sessionStorage.order
		let order = JSON.parse(order_str)

		this.setState({
			order: order
		})
	}

	// 获取订单的合计
	getTotalPrice() {
		let total = 0
		for(let item of this.state.order.appointment_item_groups) {
			total += item.price
		}
		return total
	}

	/**
	 * 完成按钮点击逻辑
	 */
	handleClick() {

	}

	render() {
		let toolbar_style = {
			background: '#FF9241', 
			color: '#fff'
		}
		let back_style = {
			color: '#fff'
		}

		let { order } = this.state

		return (
			<div className={css.appoint_order}>
				<Toolbar title="选择支付方式" 
								url={`/orders`}
								style={toolbar_style} 
								back_style={back_style} />

				<div className={css.order}>
					<InClothes order={order} />
					<Row className={css.tips}>
						<Col span={12}>护理要求：&nbsp;&nbsp;<span>每次护理</span></Col>
						<Col span={12} className="text-right">运费：XXX</Col>
					</Row>
					<p className="text-right">服务费：XXX</p>
					<p className={css.total_price}>合计：<span>{ this.getTotalPrice() }</span></p>
					<p>配送时间：2016-5-28 12:00～13:00</p>
				</div>

				<button className={css.pay_btn} onClick={this.handleClick.bind(this)}>账户余额（￥3，568）</button>
				<Link to="/recharge" className={css.recharge_btn}>充值</Link>
			</div>
		)
	}
}
