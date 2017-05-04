// 品牌主页
import React, { Component, PropTypes } from 'react'
import SuperAgent from 'superagent'
import { Row, Col } from 'antd'
import { Link } from 'react-router'
import classnames from 'classnames'
import styles from './Home.less'

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openid: '123'
    };
  }

  componentWillMount() {
    const code = this.getQueryString('code')
    const url = 'http://wechat-api.tallty.com/cloud_closet_wechat/web_access_token'
  }

  getQueryString(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  }

  render() {
    return (
      <div className={styles.home_content}>
        <img src="src/images/home_one.png" alt="" className={styles.home_pic} />
        <Row className={styles.home_order_content}>
          <Col span={24} className={styles.home_order}>
            打造美感与舒适感相结合的完美成衣
          </Col>
          <Col span={24} className={styles.home_order}>
            体验为使命的专业成衣管家
          </Col>
          <Col span={24}>
            <div className={styles.home_order_line}></div>
          </Col>
          <Col span={24} className={styles.home_order_btn}>
            <Link to="/appointment">马上预约</Link>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <img src="src/images/home_two.png" alt="" className={styles.home_pic} />
            <img src="src/images/home_three.png" alt="" className={styles.home_pic} />
            <img src="src/images/server_more.png" alt="" className={styles.home_pic} />
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
