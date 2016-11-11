// 个人中心 - 系统通知
import React, { Component } from 'react'
import css from './ticket_notification.less'
import Toolbar from '../common/Toolbar'
import { Spiner } from '../common/Spiner'
import { Link } from 'react-router'
import { Row, Col } from 'antd'

export class Notification extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cells: null
		}
	}

	componentDidMount() {
		let cells = [
			{id: 1, url: "/src/images/notification_icon0.png", name: "物流更新", content: "物流更新", time: "8:30"},
			{id: 2, url: "/src/images/notification_icon1.png", name: "通知", content: "通知", time: "两小时前"},
			{id: 3, url: "/src/images/notification_icon2.png", name: "活动通知", content: "活动通知", time: "一天前"}
		]
		this.setState({ cells: cells })
	}

	cells() {
		let list = []
		this.state.cells.forEach((cell, index, array) => {
			list.push(
				<Link to="/notifications" className={css.notification_cell} key={cell.id}>
					<Row>
						<Col span={19}>
							<img src={ cell.url } alt="卡券图标"/>
							<p>{ cell.name }</p>
							<p className={css.content}>{ cell.content }</p>
						</Col>
						<Col span={5}>
							<span className={css.time}>{ cell.time }</span>
						</Col>
					</Row>
				</Link>
			)
		})
		return list
	}
	
	render() {
		return (
			<div className={css.container}>
				<Toolbar title="系统通知" url="/user"/>
				<div className={css.content}>
					<div style={{height: 10}}></div>
					{ this.state.cells ? this.cells() : <Spiner/> }
				</div>
			</div>
		)
	}
}

Notification.defaultProps = {
	
}

Notification.propTypes = {

}