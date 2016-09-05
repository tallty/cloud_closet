import React, { Component, PropTypes } from 'react'
import css from './toolbar.less'
import { Link } from 'react-router'

export class Toolbar extends Component {
	render() {
		return (
			<div className={css.toolbar}>
				<Link to={this.props.url} className={css.back}>
					<img src="/src/images/toolbar_back_icon.png" alt="返回"/>
				</Link>
				<span>{ this.props.title }</span>
			</div>
		)
	}
}

Toolbar.defaultProps = {
	title: " ",
	url: "/"
}

Toolbar.propTypes = {
	title: PropTypes.string,
	url: PropTypes.string
}