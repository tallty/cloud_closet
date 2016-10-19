/**
 * 个人中心 - 重值
 */
import SuperAgent from 'superagent'
import React, { Component, PropTypes } from 'react'
import WechatKit from '../WechatConect/WechatKit'
import css from './recharge.less'
import { Link } from 'react-router'
import { Form, Input, Button } from 'antd'

const FormItem = Form.Item

function onBridgeReady(){
	var url = "http://wechat-api.tallty.com/cloud_closet_wechat/wx_pay"
  SuperAgent.post(url)
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

export class Recharge extends Component {

	handleSubmit(e) {
		e.preventDefault();
    console.log('收到表单值：', this.props.form.getFieldsValue());
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

	componentWillMount() {
		// WechatKit.getConfig()
	}

	componentDidMount() {
		WechatKit.getConfig()
		// this.pay_sign()
	}

	render() {
		const { getFieldProps } = this.props.form
		return (
			<div className={css.container}>
				<div className={css.item}>
					<div className={css.label}>储蓄卡</div>
					<div className={css.item_right}>
						<p className={css.card}>交通银行（1011）</p>
						<p className={css.tips}>单日交易限额 ¥ 50000.00</p>
					</div>
				</div>

				<Form inline onSubmit={this.handleSubmit}>
					<div className={css.item}>
						<div className={css.label} style={{lineHeight: '30px'}}>金额(元)</div>
						<div className={css.item_right}>
							<FormItem>
								<Input placeholder="请输入金额" {...getFieldProps('money')} className={css.input} type="number" />
							</FormItem>
						</div>
					</div>

					{/*
						<FormItem>
						<Button type="primary" htmlType="submit" className={css.next}>确定</Button>
					</FormItem>
					<Button type="primary" className={css.next} onClick={WechatKit.chooseWXPay()}>确定</Button>
					*/}
					<Button type="primary" className={css.next} onClick={this.pay_sign}>确定</Button>
					<Link to="/user" className={css.next}>下一步</Link>
				</Form>
			</div>
		)
	}
}

Recharge = Form.create()(Recharge)

Recharge.defaultProps = {

}

Recharge.propTypes = {

}