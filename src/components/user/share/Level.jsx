import React, { Component, PropTypes } from 'react'
import { Progress } from 'antd'
import css from './share.less'

export class Level extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className={css.level}>
				<div className={css.level_icon}></div>
				<Progress percent={this.props.level} showInfo={false} strokeWidth={7} className={css.progress} />
				<div className={css.level_name}>{this.props.level_name}</div>
			</div>
		)
	}
}

Level.defaultProps = {
	level: 80,
	level_name: " "
}	

Level.propTypes = {
	level: PropTypes.number,
	level_name: PropTypes.string
}