/**
 * 单个订单（入库） - 衣服列表
 * 问题：1、price 为总价。2、无衣服种类。3、无季别。4、无服务费和运费
 */
import React, { Component, PropTypes } from 'react'
import css from './layouts.less'
import { Row, Col } from 'antd'

const { string, number, arrayOf, shape } = PropTypes;
// 解析衣类图片
const imageMap = new Map([
  ['叠放柜', '/src/images/icon_stack_sm.svg'],
  ['挂柜', '/src/images/icon_hang_sm.svg'],
  ['组合柜', '/src/images/icon_hang_sm.svg'],
  ['单件礼服', '/src/images/icon_full_dress_sm.svg'],
  ['礼服柜', '/src/images/icon_full_dress_sm.svg'],
  ['真空袋-中', '/src/images/icon_bag_sm.svg'],
  ['真空袋-大', '/src/images/icon_bag_sm.svg']
]);

// 解析仓储时长
const parseStoreMonth = new Map([
  [3, '三个月'], [6, '六个月'], [9, '九个月'],
  [12, '一年'], [24, '两年']
]);

export class InClothes extends Component {

  // 获取订单的合计
  getTotalPrice() {
    const { order } = this.props
    let total = 0
    for (const item of order.appointment_price_groups) {
      total += item.price
    }
    return total
  }

  // 设置入库衣服列表
  getClotheList() {
    const { order } = this.props
    const list = [];

    order.appointment_price_groups.forEach((item, index, obj) => {
      list.push(
        <Row key={index} className={css.order_item} onClick={this.handleClick.bind(this, index, item)}>
          <Col span={7} style={{ textAlign: 'left' }}>
            <div className={css.img_div}>
              <img src={imageMap.get(item.title)} alt="icon" />
            </div>
            <div className={css.kind}>{item.title}</div>
          </Col>
          <Col span={5}>{item.is_chest ? parseStoreMonth.get(item.store_month) : '-'}</Col>
          <Col span={4}>{item.count}</Col>
          <Col span={4}>{item.unit_price}</Col>
          <Col span={4}>{item.price}</Col>
        </Row>
      )
    })
    return list;
  }

  // 条目的点击事件
  handleClick(index, item) {
    this.props.itemClickEvent(index, item)
  }

  render() {
    const { order } = this.props;
    const garmentCount = order.garment_count_info || { full_dress: 0, hanging: 0, stacking: 0 };
    return (
      <div>
        {/* 表格header */}
        <Row className={css.order_table_header}>
          <Col span={7} style={{ textAlign: 'left', paddingLeft: 15 }}>种类</Col>
          <Col span={5}>仓储时长</Col>
          <Col span={4}>数量</Col>
          <Col span={4}>单价</Col>
          <Col span={4}>总价</Col>
        </Row>

        {/* 所有入库的衣服 */}
        {
          order.appointment_price_groups.length > 0 ?
            this.getClotheList() :
            <Row>
              <Col span={24} className={css.empty_table}>未添加任何衣柜</Col>
            </Row>
        }
        <div className={css.clothes_numebr}>
          <p className={css.title}>种类件数</p>
          <Row>
            <Col span={8}>
              <img src="/src/images/icon_fold.svg" alt="icon" /> 叠放 <span>{garmentCount.stacking}</span> 件
            </Col>
            <Col span={8}>
              <img src="/src/images/icon_hang.svg" alt="icon" /> 挂放 <span>{garmentCount.hanging}</span> 件
            </Col>
            <Col span={8}>
              <img src="/src/images/icon_dress.svg" alt="icon" /> 礼服 <span>{garmentCount.full_dress}</span> 件
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

InClothes.defaultProps = {
  order: {},
  itemClickEvent: () => { }
}

InClothes.PropTypes = {
  order: PropTypes.shape({
    id: number,
    name: string,
    phone: string,
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
  }),
  itemClickEvent: PropTypes.func
}
