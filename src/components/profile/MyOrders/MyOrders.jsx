// 我的订单
import React, { Component, PropTypes } from 'react'
import css from './my_orders.less'
import { ToolBar } from '../../common/ToolBar'
import { Tabs } from 'antd'
import { Orders } from './Orders'
import SuperAgent from 'superagent'

const TabPane = Tabs.TabPane

export class MyOrders extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		// 调用接口获取所有订单
	}

	render() {
		return (
			<div className={css.container}>
				<ToolBar title="我的订单" />
				<Tabs defaultActiveKey="1" className={css.tab_bar}>
			    <TabPane tab="全部" key="1">
						<Orders type="all" />
			    </TabPane>
			    <TabPane tab="待付款" key="2">
						<Orders type="pay" />
			    </TabPane>
			    <TabPane tab="待发货" key="3">
						<Orders type="transmit" />
			    </TabPane>
			    <TabPane tab="待收货" key="4">
						<Orders type="receive" />
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
