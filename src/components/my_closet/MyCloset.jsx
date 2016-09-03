// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Button } from 'antd'
import MyClosetHeader from './MyClosetHeader'
import { ClosetRank } from './closet_rank/ClosetRank'
import { ClosetClassify } from './closet_classify/ClosetClassify'
import { ClosetTab } from './closet_tab/ClosetTab'
import classnames from 'classnames'
import styles from './MyCloset.less'

export class MyCloset extends Component {
  render() {
    return (
      <div className={styles.my_cliset_content}>
        <MyClosetHeader />
        <ClosetRank />
        <div className={styles.closet_content_down}>
          <ClosetClassify />
          <p className={styles.tab_name}>裙装<label htmlFor="">（25）</label></p>
          <ClosetTab />
        </div>
      </div>
    );
  }
}

MyCloset.defaultProps = {
}

MyCloset.propTypes = {
};
