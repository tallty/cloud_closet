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
		messages: [false, true, false, false, false, false]
	}

	getGrid() {
		let list = []
		this.props.items.forEach((item, index, items) => {
			let dot = this.state.messages[index] ? <div className={css.dot}></div> : null
			list.push(
				index === 4 ?
					<Col span={8} className={css.item} key={index}>
						<Link to={this.props.gridLinks[index]}>
							{dot}
							<div className={css.ticket}>
								6800<span className={css.ticket_icon}>￥</span>
							</div>
						</Link>
						<div>{item}</div>
					</Col> : 
					<Col span={8} className={css.item} key={index}>
						<Link to={this.props.gridLinks[index]}>
							{dot}
							<img src={`/src/images/profile_item${index}.png`} alt=""/>
							<div>{item}</div>
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
	items: ["我的卡券", "我的订单", "系统通知", "VIP会员", "发票", "我的小蜜"],
	gridLinks: ["/user/tickets", "/user/my_orders", "/user/notifications", "/vip", "/#", "/#"]
}

User.propTypes = {
	items: PropTypes.arrayOf(PropTypes.string),
	gridLinks: PropTypes.arrayOf(PropTypes.string)
}
