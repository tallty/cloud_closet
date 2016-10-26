import React, { Component, PropTypes } from 'react'
import css from './profile.less'
import { Celler } from '../../common/Celler'
import PopWindow from '../../common/PopWindow'
import SuperAgent from 'superagent'
import { Input, Button } from 'antd'

export class Profile extends Component {
	state = {
    pop: false,
    user_info: {},
    popTitle: "",
    update_key: "",
    update_value: ""
  }

	componentDidMount() {
		SuperAgent
			.get("http://closet-api.tallty.com/user_info")
			.set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
      	if (res.ok) {
      		// 缓存
      		localStorage.setItem('user_name', res.body.nickname)
          localStorage.setItem('phone', res.body.phone)

					this.setState({ user_info: res.body })
      	} else {
      		alert("获取用户信息失败")
      	}
      })
	}

	/**
	 * 获取数据
	 */
	updateUserInfo() {
		let { update_key, update_value } = this.state
		console.log(update_key +"/"+update_value)
		SuperAgent
			.put("http://closet-api.tallty.com/user_info")
			.set('Accept', 'application/json')
	    .set('X-User-Token', localStorage.authentication_token)
	    .set('X-User-Phone', localStorage.phone)
	    .send(`${update_key}=${update_value}`)
	    .end((err, res) => {
	    	if (res.ok) {
	    		// 缓存
	    		localStorage.setItem('user_name', res.body.nickname)
	        localStorage.setItem('phone', res.body.phone)
	    		console.log(res.body)
					this.setState({ 
						user_info: res.body,
						pop: false
					})
	    	} else {
	    		console.dir(err)
	    		alert("更新用户信息失败")
	    	}
	    })
	}

	/**
	 * [chooseImage 调用微信jdk选择图片]
	 */
  chooseImage() {
    console.log("=========调用微信jdk选择图片=========")
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        let user = this.state.user_info
        user.avatar = localIds[0]
        this.setState({ user_info: user })
      }
    });
  }
	
	/**
	 * [hidePopWindow 隐藏弹出框]
	 */
	hidePopWindow() {
		console.log("=====弹出框关闭=====")
		this.setState({ pop: false })
	}

	handlePopInputChange(e) {
		this.setState({ update_value: e.target.value })
	}

	/**
	 * [handlePhoto 处理头像]
	 */
	handlePhoto() {
		console.log("=====开始处理头像=====")
		this.chooseImage();
	}

	handleNickname() {
		console.log("点击了celler")
		this.setState({ 
			pop: true,
			popTitle: "修改昵称",
			update_key: "user_info[nickname]",
			update_value: this.state.user_info.nickname
		})
	}

	handleMail() {
		console.log("点击了celler")
		this.setState({ 
			pop: true,
			popTitle: "修改邮箱",
			update_key: "user_info[mail]",
			update_value: this.state.user_info.mail
		})
	}

	handleWork() {
		console.log("点击了celler")
	}

	handleSafe() {
		console.log("点击了celler")
	}

	handlePassword() {
		console.log("点击了celler")
	}


	render() {
		let { pop, user_info, popTitle, update_key, update_value } = this.state
		let { phone, nickname, avatar, mail } = user_info
		let _phone = phone ? phone.substring(0,3)+"****"+phone.substring(7,11) : phone

		return (
			<div className={css.container}>
				<Celler name="我的头像" type="image" value={user_info.avatar} 
								defaultValue="src/images/default_photo.png" 
								event={this.handlePhoto.bind(this)}/>
				<Celler name="昵称" value={nickname} event={this.handleNickname.bind(this)}/>
				<Celler name="邮箱" value={mail} event={this.handleMail.bind(this)}/>
				<Celler name="职业" value="XXXX" bottom={14} event={this.handleWork.bind(this)}/>
				<Celler name="账号安全" value={_phone} type="phone" event={this.handleSafe.bind(this)}/>
				<Celler name="密码" value="●●●●●●●●●" bottom={14} event={this.handlePassword.bind(this)}/>
				<Celler name="收货地址" url="/address" bottom={14} />
				<Celler name="退出登录" type="simple" color="#FF9241" />

				{/* 弹出框：修改资料 */}
				<PopWindow show={pop} onCancel={this.hidePopWindow.bind(this)}>
					<div className={css.popContainer}>
						<p className={css.title}>{popTitle}</p>
						<Input size="large" value={update_value} onChange={this.handlePopInputChange.bind(this)}/>
						<Button onClick={this.updateUserInfo.bind(this)} className={css.update}>更新</Button>
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