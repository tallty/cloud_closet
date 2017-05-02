// 我的订单 - 订单列表
// 问题: 1、状态的区分。2、不同状态订单的操作事件
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames/bind'
import SuperAgent from 'superagent'
import { withRouter, Link } from 'react-router'
import { Row, Col, Button, message } from 'antd'
import { OutClothes } from './layouts/OutClothes'
import { InClothes } from './layouts/InClothes'
import { AppointClothes } from './layouts/AppointClothes'
import css from './orders.less'
import StateBadge from '../../common/StateBadge';

const { string, number, arrayOf, shape } = PropTypes;
const cx = classNames.bind(css);

class OrdersList extends Component {
  state = {
    type: '',
    orders: []
  }

  componentWillMount() {
    const { type, orders } = this.props;
    this.setState({
      type: type,
      orders: orders
    });
  }

  /**
   * 获取当期订单的状态
   */
  getStates(state) {
    const nextStates = new Map([
      ['待确认', '录入'],
      ['服务中', '付款'],
      ['待付款', '入库'],
      ['已支付', '入库'],
      ['入库中', '上架'],
      ['已上架', ''],
      ['未支付', '付款'],
      ['已支付', '配送'],
      ['已发出', '收货'],
      ['已收货', '']
    ])
    return [state, nextStates.get(state)];
  }

  // 订单列表
  getActiveOrders() {
    const { type, orders } = this.state;
    const list = [];
    orders.forEach((order, index, obj) => {
      const isHistory = (order.state === '已取消' || order.state === '已上架' || order.state === '已收货');
      if (!isHistory) {
        const states = this.getStates(order.state);
        list.push(
          <div className={css.orders} key={index}>
            {/* 配送订单不显示详情 */}
            {
              order.delivery_time ?
                <div className={css.orderOther}>
                  <div className={css.header}>
                    <div className={css.state}>
                      <StateBadge now={states[0]} next={states[1]} />
                    </div>
                    <span className={css.time}>{order.date}</span>
                  </div>
                  {this.setOrdersLayout(order)}
                </div> :
                <Link to={`/order?id=${order.id}`}>
                  <div className={css.header}>
                    <div className={css.state}>
                      <StateBadge now={states[0]} next={states[1]} />
                    </div>
                    <span className={css.time}>{order.date}</span>
                  </div>
                  {this.setOrdersLayout(order)}
                </Link>
            }
            <Row className={css.footer}>
              <Col span={24}>
                <div className={css.info}>
                  {
                    order.delivery_time ?
                      <p>配送时间：{order.delivery_time}</p> :
                      <p>预约时间：{order.date}</p>
                  }
                  <p>订单编号：{order.seq}</p>
                </div>
                {/*判断是否显示*/}
                {this.setOrdersEvent(order, index)}
              </Col>
            </Row>
          </div>
        )
      }
    })
    return list;
  }

  // 获取历史订单
  getHistoryOrders() {
    const { type, orders } = this.state;
    const list = [];
    orders.forEach((order, index, obj) => {
      if (order.state === '已取消' || order.state === '已上架' || order.state === '已收货') {
        list.push(
          <div className={css.orders} key={index}>
            <Link to={`/order?id=${order.id}`}>
              <div className={css.header}>
                <div className={css.state}>
                  <StateBadge now={order.state} bg="#9B9B9B" next="" />
                </div>
                <span className={css.time}>{order.date}</span>
              </div>
              {this.setOrdersLayout(order)}
            </Link>
            <Row className={css.footer}>
              <Col span={24}>
                <div className={css.info}>
                  {
                    order.delivery_time ?
                      <p>配送时间：{order.delivery_time}</p> :
                      <p>预约时间：{order.date}</p>
                  }
                  <p>订单编号：{order.seq}</p>
                </div>
                {/*判断是否显示*/}
                {this.setOrdersEvent(order, index)}
              </Col>
            </Row>
          </div>
        )
      }
    })
    return list;
  }

  // 设置不同状态的模板
  setOrdersLayout(order) {
    const type = this.props.type;
    let layout = null;
    if (order.state === '待确认') {
      layout = (
        <div className={css.content}>
          <AppointClothes order={order} />
        </div>
      );
    } else if (order.delivery_time) {
      // 配送订单
      layout = (
        <div className={css.content}>
          <OutClothes order={order} />
        </div>
      );
    } else {
      layout = (
        <div className={css.content}>
          <InClothes order={order} />
          <p className="text-right">护理费：{order.care_cost}</p>
          <p className="text-right">服务费：{order.service_cost}</p>
          <Row>
            <Col span={12} className={css.nurse}>
              护理要求： <span>{order.care_type}</span>
            </Col>
            <Col span={12} className={css.total_price}>
              合计： <span>{order.price}</span>
            </Col>
          </Row>
        </div>
      );
    }
    return layout;
  }

  // 设置不同类型订单的处理事件
  setOrdersEvent(order, index) {
    let value = <div className={css.btns}></div>;
    if (order.state === '待确认' || order.state === '服务中') {
      value = (
        <div className={css.btns}>
          <Button
            type="ghost"
            className={css.cancel_btn}
            onClick={this.handleCancel.bind(this, order, index)}
          >取消订单</Button>
        </div>
      )
    } else if (order.state === '待付款') {
      value = (
        <div className={css.btns}>
          <Button
            type="ghost"
            className={css.cancel_btn}
            onClick={this.handleCancel.bind(this, order, index)}
          >取消订单</Button>
          <Button
            type="primary"
            className={css.sure_btn}
            onClick={this.handlePay.bind(this, order)}
          >付款</Button>
        </div>
      )
    } else if (order.state === '已支付' && !order.delivery_time) {
      value = (
        <div className={css.btns}>
          <Button type="ghost" className={css.disabled_btn} disabled>等待入库</Button>
        </div>
      )
    } else if (order.state === '已上架' || order.state === '入库中') {
      value = (
        <Link to="/MyCloset" className={css.btns}>
          <Button type="primary" className={css.sure_btn}>查看衣橱</Button>
        </Link>
      )
    } else if (order.state === '已取消') {
      value = (
        <div className={css.btns}>
          <Button type="ghost" disabled className={css.disabled_btn}>交易取消</Button>
        </div>
      )
    } else if (order.state === '已收货') {
      value = (
        <div className={css.btns}>
          <Button type="ghost" disabled className={css.disabled_btn}>交易完成</Button>
        </div>
      )
    } else if (order.state === '未支付' && order.delivery_time) {
      // 配送订单
      value = (
        <div className={css.btns}>
          <Button
            type="ghost"
            className={css.cancel_btn}
            onClick={this.handleCancelDelivery.bind(this, order, index)}
          >取消订单</Button>
          <Button
            type="primary"
            className={css.sure_btn}
            onClick={this.handlePayDelivery.bind(this, order, index)}
          >付款</Button>
        </div>
      )
    } else if (order.state === '已支付' && order.delivery_time) {
      // 配送订单
      value = (
        <div className={css.btns}>
          <Button type="ghost" className={css.disabled_btn} disabled>等待配送</Button>
        </div>
      )
    } else if (order.state === '已发出' && order.delivery_time) {
      // 配送订单
      value = (
        <div className={css.btns}>
          <Button
            type="primary"
            className={css.sure_btn}
            onClick={this.confirmReceived.bind(this, order, index)}
          >确认收货</Button>
        </div>
      )
    }
    return value;
  }

  handlePayDelivery(order, index) {
    const array = this.state.orders;
    SuperAgent
      .post(`http://closet-api.tallty.com/delivery_orders/${order.id}/pay`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (!err || err === null) {
          array.splice(index, 1, res.body);
          this.setState({ orders: array });
          message.success('配送订单支付成功');
        } else {
          message.error('配送订单支付失败');
        }
      })
  }

  confirmReceived(order, index) {
    const array = this.state.orders;
    SuperAgent
      .post(`http://closet-api.tallty.com/delivery_orders/${order.id}/get_home`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (!err || err === null) {
          array.splice(index, 1, res.body);
          this.setState({ orders: array });
          message.success('确认成功');
        } else {
          message.error('确认失败');
        }
      })
  }

  // 付款
  handlePay(order) {
    // 重定向
    this.props.router.replace(`/order?id=${order.id}`);
  }

  // 确认收货
  handleReceive(order) {
    console.log("确认收货");
  }

  // 查看物流
  showLogistics(order) {
    console.log("查看物流");
  }

  // 根据类型显示订单
  getOrdersByType() {
    let orders = null;
    if (this.props.type === 'history') {
      orders = this.getHistoryOrders();
    } else {
      orders = this.getActiveOrders();
    }
    return orders;
  }

  // 待确认 - 取消事件
  handleCancel(order, index) {
    const array = this.state.orders;
    SuperAgent
      .post(`http://closet-api.tallty.com/appointments/${order.id}/cancel`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (res.ok) {
          array.splice(index, 1, res.body);
          this.setState({ orders: array });
        } else {
          console.log('取消订单失败');
        }
      })
  }

  // 取消配送订单
  handleCancelDelivery(order, index) {
    const array = this.state.orders;
    SuperAgent
      .delete(`http://closet-api.tallty.com/delivery_orders/${order.id}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (!err || err === null) {
          array.splice(index, 1);
          this.setState({ orders: array });
          message.success('取消成功');
        } else {
          message.error('取消失败');
        }
      })
  }

  // 空列表样式
  noOrders() {
    return (
      <div className={css.orders_none}>
        <img src="/src/images/orders_none.png" alt="无订单" />
        <p>您还没有相关的订单</p>
      </div>
    )
  }

  render() {
    const tabHeight = document.body.clientHeight - 88;
    const Orders = this.getOrdersByType();

    return (
      <div style={{ height: tabHeight }} className="scrollContainer">
        {Orders.length > 0 ? Orders : this.noOrders()}
      </div>
    )
  }
}

OrdersList.defaultProps = {
  type: 'normal',
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
      appointment_price_groups: arrayOf(
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
