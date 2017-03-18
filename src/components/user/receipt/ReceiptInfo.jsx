/**
 * 个人中心 - 发票 - 填写开票信息
 */
import React, { Component, propTypes } from 'react';
import SuperAgent from 'superagent'
// import locationPromise from '../Common/locationPromise';
// import { Spiner } from '../common/Spiner';
import { Form, Radio, Button, Checkbox, DatePicker, Row, Col, Input, Icon, Menu, Dropdown, Select } from 'antd';
import { Link, withRouter } from 'react-router';
import classnames from 'classnames';
import css from './ReceiptInfo.less';
// import Carousel from './Carousel.jsx';

const FormItem = Form.Item;
// const RadioButton = Radio.Button;a
// const RadioGroup = Radio.Group;
// const height = window.innerHeight * 0.305;
// const Option = Select.Option;

export default class ReceiptInfo extends Component {
	state = {
		money: null,
		nickname: null,
		types: null,
		cel_name: null,
		cel_phone: null,
		address: null
	}

	componentWillMount() {
		
	}

	componentDidMount() {
		this.getUserInfo();
	}

	componentWillUnmount() {
		 
	}

	getUserInfo() {
		SuperAgent
	        .get("http://closet-api.tallty.com/user_info")
	        .set('Accept', 'application/json')
	        .set('X-User-Token', localStorage.authentication_token)
	        .set('X-User-Phone', localStorage.phone)
	        .end((err, res) => {
		        if (!err || err === null) {
		          // 缓存
		          let user = res.body;
		          let str = JSON.stringify(user);
		          localStorage.setItem('user', str);
		          // // 如果没有手动选择地址，显示默认地址
		          // if (!sessionStorage.selected_address) {
		          //   this.getDefaultAddress(user.default_address_id);
		          // }
		        } else {
		          // alert("获取用户信息失败");
		          console.log("获取用户信息失败");
		        }
	      })
	}

	handleSubmit(e) {

	}	

	render() {
		return (
			<div>
				<Toolbar url="/user" title="发票" theme="dark">
	          		<Link to="/receipt">信息填写</Link>
	        	</Toolbar>
	        	<div>
	        		<p>新添预设信息</p>
	        		<Link></Link>	
	        	</div>
				<Form onSubmit={this.handleSubmit}>
					<p>发票信息</p>
					<FormItem></FormItem>
					<FormItem></FormItem>
					<FormItem></FormItem>
					<p>邮寄信息</p>
					<FormItem></FormItem>
					<FormItem></FormItem>
					<FormItem></FormItem>
					<FormItem></FormItem>
					<FormItem></FormItem>
				</Form>	
			</div>
		);
	}
}

ReceiptInfo = Form.create({})(ReceiptInfo);