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

	componentWillMount() {
		// WechatKit.getConfig()
	}

	componentDidMount() {
		WechatKit.getConfig()
		// this.pay_sign()
	}	

	onBridgeReady(){
	  SuperAgent
	  	.post("http://wechat-api.tallty.com/cloud_closet_wechat/wx_pay")
	    .set('Accept', 'application/json')
	    .send( {'openid': 'olclvwCOMobnRYQRtXLAdhujZbtM', 'total_fee': 1 } )
	    .end( (err, res) => {
	      if (res.ok) {
	      console.log(WeixinJSBridge);
			   	WeixinJSBridge.invoke(
		       	'getBrandWCPayRequest', {
		          "appId": 'wx47b02e6b45bf1dad',     //公众号名称，由商户传入     
		          "timestamp": res.body.timeStamp,         //时间戳，自1970年以来的秒数     
		          "noncestr": res.body.nonceStr.xml.nonce_str, //随机串     
		          "package": 'prepay_id='+res.body.nonceStr.xml.prepay_id,     
		          "signType": res.body.signType,         //微信签名方式：     
		          "paySign": res.body.paySign //微信签名
		       	},
		       	function(res){
		       		console.log(res); 
		          if(res.err_msg == "get_brand_wcpay_request：ok" ) {

		          }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
		       	}
			   	);
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

		} else {
			message.error("请选择充值金额", 2)
		}
	}

	pay_sign(){
		if (typeof WeixinJSBridge == "undefined"){
		   if( document.addEventListener ){
		       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
		   }else if (document.attachEvent){
		       document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
		       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
		   }
		}else{
		   onBridgeReady();
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