/**
 * 预约清单 - 生成订单
 */
import React, { Component } from 'react'
import css from './order.less'
import Toolbar from '../../common/Toolbar'
import { Spiner } from '../../common/Spiner'
import { Link } from 'react-router'
import { InClothes } from './layouts/InClothes'
import { Row, Col, Timeline, Icon } from 'antd'
import SuperAgent from 'superagent'

const nurseWay = new Map([
  ['every', '每次护理'], ['one', '一次护理'], ['no', '不护理']
]);

export class Order extends Component {
  state = {
    order: null,
    user: null
  }

  componentDidMount() {
    this.getAppointment();
    this.getUserInfo();
  }

  getUserInfo() {
    SuperAgent
      .get(`http://closet-api.tallty.com/user_info`)
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
    let id = this.props.location.query.id;
    SuperAgent
      .get(`http://closet-api.tallty.com/appointments/${id}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (res.ok) {
          let obj = res.body;
          console.log("Order.jsx 获取的订单详情 => ")
          console.log(obj);
          this.setState({ order: obj });
        } else {
          console.log("获取预约订单详情失败")
        }
      })
  }

  // 获取订单的合计
  getTotalPrice() {
    let total = 0
    for(let item of this.state.order.appointment_item_groups) {
      total += item.price
    }
    return total
  }

  /**
   * 获取物流信息
   */
  getLogistics() {
    let logistics = []
    logistics.push(
      <Timeline.Item
        key={0} 
        dot={<Icon type="clock-circle-o" style={{ fontSize: '20px' }} />} 
        color="red">
          当前物流状态信息
          <p>2015-09-01</p>
      </Timeline.Item>
    )
    for (let i=1; i<10; i++) {
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
   * 获取余额
   */
  getBalance() {
    let user = this.state.user;
    return user ? user.balance : '';
  }

  /**
   * 使用余额支付
   */
  handlePay() {
    let id = this.props.location.query.id;
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
            window.location.replace('/success?action=pay');  
          }
        } else {
          alert("付款失败，请稍后重试");
        }
      })
  }

  render() {
    const { order } = this.state

    return (
      <div className={css.appoint_order}>
        <Toolbar title="选择支付方式" url="/orders" />
        <div className={css.content}>
          {
            this.state.order ?
              <div className={css.order}>
                {/* 订单 */}
                <InClothes order={order} />
                {/* 费用 */}
                <p className="text-right">运费：XXX</p>
                <p className="text-right">服务费：XXX</p>
                <p className={css.tips}>护理要求：&nbsp;&nbsp;<span>每次护理</span></p>
                <p className={css.total_price}>合计：<span>{this.getTotalPrice()}</span></p>
              </div> : <Spiner />
          }
          {/* 物流 */}
          <div className={css.logistics}>
            <Timeline>{this.getLogistics()}</Timeline>
          </div>
        </div>
        {/* 支付方式 */}
        <div className={css.pay_actions}>
          <button className={css.pay_btn} onClick={this.handlePay.bind(this)}>
            账户余额（￥{this.getBalance()}
          </button>
          <Link
            to={`/recharge?redirect_url=/order?id=${this.props.location.query.id}`} 
            className={css.recharge_btn}>
            充值
          </Link>
        </div>
      </div>
    )
  }
}
