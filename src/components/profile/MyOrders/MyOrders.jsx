// 我的订单
import React, { Component, PropTypes } from 'react'
import css from './my_orders.less'
import { Toolbar } from '../../common/Toolbar'
import { Spiner } from '../../common/Spiner'
import { Tabs } from 'antd'
import { Orders } from './Orders'
import SuperAgent from 'superagent'

const TabPane = Tabs.TabPane

export class MyOrders extends Component {
	state = {
		orders: null
	}

	componentDidMount() {
		// 模拟数据 Data
		let orders = []
		for(let item of ["pay","complete","transmit","receive"]) {
			let order = {
				type: item,
				time: "2016-5-28",
				transmit_time: "2016-5-28 12:00～13:00",
				spent_time: "3天",
				goods: [
					{
						image: "/src/images/goods_example.png",
						name: "DOLCE&GABBANA  印花包臀短裙",
						link: "/"
					}
				]
			}
			orders.push(order)
		}

		this.setState({
			orders: orders
		})
	}

	render() {
		let orders = this.state.orders

		return (
			<div className={css.container}>
				<Toolbar title="我的订单" url="/personal_center" />
				<Tabs defaultActiveKey="1" className={css.tab_bar}>
			    <TabPane tab="全部" key="1">
						{ orders ? <Orders type="all" orders={orders} /> : <Spiner/> }
			    </TabPane>
			    <TabPane tab="待付款" key="2">
						{ orders ? <Orders type="pay" orders={orders} /> : <Spiner/> }
			    </TabPane>
			    <TabPane tab="待发货" key="3">
						{ orders ? <Orders type="transmit" orders={orders} /> : <Spiner/> }
			    </TabPane>
			    <TabPane tab="待收货" key="4">
						{ orders ? <Orders type="receive" orders={orders} /> : <Spiner/> }
			    </TabPane>
			  </Tabs>
			</div>

		)
	}
}

MyOrders.defaultProps = {

}

MyOrders.propTypes = {

}
