import React, { Component, PropTypes } from 'react'
import css from './clothes_table.less'
import { Row, Col } from 'antd'

export class ClothesTable extends Component {
	parseStoreMonth = new Map([
		[3, '三个月'],[6, '六个月'],[9, '九个月'],
		[12, '一年'],[24, '两年']
	]);

	handleClick(index,item) {
		this.props.itemClickEvent(index,item)
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

		let _groups = []

		this.props.groups.forEach((item, index, obj) => {
			_groups.push(
				<Row key={index} className={css.order_item} onClick={this.handleClick.bind(this,index,item)}>
					<Col span={7} style={{textAlign: 'left'}}>
						<div className={css.img_div}>
							<img src={img_map.get(item.kind)} alt="icon"/>
						</div>
						<div className={css.kind}>
							<p>{item.kind}</p>
							<div className={css.tag}>{item.season}</div>
						</div>
					</Col>
					<Col span={5}>{this.parseStoreMonth.get(item.store_month)}</Col>
					<Col span={4}>{item.count}</Col>
					<Col span={4}>{item.price}</Col>
					<Col span={4}>{item.total_price}</Col>
				</Row>
			)
		})
		return _groups
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
				{ 
					this.props.groups.length > 0 ? 
						this.getOrderList() :
						<Row>
							<Col span={24} className={css.empty_table}>未添加任何衣服</Col>
						</Row>
				}
			</div>
		)
	}
}

ClothesTable.defaultProps = {
	groups: [],
	onTableClickEvent: () => {}
}

ClothesTable.PropTypes = {
	groups: PropTypes.arrayOf(
		PropTypes.shape({
			count: PropTypes.number,
			store_month: PropTypes.number,
			price: PropTypes.number,
			kind: PropTypes.string,
			season: PropTypes.string
		})
	),
	onTableClickEvent: PropTypes.func
}