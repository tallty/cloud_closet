// 品牌主页
import React, { Component, PropTypes } from 'react'
import css from './profile.less'
import { Row, Col, Icon, Button, Progress } from 'antd'

export class Profile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			level: 80,
			level_name: "白金级别"
		}
	}

	getGrid() {
		let list = []
		this.props.items.forEach((item, index, items) => {
			index++
			list.push(
				index === 5 ?
				<Col span={8} className={css.item} key={index}>
					<div className={css.ticket}>
						6800<span className={css.ticket_icon}>￥</span>
					</div>
					<div className={css.ticket_text}>{item}</div>
				</Col> : 
				<Col span={8} className={css.item} key={index}>
					<img src={`/src/images/profile_item${index}.png`} alt=""/>
					<div>{item}</div>
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
    	<div className={css.profile_index} style={{height: container_height}}>
    		{/* 头像信息 */}
				<div className={css.user_info} style={{height: info_height, minHeight: 194}}>
					<div style={{paddingTop: user_info_top}}>
						<img src="/src/images/photo.png" alt="头像"/>
						<div className={css.user_name}>John Snow</div>
						<div className={css.level}>
							<div className={css.level_icon}></div>
							<Progress percent={this.state.level} showInfo={false} strokeWidth={6} className={css.progress} />
							<div className={css.level_name}>{this.state.level_name}</div>
						</div>
					</div>
				</div>
				{/* 业务模块 */}
	      <div className={css.profile_container}>
					<Row className={css.account}>
						<Col span={18} className={css.money}>6,430.08</Col>
						<Col span={6} className={css.money_link}>账户账单<Icon type="right" /></Col>
					</Row>
					<Row>
						<Col span={12} className={css.left_col}>
							<Button type="primary" className={css.charge_btn}>充值</Button>
						</Col>
						<Col span={12} className={css.right_col}>
							<Button type="primary" className={css.charge_btn}>提现</Button>
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

Profile.defaultProps = {
	items: ["我的卡券", "我的订单", "系统通知", "VIP会员", "发票", "我的小蜜"]
}

Profile.propTypes = {
}
