/**
 * 个人中心 - 发票 - 开票成功
 */
import React, { Component } from 'react'
import css from './ReceiptSuccess.less'
import Toolbar from '../../common/Toolbar';
import { Link } from 'react-router'
import { Row, Col } from 'antd';
import SuperAgent from 'superagent';

export class ReceiptSuccess extends Component {
  state = {
    receipt: {
      // title: '上海拓体信息科技有限公司',
      // amount: '1000',
      // invoice_type: '普通发票',
      // cel_name: '公司总经理',
      // cel_phone: '13813813811',
      // postcode: '123456',
      // address: '上海拓体信息科技有限公司地址',
      title: '',
      amount: '',
      invoice_type: '',
      cel_name: '',
      cel_phone: '',
      postcode: '',
      address: ''
    }
  }

  componentWillMount() {
    let receipt = JSON.parse(sessionStorage.receipt);
    this.setState({
      receipt: receipt
    )}
}

// //加载数据
// componentDidMount() {
//   this.getReceipt();
// }
// //开票详情
// getReceipt() {
//   let id = this.props.location.query.id;
//   SuperAgent
//     .get(`http://closet-api.tallty.com/invoices/${id}`)
//     .set('Accept', 'application/json')
//     .set('X-User-Token', localStorage.authentication_token)
//     .set('X-User-Phone', localStorage.phone)
//     .end((err, resualt) => {
//       if (resualt.ok) {
//         let obj = resualt.body;
//         console.log("ReceiptSuccess.jsx 获取的发票详情 => ")
//         console.log(obj);
//         this.setState({ receipt: obj });
//       } else {
//         console.log("获取发票详情失败")
//       }
//     })
// }
render() {
  const receipt = this.state.receipt;
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
            <span>{receipt.title}</span>
          </Col>
        </Row>
        <Row>
          <Col span={12} className={css.lf}>发票金额</Col>
          <Col span={12} className={css.rt}>￥{receipt.amount}</Col>
        </Row>
        <Row>
          <Col span={24} className={css.rt}>{receipt.invoice_type}</Col>
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
          <Col span={6} className={css.lf}>地址</Col>
          <Col span={18} className={css.rt}>{receipt.address}</Col>
        </Row>

        <Row>
          <Col span={24} className={css.rt}>邮编 {receipt.postcode}</Col>
        </Row>
      </div>
      <div className={css.content_bottom}>
        <Link to="/receipt_record"><button>完成</button></Link>
      </div>
    </div>
  )
}
}
