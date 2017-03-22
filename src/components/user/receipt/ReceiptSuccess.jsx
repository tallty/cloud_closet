/**
 * 个人中心 - 发票 - 开票成功
 */

import React, { Component } from 'react';
import { Link } from 'react-router';
import { Row, Col } from 'antd';
import SuperAgent from 'superagent';
import css from './ReceiptSuccess.less';
import Toolbar from '../../common/ToolBar';

export class ReceiptSuccess extends Component {
  state = {
    receipt: {}
  }

  componentWillMount() {
    const obj = JSON.parse(sessionStorage.getItem('receipt')
    );
    this.setState({
      receipt: obj || {}
    })
  }

  render() {
    const { title, amount, invoice_type, cel_name, cel_phone, address, postcode } = this.state.receipt;
    return (
      <div className={css.container}>
        <div className={css.content_top}>
          <img src="src/images/receipt_success_log.png" alt="" className={css.img_style} />
          <p>开票成功</p>
        </div>
        <div className={css.content_body_top}>
          <Row>
            <Col span={6} className={css.lf}>发票抬头</Col>
            <Col span={18} className={css.rt}>
              <span>{title}</span>
            </Col>
          </Row>
          <Row>
            <Col span={12} className={css.lf}>发票金额</Col>
            <Col span={12} className={css.rt}>￥{amount}</Col>
          </Row>
          <Row>
            <Col span={24} className={css.rt}>{invoice_type}</Col>
          </Row>
        </div>
        <div className={css.content_body_bottom}>
          <Row>
            <Col span={12} className={css.lf}>联系人</Col>
            <Col span={12} className={css.rt}><strong>{cel_name}</strong></Col>
          </Row>

          <Row>
            <Col span={12} className={css.lf}>联系电话</Col>
            <Col span={12} className={css.rt}><strong>{cel_phone}</strong></Col>
          </Row>

          <Row>
            <Col span={6} className={css.lf}>地址</Col>
            <Col span={18} className={css.rt}><strong>{address}</strong></Col>
          </Row>

          <Row>
            <Col span={24} className={css.rt}>邮编 {postcode}</Col>
          </Row>
        </div>
        <div className={css.content_bottom}>
          <Link to="/receipt_record"><button>完成</button></Link>
        </div>
      </div>
    )
  }
}
