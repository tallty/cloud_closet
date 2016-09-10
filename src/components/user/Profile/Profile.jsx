import React, { Component, PropTypes } from 'react'
import css from './profile.less'
import { Celler } from '../../common/Celler'
import WeUI from 'react-weui'
import 'weui'

const { ActionSheet } = WeUI

export class Profile extends Component {
	state = {
    show_photo_modal: false
  }

  // ====================头像处理====================
  menus = [{
		label: '更换头像',
		className: css.photo_modal_title
  },
  {
    label: '拍照',
    className: 'customClassName',
    onClick: this.takePhoto.bind(this)
  }, 
  {
    label: '从相册中选取',
    className: 'customClassName',
    onClick: this.choosePhoto.bind(this)
  }]
	// 头像选择操作
  actions = [{
      label: '取消',
      className: 'customClassName',
      onClick: this.hidePhotoModal.bind(this)
  }]
	
	// 处理头像
	showPhotoModal() {
		this.setState({ show_photo_modal: !this.state.show_photo_modal })
	}
	// 头像对话框关闭执行的事件，点击蒙层事件
	hidePhotoModal() {
		this.setState({ show_photo_modal: !this.state.show_photo_modal })
		console.log("头像选择器关闭了")
	}
	// 拍照
	takePhoto() {

	}
	// 相册选择
	choosePhoto() {

	}
	// ====================头像处理====================

	render() {
		return (
			<div className={css.container}>
				<Celler name="我的头像" value="/src/images/photo.png" type="image" event={this.showPhotoModal.bind(this)}/>
				<Celler name="昵称"   value="John Snow" url="/profile"/>
				<Celler name="邮箱" value="JS615@aa.com" url="/profile"/>
				<Celler name="职业" value="XXXX" bottom={14} url="/profile"/>
				<Celler name="账号安全" value="18516512221" type="phone" url="/profile"/>
				<Celler name="密码" type="password" bottom={14}/>
				<Celler name="收货地址" url="/profile" bottom={14}/>
				<Celler name="退出登录" url="/profile" type="logout" color="#FF9241"/>
				{/*处理头像*/}
				<ActionSheet show={this.state.show_photo_modal} 
										 menus={this.menus} 
										 actions={this.actions}
										 onRequestClose={this.hidePhotoModal.bind(this)} />
			</div>
		)
	}
}

Profile.defaultProps = {

}

Profile.propTypes = {

}