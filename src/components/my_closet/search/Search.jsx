// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Input, Icon, Button } from 'antd'
import NavLink from '../../../layouts/NavigationLayout/NavLink'
import classnames from 'classnames'
import styles from './Search.less'

const InputGroup = Input.Group;

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className={styles.Search_content}>
        <Row className={styles.Search_content_header}>
          <Col span={22}><Input placeholder="关键词搜索" /></Col>
          <Col span={2}>
            <NavLink to="/MyCloset"><Icon type="cross" className={styles.cross_icon} /></NavLink>
          </Col>
        </Row>
        <Row className={styles.Search_content_row}>
          <Col span={24} className={styles.Search_content_tab_title}>
            款式
          </Col>
          <Col span={24} className={styles.Search_content_tab}>
            <Button type="primary" className={styles.tag} >裙装</Button>
            <Button type="primary" className={styles.tag} >外套</Button>
            <Button type="primary" className={styles.tag} >上衣</Button>
            <Button type="primary" className={styles.tag} >裤装</Button>
          </Col>
          <Col span={24} className={styles.Search_content_tab}>
            <Button type="primary" className={styles.tag} >裙装</Button>
            <Button type="primary" className={styles.tag} >外套</Button>
            <Button type="primary" className={styles.tag} >上衣</Button>
          </Col>
          <Col span={24} className={styles.Search_content_tab_title}>
            季节
          </Col>
          <Col span={24} className={styles.Search_content_tab}>
            <Button type="primary" className={styles.tag} >春</Button>
            <Button type="primary" className={styles.tag} >夏</Button>
            <Button type="primary" className={styles.tag} >秋</Button>
            <Button type="primary" className={styles.tag} >冬</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

Search.defaultProps = {
}

Search.propTypes = {
};
