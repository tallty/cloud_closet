/**
 * 个人中心 - 发票 - 填写开票信息
 */
import React, { Component } from 'react';
import css from './ReceiptInfo.less';
import { Form, Button, Checkbox, Row, Col, Input, InputNumber, Icon, Menu, Dropdown, Select } from 'antd';
import { Link, withRouter } from 'react-router';
import SuperAgent from 'superagent';
import Toolbar from '../../common/ToolBar';

const InputGroup = Input.Group;
const Option = Select.Option;

class ReceiptInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      title: '',
      invoice_type: '普通发票',
      cel_name: '',
      cel_phone: '',
      postcode: '',
      address: '',
      agree: true,
      errMsg: ''
    }
  }

  // 发票金额
  handleAmount(e) {
    const num1 = sessionStorage.getItem('amount');
    const num2 = e.target.value;
    let num = '';
    if (num2 > 1000) {
      num = num2 > num1 ? num1 : num2;
    } else {
      num = 1000;
    }
    this.setState({
      amount: num
    });
  }
  // 发票抬头
  handleTitle(e) {
    this.setState({
      title: e.target.value
    });
  }
  // 发票类型
  handleInvoiceType(value) {
    this.setState({
      invoice_type: value
    });
  }
  // 联系人
  handleCelName(e) {
    this.setState({
      cel_name: e.target.value
    });
  }
  // 联系电话
  handleCelPhone(e) {
    this.setState({
      cel_phone: e.target.value
    });
  }
  // 邮政编码
  handlePostCode(e) {
    this.setState({
      postcode: e.target.value
    });
  }
  // 详细地址
  handleAddress(e) {
    this.setState({
      address: e.target.value
    });
  }
  // 单选框
  handleCheck(e) {
    this.setState({ agree: !e.target.value });
  }
  // 提交
  submit(e) {
    e.preventDefault();
    const { amount, title, invoice_type, cel_name, cel_phone, postcode, address } = this.state;
    if (amount && title && invoice_type && cel_name && cel_phone && postcode && address) {
      SuperAgent
        .post('http://closet-api.tallty.com/invoices')
        .set('Accept', 'application/json')
        .set('X-User-Token', localStorage.authentication_token)
        .set('X-User-Phone', localStorage.phone)
        .send({
          invoice: {
            amount: amount,
            title: title,
            invoice_type: invoice_type,
            cel_name: cel_name,
            cel_phone: cel_phone,
            postcode: postcode,
            address: address
          }
        })
        .end((err, res) => {
          if (!err || err === null) {
            const receiptStr = JSON.stringify(res.body);
            sessionStorage.setItem('receipt', receiptStr);
            this.props.router.replace('/receipt_success');
          }
        })
    } else {
      this.setState({
        errMsg: '发票信息的填写不能有空...'
      })
    }
  }
  render() {
    const DefaultAmount = localStorage.getItem('amount')
    return (
      <div className={css.container}>
        <Toolbar url="/user" title="信息填写" theme="dark" />

        <div className={css.content}>
          <div className={css.content_top}>
            <Row>
              <Col span={12} className={css.lf}>新添预设信息</Col>
              <Col span={12} className={css.rt}>
                <Link to="/receipt_info" className={css.icon_col}>
                  <Icon type="right" />
                </Link>
              </Col>
            </Row>
          </div>

          <p className={css.hint}>发票信息</p>

          <div className={css.content_body_top}>
            <InputGroup>
              <Row className={css.cell}>
                <Col span={16} className={css.lf}>发票金额</Col>
                <Col span={5} className={css.rt}>
                  <Input type="number" name="amount" id="amount" value={this.state.amount} onChange={this.handleAmount.bind(this)} />
                </Col>
                <Col span={3} className={css.lf}>元</Col>
              </Row>
            </InputGroup>
            <InputGroup>
              <Row className={css.cell}>
                <Col span={6} className={css.lf}>发票抬头</Col>
                <Col span={18} className={css.rt}>
                  <Input type="text" name="title" id="title" value={this.state.title} onChange={this.handleTitle.bind(this)} />
                </Col>
              </Row>
            </InputGroup>
            <InputGroup>
              <Row className={css.cell}>
                <Col span={12} className={css.lf}>发票类型 </Col>
                <Col span={12} className={css.rt}>
                  <Select defaultValue="普通发票" onChange={this.handleInvoiceType.bind(this)}>
                    <Option value="普通发票">普通发票</Option>
                    <Option value="增值税专用发票">增值税专用发票</Option>
                  </Select>
                  {/*<Link to="/receipt_info" className={css.icon_col}>
                  <Icon type="right" />
                </Link>*/}
                </Col>
              </Row>
            </InputGroup>
          </div>

          <p className={css.hint}>邮寄信息</p>

          <div className={css.content_body_bottom}>
            <InputGroup>
              <Row className={css.cell}>
                <Col span={6} className={css.lf}>联系人</Col>
                <Col span={18} className={css.rt}>
                  <Input type="text" name="cel_name" id="cel_name" value={this.state.cel_name} onChange={this.handleCelName.bind(this)} />
                  {/*<Link to="/receipt_info" className={css.icon_col}>
                  <Icon type="right" />
                </Link>*/}
                </Col>
              </Row>
            </InputGroup>
            <InputGroup>
              <Row className={css.cell}>
                <Col span={6} className={css.lf}>联系电话</Col>
                <Col span={18} className={css.rt}>
                  <Input type="text" name="cel_phone" id="cel_phone" value={this.state.cel_phone} onChange={this.handleCelPhone.bind(this)} />
                </Col>
              </Row>
            </InputGroup>
            <InputGroup>
              <Row className={css.cell}>
                <Col span={6} className={css.lf}>邮政编码</Col>
                <Col span={18} className={css.rt}>
                  <Input type="text" name="postcode" id="postcode" value={this.state.postcode} onChange={this.handlePostCode.bind(this)} />
                </Col>
              </Row>
            </InputGroup>
            <InputGroup>
              <Row className={css.cell}>
                <Col span={6} className={css.lf}>详细地址</Col>
                <Col span={18} className={css.rt}>
                  <Input type="text" name="address" id="address" value={this.state.address} onChange={this.handleAddress.bind(this)} />
                </Col>
              </Row>
            </InputGroup>
          </div>

          <div className={css.content_bottom}>
            <div className={css.box_position}>
              <Checkbox onChange={this.handleCheck.bind(this)}><span>保存为预设发票</span></Checkbox>
              <h4>发票信息提交后不可更改，请仔细填写 ！</h4>
              <h3>{this.state.errMsg}</h3>
            </div>
            <div className={css.btn_position}>
              <Button type="primary" onClick={this.submit.bind(this)}>提交</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ReceiptInfo);
