import React, { Component, PropTypes } from 'react'
import css from './profile.less'
import { Celler } from '../common/Celler'
import WeUI from 'react-weui'
import 'weui'

const { ActionSheet } = WeUI

export class Profile extends Component {
	state = {
    show_photo_handler: false
  }

  // 头像选择
  menus = [{
      label: '拍照',
      className: 'customClassName',
      onClick: ()=>{
				
      }
  }, {
      label: '从手机相册中选择',
      className: 'customClassName',
      onClick: ()=>{

      }
  }]
	// 头像选择操作
  actions = [{
      label: '取消',
      className: 'customClassName',
      onClick: this.endHandlePhoto
  }]
	
	// 处理头像
	beginHandlePhoto() {
		console.log("处理头像")
		this.setState({show_photo_handler: true})
	}

	endHandlePhoto() {
		this.setState({show_photo_handler: false})
	}

	render() {
		return (
			<div className={css.container}>
				<Celler name="我的头像" value="/src/images/photo.png" type="image" event={this.beginHandlePhoto.bind(this)}/>
				<Celler name="昵称"   value="John Snow" url="/profile"/>
				<Celler name="邮箱" value="JS615@aa.com" url="/profile"/>
				<Celler name="职业" value="XXXX" bottom={14} url="/profile"/>
				<Celler name="账号安全" value="18516512221" type="phone" url="/profile"/>
				<Celler name="密码" type="password" bottom={14}/>
				<Celler name="收货地址" url="/profile" bottom={14}/>
				<Celler name="退出登录" url="/profile" type="logout" color="#FF9241"/>
				{/*处理头像*/}
				<ActionSheet show={this.state.show_photo_handler} 
										 menus={this.menus} 
										 actions={this.actions} 
										 onRequestClose={this.endHandlePhoto.bind(this)} />
			</div>
		)
	}
}

Profile.defaultProps = {

}

Profile.propTypes = {

}