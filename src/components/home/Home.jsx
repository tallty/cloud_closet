// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'antd'
import { Link } from 'react-router'
import classnames from 'classnames'
import styles from './Home.less'

export class Home extends Component {
	render() {
		return (
			<div className={styles.home_content}>
        <img src="src/images/home_one.png" alt="" className={styles.home_pic}/>
        <Row className={styles.home_order_content}>
          <Col span={24} className={styles.home_order}>
            打造美感与舒适感相结合的完美成衣
          </Col>
          <Col span={24} className={styles.home_order}>
            体验为使命的专业成衣管家
          </Col>
          <Col span={24} className={styles.home_order_line}>
            _____
          </Col>
          <Col span={24} className={styles.home_order_btn}>
            <Link to="/MyOrder">马上预约</Link>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <img src="src/images/home_two.png" alt="" className={styles.home_pic}/>
            <img src="src/images/home_three.png" alt="" className={styles.home_pic}/>
            <img src="src/images/home_fore.png" alt="" className={styles.home_pic}/>
          </Col>
        </Row>
      </div>
		);
	}
}

Home.defaultProps = {
}

Home.propTypes = {
};
