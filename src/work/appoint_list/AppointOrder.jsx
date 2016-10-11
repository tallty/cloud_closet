/**
 * 预约清单 - 生成订单
 */
import React, { Component } from 'react'
import css from './appoint.less'
import { Toolbar } from '../../components/common/Toolbar'
import { Spiner } from '../../components/common/Spiner'
import { Link } from 'react-router'
import { UserInfo } from '../user_info/UserInfo'
import { Row, Col } from 'antd'

export class AppointOrder extends Component {
	state = {
		list: null
	}

	componentDidMount() {
		let list = [
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

		this.setState({list: list})
	}

	getOrderList() {
		let img_map = new Map([
			['上衣', 'src/images/shangyi.png'],
			['连衣裙', 'src/images/lianyiqun.png'],
			['裤装', 'src/images/kuzhuang.png'],
			['半裙', 'src/images/banqun.png'],
			['外套', 'src/images/waitao.png'],
			['羽绒服', 'src/images/yurongfu.png'],
			['泳装', 'src/images/yongzhuang.png']
		])

		let _list = []
		this.state.list.forEach((item, index, obj) => {
			_list.push(
				<Row key={index} className={css.order_item}>
					<Col span={7} style={{textAlign: 'left'}}>
						<div className={css.img_div}>
							<img src={img_map.get(item.kind)} alt="icon"/>
						</div>
						<div className={css.kind}>
							<p>{item.kind}</p>
							<div className={css.tag}>{item.season}</div>
						</div>
					</Col>
					<Col span={5}>{item.time_length}</Col>
					<Col span={4}>{item.count}</Col>
					<Col span={4}>{item.price}</Col>
					<Col span={4}>{item.total_price}</Col>
				</Row>
			)
		})

		return _list
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
					<Row className={css.order_table_header}>
						<Col span={7} style={{textAlign: 'left'}}>种类</Col>
						<Col span={5}>仓储时长</Col>
						<Col span={4}>数量</Col>
						<Col span={4}>单价</Col>
						<Col span={4}>总价</Col>
					</Row>
					{ this.state.list ? this.getOrderList() : <Spiner /> }
					<Row>
						<Col span={12}>护理要求：&nbsp;&nbsp;<span style={{color: '#FF9241'}}>每次护理</span></Col>
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
