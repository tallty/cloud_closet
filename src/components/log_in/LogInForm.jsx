// 登陆页
import SuperAgent from 'superagent'
import React, { Component, PropTypes } from 'react'
import { Row, Col, Input, Button, message } from 'antd'
import { Link, withRouter } from 'react-router'
import classnames from 'classnames'
import styles from './LogInForm.less'
import Countdown from './Countdown';

const InputGroup = Input.Group;

class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      codenum: '',
      nickname: ''
    }
  }

  handlePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleCodenum(e) {
    this.setState({
      codenum: e.target.value
    });
  }

  handleNickname(e) {
    this.setState({
      nickname: e.target.value
    });
  }

  enterIconLoading() {
    const mPhone = this.state.phone;
    const url = 'http://closet-api.tallty.com/sms_tokens/register';
    //获取验证码
    SuperAgent.post(url)
      .set('Accept', 'application/json')
      .send({ sms_token: { phone: mPhone } })
      .end((err, res) => {
        const result = res.body.token;
      })
  }

  /**
   * [register 用户注册]
   * 缓存：closet_token
   */
  register() {
    const { phone, password, codenum } = this.state;

    SuperAgent
      .post('http://closet-api.tallty.com/users')
      .set('Accept', 'application/json')
      .send({ user: { phone: phone, password: password, sms_token: codenum } })
      .end((err, res) => {
        if (!err || err === null) {
          // 保存token, phone,
          localStorage.setItem('closet_token', res.body.authentication_token)
          // 更新用户信息
          this.updateUserInfo();
        } else {
          message.error(res.body.error);
        }
      })
  }

  /**
   * [updateUserInfo 更新用户信息]
   */
  updateUserInfo() {
    SuperAgent
      .put('http://closet-api.tallty.com/user_info')
      .set('X-User-Phone', this.state.phone)
      .set('X-User-Token', localStorage.closet_token)
      .send({ user_info: { nickname: this.state.nickname } })
      .end((err, res) => {
        // 绑定
        this.userBind();
      })
  }

  /**
   * [userBind 用户绑定]
   * 缓存：nickname、phone
   */
  userBind() {
    const { phone } = this.state
    SuperAgent
      .post('http://closet-api.tallty.com/user_info/bind')
      .set('Accept', 'application/json')
      .set('X-User-Phone', phone)
      .set('X-User-Token', localStorage.closet_token)
      .send({ user: { openid: localStorage.closet_openid } })
      .end((err, res) => {
        if (!err || err === null) {
          // 保存用户信息
          localStorage.setItem('closet_phone', res.body.phone);
          const userStr = JSON.stringify(res.body);
          localStorage.setItem('closet_user', userStr);
          // 用户登录
          this.signIn();
        } else {
          message.error(res.body.error);
        }
      })
  }


  /**
   * [signIn 登录]
   * 重定向
   */
  signIn() {
    const { phone, password } = this.state
    SuperAgent
      .post('http://closet-api.tallty.com/users/sign_in')
      .set('Accept', 'application/json')
      .send({ user: { phone: phone, password: password } })
      .end((err, res) => {
        if (!err || err === null) {
          this.props.router.replace(sessionStorage.redirect_url);
        } else {
          message.error(res.body.error);
        }
      })
  }

  render() {
    const containerClassnames1 = classnames(
      styles.login_input_header_label1,
      styles.login_input_header_label,
    )
    const containerClassnames2 = classnames(
      styles.login_input_header_label2,
      styles.login_input_header_label,
    )
    const containerClassnames3 = classnames(
      styles.login_input_header_label3,
      styles.login_input_header_label31,
    )
    const containerClassnames4 = classnames(
      styles.login_input_header_label4,
      styles.login_input_header_label,
    )
    return (
      <div className={styles.login_body_content}>
        <InputGroup>
          <Row className={styles.login_input_header}>
            <Col span={6} className={containerClassnames1}><img className={styles.login_input_icon1} src="src/images/flag.svg" alt="" /><br />+86</Col>
            <Col span={18} className={styles.login_input_header_label1}>
              <Input placeholder="手机号码" type='number' name='phone' id='phone' value={this.state.phone} onChange={this.handlePhone.bind(this)} />
            </Col>
          </Row>
        </InputGroup>
        <InputGroup>
          <Row className={styles.login_input_header}>
            <Col span={6} className={containerClassnames2}>密码</Col>
            <Col span={18} className={styles.login_input_header_label4}>
              <Input placeholder="请输入密码" type='password' name='password' id='password' value={this.state.password} onChange={this.handlePassword.bind(this)} />
            </Col>
          </Row>
        </InputGroup>
        <InputGroup>
          <Row className={styles.login_input_header}>
            <Col span={6} className={containerClassnames3}><Countdown {...this.state} /></Col>
            <Col span={18}>
              <Input placeholder="输入验证码" type='number' name='codenum' id='codenum' value={this.state.codenum} onChange={this.handleCodenum.bind(this)} />
            </Col>
          </Row>
        </InputGroup>
        <InputGroup>
          <Row className={styles.login_input_header}>
            <Col span={6} className={containerClassnames4}>昵称</Col>
            <Col span={18} className={styles.login_input_header_label4}>
              <Input placeholder="请输入昵称" type='text' name='nickname' id='nickname' value={this.state.nickname} onChange={this.handleNickname.bind(this)} />
            </Col>
          </Row>
        </InputGroup>
        <Row className={styles.login_btn_content}>
          <Col span={24}>
            {/* <Link to="/Success" > */}
            <Button className={styles.login_btn} type="primary" htmlType="submit" onClick={this.register.bind(this)}>注册绑定</Button>
            {/* </Link> */}
          </Col>
        </Row>
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(LogInForm)
