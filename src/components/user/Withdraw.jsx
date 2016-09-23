/**
 * 个人中心 - 提现
 */
import React, { Component, PropTypes } from 'react'
import css from './withdraw.less'
import { Form, Input } from 'antd'
import { Link } from 'react-router'

const FormItem = Form.Item

export class Withdraw extends Component {

	handleSubmit(e) {
		e.preventDefault();
    console.log('收到表单值：', this.props.form.getFieldsValue());
	}

	render() {
		const { getFieldProps } = this.props.form

		return (
			<div className={css.container}>
				<div className={css.card}>
					到账银行卡<span className={css.card_info}>交通银行（1011）</span>
				</div>
				<div className={css.content}>
					<p>提现金额(元)</p>
					<div className={css.input_container}>
						<Form inline onSubmit={this.handleSubmit}>
							<div className={css.label}>￥&nbsp;&nbsp;</div>
							<FormItem>
								<Input placeholder="请输入金额" {...getFieldProps('money')} className={css.input} type="number" />
							</FormItem>
						</Form>
					</div>
					<p className={css.account}>
						账户余额 ￥6，430.08&nbsp;&nbsp;&nbsp;<span>全部提现</span>
					</p>
				</div>
				<Link to="/user" className={css.withdraw}>提现</Link>
			</div>
		)
	}
}

Withdraw = Form.create()(Withdraw)

Withdraw.defaultProps = {

}

Withdraw.propTypes = {

}