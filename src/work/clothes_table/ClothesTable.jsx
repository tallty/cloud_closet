import React, { Component, PropTypes } from 'react'
import css from './clothes_table.less'
import { Row, Col } from 'antd'

export class ClothesTable extends Component {

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

		let _data = []
		this.props.data.forEach((item, index, obj) => {
			_data.push(
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
		return _data
	}

	render() {
		return (
			<div>
				<Row className={css.order_table_header}>
					<Col span={7} style={{textAlign: 'left'}}>种类</Col>
					<Col span={5}>仓储时长</Col>
					<Col span={4}>数量</Col>
					<Col span={4}>单价</Col>
					<Col span={4}>总价</Col>
				</Row>
				{ this.getOrderList() }
			</div>
		)
	}
}

ClothesTable.defaultProps = {
	data: []
}

ClothesTable.PropTypes = {
	data: PropTypes.array
}