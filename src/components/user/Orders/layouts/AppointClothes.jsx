import React, { Component, PropTypes } from 'react';
import css from './layouts.less';
import {Row, Col} from 'antd';

const { string, number, arrayOf, shape } = PropTypes;

export class AppointClothes extends Component {

	render() {
		let { order } = this.props;
		return (
			<Row className={css.appoint_clothes}>
				<Col span={8}>
					<div className={css.left}>
						<div className={css.left_text}>预约</div>
					</div>
				</Col>
				<Col span={8}>
					<p>预约衣橱：{order.number}件</p>
				</Col>
				<Col span={8}>
					<p className="text-right">合计：<span>{order.price}</span></p>
				</Col>
			</Row>
		);
	}
}

AppointClothes.defaultProps = {
	order: {}
}

AppointClothes.propTypes = {
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
	})
}
