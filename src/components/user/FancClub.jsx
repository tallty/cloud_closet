// Fanc Club
import React, { Component, PropTypes } from 'react'
import css from './fanc_club.less'
import { Level } from './share/Level'
import { Icon } from 'antd'
import { Link } from 'react-router'
import auth from '../WechatConect/auth'
import SuperAgent from 'superagent'

export class FancClub extends Component {
	state = {
		level: 80,
		level_name: "白金级别",
		power_images: ['0', '0', '0', '0', '0'],
		user: {}
	}

	componentWillMount() {
		SuperAgent
			.get("http://closet-api.tallty.com/user_info")
			.set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
      	if (res.ok) {
      		// 缓存
      		let user_str = JSON.stringify(res.body);
          localStorage.setItem('user', user_str);

					this.setState({ user: res.body });
      	} else {
      		console.log("获取用户信息失败");
      		auth.authLogin();
      	}
      })
	}

	getPowerImges() {
		let list = []
		this.state.power_images.forEach((url, i, urls) => {
			list.push(
				<img src={`/src/images/fanc_club_power0.png`} alt="特权" key={i}/>
			)
		})
		return list
	}

	render() {
		let { level, level_name, user } = this.state;
		return (
			<div className={css.container}>
				<div className={css.user_info}>
					<div className={css.back}>
						<Link to="/user" className={css.back_link}>
							<Icon type="left"/>
						</Link>
					</div>
					<div className={css.name}>{user.nickname}</div>
					<Level level={level} level_name={level_name} />
				</div>

				<div className={css.title_one}>尊享特权</div>
				<div className={css.slider}>
					{ this.getPowerImges() }
				</div>
				<div className={css.title_two}>会员体系说明</div>
			</div>

		)
	}
}

FancClub.defaultProps = {

}

FancClub.propTypes = {

}