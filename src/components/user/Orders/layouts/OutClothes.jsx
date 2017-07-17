/**
 * 单个订单（出库）- 衣服列表
 * 问题：1、加个计算。2、衣服图片。3、衣服名称
 */
import React, { Component, PropTypes } from 'react'
import css from './layouts.less'
import { Row, Col, Table } from 'antd'

const { string, number, arrayOf, shape } = PropTypes;

export class OutClothes extends Component {

  render() {
    const { order } = this.props;
    console.log(order)
    const columns = [{
      title: '照片',
      dataIndex: 'cover_image',
      render: (text, record) => (
        <img src={text} alt="" className={css.table_image} />
      ),
    }, {
      title: '名称',
      dataIndex: 'title',
      key: 'title',
    }];
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
            <Table
              columns={columns}
              rowKey="id"
              dataSource={order.garments}
              pagination={false}
              scroll={{ y: 200 }}
            />
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
