// 登陆页
import SuperAgent from 'superagent'
import React, { Component, PropTypes } from 'react'
import {Row, Col, Input, Button } from 'antd'
import { Link } from 'react-router'
import classnames from 'classnames'
import styles from './LogInForm.less'

const InputGroup = Input.Group;

export class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      codenum: '',
      nickname: '',
    }
  }

  handlePhone(e) {
    var value = e.target.value;
    console.log(value);
    this.setState({
      phone: value,
    });
  }

  handlePassword(e) {
    var value = e.target.value;
    this.setState({
      password: value,
    });
  }

  handleCodenum(e) {
    var value = e.target.value;
    this.setState({
      codenum: value,
    });
  }

  handleNickname(e) {
    var value = e.target.value;
    this.setState({
      nickname: value,
    });
  }

  enterIconLoading(){
    var phone = this.state.phone
    console.log(phone);
    var url = "http://closet-api.tallty.com/sms_tokens/register"
    console.log(url);
    //获取验证码
    SuperAgent.post(url)
              .set('Accept', 'application/json')
              .send( {'sms_token': {'phone': phone} } )
              .end( (err, res) => {
                let result = res.body.token
                console.log(res)
                console.log(result)
              })
  }

  register(){
    var phone = this.state.phone;
    var password = this.state.password;
    var codenum = this.state.codenum;
    var nickname = this.state.nickname
    var url = "http://closet-api.tallty.com/users"
    console.log(phone);
    console.log(password);
    console.log(codenum);
    console.log(nickname);
    console.log(url);
    //用户注册
    SuperAgent.post(url)
              .set('Accept', 'application/json')
              .send({'user': {'phone': phone, 'password': password, 'sms_token': codenum}})
              .end( (err, res) => {
                let result = res.body
                console.log(result)
              })

    var url2 = "http://closet-api.tallty.com/user_info/bind"
    SuperAgent.post(url)
              .set('Accept', 'application/json')
              .send({'user': {'openid': openid}})
              .end( (err, res) => {
                let result = res.body
                console.log(result)
              })
  }

  // enterLoading() {
  //   this.setState({ loading: true });
  // }
  // enterIconLoading() {
  //   this.setState({ iconLoading: true });
  // }

  render() {
    let container_classnames1 = classnames(
        styles.login_input_header_label1,
        styles.login_input_header_label,
      )
    let container_classnames2 = classnames(
      styles.login_input_header_label2,
      styles.login_input_header_label,
    )
    let container_classnames3 = classnames(
      styles.login_input_header_label3,
      styles.login_input_header_label31,
    )
    let container_classnames4 = classnames(
      styles.login_input_header_label4,
      styles.login_input_header_label,
    )
    return (
      <div className={styles.login_body_content}>
        <InputGroup>
        <Row className={styles.login_input_header}>
          <Col span={6} className={container_classnames1}><img className={styles.login_input_icon1} src="src/images/flag.svg" alt=""/><br/>+86</Col>
          <Col span={18} className={styles.login_input_header_label1}>
            <Input placeholder="手机号码" type='text' name='phone' id='phone' value={this.state.phone} onChange={this.handlePhone.bind(this)} />
          </Col>
        </Row>
        </InputGroup>
        <InputGroup>
          <Row className={styles.login_input_header}>
            <Col span={6} className={container_classnames2}>密码</Col>
            <Col span={18} className={styles.login_input_header_label4}>
              <Input placeholder="请输入密码" type='text' name='password' id='password' value={this.state.password} onChange={this.handlePassword.bind(this)} />
            </Col>
          </Row>
        </InputGroup>
        <InputGroup>
          <Row className={styles.login_input_header}>
            <Col span={6} className={container_classnames3}><Button className={styles.checked_number_btn} onClick={this.enterIconLoading.bind(this)}>获取验证码</Button></Col>
            <Col span={18}>
              <Input placeholder="输入验证码" type='text' name='codenum' id='codenum' value={this.state.codenum} onChange={this.handleCodenum.bind(this)} />
            </Col>
          </Row>
        </InputGroup>
        <InputGroup>
          <Row className={styles.login_input_header}>
            <Col span={6} className={container_classnames4}>昵称</Col>
            <Col span={18} className={styles.login_input_header_label4}>
              <Input placeholder="请输入昵称" type='text' name='nickname' id='nickname' value={this.state.nickname} onChange={this.handleNickname.bind(this)}/>
            </Col>
          </Row>
        </InputGroup>
        <Row className={styles.login_btn_content}>
          <Col span={24}>
            <Link to="/Success" >
              <Button className={styles.login_btn} type="primary" htmlType="submit" onClick={this.register.bind(this)}>快速登入</Button>
            </Link>
          </Col>
        </Row>
        {this.props.children}
      </div>
    );
  }
}

LogInForm.defaultProps = {
}

LogInForm.propTypes = {
};
