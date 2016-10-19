// 通用Toolbar组件
import React, { Component, PropTypes } from 'react'
import css from './toolbar.less'
import { Link } from 'react-router'
import { Icon } from 'antd'

export class Toolbar extends Component {
	render() {
		return (
			<div className={css.toolbar} style={this.props.style}>
				<Link to={this.props.url} className={css.back} style={this.props.back_style}>
					<Icon type="left" />
				</Link>
				<div className={css.title}>
					<span>{ this.props.title }</span>
				</div>
				{
					this.props.children ? 
						<Link to={this.props.menuUrl} className={css.menu}>
							{this.props.children}
						</Link> : null
				}
			</div>
		)
	}
}

Toolbar.defaultProps = {
	title: " ",
	url: "/",
	menuUrl: "/",
	style: {
		color: '#FFFFFF',
		background: '#FF9241'
	},
	back_style: {
		color: '#FFFFFF'
	}
}

Toolbar.propTypes = {
	title: PropTypes.string,
	url: PropTypes.string,
	menuUrl: PropTypes.string,
	style: PropTypes.object,
	back_style: PropTypes.object
}