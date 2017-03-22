import React, { Component } from 'react';
import { Link } from 'react-router';
import css from './pay_success.less';
import { InClothes } from './layouts/InClothes';

class PaySuccess extends Component {
  state = {
    order: {}
  }

  componentWillMount() {
    const obj = JSON.parse(sessionStorage.getItem('pay_order'));
    if (obj === null) {
      location.href = '/user';
      return;
    }
    this.setState({ order: obj });
  }

  render() {
    const { order } = this.state;
    if (!order.appointment_price_groups) return <div></div>;
    return (
      <div className={css.container}>
        <div className={css.state}>支付成功</div>
        <div className={css.content}>
          <div className={css.table}>
            <InClothes order={order} />
          </div>

          <p className={css.cost}>护理要求：{order.care_type} <span>护理费用：{order.care_cost}</span></p>
          <p className={css.cost}><span>服务费用：{order.service_cost}</span></p>

          <div className={css.orderInfo}>
            <span>￥{order.price}</span>
            <div className={css.orderTips}>
              <p>支付方式：账户余额</p>
              <p>订单号：{order.seq}</p>
            </div>
          </div>

          <div className={css.btns}>
            <div className={css.halfCircle}></div>
            <div className={css.leftTriangle}></div>
            <div className={css.rightTriangle}></div>
            <Link to={`/order?id=${order.id}`}>查看订单</Link>
            <Link to="/MyCloset">返回衣橱</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default PaySuccess;
