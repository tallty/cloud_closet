/**
 * 个人中心 - 发票 - 开票成功
 */
import React, { Component } from 'react'
import css from './ReceiptSuccess.less'
import Toolbar from '../../common/Toolbar';
import { Link } from 'react-router'
import { Row, Col } from 'antd';

export class ReceiptSuccess extends Component {
  state = {
    receipt: {
      nickname: '上海拓体信息科技有限公司',
      money: '1000',
      types: '普通发票',
      cel_name: '公司总经理',
      cel_phone: '13813813811',
      post_code: '123456',
      address: '上海拓体信息科技有限公司地址'
    }
  }
  //开票详情
  getReceipts(id) {
    SuperAgent
      .get('http://closet-api.tallty.com/receipts/id')
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, resualt) => {
        if (resualt.ok) {
          const obj = resualt.body;
          // this.setState({ receipt: obj.receipts.reverse() });
        } else {

        }
      })
  }
  render() {
    const receipt = this.state.receipt
    return (
      <div className={css.container}>
        <div className={css.content_top}>
          <img src="src/images/receipt_success_log.png" alt="" className={css.img_style} />
          <p>开票成功</p>
        </div>
        <div className={css.content_body_top}>
          <Row>
            <Col span={12} className={css.lf}>发票抬头</Col>
            <Col span={12} className={css.rt}>
              <span>{receipt.nickname}</span>
            </Col>
          </Row>
          <Row>
            <Col span={12} className={css.lf}>发票金额</Col>
            <Col span={12} className={css.rt}>￥{receipt.money}</Col>
          </Row>
          <Row>
            <Col span={24} className={css.rt}>{receipt.types}</Col>
          </Row>
        </div>
        <div className={css.content_body_bottom}>
          <Row>
            <Col span={12} className={css.lf}>联系人</Col>
            <Col span={12} className={css.rt}>{receipt.cel_name}</Col>
          </Row>

          <Row>
            <Col span={12} className={css.lf}>联系电话</Col>
            <Col span={12} className={css.rt}>{receipt.cel_phone}</Col>
          </Row>

          <Row>
            <Col span={12} className={css.lf}>地址</Col>
            <Col span={12} className={css.rt}>{receipt.address}</Col>
          </Row>

          <Row>
            <Col span={24} className={css.rt}>邮编 {receipt.post_code}</Col>
          </Row>
        </div>
        <div className={css.content_bottom}>
          <Link to="/receipt_record"><button>完成</button></Link>
        </div>
      </div>
    )
  }
}
