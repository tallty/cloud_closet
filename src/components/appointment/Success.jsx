// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Button } from 'antd'
import { Link } from 'react-router'
import classnames from 'classnames'
import styles from './success.less'

export class Success extends Component {
  render() {
    return (
      <div className={styles.Success_content}>
        <p className={styles.title}>预约成功</p>
        <Row>
          <Col span={24} className={styles.success_slogan}>
            工作人员将在规定时间内抵达您设定的所在地<br/>请记得及时接听上门电话。
          </Col>
          <Col span={24}>
            <Link to="/MyCloset" >
              <Button className={styles.go_closet_btn} type="primary" htmlType="submit">进入我的衣橱</Button>
            </Link>
          </Col>
          <Col span={24}>
            <Link to="/success" >
              <Button className={styles.success_online} type="ghost" htmlType="submit">平台在线客服</Button>
            </Link>
            <a href="tel:01082990966" >
              <Button className={styles.success_online_phone} type="ghost" htmlType="submit">平台客服热线<br/>400-123-2345</Button>
            </a>
          </Col>
        </Row>
      </div>
    );
  }
}

Success.defaultProps = {
}

Success.propTypes = {
};
