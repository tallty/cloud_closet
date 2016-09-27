/**
 * 个人资料 - celler
 * name: 名称
 * value: 资料值
 * type: "[text | phone | password | logout]"
 * url: 跳转链接
 * event: 点击事件
 * bottom: 下边距
 * color: 文字颜色
 */
import React, { Component, PropTypes } from 'react'
import css from './celler.less'
import { Link } from 'react-router'

export class Celler extends Component {

	valueFormat() {
		let value = this.props.value
		if (this.props.type === "password") {
			return "●●●●●●●●●"
		} else if (this.props.type === "phone") {
			return value.substring(0,3)+"****"+value.substring(7,11)
		} else {
			return value
		}
		return
	}

	render() {
		let type = this.props.type
		let cell_class = (type === "image") ? css.img_celler : css.celler

		return (
			<div>
				{
					this.props.event ? 
						<div onClick={this.props.event} className={cell_class} style={{marginBottom: this.props.bottom, color: this.props.color}}>
							<span className="pull-left">{this.props.name}</span>
							{ 
								type === "image" ? <img src={this.valueFormat()} className={css.photo} alt="头像"/> : this.valueFormat() 
							}
							{ 
								type === "logout" ? null : <img src="/src/images/right_icon.svg" className={css.icon} alt="icon"/> 
							}
						</div> :
						<Link to={this.props.url} className={cell_class} style={{marginBottom: this.props.bottom, color: this.props.color}}>
							<span className="pull-left">{this.props.name}</span>
							{ 
								type === "image" ? <img src={this.valueFormat()} className={css.photo} alt="头像"/> : this.valueFormat() 
							}
							{ 
								type === "logout" ? null : <img src="/src/images/right_icon.svg" className={css.icon} alt="icon"/> 
							}
						</Link>
				}
			</div>

		)
	}
}

Celler.defaultProps = {
	url: "/profile",
	name: "",
	value: "",
	type: "text",
	bottom: 1,
	color: "#7F7F7F"
}

Celler.propTypes = {
	url: PropTypes.string,
	event: PropTypes.func,
	name: PropTypes.string,
	value: PropTypes.string,
	type: PropTypes.string,
	color: PropTypes.string,
	bottom: PropTypes.number
}