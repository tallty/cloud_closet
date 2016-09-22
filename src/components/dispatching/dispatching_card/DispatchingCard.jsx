// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Input, Icon, Button } from 'antd'
import NavLink from '../../../layouts/NavigationLayout/NavLink'
import classnames from 'classnames'
import styles from './DispatchingCard.less'

const InputGroup = Input.Group;

export class DispatchingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <Row className={styles.DispatchingCard}>
          <div className={styles.cross_icon_link}><Button type="primary" shape="circle" icon="cross" /></div>
          <Col span={6} className={styles.dispatch_pic_col}>
            <img src="src/images/recommend_one.png" alt="" className={styles.dispatch_pic}/>
          </Col>
          <Col span={18} className={styles.dispatch_title_col}>
            <div>DOLCE&GABBANA  印花包臀短裙 </div>
          </Col>
        </Row>
        <Row className={styles.DispatchingCard}>
          <div className={styles.cross_icon_link}><Button type="primary" shape="circle" icon="cross" /></div>
          <Col span={6} className={styles.dispatch_pic_col}>
            <img src="src/images/recommend_one.png" alt="" className={styles.dispatch_pic}/>
          </Col>
          <Col span={18} className={styles.dispatch_title_col}>
            <div>DOLCE&GABBANA  印花包臀短裙 </div>
          </Col>
        </Row>
        <Row className={styles.DispatchingCard}>
          <div className={styles.cross_icon_link}><Button type="primary" shape="circle" icon="cross" /></div>
          <Col span={6} className={styles.dispatch_pic_col}>
            <img src="src/images/recommend_one.png" alt="" className={styles.dispatch_pic}/>
          </Col>
          <Col span={18} className={styles.dispatch_title_col}>
            <div>DOLCE&GABBANA  印花包臀短裙 </div>
          </Col>
        </Row>
        <Row className={styles.DispatchingCard}>
          <div className={styles.cross_icon_link}><Button type="primary" shape="circle" icon="cross" /></div>
          <Col span={6} className={styles.dispatch_pic_col}>
            <img src="src/images/recommend_one.png" alt="" className={styles.dispatch_pic}/>
          </Col>
          <Col span={18} className={styles.dispatch_title_col}>
            <div>DOLCE&GABBANA  印花包臀短裙 </div>
          </Col>
        </Row>
      </div>
    );
  }
}

DispatchingCard.defaultProps = {
}

DispatchingCard.propTypes = {
};
