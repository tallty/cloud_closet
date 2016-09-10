// 我的订单 - 订单列表
import React, { Component, PropTypes } from 'react' 
import { Goods } from './Goods'
import { Row, Col, Button } from 'antd'
import css from './orders.less'
import classNames from 'classnames/bind'

const cx = classNames.bind(css)

export class OrderItems extends Component {

	// 订单列表
	getItems() {
    let list = []
		this.props.items.forEach((item, index, items) => {
			if (this.props.type == "all" || item.type === this.props.type) {
				let headerColor = cx({
		      'going': item.type != "complete",
		      'complete': item.type === "complete"
		    })
				list.push(
					<div className={css.orders} key={index}>
						<div className={css.header}>
							<span className={headerColor}>{ item.type === "complete" ? "交易成功" : "交易进行中" }</span>
							<span className={css.time}>{ item.time }</span>
						</div>
						<div className={css.content}>
							<Goods goods={ item.goods } />
						</div>
						<div className={css.footer}>
							<Row>
								<Col span={24}>
									<div className={css.info}>
										<span>配送时间：{ item.transmit_time }</span>
										<p>使用时间：{ item.spent_time }</p>
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

	// 空列表样式
	getItemsNone() {
		return (
			<div className={css.orders_none}>
				<img src="/src/images/orders_none.png" alt="无订单"/>
				<p>您还没有相关的订单</p>
			</div>
		)
	}
	
	render() {
		let tab_height = document.body.clientHeight - 94
		let items = this.getItems()

		return (
			<div style={{height: tab_height, overflow: "auto"}}>
				{ items.length > 0 ? items : this.getItemsNone() }
			</div>
		)
	}
}

OrderItems.defaultProps = {
	type: "all",
	items: []
}

OrderItems.propTypes = {
	all: PropTypes.string,
	items: PropTypes.arrayOf(
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
