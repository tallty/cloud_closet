/**
 * 个人中心 - 充值
 */
import SuperAgent from 'superagent'
import React, { Component, PropTypes } from 'react'
import WechatKit from '../WechatConect/WechatKit'
import css from './recharge.less'
import { Link } from 'react-router'
import { Form, Input, Row, Col, Button, message } from 'antd'

const FormItem = Form.Item

export class Recharge extends Component {
	state = {
		money: null
	}	

	// 微信支付
  chooseWXPay(){
    SuperAgent
      .post("http://wechat-api.tallty.com/cloud_closet_wechat/wx_pay")
      .set('Accept', 'application/json')
      .send( {'openid': localStorage.openid, 'total_fee': 10 } )
      .end( (err, res) => {
        if (res.ok) {
        	console.log(res.body)
          wx.chooseWXPay({
            appId: 'wx47b02e6b45bf1dad',
            timestamp: res.body.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: res.body.nonceStr.xml.nonce_str, // 支付签名随机串，不长于 32 位
            package: 'prepay_id='+res.body.nonceStr.xml.prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: res.body.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: res.body.paySign, // 支付签名
            success: function (res) {
              // 支付成功后的回调函数
              alert(res);
              if(res.errMsg == "chooseWXPay:ok" ) {
                console.log('success');
              }else{
                alert(res.errMsg);
              }
            },
            cancel:function(res){
              //支付取消
              console.log('cancel');
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
		this.setState({ money: item })
	}

	/**
	 * [handlePay 开始微信支付]
	 */
	handlePay() {
		if (this.state.money > 0) {
			console.log("=======开始支付=======")
			this.chooseWXPay();
		} else {
			message.error("请选择充值金额", 2)
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
					<Button className={css.pay_btn} onClick={this.handlePay.bind(this)}>
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