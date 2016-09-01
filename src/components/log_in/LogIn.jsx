// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Input, Button } from 'antd'
import NavLink from '../../layouts/NavigationLayout/NavLink'
import { LogInForm } from './LogInForm'
import classnames from 'classnames'
import styles from './LogIn.less'

const InputGroup = Input.Group;

export class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className={styles.LogIn_content}>
        <div className={styles.login_header_content}>
          <div className={styles.login_header}>
            <div className={styles.login_header_pic}>乐存</div>
            <label className={styles.login_header_slogan}>您的网上云衣橱</label>
          </div>
        </div>
        <LogInForm />
      </div>
    );
  }
}

LogIn.defaultProps = {
}

LogIn.propTypes = {
};
