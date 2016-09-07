// 登陆页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Input, Button } from 'antd'
import NavLink from '../../layouts/NavigationLayout/NavLink'
import classnames from 'classnames'
import styles from './LogInForm.less'

const InputGroup = Input.Group;

export class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      iconLoading: false,
    }
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
          <Col span={18} className={styles.login_input_header_label1}><Input placeholder="手机号码" /></Col>
        </Row>
        </InputGroup>
        <InputGroup>
          <Row className={styles.login_input_header}>
            <Col span={6} className={container_classnames2}>密码</Col>
            <Col span={18} className={styles.login_input_header_label4}><Input placeholder="请输入密码" /></Col>
          </Row>
        </InputGroup>
        <InputGroup>
          <Row className={styles.login_input_header}>
            <Col span={6} className={container_classnames3}><Button className={styles.checked_number_btn} loading={this.state.iconLoading} onClick={this.enterIconLoading}>获取验证码</Button></Col>
            <Col span={18}><Input placeholder="输入验证码" /></Col>
          </Row>
        </InputGroup>
        <InputGroup>
          <Row className={styles.login_input_header}>
            <Col span={6} className={container_classnames4}>昵称</Col>
            <Col span={18} className={styles.login_input_header_label4}><Input placeholder="请输入昵称" /></Col>
          </Row>
        </InputGroup>
        <Row className={styles.login_btn_content}>
          <Col span={24}>
            <NavLink to="/Success" >
              <Button className={styles.login_btn} type="primary" htmlType="submit">快速登入</Button>
            </NavLink>
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
