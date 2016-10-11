/**
 * 预约清单 - 生成订单
 */
import React, { Component } from 'react'
import { Toolbar } from '../../components/common/Toolbar'

export class AppointOrder extends Component {
	render() {
		return (
			<div>
				<Toolbar title="预约清单" 
								back="/work_warehouse"
								style={toolbar_style} 
								back_style={back_style} />
			</div>
		)
	}
}
