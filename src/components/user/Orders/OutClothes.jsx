/**
 * 单个订单（出库）- 衣服列表
 * 问题：1、加个计算。2、衣服图片。3、衣服名称
 */
import React, { Component, PropTypes } from 'react'
import css from './orders.less'
import { Row, Col } from 'antd'

export class OutClothes extends Component {

	goodsList() {
		let { order } = this.props
		let list = []

		console.log("OutClothes.jsx 出库衣服列表：")
		console.log(order)

		order.appointment_item_groups.forEach((item, i, array) => {
			let price = (i === array.length - 1) ? 
									<div className={css.price}>
										合计：<span>888</span>
									</div> : null
			list.push(
				<Row key={i}>
					<Col span={6} className={css.goods_left}>
						<img src={`src/images/recommend_three.png`} alt="商品图片"/>
					</Col>
					<Col span={18}>
						<div className={css.goods_name}>{`DOLCE&GABBANA  白色连衣裙`}</div>
						{ price }
					</Col>
				</Row>
			)
		})
		return list
	}

	render() {
		return (
			<div className={css.goods}>
				{ this.goodsList() }
			</div>
		)
	}
}

OutClothes.defaultProps = {
	order: {}
}

OutClothes.propTypes = {
	order: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		phone: PropTypes.string,
		number: PropTypes.number,
		address: PropTypes.string,
		seq: PropTypes.string,
		date: PropTypes.string,
		created_at: PropTypes.string,
		appointment_item_groups: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number,
	 			count: PropTypes.number,
	 			store_month: PropTypes.numebr,
	 			price: PropTypes.number,
	 			total_price: PropTypes.number,
	 			kind: PropTypes.string,
	 			season: PropTypes.string
			})
		)
	})
}
