/**
 * 工作台
 */
import React, { Component } from 'react'
import { Link } from 'react-router'

export class Desk extends Component {
	render() {
		return (
			<div>
				工作台
				<Link to="/work_appoint_list">预约入库</Link>
			</div>
		)
	}
}
