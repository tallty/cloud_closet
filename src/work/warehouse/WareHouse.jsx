/**
 * 预约入库
 */
import React, { Component, PropTypes } from 'react'
import css from './ware_house.less'
import { Link } from 'react-router'
import { UserInfo } from '../user_info/UserInfo'

export class WareHouse extends Component {
	componentDidMount() {
		console.dir(this.props.location.params)	
	}

	render() {
		return (
			<div className={css.container}>
				{/* 用户信息 */}
				<UserInfo name="" photo="" phone="" />
				{/* 季款 */}
				<div className={css.season}>
					<span>季款：</span>
				</div>
				{/* 入库 */}
				<Link to="/work_appoint_order" className={css.tab_btn}>入库</Link>
			</div>
		);
	}
}

WareHouse.defaultProps = {

}

WareHouse.propTypes = {

}