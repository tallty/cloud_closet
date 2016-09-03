// 我的订单 - 订单列表
import React, { Component, PropTypes } from 'react' 
import { Goods } from './Goods'
import { Row, Col, Button } from 'antd'
import css from './my_orders.less'
import classNames from 'classnames/bind'

const cx = classNames.bind(css)

export class Orders extends Component {
	constructor(props) {
		super(props)
	}

	orderList() {
    let list = []

		this.props.orders.forEach((order, index, orders) => {
			if (this.props.type == "all" || order.type === this.props.type) {
				let headerColor = cx({
		      'going': order.type != "complete",
		      'complete': order.type === "complete"
		    })
				list.push(
					<div className={css.orders} key={index}>
						<div className={css.header}>
							<span className={headerColor}>{ order.type === "complete" ? "交易成功" : "交易进行中" }</span>
							<span className={css.time}>{ order.time }</span>
						</div>
						<div className={css.content}>
							<Goods goods={ order.goods } />
						</div>
						<div className={css.footer}>
							<Row>
								<Col span={24}>
									<div className={css.info}>
										<span>配送时间：{ order.transmit_time }</span>
										<p>使用时间：{ order.spent_time }</p>
									</div>
									{/*判断是否显示*/}
									<div className={css.btns}>
										<Button type="ghost" className={css.show_btn}>查看物流</Button>
										<Button type="primary" className={css.sure_btn}>确认收货</Button>
									</div>
								</Col>
							</Row>
						</div>
					</div>
				)
			}
		})
		return list
	}

	render() {
		let tab_height = document.body.clientHeight - 94
		return (
			<div style={{height: tab_height, overflow: "auto"}}>{ this.orderList() }</div>
		)
	}
}

Orders.defaultProps = {
	type: "all",
	orders: []
}

Orders.propTypes = {
	all: PropTypes.string,
	orders: PropTypes.arrayOf(
		PropTypes.shape({
			type: PropTypes.string,
			time: PropTypes.string,
			transmit_time: PropTypes.string,
			spent_time: PropTypes.string,
			goods: PropTypes.arrayOf(
				PropTypes.shape({
					image: PropTypes.string,
					name: PropTypes.string,
					link: PropTypes.string
				})
			)
		})
	)
}
