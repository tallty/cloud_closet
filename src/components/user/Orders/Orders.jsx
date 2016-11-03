// 我的订单
/*
 * 需要的数据类型：
 * appointment: {
 * 	id: 用户id,
 * 	address: 地址,
 * 	seq: 订单编号,
 * 	name: 用户姓名,
 * 	phone: 手机号,
 * 	number: 预约入库数量,
 * 	date: 预约日期,
 * 	state: 订单状态【"待确认"，"服务中"，"待付款"，"入库中"，"已上架"，"已取消"】,
 * 	_total: 衣服总计,
 * 	【====以下为接口欠缺数据字段，使用假数据===】
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
 * 			price: 单价价格（接口显示的总价，需自行计算）,
 * 			total_price: 单条入库记录总价,
 * 			【======以下为接口欠缺数据字段，使用假数据====】
 * 			kind: 衣服类别,
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

export class Orders extends Component {
	state = {
		total_pages: 1,
		current_page: 1,
		appointments: null
	}

	componentDidMount() {
		SuperAgent
			.get(`http://closet-api.tallty.com/appointments`)
			.set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
      	if (res.ok) {
      		let obj = res.body
  				console.log("Orders.jsx 获取的订单列表 => ")
					console.log(obj.appointments)
					this.setState({
						total_pages: obj.total_pages,
						current_page: obj.current_page,
						appointments: obj.appointments
					})
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
						{ appointments ? <OrdersList type="normal" orders={appointments} /> : <Spiner/> }
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
