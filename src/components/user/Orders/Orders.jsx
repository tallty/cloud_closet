// 我的订单
import React, { Component, PropTypes } from 'react'
import css from './orders.less'
import { Toolbar } from '../../common/Toolbar'
import { Spiner } from '../../common/Spiner'
import { Tabs } from 'antd'
import { OrderItems } from './OrderItems'
import SuperAgent from 'superagent'

const TabPane = Tabs.TabPane

export class Orders extends Component {
	state = {
		items: null
	}

	componentDidMount() {
		// 模拟数据 Data
		let items = [
			{
				type: "pay",
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
			},
			{
				type: "complete",
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
			},
			{
				type: "receive",
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
		]
		
		this.setState({
			items: items
		})
	}

	render() {
		let items = this.state.items

		return (
			<div className={css.container}>
				<Toolbar title="我的订单" url="/user" />
				<Tabs defaultActiveKey="1" className={css.tab_bar}>
			    <TabPane tab="全部" key="1">
						{ items ? <OrderItems type="all" items={items} /> : <Spiner/> }
			    </TabPane>
			    <TabPane tab="待付款" key="2">
						{ items ? <OrderItems type="pay" items={items} /> : <Spiner/> }
			    </TabPane>
			    <TabPane tab="待发货" key="3">
						{ items ? <OrderItems type="transmit" items={items} /> : <Spiner/> }
			    </TabPane>
			    <TabPane tab="待收货" key="4">
						{ items ? <OrderItems type="receive" items={items} /> : <Spiner/> }
			    </TabPane>
			  </Tabs>
			</div>

		)
	}
}

Orders.defaultProps = {

}

Orders.propTypes = {

}
