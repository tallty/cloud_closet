// 收费详情
import React, { Component, PropTypes } from 'react'
import { Row, Col, Button } from 'antd'
import styles from './charge_detail.less'
import classNames from 'classnames'
import classBind from 'classnames/bind'

// 垂直居中
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

export class ChargeDetail extends Component {
	constructor(props) {
		super(props)
	}

	// 收费详情列表
	getList() {
		let list = []
		this.props.detail.forEach((item, index, obj) => {
			list.push(
				<Col span={12} key={index}>
					<Row type="flex" justify="space-around" align="middle" className={styles.item_row}>
						<Col span={24} className={styles.list_cell_center}>{item[0]}</Col>
						<Col span={24} className={styles.list_img_content}>
							<img src={`/src/images/${item[1]}.png`} className={styles.list_img} alt={item[1]}/>
						</Col>
						<Col span={24} className={styles.list_cell_center}>{item[2]}</Col>
						<Col span={24}>{item[3]}</Col>
						<Col span={12}>租柜价格：</Col>
						<Col span={12} className={styles.list_cell_price}>{item[4]}</Col>
						<Col span={24} className={styles.list_cell_price}>{item[5]}</Col>
					</Row>
				</Col>
			)
		})
		return list
	}

	render() {
		return (
			<div>
				<Row>
					<img src="src/images/charge_head_bg.png" alt="" className={styles.topbar_bg}/>
					<Col span={24} className={styles.topbar}>收费详情</Col>
				</Row>
				{/*收费详情*/}
				<div className={styles.detail}>
					<div className={styles.detail_content}>
						<Row>
							{ this.getList() }
						</Row>
					</div>
				</div>
				{/*服务说明*/}
				<div className={styles.explain}>
					<div className={styles.title}>● 注意事项：</div>
					<div className={styles.content}>除柜体租借费用外，我们将收取以下额外的费用
 1.  服务费(上门收件免费，送件快递费另算)。
 2. 护理费：分为普通护理-UCC国际洗衣、 高端护理-嘉里酒店精洗。
 3. 真空袋：(中号)用于叠放柜(10个)10¥/个；
                (大号)用于叠放柜(5个)15¥/个。</div>
				</div>
				{/*Join Us*/}
				<div className={styles.join}>
					<a href="/appointment">
						<Button className={styles.btn} type="primary" >马上预约</Button>
					</a>
				</div>
			</div>
		)
	}
}

ChargeDetail.defaultProps = {
	detail: [
		["叠放柜", "sark_one", "400mm*100mm*560mm", "• 叠放柜可存放针织类，卫衣棉服等可折叠衣物60件,也可提供真空袋出售；", "180￥/月", " "],
		["挂放柜", "sark_two", "1200mm*100mm*560mm", "• 挂放柜可存放20件套装衣物，适合存放外套、大衣等大件衣物；", "300￥/月", " "],
		["组合柜", "sark_three", "1600mm*100mm*560mm", "• 组合柜可存放60件压缩和20件挂放衣物，适合灵活存挂衣物；", "400￥/月", " "],
		["礼服柜", "sark_four", "2400mm*100mm*560mm", "• 礼服柜可存放15件贵重礼服，适合存放大件礼服；", "50￥/件", "600￥/月"],
	]
}

ChargeDetail.propsTypes = {
	detail: React.PropTypes.array.isRequired
}