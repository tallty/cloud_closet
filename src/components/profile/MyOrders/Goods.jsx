// 我的订单 - 商品列表
import React, { Component, PropTypes } from 'react'
import css from './my_orders.less'
import { Row, Col } from 'antd'

export class Goods extends Component {
	constructor(props) {
		super(props)
	}

	goodsList() {
		let list = []
		this.props.goods.forEach((item, i, array) => {
			let price = (i === this.props.goods.length - 1) ? 
									<div className={css.price}>
										合计：<span>{ this.props.total_price }</span>
									</div> : null
			list.push(
				<Row key={i}>
					<Col span={6} className={css.goods_left}>
						<img src={item.image} alt="商品图片"/>
					</Col>
					<Col span={18}>
						<div className={css.goods_name}>{item.name}</div>
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

Goods.defaultProps = {
	goods: [],
	total_price: 0
}

Goods.propTypes = {
	goods: PropTypes.arrayOf(
		PropTypes.shape({
			image: PropTypes.string,
			name: PropTypes.string,
			link: PropTypes.string,
		})
	),
	total_price: PropTypes.number
}
