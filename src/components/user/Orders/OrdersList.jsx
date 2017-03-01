// 我的订单 - 订单列表
// 问题: 1、状态的区分。2、不同状态订单的操作事件
import React, { Component, PropTypes } from 'react' 
import { OutClothes } from './layouts/OutClothes'
import { Row, Col, Button } from 'antd'
import { InClothes } from './layouts/InClothes'
import { AppointClothes } from './layouts/AppointClothes'
import css from './orders.less'
import classNames from 'classnames/bind'
import SuperAgent from 'superagent'
import { withRouter, Link } from 'react-router'
import StateBadge from '../../common/StateBadge';

const { string, number, arrayOf, shape } = PropTypes;
const cx = classNames.bind(css);

class OrdersList extends Component {
  state = {
    type: '',
    orders: []
  }

  componentWillMount() {
    let { type, orders } = this.props;
    this.setState({
      type: type,
      orders: orders
    });
  }

  // 设置不同状态的模板
  setOrdersLayout(order) {
    switch(order.state) {
      case "待确认":
        return (
          <div className={css.content}>
            <AppointClothes order={order}/>
          </div>
        );
      case "待收货":
        return (
          <div className={css.content}>
            <OutClothes order={order} />
          </div>
        );
      default:
        return (
          <div className={css.content}>
            <InClothes order={order} />
            <p className="text-right">运费：10</p>
            <p className="text-right">服务费：50</p>
            <Row>
              <Col span={12} className={css.nurse}>
                护理要求： <span>每次护理</span>
              </Col>
              <Col span={12} className={css.total_price}>
                合计： <span>{order.price + 60}</span>
              </Col>
            </Row>
          </div>
        );
    }
  }

  // 设置不同类型订单的处理事件
  setOrdersEvent(order, index) {
    if (order.state === "待确认") {
      return (
        <div className={css.btns}>
          <Button type="ghost" className={css.cancel_btn} onClick={this.handleCancel.bind(this, order, index)}>取消订单</Button>
        </div>
      )
    } else if (order.state === "待付款") {
      return (
        <div className={css.btns}>
          <Button type="ghost" className={css.cancel_btn} onClick={this.handleCancel.bind(this, order, index)}>取消订单</Button>
          <Button type="primary" className={css.sure_btn} onClick={this.handlePay.bind(this, order)}>付款</Button>  
        </div>
      )
    } else if (order.state === "已支付") {
      return (
        <div className={css.btns}>
          <Button type="ghost" className={css.disabled_btn} disabled>等待入库</Button>
        </div>
      )
    } else if (order.state === "已上架") {
        return (
          <Link to="/MyCloset" className={css.btns}>
            <Button type="primary" className={css.sure_btn}>查看衣橱</Button>
          </Link>
        )
    } else if (order.state === "已取消") {
      return (
        <div className={css.btns}>
          <Button type="ghost" disabled className={css.disabled_btn}>交易取消</Button>
        </div>
      )
    } else {
      return (
        <div className={css.btns}></div>
      )
    }
  }

  // 待确认 - 取消事件
  handleCancel(order, index) {
    console.log("取消订单====>" + order.id);
    let _orders = this.state.orders;

    SuperAgent
      .post(`http://closet-api.tallty.com/appointments/${order.id}/cancel`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (res.ok) {
          _orders.splice(index, 1, res.body);
          console.dir(_orders);
          this.setState({ orders: _orders });
        } else {
          console.log("取消订单失败");
        }
      })
  }

  // 付款
  handlePay(order) {
    console.log("付款订单")
    console.log(order)
    // 重定向
    this.props.router.replace(`/order?id=${order.id}`);
  }

  // 查看物流
  showLogistics(order) {
    console.log("查看物流");
  }

  // 确认收货
  handleReceive(order) {
    console.log("确认收货");
  }

  // 订单列表
  getOrders() {
    const { type, orders } = this.state;
    const list = [];

    orders.forEach((order, index, obj) => {
      if (order.state != "已取消"&&order.state !== "已上架") {
        list.push(
          <div className={css.orders} key={index}>
            <div className={css.header}>
            	<div className={css.state}>
								<StateBadge now={order.state} next="支付" />
            	</div>
              <span className={css.time}>{ order.date }</span>
            </div>
            {this.setOrdersLayout(order)}
            <Row className={css.footer}>
              <Col span={24}>
                <div className={css.info}>
                  <p>预约时间：{ order.date }</p>
                  <p>订单编号：{ order.seq }</p>
                </div>
                {/*判断是否显示*/}
                {this.setOrdersEvent(order, index)}
              </Col>
            </Row>
          </div>
        )
      }
    })
    return list
  }

  // 获取历史订单
  getHistoryOrders() {
    const { type, orders } = this.state;
    const list = [];

    orders.forEach((order, index, obj) => {
      if (order.state === "已取消" || order.state === "已上架" ) {
        list.push(
          <div className={css.orders} key={index}>
            <div className={css.header}>
	            <div className={css.state}>
								<StateBadge now={order.state} next="" />
            	</div>
              <span className={css.time}>{ order.date }</span>
            </div>
            {this.setOrdersLayout(order)}
            <Row className={css.footer}>
              <Col span={24}>
                <div className={css.info}>
                  <span>预存时间：{ order.date }</span>
                  <p>订单编号：{ order.seq }</p>
                </div>
                {/*判断是否显示*/}
                {this.setOrdersEvent(order, index)}
              </Col>
            </Row>
          </div>
        )
      }
    })
    return list
  }

  // 空列表样式
  getOrdersNone() {
    return (
      <div className={css.orders_none}>
        <img src="/src/images/orders_none.png" alt="无订单" />
        <p>您还没有相关的订单</p>
      </div>
    )
  }
 
  render() {
    const tabHeight = document.body.clientHeight - 88;
    const Orders = this.props.type === 'history' ? this.getHistoryOrders() : this.getOrders();

    return (
      <div style={{ height: tabHeight }} className="scrollContainer">
        {Orders.length > 0 ? Orders : this.getOrdersNone()}
      </div>
    )
  }
}

OrdersList.defaultProps = {
  type: "normal",
  Orders: []
}

OrdersList.propTypes = {
  type: string,
  Orders: arrayOf(
    shape({
      id: number,
      name: string,
      phone: string,
      number: number,
      address: string,
      state: string,
      price: number,
      seq: string,
      date: string,
      created_at: string,
      appointment_item_groups: arrayOf(
        shape({
          id: number,
           count: number,
           store_month: number,
           price: number,
           type_name: string,
           season: string
        })
      )
    })
  )
}

export default withRouter(OrdersList);