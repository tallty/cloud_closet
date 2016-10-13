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
			{ name: "发票", message: false, url: "/receipt" },
			{ name: "我的小蜜", message: false, url: "/help" }
		]
	}

	getGrid() {
		let list = []

		this.state.grids.forEach((grid, index, obj) => {
			let dot = grid.message ? <div className={css.dot}></div> : null
			list.push(
				index === 4 ?
					<Col span={8} className={css.item} key={index}>
						{dot}
						<Link to={grid.url}>
							<div className={css.ticket}>
								6800<span className={css.ticket_icon}>￥</span>
							</div>
							<div>{grid.name}</div>
						</Link>
					</Col> : 
					<Col span={8} className={css.item} key={index}>
						{dot}
						<Link to={grid.url}>
							<img src={`/src/images/profile_item${index}.png`} alt=""/>
							<div>{grid.name}</div>
						</Link>
					</Col>
			)
		})
		return list
	}

  render() {
  	// 计算栅格部分容器的高度
  	let grids_height = (document.body.clientHeight - 60) * 0.52 - 80
		console.log(localStorage.openid);
    return (
    	<div className={css.personal_center}>
    		{/* 头像信息 */}
				<div className={css.user_info}>
					<Link to="/profile" className={css.link_profile}>
						<img src="/src/images/photo.png" alt="头像"/>
						<div className={css.user_name}>John Snow</div>
						<Level level={this.state.level} level_name={this.state.level_name}/>
					</Link>
				</div>
				{/* 业务模块 */}
	      <div className={css.center_container}>
					<Row className={css.account}>
						<Col span={18} className={css.money}>6,430.08</Col>
						<Col span={6} className={css.money_link}>
							<Link to="/bills">账户账单</Link>
							<Icon type="right" />
						</Col>
					</Row>
					<Row>
					<Link to="/recharge">
						<Button type="primary" className={css.charge_btn}>充值</Button>
					</Link>
					{/*}
						<Col span={12} className={css.right_col}>
							<Link to="/withdraw">
								<Button type="primary" className={css.charge_btn}>提现</Button>
							</Link>
						</Col>
						*/}
					</Row>

					<div className={css.grid_container} style={{height: grids_height}}>
						<Row className={css.grid}>
							{ this.getGrid() }
						</Row>
					</div>

					{/* 邀请好友可得礼券 */}
	      </div>
      </div>
    )
  }
}

User.defaultProps = {

}

User.propTypes = {

}
