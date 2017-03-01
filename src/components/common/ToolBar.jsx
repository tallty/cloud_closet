// 通用Toolbar组件
// title: 标题,
// url: 返回的链接,
// menuUrl: 菜单的链接,
// style: toolbar样式,
// back_style: 返回按钮的样式
// 说明：
// 1、url存在，返回url, 不存在，使用goBack()
import React, { Component, PropTypes } from 'react'
import { Link, withRouter } from 'react-router'
import { Icon } from 'antd'
import css from './toolbar.less'

class Toolbar extends Component {

  handleBack() {
		this.props.router.goBack();
	}

	render() {
		const { title, url, menuUrl, style, back_style, children } = this.props;

		return (
			<div className={css.toolbar} style={style}>
				{
					url ? 
						<Link to={url} className={css.back} style={back_style}>
							<Icon type="left" />
						</Link> :
						<div className={css.back} style={back_style} onClick={this.handleBack.bind(this)}>
							<Icon type="left" />
						</div>
				}
				<div className={css.title}>
					<span>{ title }</span>
				</div>

				<div className={css.menu}>{children}</div>
			</div>
		)
	}
}

Toolbar.defaultProps = {
	title: " ",
	url: null,
	style: {
		color: '#FFFFFF',
		background: '#F2C27F'
	},
	back_style: {
		color: '#FFFFFF'
	}
}

Toolbar.propTypes = {
	title: PropTypes.string,
	url: PropTypes.string,
	style: PropTypes.object,
	back_style: PropTypes.object
}

export default withRouter(Toolbar);
