// 收费详情
import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'antd'
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
				<Row key={index} type="flex" justify="space-around" align="middle" className={styles.item_row}>
					<Col span={4}>
						<DemoBox value={100}>
							<img src={`/src/images/${item[0]}.png`} className={styles.list_img} alt={item[1]}/>
							<br></br>{item[1]}
						</DemoBox>
					</Col>
					<Col span={4} offset={4}>
						<DemoBox value={20}>{item[2]}</DemoBox>
					</Col>
					<Col span={4}><DemoBox value={20}>{item[3]}</DemoBox></Col>
					<Col span={4}><DemoBox value={20}>{item[4]}</DemoBox></Col>
					<Col span={4}><DemoBox value={20}>{item[5]}</DemoBox></Col>
				</Row>
			)
		})
		return list
	}

	render() {
		return (
			<div>
				<Row>
					<Col span={24} className={styles.topbar}>收费详情</Col>
				</Row>
				{/*收费详情*/}
				<div className={styles.detail}>
					<div className={styles.detail_top}>
						<Row>
							<Col span={4}>类别</Col>
							<Col span={4} offset={4}>天</Col>
							<Col span={4}>三月</Col>
							<Col span={4}>六月</Col>
							<Col span={4}>九月</Col>
						</Row>
					</div>
					<div className={styles.detail_content}>
						{ this.getList() }
					</div>
				</div>
				{/*服务说明*/}
				<div className={styles.explain}>
					<div className={styles.title}>服务说明</div>
					<div className={styles.content}>服务规范及收费说明</div>
				</div>
				{/*Join Us*/}
				<div className={styles.join}>
					<p className={styles.p1}>闪亮永远用来在众人之目中登场</p>
					<p>乐存</p>
					<p className={styles.p2}>加入会籍成为VIP贵族中的一员</p>
					<div className={styles.line}></div>
					<a href="/" className={styles.btn}>JOIN US</a>
				</div>
			</div>
		)
	}
}

ChargeDetail.defaultProps = {
	detail: [
		["shangyi", "上衣", 10, 20, 30, 40],
		["lianyiqun", "连衣裙", 10, 20, 30, 40],
		["kuzhuang", "裤装", 10, 20, 30, 40],
		["banqun", "半裙", 10, 20, 30, 40],
		["waitao", "外套", 10, 20, 30, 40],
		["yurongfu", "羽绒服", 10, 20, 30, 40],
		["yongzhuang", "泳装", 10, 20, 30, 40]
	]
}

ChargeDetail.propsTypes = {
	detail: React.PropTypes.array.isRequired
}