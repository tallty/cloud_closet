// Fanc Club
import React, { Component, PropTypes } from 'react'
import css from './fanc_club.less'
import { Level } from './share/Level'
import { Icon } from 'antd'
import { Link } from 'react-router'

export class FancClub extends Component {
	constructor(props) {
		super(props)
		this.state = {
			level: 80,
			level_name: "白金级别",
			power_images: ['0', '0', '0', '0', '0']
		}
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
		return (
			<div className={css.container}>
				<div className={css.user_info}>
					<div className={css.back}>
						<Link to="/" className={css.back_link}>
							<Icon type="left"/>
						</Link>
					</div>
					<div className={css.name}>John Snow</div>
					<Level level={this.state.level} level_name={this.state.level_name} />
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