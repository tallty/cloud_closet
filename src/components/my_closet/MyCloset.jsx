// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Button } from 'antd'
import MyClosetHeader from './MyClosetHeader'
import { ClosetRank } from './closet_rank/ClosetRank'
import { ClosetClassify } from './closet_classify/ClosetClassify'
import { ClosetTab } from './closet_tab/ClosetTab'
import classnames from 'classnames'
import styles from './MyCloset.less'
import SuperAgent from 'superagent'

export class MyCloset extends Component {

  componentDidMount() {
    this.getGarments(1, 10, (res) => {
      console.dir(res.body);
    })
  }

  // 获取列表
  getGarments(page, per_page, func) {
    SuperAgent
      .get(`http://closet-api.tallty.com/garments?page=${page}&per_page=${per_page}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (res.ok) {
          func(res);
        } else {
          console.log("获取衣橱列表失败")
        }
      })
  }

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
