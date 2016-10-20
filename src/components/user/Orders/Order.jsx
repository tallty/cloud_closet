/**
 * 预约清单 - 生成订单
 */
import React, { Component } from 'react'
import css from './order.less'
import { Toolbar } from '../../common/Toolbar'
import { Spiner } from '../../common/Spiner'
import { Link } from 'react-router'
import { InClothes } from './InClothes'
import { Row, Col, Timeline, Icon } from 'antd'
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
			order: order,
			balance: null
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
	 * 获取物流信息
	 */
	getLogistics() {
		let logistics = []
		logistics.push(
			<Timeline.Item
				key={0} 
				dot={<Icon type="clock-circle-o" style={{ fontSize: '20px' }} />} 
				color="red">
					当前物流状态信息
					<p>2015-09-01</p>
			</Timeline.Item>
		)
		for (let i=1; i<10; i++) {
			logistics.push(
				<Timeline.Item key={i}>
					物流状态信息{i} 
					<p>2015-09-01</p>
				</Timeline.Item>
			)
		}
		return logistics
	}

	/**
	 * 获取余额
	 */
	getBalance() {
		return '3，568'
	}

	/**
	 * 使用余额支付
	 */
	handlePay() {
		window.location.replace('/success?action=pay')
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
						{/* 订单 */}
						<InClothes order={order} />
						{/* 费用 */}
						<p className="text-right">运费：XXX</p>
						<p className="text-right">服务费：XXX</p>
						<p className={css.tips}>护理要求：&nbsp;&nbsp;<span>每次护理</span></p>
						<p className={css.total_price}>合计：<span>{ this.getTotalPrice() }</span></p>
					</div>
					{/* 物流 */}
					<div className={css.logistics}>
						<Timeline>{ this.getLogistics() }</Timeline>
					</div>
					{/* 支付方式 */}
					<div className={css.pay_actions}>
						<button className={css.pay_btn} onClick={this.handlePay.bind(this)}>账户余额（￥{this.getBalance()}）</button>
						<Link to="/recharge" className={css.recharge_btn}>充值</Link>
					</div>
				</div>
				
		)
	}
}
