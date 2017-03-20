/**
 * 个人中心 - 发票 - 填写开票信息
 */
import React, { Component } from 'react';
import css from './ReceiptInfo.less';
import { Form, Button, Checkbox, Row, Col, Input, Icon, Menu, Dropdown, Select } from 'antd';
import Toolbar from '../../common/Toolbar';
import { Link } from 'react-router'

const InputGroup = Input.Group;

export class ReceiptInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      money: '',
      nickname: '',
      types: '',
      cel_name: '',
      cel_phone: '',
      post_code: '',
      address: ''
    }
  }
  // 发票金额
  handleMoney(e) {
    let value = e.target.value;
    this.setState({
      money: value,
    });
  }
  // 发票抬头
  handleNickName(e) {
    let value = e.target.value;
    this.setState({
      nickname: value,
    });
  }
  // 发票类型
  handleTypes(e) {
    let value = e.target.value;
    this.setState({
      types: value,
    });
  }
  // 联系人
  handleCelName(e) {
    let value = e.target.value;
    this.setState({
      cel_name: value,
    });
  }
  // 联系电话
  handleCelPhone(e) {
    let value = e.target.value;
    this.setState({
      cel_phone: value,
    });
  }
  // 邮政编码
  handlePostCode(e) {
    let value = e.target.value;
    this.setState({
      post_code: value,
    });
  }
  // 详细地址
  handleAddress(e) {
    let value = e.target.value;
    this.setState({
      address: value,
    });
  }
  // 提交
  submit() {

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
              <Col span={12} className={css.rt}>{}元</Col>
            </Row>
          </InputGroup>
          <InputGroup>
            <Row className={css.cell}>
              <Col span={6} className={css.lf}>发票抬头</Col>
              <Col span={18} className={css.rt}>
                <Input type='string' name='nickname' id='nickname' value={this.state.nickname} onChange={this.handleNickName.bind(this)} />
              </Col>
            </Row>
          </InputGroup>
          <InputGroup>
            <Row className={css.cell}>
              <Col span={12} className={css.lf}>发票类型 </Col>
              <Col span={12} className={css.rt}>{}
                <Link to="/receipt_info" className={css.icon_col}>
                  <Icon type="right" />
                </Link>
              </Col>
            </Row>
          </InputGroup>
        </div>

        <p>邮寄信息</p>

        <div className={css.content_body_bottom}>
          <InputGroup>
            <Row className={css.cell}>
              <Col span={6} className={css.lf}>联系人</Col>
              <Col span={18} className={css.rt}>
                <Input type='string' name='cel_name' id='cel_name' value={this.state.cel_name} onChange={this.handleCelName.bind(this)} />
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
                <Input type='string' name='cel_phone' id='cel_phone' value={this.state.cel_phone} onChange={this.handleCelPhone.bind(this)} />
              </Col>
            </Row>
          </InputGroup>
          <InputGroup>
            <Row className={css.cell}>
              <Col span={6} className={css.lf}>邮政编码</Col>
              <Col span={18} className={css.rt}>
                <Input type='string' name='post_code' id='post_code' value={this.state.post_code} onChange={this.handlePostCode.bind(this)} />
              </Col>
            </Row>
          </InputGroup>
          <InputGroup>
            <Row className={css.cell}>
              <Col span={6} className={css.lf}>详细地址</Col>
              <Col span={18} className={css.rt}>
                <Input type='string' name='address' id='address' value={this.state.address} onChange={this.handleAddress.bind(this)} />
              </Col>
            </Row>
          </InputGroup>
        </div>

        <div className={css.content_bottom}>
          <div className={css.box_position}>
            <Checkbox><span>保存为预设发票</span></Checkbox>
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
