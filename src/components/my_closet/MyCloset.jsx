// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Button } from 'antd'
import MyClosetHeader from './MyClosetHeader'
import { ClosetRank } from './ClosetRank'
import { ClosetClassify } from './ClosetClassify'
import { ClosetTab } from './ClosetTab'
import classnames from 'classnames'
import styles from './MyCloset.less'

export class MyCloset extends Component {
  render() {
    return (
      <div className={styles.my_cliset_content}>
        <MyClosetHeader />
        <ClosetRank />
        <ClosetClassify />
        <ClosetTab />
      </div>
    );
  }
}

MyCloset.defaultProps = {
}

MyCloset.propTypes = {
};
