import React, { Component, PropTypes } from 'react'
import css from './profile.less'
import { Celler } from '../../common/Celler'
import { Spiner } from '../../common/Spiner'
import PopWindow from '../../common/PopWindow'
import SuperAgent from 'superagent'
import { Input, Button } from 'antd'

const PHOTO_MAX_SIZE = 1024;

export class Profile extends Component {
	state = {
    pop: false,
    user: null,
    popTitle: "",
    update_key: "",
    update_value: ""
  }

  componentDidMount() {
		this.getUserInfo();
  }

  getUserInfo() {
  	SuperAgent
			.get("http://closet-api.tallty.com/user_info")
			.set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
      	if (!err || err === null) {
      		console.dir(res.body)
      		this.setState({ user: res.body })
      		// 缓存
      		let user_str = JSON.stringify(res.body);
          localStorage.setItem('user', user_str);
      	} else {
      		// alert("获取用户信息失败")
      		console.log("获取用户信息失败");
      	}
      })
  }

	/**
	 * 全局更新函数
	 */
	updateUserInfo(formData) {
		console.dir(formData);
		SuperAgent
			.put("http://closet-api.tallty.com/user_info")
			.set('Accept', 'application/json')
	    .set('X-User-Token', localStorage.authentication_token)
	    .set('X-User-Phone', localStorage.phone)
	    .send(formData)
	    .end((err, res) => {
	    	if (!err || err === null) {
	    		// 缓存
	    		let user_str = JSON.stringify(res.body);
	    		localStorage.setItem('user', user_str);
	    		console.log(res.body);
					this.setState({ 
						user: res.body,
						pop: false
					})
	    	} else {
	    		console.dir(err)
	    		alert("更新用户信息失败")
	    	}
	    })
	}

	/**
	 * [handlePhotoChange 获取图片对象，并上传]
	 * @param  {[type]} e [文件表单对象]
	 */
	handlePhotoChange(e) {
		let formData = new FormData(this.refs.photo);
		formData.append('user_info[avatar_attributes][photo]', e.target.files[0]);
		this.updateUserInfo(formData);
	}

	/**
	 * [hidePopWindow 隐藏弹出框]
	 */
	hidePopWindow() {
		console.log("=====弹出框关闭=====")
		this.setState({ pop: false })
	}

	/**
	 * [handlePopInputChange 弹出框表单监听]
	 */
	handlePopInputChange(e) {
		this.setState({ update_value: e.target.value })
	}

	handleNickname() {
		console.log("点击了celler")
		this.setState({ 
			pop: true,
			popTitle: "修改昵称",
			update_key: "user_info[nickname]",
			update_value: this.state.user.nickname
		})
	}

	handleMail() {
		console.log("点击了celler")
		this.setState({ 
			pop: true,
			popTitle: "修改邮箱",
			update_key: "user_info[mail]",
			update_value: this.state.user.mail
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

	formatPhoto() {
		let phone = this.state.phone;
		return phone.substring(0,3) + "****" + phone.substring(7,11);
	}

	handleSignout() {
		localStorage.clear();
		sessionStorage.clear();
		window.location.href = "/";
	}


	render() {
		let { pop, user, popTitle, update_key, update_value } = this.state;
		let formData = new FormData();
		formData.append(update_key, update_value);

		return (
			<div>
				{
					user ?
						<div className={css.container}>
							<span className={css.photoInput}>
								<input type="file" multiple={false} accept='image/*' capture="camera" ref="photo"
										   onChange={this.handlePhotoChange.bind(this)}/>

								<Celler name="我的头像" type="image" value={user.avatar} 
												defaultValue="src/images/default_photo.png" 
												event={() => {}}/>
							</span>
							<Celler name="昵称" value={user.nickname} event={this.handleNickname.bind(this)}/>
							<Celler name="邮箱" value={user.mail} event={this.handleMail.bind(this)}/>
							<Celler name="职业" value="XXXX" bottom={14} event={this.handleWork.bind(this)}/>
							<Celler name="账号安全" value={this.formatPhone} type="phone" event={this.handleSafe.bind(this)}/>
							<Celler name="密码" value="●●●●●●●●●" bottom={14} event={this.handlePassword.bind(this)}/>
							<Celler name="收货地址" url="/address" bottom={14} />
							<Celler name="退出登录" type="simple" color="#F2C27F" event={this.handleSignout} />
							{/* 弹出框：修改资料 */}
							<PopWindow show={pop} onCancel={this.hidePopWindow.bind(this)}>
								<div className={css.popContainer}>
									<p className={css.title}>{popTitle}</p>
									<Input size="large" value={update_value} onChange={this.handlePopInputChange.bind(this)}/>
									<Button onClick={this.updateUserInfo.bind(this, formData)} className={css.update}>更新</Button>
								</div>
							</PopWindow>
						</div> : <Spiner/>
				}
			</div>
		)
	}
}

Profile.defaultProps = {

}

Profile.propTypes = {

}