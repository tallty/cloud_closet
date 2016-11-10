// 我的订单
/**
 * 需要的数据类型：
 * appointment: {
 * 	id: 用户id,
 * 	name: 用户姓名,
 * 	phone: 手机号,
 * 	address: 地址,
 * 	number: 预约入库数量,
 * 	date: 预约日期,
 * 	price: 订单的合计总价,
 * 	seq: 预约的订单号,
 * 	state: 订单的状态【服务中, ...】
 * 	detail: "[["上衣", "5"], ["裤装", "2"], ["裙装", "3"]]",
 * 	created_at: 订单的创建时间,
 * 	【=============欠缺=================】
 * 	nurse: 护理方式[every|one|no],
 *	freight: 运费,
 *	service_charge: 服务费,
 *	photo: 头像,
 * 	【==================================】
 * 	appointment_item_groups: [
 * 	  {
 * 			id: 条目id,
 * 			count: 衣服数量,
 * 			store_month: 仓储时长（月）,
 * 			price: 单条记录的总价,
 * 			type_name: 衣服类别,
 * 			【===============欠缺================】
 * 			season: 季别
 * 			【==================================】
 * 	  }
 * 	]
 * }
 */

import React, { Component, PropTypes } from 'react'
import css from './orders.less'
import Toolbar from '../../common/Toolbar'
import { Spiner } from '../../common/Spiner'
import { Tabs } from 'antd'
import OrdersList from './OrdersList'
import SuperAgent from 'superagent'

const TabPane = Tabs.TabPane

let _appointments = []

export class Orders extends Component {
	state = {
		appointments: null
	}

	componentDidMount() {
		this.getAppointments(1);
	}

	getAppointments(page) {
		console.log("获取分页")

		SuperAgent
			.get(`http://closet-api.tallty.com/appointments?page=${page}`)
			.set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
      	if (res.ok) {
      		let obj = res.body
  				console.log("Orders.jsx 获取的订单列表 => ");
					console.log(obj.appointments);
					this.setState({ appointments: obj.appointments });
					// 遍历分页
					// if (obj.current_page < obj.total_pages) {
					// 	this.getAppointments(obj.current_page + 1);
					// }
      	} else {
					console.log("获取预约列表失败")
      	}
      })
	}

	render() {
		let { appointments } = this.state

		let style = { color: '#4A4A4A', background: '#fff' }
		let back_style = { color: '#4A4A4A' }

		return (
			<div className={css.container}>
				<Toolbar title="我的订单" url="/user" style={style} back_style={back_style}/>

				<Tabs defaultActiveKey="1" className={css.tab_bar}>
			    <TabPane tab="当前订单" key="1">
						{ appointments ? <OrdersList type="active" orders={appointments} /> : <Spiner/> }
			    </TabPane>
			    <TabPane tab="历史订单" key="2">
						{ appointments ? <OrdersList type="history" orders={appointments} /> : <Spiner/> }
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
