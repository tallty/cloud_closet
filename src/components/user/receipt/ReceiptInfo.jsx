/**
 * 个人中心 - 发票 - 填写开票信息
 */
import React, { Component } from 'react';
import css from './ReceiptInfo.less';
import { Form, Button, Checkbox, Row, Col, Input, Icon, Menu, Dropdown, Select } from 'antd';
import Toolbar from '../../common/Toolbar';
import { Link } from 'react-router';
import SuperAgent from 'superagent';

const InputGroup = Input.Group;
const Option = Select.Option;

export class ReceiptInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '100',
      title: '',
      invoice_type: '',
      cel_name: '',
      cel_phone: '',
      postcode: '',
      address: '',
      agree: true
    }
  }
  // 发票金额
  componentWillMount() {
    this.setState({
      amount: localStorage.amount
    });
  }
  // 发票抬头
  handleTitle(e) {
    this.setState({
      title: e.target.value
    });
  }
  // 发票类型
  handleInvoiceType(e) {
    this.setState({
      invoice_type: e.target.value
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
    SuperAgent
      .post('http://closet-api.tallty.com/invoices')
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .send({
        invoices: {
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
          const receiptStr = JSON.textify(res.body);
          sessionStorage.setItem('receipt', receiptStr);
          this.props.router.replace('/receipt_success');
          console.log("ReceiptInfo.jsx 填写的发票信息 => ")
          console.log(res.body);
        } else {
          console.log("发票创建失败")
        }
      })
  }
  render() {
    return (
      <div className={css.container}>
        <Toolbar url="/user" title="信息填写" theme="dark" />

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

        <p>发票信息</p>

        <div className={css.content_body_top}>
          <InputGroup>
            <Row className={css.cell}>
              <Col span={12} className={css.lf}>发票金额</Col>
              <Col span={12} className={css.rt}>{this.state.amount}元
                <Input placeholder="请输入开票金额" type="number" name="amount" id="amount" defaultValue={this.state.amount} min={1000} max={this.state.amount} />
              </Col>
            </Row>
          </InputGroup>
          <InputGroup>
            <Row className={css.cell}>
              <Col span={6} className={css.lf}>发票抬头</Col>
              <Col span={18} className={css.rt}>
                <Input placeholder="请输入发票抬头" type="text" name="title" id="title" value={this.state.title} onChange={this.handleTitle.bind(this)} />
              </Col>
            </Row>
          </InputGroup>
          <InputGroup>
            <Row className={css.cell}>
              <Col span={12} className={css.lf}>发票类型 </Col>
              <Col span={12} className={css.rt}>
                <Select defaultValue="1" onChange={this.handleInvoiceType.bind(this)}>
                  <Option value="1">普通发票</Option>
                  <Option value="2">增值税专用发票</Option>
                </Select>
                {/*<Link to="/receipt_info" className={css.icon_col}>
                  <Icon type="right" />
                </Link>*/}
              </Col>
            </Row>
          </InputGroup>
        </div

        <p>邮寄信息</p>

      <div className={css.content_body_bottom}>
        <InputGroup>
          <Row className={css.cell}>
            <Col span={6} className={css.lf}>联系人</Col>
            <Col span={18} className={css.rt}>
              <Input placeholder="请输入联系人姓名" type="text" name="cel_name" id="cel_name" value={this.state.cel_name} onChange={this.handleCelName.bind(this)} />
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
              <Input placeholder="请输入联系电话" type="text" name="cel_phone" id="cel_phone" value={this.state.cel_phone} onChange={this.handleCelPhone.bind(this)} />
            </Col>
          </Row>
        </InputGroup>
        <InputGroup>
          <Row className={css.cell}>
            <Col span={6} className={css.lf}>邮政编码</Col>
            <Col span={18} className={css.rt}>
              <Input placeholder="请输入邮政编码" type="text" name="postcode" id="postcode" value={this.state.postcode} onChange={this.handlePostCode.bind(this)} />
            </Col>
          </Row>
        </InputGroup>
        <InputGroup>
          <Row className={css.cell}>
            <Col span={6} className={css.lf}>详细地址</Col>
            <Col span={18} className={css.rt}>
              <Input placeholder="请输入详细地址" type='text' name='address' id='address' value={this.state.address} onChange={this.handleAddress.bind(this)} />
            </Col>
          </Row>
        </InputGroup>
      </div>

      <div className={css.content_bottom}>
        <div className={css.box_position}>
          <Checkbox onChange={this.handleCheck.bind(this)}><span>保存为预设发票</span></Checkbox>
          <h4>发票信息提交后不可更改，请仔细填写 ！</h4>
        </div>
        <div className={css.btn_position}>
          <Link to="/receipt_success">
            <Button type="primary" htmlType="submit" onClick={this.submit.bind(this)}>提交</Button>
          </Link>
        </div>
      </div>
      </div >
    )
  }
}
