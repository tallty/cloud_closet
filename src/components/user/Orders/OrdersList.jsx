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

const cx = classNames.bind(css)

class OrdersList extends Component {
	// 订单类型
	orderTypes = new Map([
		['one', '待确认'],['two', '服务中'],['three', '待付款'],
		['four', '入库中'],['five', '已上架'],['six', '已取消']
	]);

	// 显示订单的类型
	getOrderTitle(type) {
		if (this.orderTypes.get(type)) {
			return this.orderTypes.get(type)
		} else {
			return '待确认';
		}
	}

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
		let order_str = JSON.stringify(order)
		sessionStorage.setItem('order', order_str)
		// 重定向
		this.props.router.replace('/order')
	}

	// 设置不同类型订单的处理事件
	setOrdersEvent(order) {
		let actions = null
		switch(order.type) {
			case "one":
				actions = (
					<div className={css.btns}>
						<Button type="ghost" className={css.show_btn}>取消订单</Button>
						<Button type="primary" className={css.sure_btn} onClick={this.handlePay.bind(this, order)}>确认</Button>	
					</div>
				)
				break;
			case "two":
				actions = (
					<div className={css.btns}>
						<Button type="ghost" className={css.show_btn}>取消订单</Button>
					</div>
				)
				break;
			case "three":
				actions = (
					<div className={css.btns}>
						<Button type="ghost" className={css.show_btn}>取消订单</Button>
						<Button type="primary" className={css.sure_btn} onClick={this.handlePay.bind(this, order)}>付款</Button>	
					</div>
				)
				break;
			case "four":
				actions = (
					<div className={css.btns}>
						<Button type="ghost" className={css.show_btn}>取消订单</Button>
					</div>
				)
				break;
			case "five":
				actions = (
					<div className={css.btns}>
						<Button type="ghost" className={css.show_btn}>取消订单</Button>
					</div>
				)
				break;
			case "six":
				actions = (
					<div className={css.btns}>
						<Button type="ghost" className={css.show_btn}>回复订单</Button>
					</div>
				)
				break;
			default:
				actions = (
					<div className={css.btns}>
						<Button type="ghost" className={css.show_btn}>取消订单</Button>
						<Button type="primary" className={css.sure_btn} onClick={this.handlePay.bind(this, order)}>付款</Button>
					</div>
				)
		}
		return actions;
	}

	// 订单列表
	getOrders() {
		let { type, orders } = this.props
    let list = []

		orders.forEach((order, index, obj) => {
			if (type == "three" || order.type === type) {
				let headerColor = cx({
		      'going': order.type != "complete",
		      'complete': order.type === "six"
		    })

				list.push(
					<div className={css.orders} key={index}>
						<div className={css.header}>
							<span className={headerColor}>{ this.getOrderTitle() }</span>
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
		let tab_height = document.body.clientHeight - 84
		let Orders = this.getOrders()

		return (
			<div style={{height: tab_height}} className="scrollContainer">
				{ Orders.length > 0 ? Orders : this.getOrdersNone() }
			</div>
		)
	}
}

OrdersList.defaultProps = {
	type: "all",
	Orders: []
}

OrdersList.propTypes = {
	all: PropTypes.string,
	Orders: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			phone: PropTypes.string,
			number: PropTypes.number,
			address: PropTypes.string,
			seq: PropTypes.string,
			date: PropTypes.string,
			created_at: PropTypes.string,
			appointment_item_groups: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.number,
		 			count: PropTypes.number,
		 			store_month: PropTypes.numebr,
		 			price: PropTypes.number,
		 			total_price: PropTypes.number,
		 			kind: PropTypes.string,
		 			season: PropTypes.string
				})
			)
		})
	)
}

export default withRouter(OrdersList);