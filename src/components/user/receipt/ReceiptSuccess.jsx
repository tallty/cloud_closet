/**
 * 个人中心 - 发票 - 开票成功
 */
import React, { Component } from 'react'
import css from './ReceiptSuccess.less'
import Toolbar from '../../common/Toolbar';
import { Link } from 'react-router'
import { Row, Col } from 'antd';

export class ReceiptSuccess extends Component {
	state = {

	}

	render() {
		return (
			<div className={css.container}>
				<div className={css.content_top}>
					<img src="src/images/receipt_success_log.png" alt="" className={css.img_style}/>
					<p>开票成功</p>
				</div>
				<div className={css.content_body_top}>
					<Row>
						<Col span={12} className={css.lf}>发票抬头</Col>
						<Col span={12} className={css.rt}>
							<span>XXX</span>
						</Col>
					</Row>	
					<Row>
						<Col span={12} className={css.lf}>发票金额</Col>
						<Col span={12} className={css.rt}>￥XXX</Col>
					</Row>	
					<Row>
						<Col span={24} className={css.rt}>XXX</Col>
					</Row>	
				</div>	
				<div className={css.content_body_bottom}>
					<Row>
						<Col span={12} className={css.lf}>联系人</Col>
						<Col span={12} className={css.rt}>XXX</Col>
					</Row>	

					<Row>
						<Col span={12} className={css.lf}>联系电话</Col>
						<Col span={12} className={css.rt}>XXX</Col>
					</Row>	

					<Row>
						<Col span={12} className={css.lf}>地址</Col>
						<Col span={12} className={css.rt}>XXX</Col>
					</Row>	

					<Row>
						<Col span={24} className={css.rt}>邮编 XXX</Col>
					</Row>	
				</div>	
				<div className={css.content_bottom}>
					<Link to="/receipt"><button>完成</button></Link>
				</div>		
			</div>
		)
	}
}
