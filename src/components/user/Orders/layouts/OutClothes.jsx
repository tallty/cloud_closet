/**
 * 单个订单（出库）- 衣服列表
 * 问题：1、加个计算。2、衣服图片。3、衣服名称
 */
import React, { Component, PropTypes } from 'react'
import css from './layouts.less'
import { Row, Col } from 'antd'

const { string, number, arrayOf, shape } = PropTypes;

export class OutClothes extends Component {

  goodsList() {
    let { order } = this.props
    let list = []

    console.log("OutClothes.jsx 出库衣服列表：")
    console.log(order)

    order.appointment_item_groups.forEach((item, i, array) => {
      let price = (i === array.length - 1) ? 
                  <div className={css.price}>
                    合计：<span>888</span>
                  </div> : null
      list.push(
        <Row key={i}>
          <Col span={6} className={css.goods_left}>
            <img src={`src/images/recommend_three.png`} alt="商品图片"/>
          </Col>
          <Col span={18}>
            <div className={css.goods_name}>{`DOLCE&GABBANA  白色连衣裙`}</div>
            { price }
          </Col>
        </Row>
      )
    })
    return list
  }

  render() {
    return (
      <div className={css.goods}>
        { this.goodsList() }
      </div>
    )
  }
}

OutClothes.defaultProps = {
  order: {}
}

OutClothes.propTypes = {
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
         total_price: number,
         kind: string,
         season: string
      })
    )
  })
}
