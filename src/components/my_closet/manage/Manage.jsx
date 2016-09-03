// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Affix, Row, Col, Icon, Button } from 'antd'
import { ClosetClassify } from '../closet_classify/ClosetClassify'
import { ClosetTab } from '../closet_tab/ClosetTab'
import NavLink from '../../../layouts/NavigationLayout/NavLink'
import classnames from 'classnames'
import styles from './Manage.less'

export class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let tab_height = document.body.clientHeight - 100
    return (
      <div className={styles.Manage_content}>
        <Row className={styles.tab_header}>
          <Col span={18} offset={2} className={styles.tab_title}>管理</Col>
          <Col span={4} ><NavLink to="/MyCloset" style={{color:'#7F7F7F'}}>完成</NavLink></Col>
        </Row>
        <div className={styles.tab_body} style={{height: tab_height, overflow: "auto"}}>
          <ClosetClassify />
          <ClosetTab />
        </div>
        <Row className={styles.tab_footer}>
          <Col span={4}>2件</Col>
          <Col span={6} offset={8}><Button type="primary" className={styles.story_btn}>续存</Button></Col>
          <Col span={6} ><Button type="primary" className={styles.distribution_btn}>加入配送</Button></Col>
        </Row>
      </div>
    );
  }
}

Manage.defaultProps = {
}

Manage.propTypes = {
};
