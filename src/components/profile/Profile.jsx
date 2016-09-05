import React, { Component, PropTypes } from 'react'
import css from './profile.less'
import { Celler } from '../common/Celler'

export class Profile extends Component {
	

	render() {
		return (
			<div className={css.container}>
				<Celler name="我的头像" value="/src/images/photo.png" type="image" url="/profile"/>
				<Celler name="昵称"   value="John Snow" url="/profile"/>
				<Celler name="邮箱" value="JS615@aa.com" url="/profile"/>
				<Celler name="职业" value="XXXX" bottom={14} url="/profile"/>
				<Celler name="账号安全" value="18516512221" type="phone" url="/profile"/>
				<Celler name="密码" type="password" bottom={14}/>
				<Celler name="收货地址" url="/profile" bottom={14}/>
				<Celler name="退出登录" url="/profile" type="logout" color="#FF9241"/>
			</div>
		)
	}
}

Profile.defaultProps = {

}

Profile.propTypes = {

}