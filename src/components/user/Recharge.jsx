/**
 * 个人中心 - 充值
 */
import SuperAgent from 'superagent'
import React, { Component, PropTypes } from 'react'
import WechatKit from '../WechatConect/WechatKit'
import css from './recharge.less'
import { Link } from 'react-router'
import { Form, Input, Row, Col, Button, message } from 'antd';
import pingpp from 'pingpp-js';

const FormItem = Form.Item

export class Recharge extends Component {
	state = {
		money: null
	}	

  getChargeObject(){
    SuperAgent
      .get("http://closet-api.tallty.com/test_pingpp")
      .set('Accept', 'application/json')
      .end( (err, res) => {
        if (!err || err === null) {
        	console.log(res.body);
        	let charge = res.body;
        	// 创建付款
        	pingpp.createPayment(charge, (result, err) => {
						console.log("付款结果："+result);
				    console.log("错误信息："+err.msg);
				    console.log("额外信息："+err.extra);
				    if (result == "success") {
				        // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
				    } else if (result == "fail") {
				        // charge 不正确或者微信公众账号支付失败时会在此处返回
				    } else if (result == "cancel") {
				        // 微信公众账号支付取消支付
				    }
					});
        }
      })  
  }

	/**
	 * 充值面额
	 */
	getMoneyCard() {
		let cards = [500, 1000, 2000, 3000, 5000, 10000]
		let list = []
		cards.forEach((item, i, obj) => {
			list.push(
				<Col span={8} className={css.col} key={item}>
					<Button className={css.card} 
									onClick={this.handleChooseMoney.bind(this, item)}>{item}元</Button>
				</Col>
			)
		})
		return list
	}

	/**
	 * [handleInputChange 表单输入事件]
	 * @param  {[type]} e [表单]
	 */
	handleInputChange(e) {
		this.setState({ money: e.target.value })
	}

	/**
	 * 选择充值面额点击事件
	 */
	handleChooseMoney(item) {
		console.log("你选择了"+item+"元");
		this.setState({ money: item });
	}

	/**
	 * [handlePayment 开始微信支付]
	 */
	handlePayment() {
		if (this.state.money > 0) {
			console.log("=======开始支付=======")
			this.getChargeObject();
		} else {
			alert("请填写充值金额");
		}
	}

	render() {
		const { getFieldDecorator } = this.props.form
		const { money } = this.state

		return (
			<div className={css.container}>

				<Form inline onSubmit={this.handleSubmit}>
					<FormItem>
						<Input placeholder="充值金额" {...getFieldDecorator('money')} 
									 className={css.input} 
									 onChange={this.handleInputChange.bind(this)}
									 type="number"
									 value={money} />
					</FormItem>
				</Form>

				{/* 充值面额 */}
				<div className={css.kinds}>
					<Row className={css.row}>
						{ this.getMoneyCard() }
					</Row>
				</div>

				{/* 操作 */}
				<div className={css.actions}>
					<Button className={css.pay_btn} onClick={this.handlePayment.bind(this)}>
						<img src="src/images/wechat_pay.svg" alt=""/>微信支付
					</Button>
					<Button className={css.other_pay_btn}>找人代付（POS机刷卡）</Button>
					<p className={css.search}>
						<Link to="/user">查余额</Link>
						<span>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</span>
						<Link to="/user">我的充值记录</Link>
					</p>
				</div>
			</div>
		)
	}
}

Recharge = Form.create()(Recharge)

Recharge.defaultProps = {

}

Recharge.propTypes = {

}