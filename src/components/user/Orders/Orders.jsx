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
 * 	created_at: 订单的创建时间,
 * 	photo: 用户的头像
 * 	【=============欠缺=================】
 * 	nurse: 护理方式[normal | senior],
 *	service_charge: 服务费,
 *	nurse_charge: 护理费用,
 * 	【==================================】
 * 	appointment_item_groups: [
 * 	  {
 * 			id: 条目id,
 * 			count: 衣服数量,
 * 			store_month: 仓储时长（月）,
 * 			price: 选择的衣柜的单价（元/月）,
 * 			type_name: 柜子的类别,
 * 	  }
 * 	]
 * }
 */

import React, { Component, PropTypes } from 'react';
import css from './orders.less';
import Toolbar from '../../common/Toolbar';
import { Spiner } from '../../common/Spiner';
import { Tabs } from 'antd';
import OrdersList from './OrdersList';
import SuperAgent from 'superagent';

const TabPane = Tabs.TabPane;

export class Orders extends Component {
	state = {
		appointments: null,
	}

	componentDidMount() {
		this.getAppointments(1);
	}

	getAppointments(page) {
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
					this.setState({ appointments: obj.appointments.reverse() });
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
    const { appointments } = this.state;
    const style = { color: '#4A4A4A', background: '#fff' };
    const backStyle = { color: '#4A4A4A' };

		return (
			<div className={css.container}>
				<Toolbar title="我的订单" url="/user" style={style} backStyle={backStyle} />

				<Tabs defaultActiveKey="1" className={css.tab_bar}>
			    <TabPane tab="当前订单" key="1">
						{appointments ? <OrdersList type="active" orders={appointments} /> : <Spiner />}
			    </TabPane>
			    <TabPane tab="历史订单" key="2">
						{appointments ? <OrdersList type="history" orders={appointments} /> : <Spiner />}
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
