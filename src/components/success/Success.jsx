/**
 * 操作成功的提示页面：
 * url的action：
 *    appointment: 预约成功
 *    order: 付款成功
 */
import React, { Component, PropTypes } from 'react'
import { Row, Col, Button } from 'antd'
import { Link } from 'react-router'
import classnames from 'classnames'
import styles from './success.less'

export class Success extends Component {
  state = {
    title: "操作成功",
    description: "工作人员将在规定时间内为您服务"
  }

  componentWillMount() {
    let action = this.props.location.query.action
    this.setState({
      title: this.getStateTitle(action),
      description: this.getDescription(action)
    })
    console.log(window.history)
  }

  /**
   * [getStateTitle 获取状态标题]
   * @param  {[string]} action [流程判断]
   * @return {[string]}        [标题]
   */
  getStateTitle(action) {
    switch(action) {
      case 'appointment':
        return `预约成功`;
        break;
      case 'pay':
        return `付款成功`;
        break;
      default:
        return `操作成功`;
    }
  }

  /**
   * [getDescription 显示提示]
   * @param  {[string]} action [流程判断]
   * @return {[string]} [提示]
   */
  getDescription(action) {
    switch(action) {
      case 'appointment':
        return `工作人员将在规定时间内抵达您设定的所在地，请记得及时接听上门电话。`;
        break;
      case 'pay':
        return `工作人员将在规定时间录入您的衣橱。`;
        break;
      default:
        return `工作人员将在规定时间内为您服务`;
    }
  }

  render() {
    let { title, description } = this.state
    return (
      <div className={styles.Success_content}>
        <p className={styles.title}>{ title }</p>
        <Row>
          <Col span={24} className={styles.success_slogan}>{ description }</Col>
          <Col span={24}>
            <Link to="/orders" >
              <Button className={styles.go_closet_btn} type="primary">进入我的订单</Button>
            </Link>
          </Col>
          <Col span={24}>
            <div className={styles.bitmap_content}>
              <img src="src/images/bitmap.jpg" alt="" className={styles.bitmap}/><br/>
            </div>
            <div><label>我是在线客服：小林<br/>长按此图识别图中二维码，可关注我询问详情。</label></div>
            <a href="tel:15800634815" >
              <Button className={styles.success_online_phone} type="ghost">
                平台客服热线<br/>158-0063-4815
              </Button>
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
