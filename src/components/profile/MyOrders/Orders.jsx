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
		let headerColor = cx({
      'going': true,
      'complete': false
    })
    let list = []

	}

	render() {
		let headerColor = cx({
      'going': true,
      'complete': false
    })

		return (
			<div>
				<div className={css.orders}>
					<div className={css.header}>
						<span className={headerColor}>交易进行中</span>
						<span className={css.time}>2016-5-28</span>
					</div>
					<div className={css.content}>
						<Goods />
					</div>
					<div className={css.footer}>
						<Row>
							<Col span={24}>
								<div className={css.info}>
									<span>配送时间：2016-5-28 12:00～13:00</span>
									<p>使用时间：3天</p>
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
			</div>
		)
	}
}

Orders.defaultProps = {
	type: "all"
}

Orders.propTypes = {
	all: PropTypes.string
}
