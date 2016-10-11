/**
 * 预约清单 - 成功申请
 */
import React, { Component } from 'react'
import css from './appoint.less'
import { Link } from 'react-router'

export class AppointSuccess extends Component {
	render() {
		return (
			<div className={css.appoint_success}>
				<p className={css.title}>成功申请</p>
				<p className={css.tips}>工作人员将在规定时间处理货物。</p>
				<Link to="/work_appoint_list" className={css.submit_order_btn}>返回预约清单</Link>

			  <div className={css.help}>
			  	<div className={css.border_div} style={{paddingTop: 7, marginRight: 7}}>
						<Link to="/work_appoint_success">平台在线客服</Link>
				  </div>
				  <div className={css.border_div}>
						<a href="tel:400-123-2345">
							<div>平台客服热线</div>
							<div>400-123-2345</div>
						</a>
				  </div>
			  </div>
			</div>
		)
	}
}
