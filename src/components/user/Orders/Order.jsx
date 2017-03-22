/**
 * 预约清单 - 生成订单
 */
import React, { Component } from 'react'
import css from './order.less'
import Toolbar from '../../common/Toolbar'
import { Spiner } from '../../common/Spiner'
import { Link, withRouter } from 'react-router'
import { InClothes } from './layouts/InClothes'
import { Row, Col, Timeline, Icon, Modal, Button } from 'antd'
import SuperAgent from 'superagent'

const confirm = Modal.confirm;
const nurseWay = new Map([
  ['every', '每次护理'], ['one', '一次护理'], ['no', '不护理']
]);

class Order extends Component {
  state = {
    order: null,
    user: null,
    cancelLoading: false
  }

  componentDidMount() {
    this.getAppointment();
    this.getUserInfo();
  }

  getUserInfo() {
    SuperAgent
      .get('http://closet-api.tallty.com/user_info')
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (res.ok) {
          let obj = res.body;
          console.log("Order.jsx 获取用户详情 => ")
          console.log(obj);
          this.setState({ user: obj });
        } else {
          console.log("获取用户详情失败")
        }
      })
  }

  // 获取预约订单信息
  getAppointment() {
    const id = this.props.location.query.id;

    SuperAgent
      .get(`http://closet-api.tallty.com/appointments/${id}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (res.ok) {
          const obj = res.body;
          console.log(obj);
          this.setState({ order: obj });
        } else {
          alert("获取订单详情失败")
        }
      })
  }

  /**
   * 获取物流信息
   */
  getLogistics() {
    const logistics = []
    logistics.push(
      <Timeline.Item
        key={0}
        dot={<Icon type="clock-circle-o" style={{ fontSize: '20px' }} />}
        color="red">
        当前物流状态信息
        <p>2015-09-01</p>
      </Timeline.Item>
    )
    for (let i = 1; i < 6; i++) {
      logistics.push(
        <Timeline.Item key={i}>
          物流状态信息{i}
          <p>2015-09-01</p>
        </Timeline.Item>
      )
    }
    return logistics
  }

  /**
   * 使用余额支付
   */
  handlePay() {
    const { user, order } = this.state;
    const id = this.props.location.query.id;
    if (user.balance < order.price) {
      confirm({
        title: '支付提示',
        content: '余额不足，是否立即进行充值？',
        onOk() {
          location.replace(`/recharge?redirect_url=/order?id=${id}`);
        },
        onCancel() { }
      });
      return;
    }
    SuperAgent
      .post(`http://closet-api.tallty.com/appointments/${id}/pay_by_balance`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (res.ok) {
          if (res.body.error) {
            alert(res.body.error);
          } else {
            sessionStorage.setItem('pay_order', JSON.stringify(this.state.order));
            this.props.router.replace('/pay_success');
          }
        } else {
          alert('付款失败，请稍后重试');
        }
      })
  }

  // 待确认 - 取消事件
  handleCancel() {
    const id = this.props.location.query.id;
    confirm({
      title: '提醒',
      content: '您确定要取消本次订单吗？',
      onOk() {
        SuperAgent
          .post(`http://closet-api.tallty.com/appointments/${id}/cancel`)
          .set('Accept', 'application/json')
          .set('X-User-Token', localStorage.authentication_token)
          .set('X-User-Phone', localStorage.phone)
          .end((err, res) => {
            if (res.ok) {
              window.location.replace('/orders');
            } else {
              alert('取消失败，请稍后重试');
            }
          })
      },
      onCancel() { }
    });
  }

  // 设置不同类型订单的处理事件
  getOrdersEvent(order) {
    let value = <div className={css.btns}></div>;
    if (!order) return;
    if (order.state === '待确认' || order.state === '服务中') {
      value = (
        <div className={css.btns}>
          <Button
            type="ghost"
            className={css.gray_btn}
            onClick={this.handleCancel.bind(this, order)}
          >取消订单</Button>
        </div>
      )
    } else if (order.state === '待付款') {
      value = (
        <div className={css.btns}>
          <Button
            type="ghost"
            className={css.gray_btn}
            onClick={this.handleCancel.bind(this, order)}
          >取消订单</Button>
          <Button
            type="primary"
            className={css.orange_btn}
            onClick={this.handlePay.bind(this, order)}
          >确认付款</Button>
        </div>
      )
    } else if (order.state === '已支付') {
      value = (
        <div className={css.btns}>
          <Button type="ghost" className={css.disabled_btn} disabled>等待入库</Button>
        </div>
      )
    } else if (order.state === '已上架' || order.state === '入库中') {
      value = (
        <Link to="/MyCloset" className={css.btns}>
          <Button type="primary" className={css.orange_btn}>查看衣橱</Button>
        </Link>
      )
    } else if (order.state === '已取消') {
      value = (
        <Link to="/orders" className={css.btns}>
          <Button type="ghost" className={css.gray_btn}>返回列表</Button>
        </Link>
      )
    }
    return value;
  }

  render() {
    const { order } = this.state
    return (
      <div className={css.appoint_order}>
        <Toolbar title="订单详情" url="/orders" />
        <div className={css.content}>
          {
            this.state.order ?
              <div className={css.order}>
                {/* 订单 */}
                <InClothes order={order} />
                {/* 费用 */}
                <p className={css.tips}>
                  护理要求：&nbsp;&nbsp;<span>{order.care_type}</span>
                  <span style={{ float: 'right' }}>护理费：{order.care_cost}</span>
                </p>
                <p className="text-right">服务费：{order.service_cost}</p>
                <p className={css.total_price}>合计：<span>{order.price}</span></p>
              </div> : <Spiner />
          }
          {/* 物流 */}
          <div className={css.logistics}>
            {/*<Timeline>{this.getLogistics()}</Timeline>*/}
          </div>
        </div>

        {/* 支付方式 */}
        <div className={css.pay_actions}>
          {this.getOrdersEvent(order)}
        </div>
      </div>
    )
  }
}

export default withRouter(Order);

