import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'antd';
import css from './layouts.less';

const { string, number, arrayOf, shape } = PropTypes;

export class AppointClothes extends Component {

  render() {
    const { order } = this.props;
    return (
      <div className={css.appoint_clothes}>
        <div className={css.left}>
          <div className={css.left_text}>预约</div>
        </div>
        <div className={css.right}>
          <div className={css.content}>
            <p>衣橱预约：{order.number}件</p>
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
}
