// 登陆页
import SuperAgent from 'superagent'
import React, { Component, PropTypes } from 'react'
import {Row, Col, Input, Button } from 'antd'
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
      nickname: '',
    }
  }

  handlePhone(e) {
    var value = e.target.value;
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
    var url = "http://closet-api.tallty.com/sms_tokens/register"
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

  /**
   * [register 用户注册]
   * 缓存：authentication_token
   */
  register(){
    let { phone, password, codenum } = this.state
    
    SuperAgent
      .post("http://closet-api.tallty.com/users")
      .set('Accept', 'application/json')
      .send({'user': {'phone': phone, 'password': password, 'sms_token': codenum}})
      .end( (err, res) => {
        if (res.ok) {
          // 保存token, phone, 
          localStorage.setItem('authentication_token', res.body.authentication_token)
          // 绑定
          this.userBind();

          console.log('用户注册成功 =>')
          console.dir(res)
        }else{
          console.dir(err);
          alert('用户注册失败！')
        }
      })
  }

  /**
   * [userBind 用户绑定]
   * 缓存：nickname、phone
   */
  userBind() {
    let { phone } = this.state
    SuperAgent
      .post("http://closet-api.tallty.com/user_info/bind")
      .set('Accept', 'application/json')
      .set('X-User-Phone', phone)
      .set('X-User-Token', localStorage.authentication_token)
      .send({'user': {'openid': localStorage.openid}})
      .end( (err, res) => {
        if (res.ok) {
          // 保存用户信息
          localStorage.setItem('user_name', res.body.nickname)
          localStorage.setItem('phone', res.body.phone)
          // 更新昵称
          this.updateUserInfo();

          console.log('用户绑定成功 =>')
          console.dir(res)
        }else{
          console.dir(err);
          alert('用户绑定失败！')
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
      .set('X-User-Token', localStorage.authentication_token)
      .send('user_info[nickname]', this.state.nickname)
      .end((err, res) => {
        // 用户登录
        this.signIn();
      })
  }

  /**
   * [signIn 登录]
   * 重定向
   */
  signIn() {
    let { phone, password } = this.state
    SuperAgent
      .post('http://closet-api.tallty.com/users/sign_in')
      .set('Accept', 'application/json')
      .send({'user': {'phone': phone, 'password': password}})
      .end( (err, res) => {
        if (res.ok) {
          this.props.router.replace(localStorage.route)

          console.log('用户登录成功 =>')
          console.dir(res)
        }else{
          console.dir(err);
          alert('用户登录失败！')
        }
      })
  }

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
            <Col span={6} className={container_classnames3}><Countdown {...this.state}/></Col>
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
