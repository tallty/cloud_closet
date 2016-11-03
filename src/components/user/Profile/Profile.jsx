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

  componentWillMount() {
  	let user = JSON.parse(localStorage.user);
  	if (user) {
	  	this.setState({ user: user });	
  	} else {
  		this.getUserInfo();
  	}
  }

  getUserInfo() {
  	SuperAgent
			.get("http://closet-api.tallty.com/user_info")
			.set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
      	if (res.ok) {
      		// 缓存
      		let user_str = JSON.stringify(res.body);
          localStorage.setItem('user', user_str);

					this.setState({ user: res.body })
      	} else {
      		// alert("获取用户信息失败")
      		console.log("获取用户信息失败");
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


	render() {
		let { pop, user, popTitle, update_key, update_value } = this.state;
		let { phone, nickname, avatar, mail } = user;
		let _phone = phone ? phone.substring(0,3)+"****"+phone.substring(7,11) : phone;

		return (
			<div className={css.container}>
				<Celler name="我的头像" type="image" value={user.avatar} 
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