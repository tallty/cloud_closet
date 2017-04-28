// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Input, Icon, Button } from 'antd'
import NavLink from '../../../layouts/NavigationLayout/NavLink'
import classnames from 'classnames'
import styles from './DispatchingCard.less'

const InputGroup = Input.Group;

export class DispatchingCard extends Component {

  getList() {
    return this.props.garments.map(item => (
      <Row type="flex" justify="space-around" align="middle" key={item.id} className={styles.DispatchingCard}>
        <Col span={6} className={styles.dispatch_pic_col}>
          <img src={item.cover_image} alt="" className={styles.dispatch_pic} />
        </Col>
        <Col span={18} className={styles.dispatch_title_col}>
          <div className={styles.dispatch_title}>{item.title}</div>
        </Col>
      </Row>
    ))
  }

  render() {
    return (
      <div>{this.getList()}</div>
    );
  }
}

DispatchingCard.defaultProps = {
  garments: []
}

DispatchingCard.propTypes = {
  garments: PropTypes.array
};
