// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Button, Icon } from 'antd'
import NavLink from '../../../layouts/NavigationLayout/NavLink'
import QueueAnim from 'rc-queue-anim';
import classnames from 'classnames'
import styles from './ClosetRank.less'

export class ClosetRank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      title: '综合排序'
    };
    this.onClick = () =>{
      this.setState({
        show: !this.state.show,
        title: '入库时间',
      });
    };
  }

  render() {
    const list = this.state.show ? [
      <div className="demo-kp" key="a">
        <Row className={styles.rank_btn_content}>
          <Col span={24}>
            <Button className={styles.rank_btn_time} onClick={this.onClick}>综合排序</Button>
          </Col>
          <Col span={24}>
            <Button className={styles.rank_btn_time} onClick={this.onClick}>入库时间</Button>
          </Col>
          <Col span={24}>
            <Button className={styles.rank_btn_time} onClick={this.onClick}>到期时间</Button>
          </Col>
        </Row>
      </div>
    ] : null;
    return (
      <div className={styles.closet_rank_content}>
        <Row>
          <Col span={9} className={styles.closet_all}>
            衣橱全部宝贝
          </Col>
          <Col span={6} className={styles.closet_rank}>
            <p className="buttons">
              <Button className={styles.rank_btn} onClick={this.onClick}>{this.state.title}<Icon type="caret-down" className={styles.icon_down} /></Button>
            </p>
          </Col>
          <Col span={9} className={styles.closet_control}>
            <NavLink to="/manage">管理</NavLink>
          </Col>
          <QueueAnim component="ul" type={['right', 'left']}>
            {list}
          </QueueAnim>
        </Row>
      </div>
    );
  }
}

ClosetRank.defaultProps = {
}

ClosetRank.propTypes = {
};
