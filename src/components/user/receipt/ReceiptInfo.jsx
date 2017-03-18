/**
 * 个人中心 - 发票 - 填写开票信息
 */
import React, { Component } from 'react';
import css from './ReceiptInfo.less';
import { Form, Button, Checkbox, Row, Col, Input, Icon, Menu, Dropdown, Select } from 'antd';
import Toolbar from '../../common/Toolbar';
import { Link } from 'react-router'

export class ReceiptInfo extends Component {


	render() {
		return (
			<div className={css.container}>
				<Toolbar url="/user" title="信息填写" theme="dark" />

				<div className={css.content_top}>
					<Row>
						<Col span={12} className={css.lf}>新添预设信息</Col>
						<Col span={12} className={css.rt}>
							<Link to="/receipt_info" className={css.icon_col}>
								<Icon type="right" />
							</Link>
						</Col>
					</Row>	
				</div>
					
				<p>发票信息</p>

				<div className={css.content_body_top}>
					<Row className={css.cell}>
						<Col span={12} className={css.lf}>发票金额</Col>
						<Col span={12} className={css.rt}>{}元</Col>
					</Row>	
					<Row className={css.cell}>
						<Col span={12} className={css.lf}>发票抬头</Col>
						<Col span={12} className={css.rt}>{}</Col>
					</Row>	
					<Row className={css.cell}>
						<Col span={12} className={css.lf}>发票类型 </Col>
						<Col span={12} className={css.rt}>{}
							<Link to="/receipt_info" className={css.icon_col}>
								<Icon type="right" />
							</Link>
						</Col>
					</Row>	
				</div>

				<p>邮寄信息</p>

				<div className={css.content_body_bottom}>
					<Row className={css.cell}>
						<Col span={12} className={css.lf}>联系人</Col>
						<Col span={12} className={css.rt}>
							<Link to="/receipt_info" className={css.icon_col}>
								<Icon type="right" />
							</Link>
						</Col>
					</Row>	
					<Row className={css.cell}>
						<Col span={12} className={css.lf}>联系电话</Col>
						<Col span={12} className={css.rt}>{}</Col>
					</Row>	
					<Row className={css.cell}>
						<Col span={12} className={css.lf}>邮政编码</Col>
						<Col span={12} className={css.rt}>{}</Col>
					</Row>	
					<Row className={css.cell}>
						<Col span={12} className={css.lf}>详细地址</Col>
						<Col span={12} className={css.rt}>{}</Col>
					</Row>	
				</div>

				<div className={css.content_bottom}>
					<div className={css.box_position}>
						<Checkbox><span>保存为预设发票</span></Checkbox>
						<h4>行程信息提交后不可更改，请仔细填写 ！</h4>
					</div>
					<div className={css.btn_position}>
						<Link to="/receipt"><button>提交</button></Link>
					</div>
				</div>
			</div>
		)
	}
}