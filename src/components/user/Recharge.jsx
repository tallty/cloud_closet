/**
 * 个人中心 - 重值
 */
import React, { Component, PropTypes } from 'react'
import WechatPay from '../WechatConect/WechatPay'
import css from './recharge.less'
import { Link } from 'react-router'
import { Form, Input, Button } from 'antd'

const FormItem = Form.Item

export class Recharge extends Component {

	handleSubmit(e) {
		e.preventDefault();
    console.log('收到表单值：', this.props.form.getFieldsValue());
	}

	componentWillMount() {
		WechatPay.getConfig()
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
					<Button type="primary" className={css.next} onClick={WechatPay.chooseWXPay()}>确定</Button>
					*/}
					
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