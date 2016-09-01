// 品牌主页
import React, { Component, PropTypes } from 'react'
import css from './profile.less'
import { Row, Col, Icon, Button } from 'antd'

export class Profile extends Component {
	constructor(props) {
		super(props)
	}

	getGrid() {
		let list = []
		this.props.items.forEach((item, index, items) => {
			index++
			list.push(
				index === 5 ?
				<Col span={8} className={css.item} key={index}>
					<div className={css.ticket}>
						6800
						<span className={css.ticket_icon}>￥</span>
					</div>
					{item}
				</Col> : 
				<Col span={8} className={css.item} key={index}>
					<img src={`/src/images/profile_item${index}.svg`} alt=""/>
					{item}
				</Col>
			)
		})
		return list
	}

  render() {
  	let height = document.body.clientHeight - 337

    return (
    	<div className={css.profile_index}>
				<div className={css.user_info} style={{height: height}}>
					<img src="/src/images/photo.png" alt="头像"/>
					<div className={css.user_name}>John Snow</div>
					<Row className={css.user_level}>
						<Col span={12} className="text-right">
							<img src="/src/images/user_level.png" alt="等级"/>
						</Col>
						<Col span={12} className="text-left">
							<span className={css.level_name}>白金级别</span>
						</Col>
					</Row>
				</div>

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
};
