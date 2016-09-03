// 个人中心 - 我的卡券
import React, { Component } from 'react'
import css from './ticket_notification.less'
import { Toolbar } from '../common/Toolbar'
import { Spiner } from '../common/Spiner'
import { Link } from 'react-router'

export class Ticket extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cells: null
		}
	}

	componentDidMount() {
		let cells = [
			{id: 1, url: "/src/images/ticket_icon0.png", name: "红包", count: 0},
			{id: 2, url: "/src/images/ticket_icon1.png", name: "优惠券", count: 0},
			{id: 3, url: "/src/images/ticket_icon2.png", name: "现金券", count: 0}
		]
		this.setState({ cells: cells })
	}

	cells() {
		let list = []
		this.state.cells.forEach((cell, index, array) => {
			list.push(
				<Link to="/" className={css.ticket_cell} key={cell.id}>
					<img src={ cell.url } alt="卡券图标"/>
					<span>{ cell.name }</span>
					<span className="pull-right">{ cell.count }个</span>
				</Link>
			)
		})
		return list
	}
	
	render() {
		return (
			<div className={css.container}>
				<Toolbar title="我的卡券" url="/profile"/>
				<div style={{height: 25}}></div>
				{ this.state.cells ? this.cells() : <Spiner/> }
			</div>
		)
	}
}

Ticket.defaultProps = {
	
}

Ticket.propTypes = {

}