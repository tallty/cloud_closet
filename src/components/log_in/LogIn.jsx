// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import LogInForm from './LogInForm'
import classnames from 'classnames'
import styles from './LogIn.less'

export class LogIn extends Component {

  render() {
    return (
      <div className={styles.LogIn_content}>
        <img src="src/images/log_content.png" className={styles.LogIn_content_pic} alt=""/>
        <LogInForm />
      </div>
    );
  }
}

LogIn.defaultProps = {
}

LogIn.propTypes = {
};
