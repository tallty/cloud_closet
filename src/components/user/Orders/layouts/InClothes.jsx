/**
 * 单个订单（入库） - 衣服列表
 * 问题：1、price 为总价。2、无衣服种类。3、无季别。4、无服务费和运费
 */
import React, { Component, PropTypes } from 'react'
import css from './layouts.less'
import { Row, Col } from 'antd'

const { string, number, arrayOf, shape } = PropTypes;

export class InClothes extends Component {
	// 解析仓储时长
	parseStoreMonth = new Map([
		[3, '三个月'],[6, '六个月'],[9, '九个月'],
		[12, '一年'],[24, '两年']
	]);
	// 解析衣类图片
	imgUrls = new Map([
		['上衣', 'src/images/shangyi.png'],
		['连衣裙', 'src/images/lianyiqun.png'],
		['裤装', 'src/images/kuzhuang.png'],
		['半裙', 'src/images/banqun.png'],
		['外套', 'src/images/waitao.png'],
		['羽绒服', 'src/images/yurongfu.png'],
		['泳装', 'src/images/yongzhuang.png']
	])

	// 条目的点击事件
	handleClick(index,item) {
		this.props.itemClickEvent(index,item)
	}

	// 获取订单的合计
	getTotalPrice() {
		let { order } = this.props
		let total = 0
		for(let item of order.appointment_item_groups) {
			total += item.price
		}
		return total
	}

	// 获取单条入库记录的单价
	getUnitPrice(item) {
		return item.price / item.count / item.store_month
	}

	// 设置入库衣服列表
	getClotheList() {
		let { order } = this.props
		let _groups = []
		console.log("InClothes.jsx 入库衣服列表：")
		console.log(order)
		order.appointment_item_groups.forEach((item, index, obj) => {
			_groups.push(
				<Row key={index} className={css.order_item} onClick={this.handleClick.bind(this,index,item)}>
					<Col span={7} style={{textAlign: 'left'}}>
						<div className={css.img_div}>
							<img src={"src/images/shangyi.png"} alt="icon"/>
						</div>
						<div className={css.kind}>
							<p>{item.kind} 上衣</p>
							<div className={css.tag}>{item.season}春夏</div>
						</div>
					</Col>
					<Col span={5}>{this.parseStoreMonth.get(item.store_month)}</Col>
					<Col span={4}>{item.count}</Col>
					<Col span={4}>{this.getUnitPrice(item)}</Col>
					<Col span={4}>{item.price}</Col>
				</Row>
			)
		})
		return _groups
	}

	render() {
		let { order } = this.props
		return (
			<div>
				{/* 表格header */}
				<Row className={css.order_table_header}>
					<Col span={7} style={{textAlign: 'left'}}>种类</Col>
					<Col span={5}>仓储时长</Col>
					<Col span={4}>数量</Col>
					<Col span={4}>单价</Col>
					<Col span={4}>总价</Col>
				</Row>

				{/* 所有入库的衣服 */}
				{ 
					order.appointment_item_groups.length > 0 ? 
						this.getClotheList() :
						<Row>
							<Col span={24} className={css.empty_table}>未添加任何衣服</Col>
						</Row>
				}
			</div>
		)
	}
}

InClothes.defaultProps = {
	order: {},
	itemClickEvent: () => { console.log("响应默认的点击事件") }
}

InClothes.PropTypes = {
	order: PropTypes.shape({
		id: number,
		name: string,
		phone: string,
		number: number,
		address: string,
		state: string,
		price: number,
		seq: string,
		date: string,
		created_at: string,
		appointment_item_groups: arrayOf(
			shape({
				id: number,
	 			count: number,
	 			store_month: number,
	 			price: number,
	 			total_price: number,
	 			kind: string,
	 			season: string
			})
		)
	}),
	itemClickEvent: PropTypes.func
}