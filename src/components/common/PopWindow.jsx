/**
 * 弹出框通用组件
 * 使用：
 * <PopWindow show={true|false} direction='bottom|top|left|right' onCancel={this.popCancelEvent}>
 * 	你的任意弹出框内容
 * </PopWindow>
 * 注意：外部 Dom 的 z-index < 900,
 * 因为：弹框蒙层 z-index: 900
 * 			弹框 z-index: 1000
 */
import React, { Component, PropTypes } from 'react'
import css from './pop_window.less'
import classNames from 'classnames/bind'
import QueueAnim from 'rc-queue-anim'

let cx = classNames.bind(css)

export default class PopWindow extends Component {

	popStyle() {
		let className = null
		switch(this.props.direction) {
			case 'top':
				className = cx({
					top_window: true,
					toogleTop: this.props.show
				})
				break;
			case 'left':
				className = cx({
					left_window: true,
					toogleLeft: this.props.show
				})
				break;
			case 'right':
				className = cx({
					right_window: true,
					toogleRight: this.props.show
				})
				break;
			case 'bottom':
				className = cx({
					bottom_window: true,
					toogleBottom: this.props.show
				})
				break;
			default:
				className = cx({
					bottom_window: true,
					toogleBottom: this.props.show
				})
		}
		return className
	}

	render() {
		const { show, onCancel } = this.props

		return (
			<div>
				{/* 透明蒙层 */}
				<div className={css.pop_bg} 
						 style={{display: show ? 'block' : 'none'}}
						 onClick={onCancel}>
				</div>
				{/* 弹出框 */}
				<div className={this.popStyle()}>
					{this.props.children}
				</div>
			</div>
		)
	}
}

PopWindow.defaultProps = {
	show: false,
	direction: 'bottom',
	onCancel: () => { console.log("默认的取消事件") }
}

PopWindow.PropTypes = {
	show: PropTypes.bool,
	direction: PropTypes.string,
	onCancel: PropTypes.func
}