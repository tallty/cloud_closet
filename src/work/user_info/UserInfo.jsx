import React, { Component, PropTypes } from 'react'
import css from './user_info.less'

export class UserInfo extends Component {
	
	getPhoto() {
		if (this.props.photo.length > 0) {
			return this.props.photo
		} else {
			return 'src/images/default_photo.png'
		}
	}

	render() {
		return (
			<div className={css.item_content}>
				<div className={css.content_left}>
					<p>用户：&nbsp;&nbsp;<span>{this.props.name}</span></p>
					<p>电话：&nbsp;&nbsp;<span>{this.props.phone}</span></p>
				</div>
				<div className={css.content_right}>
					<img src={this.getPhoto()} alt="头像"/>
				</div>
			</div>
		)
	}
}

UserInfo.defaultProps = {
	name: '',
	phone: '',
	photo: ''
}

UserInfo.PropTypes = {
	name: PropTypes.string,
	phone: PropTypes.string,
	photo: PropTypes.string
}