/**
 * 单个订单（出库）- 衣服列表
 * 问题：1、加个计算。2、衣服图片。3、衣服名称
 */
import React, { Component, PropTypes } from 'react'
import css from './layouts.less'
import { Row, Col } from 'antd'

const { string, number, arrayOf, shape } = PropTypes;

export class OutClothes extends Component {

  render() {
    const { order } = this.props;
    return (
      <div className={css.goods}>
        <Row>
          <Col span={6} className={css.goods_left}>
            <img src="src/images/notification_icon0.png" alt="商品图片" />
          </Col>
          <Col span={18} className={css.goods_right}>
            <p>地址：{order.address}</p>
            <p>配送：{order.delivery_method}</p>
            <p>合计：{order.service_cost}</p>
          </Col>
        </Row>
      </div>
    )
  }
}

OutClothes.defaultProps = {

}

OutClothes.propTypes = {

}
