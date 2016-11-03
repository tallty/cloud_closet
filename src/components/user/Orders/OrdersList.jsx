// 我的订单 - 订单列表
// 问题: 1、状态的区分。2、不同状态订单的操作事件
import React, { Component, PropTypes } from 'react' 
import { OutClothes } from './OutClothes'
import { Row, Col, Button } from 'antd'
import { InClothes } from './InClothes'
import css from './orders.less'
import classNames from 'classnames/bind'
import SuperAgent from 'superagent'
import { withRouter } from 'react-router'

const { string, number, arrayOf, shape } = PropTypes;
const cx = classNames.bind(css);

class OrdersList extends Component {

	// 获取订单的合计
	getTotalPrice(order) {
		let total = 0
		for(let item of order.appointment_item_groups) {
			total += item.price
		}
		return total
	}

	// 付款
	handlePay(order) {
		console.log("付款订单")
		console.log(order)
		// 重定向
		this.props.router.replace(`/order?id=${order.id}`);
	}

	// 设置不同类型订单的处理事件
	setOrdersEvent(order) {
		if (order.state === "待确认") {
			return (
				<div className={css.btns}>
					<Button type="ghost" className={css.show_btn}>取消订单</Button>
					<Button type="primary" className={css.sure_btn} onClick={this.handlePay.bind(this, order)}>确认</Button>	
				</div>
			)
		} else if (order.state === "history") {
			return (
				<div className={css.btns}>
					<Button type="ghost" className={css.show_btn}>取消订单</Button>
				</div>
			)
		}
	}

	// 订单列表
	getOrders() {
		let { type, orders } = this.props;
    let list = [];

		orders.forEach((order, index, obj) => {
			if (type == "normal") {
				list.push(
					<div className={css.orders} key={index}>
						<div className={css.header}>
							<span className={css.going}>{ order.state }</span>
							<span className={css.time}>{ order.date }</span>
						</div>
						<div className={css.content}>
							{/* 入库衣服列表 */}
							<InClothes order={order}/>
							<p className="text-right">运费：XXX</p>
							<p className="text-right">服务费：XXX</p>
							<Row>
								<Col span={12} className={css.nurse}>
									护理要求： <span>每次护理</span>
								</Col>
								<Col span={12} className={css.total_price}>
									合计： <span>{this.getTotalPrice(order)}</span>
								</Col>
							</Row>
							{/* 取衣服列表 */}
							{/* <OutClothes order={order}/> */}
						</div>
						<Row className={css.footer}>
							<Col span={24}>
								<div className={css.info}>
									<span>预存时间：{ order.date }</span>
									<p>订单编号：{ order.seq }</p>
								</div>
								{/*判断是否显示*/}
								{this.setOrdersEvent(order)}
							</Col>
						</Row>
					</div>
				)
			}
		})
		return list
	}

	// 空列表样式
	getOrdersNone() {
		return (
			<div className={css.orders_none}>
				<img src="/src/images/orders_none.png" alt="无订单"/>
				<p>您还没有相关的订单</p>
			</div>
		)
	}
	
	render() {
		let tab_height = document.body.clientHeight - 88
		let Orders = this.getOrders()

		return (
			<div style={{height: tab_height}} className="scrollContainer">
				{ Orders.length > 0 ? Orders : this.getOrdersNone() }
			</div>
		)
	}
}

OrdersList.defaultProps = {
	type: "normal",
	Orders: []
}

OrdersList.propTypes = {
	type: string,
	Orders: arrayOf(
		shape({
			id: number,
			name: string,
			phone: string,
			number: number,
			address: string,
			seq: string,
			date: string,
			created_at: string,
			appointment_item_groups: arrayOf(
				shape({
					id: number,
		 			count: number,
		 			store_month: number,
		 			price: number,
		 			total_price: number,
		 			kind: string,
		 			season: string
				})
			)
		})
	)
}

export default withRouter(OrdersList);