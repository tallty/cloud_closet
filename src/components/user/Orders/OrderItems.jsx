// 我的订单 - 订单列表
import React, { Component, PropTypes } from 'react' 
import { Goods } from './Goods'
import { Row, Col, Button } from 'antd'
import { ClothesTable } from '../clothes_table/ClothesTable'
import css from './orders.less'
import classNames from 'classnames/bind'
import SuperAgent from 'superagent'

const cx = classNames.bind(css)

export class OrderItems extends Component {

	getOrderTitle(type) {
		switch(type) {
			case "complete":
				return "交易成功";
				break;
			case "pay":
				return "待付款";
				break;
			case "receive":
				return "待收货"; 
				break;
			default:
				return "待付款";
		}
	}

	getTotalPrice(groups) {
		let total = 0
		for(let item of groups) {
			total += item.price * item.count * item.store_month
		}
		return total
	}

	// 付款
	handlePay(appointment) {
		console.log("付款订单")
		console.log(appointment)
		let appointment_str = JSON.stringify(appointment)
		sessionStorage.setItem('appointment', appointment_str)
		// 重定向
		location.href="/order"
	}

	// 订单列表
	getItems() {
		let { type, items } = this.props
    let list = []
    console.log(items)
		items.forEach((item, index, obj) => {
			if (type == "all" || type == "pay" || item.type === type) {
				let headerColor = cx({
		      'going': item.type != "complete",
		      'complete': item.type === "complete"
		    })

				list.push(
					<div className={css.orders} key={index}>
						<div className={css.header}>
							<span className={headerColor}>{ this.getOrderTitle() }</span>
							<span className={css.time}>{ item.date }</span>
						</div>
						<div className={css.content}>
							{/* <Goods goods={ item.appointment_item_groups } /> */}
							<ClothesTable groups={item.appointment_item_groups}/>

							<div>
								<p className="text-right">运费：XXX</p>
								<p className="text-right">服务费：XXX</p>
								<Row>
									<Col span={12} className={css.nurse}>护理要求： <span>每次护理</span></Col>
									<Col span={12} className={css.total_price}>合计： <span>{this.getTotalPrice(item.appointment_item_groups)}</span></Col>
								</Row>
							</div>
						</div>
						<div className={css.footer}>
							<Row>
								<Col span={24}>
									<div className={css.info}>
										<span>预存时间：{ item.date }</span>
										<p>订单编号：{ item.seq }</p>
									</div>
									{/*判断是否显示*/}
									<div className={css.btns}>
										<Button type="ghost" className={css.show_btn}>取消订单</Button>
										<Button type="primary" className={css.sure_btn} onClick={this.handlePay.bind(this, item)}>付款</Button>
									</div>
								</Col>
							</Row>
						</div>
					</div>
				)
			}
		})
		return list
	}

	// 空列表样式
	getItemsNone() {
		return (
			<div className={css.orders_none}>
				<img src="/src/images/orders_none.png" alt="无订单"/>
				<p>您还没有相关的订单</p>
			</div>
		)
	}
	
	render() {
		let tab_height = document.body.clientHeight - 84
		let items = this.getItems()

		return (
			<div style={{height: tab_height}} className="scrollContainer">
				{ items.length > 0 ? items : this.getItemsNone() }
			</div>
		)
	}
}

OrderItems.defaultProps = {
	type: "all",
	items: []
}

OrderItems.propTypes = {
	all: PropTypes.string,
	items: PropTypes.array
}
