// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Icon, Button, Progress } from 'antd'
import { Level } from './share/Level'
import { Link } from 'react-router'
import css from './user.less'

export class User extends Component {
	state = {
		level: 80,
		level_name: "白金级别",
		grids: [
			{ name: "我的卡券", message: false, url: "/tickets" },
			{ name: "我的订单", message: true, url: "/orders" },
			{ name: "系统通知", message: false, url: "/notifications" },
			{ name: "VIP会员", message: false, url: "/vip" },
			{ name: "发票", message: false, url: "/" },
			{ name: "我的小蜜", message: false, url: "/" }
		]
	}

	getGrid() {
		let list = []

		this.state.grids.forEach((grid, index, obj) => {
			let dot = grid.message ? <div className={css.dot}></div> : null
			list.push(
				index === 4 ?
					<Col span={8} className={css.item} key={index}>
						<Link to={grid.url}>
							{dot}
							<div className={css.ticket}>
								6800<span className={css.ticket_icon}>￥</span>
							</div>
						</Link>
						<div>{grid.name}</div>
					</Col> : 
					<Col span={8} className={css.item} key={index}>
						<Link to={grid.url}>
							{dot}
							<img src={`/src/images/profile_item${index}.png`} alt=""/>
							<div>{grid.name}</div>
						</Link>
					</Col>
			)
		})
		return list
	}

  render() {
  	// 响应式处理
  	let _grid = 307
  	let _nav_tab = 60

  	let container_height = document.body.clientHeight - _nav_tab
  	let info_height = container_height - _grid
  	let user_info_top = info_height > 194 ? (info_height - 174) / 2 : 10
		
    return (
    	<div className={css.personal_center} style={{height: container_height}}>
    		{/* 头像信息 */}
				<div className={css.user_info} style={{height: info_height, minHeight: 194}}>
					<Link to="/user/profile" className={css.link_profile} style={{paddingTop: user_info_top}}>
						<img src="/src/images/photo.png" alt="头像"/>
						<div className={css.user_name}>John Snow</div>
						<Level level={this.state.level} level_name={this.state.level_name}/>
					</Link>
				</div>
				{/* 业务模块 */}
	      <div className={css.center_container}>
					<Row className={css.account}>
						<Col span={18} className={css.money}>6,430.08</Col>
						<Col span={6} className={css.money_link}>账户账单<Icon type="right" /></Col>
					</Row>
					<Row>
						<Col span={12} className={css.left_col}>
							<Link to="/user/recharge">
								<Button type="primary" className={css.charge_btn}>充值</Button>
							</Link>
						</Col>
						<Col span={12} className={css.right_col}>
							<Link to="/user/withdraw_fund">
								<Button type="primary" className={css.charge_btn}>提现</Button>
							</Link>
						</Col>
					</Row>
					<Row className={css.grid}>
						{ this.getGrid() }
					</Row>
	      </div>
      </div>
    )
  }
}

User.defaultProps = {

}

User.propTypes = {

}
