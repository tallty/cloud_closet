// 品牌主页
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import styles from './Process.less'

export class Process extends Component {
  render() {
    return (
      <div className={styles.Process_content}>
        <img src="src/images/server_one.png" alt="" className={styles.Process_pic}/>
        <img src="src/images/server_two.png" alt="" className={styles.Process_pic}/>
      </div>
    );
  }
}

Process.defaultProps = {
}

Process.propTypes = {
};
