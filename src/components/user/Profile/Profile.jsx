import React, { Component, PropTypes } from 'react'
import css from './profile.less'
import { Celler } from '../../common/Celler'
import PopWindow from '../../common/PopWindow'
import WechatKit from '../../WechatConect/WechatKit'

export class Profile extends Component {
	state = {
    pop: false
  }
	
	/**
	 * [handlePhoto 处理头像]
	 */
	handlePhoto() {
		console.log("=====开始处理头像=====")
		this.setState({ pop: true })
	}
	
	/**
	 * [hidePopWindow 隐藏弹出框]
	 */
	hidePopWindow() {
		console.log("=====弹出框关闭=====")
		this.setState({ pop: false })
	}

	render() {
		let { pop } = this.state
		return (
			<div className={css.container}>
				<Celler name="我的头像" value="/src/images/photo.png" type="image" 
															event={this.handlePhoto.bind(this)}/>
				<Celler name="昵称" value="John Snow" url="/profile"/>
				<Celler name="邮箱" value="JS615@aa.com" url="/profile"/>
				<Celler name="职业" value="XXXX" bottom={14} url="/profile"/>
				<Celler name="账号安全" value="18516512221" type="phone" url="/profile"/>
				<Celler name="密码" type="password" bottom={14}/>
				<Celler name="收货地址" url="/profile" bottom={14}/>
				<Celler name="退出登录" url="/profile" type="logout" color="#FF9241"/>

				{/* 弹出框：修改资料 */}
				<PopWindow show={pop} onCancel={this.hidePopWindow.bind(this)}>
					<div className={css.popContainer}>

					</div>
				</PopWindow>
			</div>
		)
	}
}

Profile.defaultProps = {

}

Profile.propTypes = {

}