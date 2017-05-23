import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'antd';
import css from './layouts.less';

const { string, number, arrayOf, shape } = PropTypes;

export class AppointClothes extends Component {

  // 数量范围描述数据存到数据库时，可删除此方法
  showAppointmentNumber(num) {
    switch (num) {
      case 10:
        return '5-20';
      case 30:
        return '20-50';
      case 50:
        return '大于50';
      default:
        return num;
    }
  }

  render() {
    const { order } = this.props;
    return (
      <div className={css.appoint_clothes}>
        <div className={css.left}>
          <div className={css.left_text}>预约</div>
        </div>
        <div className={css.right}>
          <div className={css.content}>
            <p>衣橱预约：{this.showAppointmentNumber(order.number)}件</p>
          </div>
        </div>
      </div>
    );
  }
}

AppointClothes.defaultProps = {
  order: {}
}

AppointClothes.propTypes = {
  order: PropTypes.shape({
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
}
