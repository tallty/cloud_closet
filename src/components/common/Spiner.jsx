// 封装的spin组件，props请参考antd组件Spin
import React, { Component, PropTypes } from 'react'
import { Spin } from 'antd'

export class Spiner extends Component {
	render() {
		return (
			<div style={{textAlign: "center", padding: 15}}>
				<Spin size={this.props.size} />
			</div>
		)
	}
}

Spiner.defaultProps = {
	size: "large"
}

Spiner.propTypes = {
	size: PropTypes.string
}