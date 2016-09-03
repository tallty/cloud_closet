import React, { Component, PropTypes } from 'react'
import css from './toolbar.less'

export class ToolBar extends Component {
	render() {
		return (
			<div className={css.toolbar}>
				<a href={this.props.url} className={css.back}>
					<img src="/src/images/toolbar_back_icon.png" alt="返回"/>
				</a>
				<span>{ this.props.title }</span>
			</div>
		)
	}
}

ToolBar.defaultProps = {
	title: " ",
	url: "/"
}

ToolBar.propTypes = {
	title: PropTypes.string,
	url: PropTypes.string
}