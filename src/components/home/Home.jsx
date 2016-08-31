// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'antd'
import NavLink from '../../layouts/NavigationLayout/NavLink'
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
            <NavLink to="" onlyActiveOnIndex={true}>马上预约</NavLink>
          </Col>
        </Row>
        <img src="src/images/home_two.png" alt="" className={styles.home_pic}/>
        <img src="src/images/home_three.png" alt="" className={styles.home_pic}/>
        <img src="src/images/home_fore.png" alt="" className={styles.home_pic}/>
      </div>
		);
	}
}

Home.defaultProps = {
}

Home.propTypes = {
};
