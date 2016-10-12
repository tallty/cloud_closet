/**
 * 预约清单 - 生成订单
 */
import React, { Component } from 'react'
import css from './appoint.less'
import { Toolbar } from '../../components/common/Toolbar'
import { Spiner } from '../../components/common/Spiner'
import { Link } from 'react-router'
import { UserInfo } from '../user_info/UserInfo'
import { ClothesTable } from '../clothes_table/ClothesTable'
import { Row, Col } from 'antd'

export class AppointOrder extends Component {
	state = {
		data: null
	}

	componentDidMount() {
		let data = [
			{
				kind: '上衣',
				season: '春夏',
				time_length: '3个月',
				count: 10,
				price: 20.0,
				total_price: 200.0
			},
			{
				kind: '连衣裙',
				season: '秋冬',
				time_length: '3个月',
				count: 18,
				price: 38.0,
				total_price: 684.0
			}
		]

		this.setState({data: data})
	}

	render() {
		let toolbar_style = {
			background: '#FF9241', 
			color: '#fff'
		}
		let back_style = {
			color: '#fff'
		}
		return (
			<div className={css.appoint_order}>
				<Toolbar title="预约清单" 
								url="/work_warehouse"
								style={toolbar_style} 
								back_style={back_style} />

				<div className={css.order}>
					<ClothesTable data={this.state.data} />
					{ this.state.data ? null : <Spiner /> }
					<Row className={css.tips}>
						<Col span={12}>护理要求：&nbsp;&nbsp;<span>每次护理</span></Col>
						<Col span={12} className="text-right">运费：xxx</Col>
					</Row>
					<p className="text-right">服务费：xxx</p>
					<p className={css.total_price}>合计：<span>884.0</span></p>
					<p>配送时间：2016-5-28 12:00～13:00</p>
				</div>

				<hr/>
				<UserInfo name="S" photo="/src/images/photo.png" phone="18616577687" />
				<hr/>

				<Link to="/work_appoint_success" className={css.submit_order_btn}>生成订单</Link>

			</div>
		)
	}
}
