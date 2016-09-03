// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Icon, Row, Col, Button } from 'antd'
import classnames from 'classnames'
import styles from './MyCloset.less'

export class ClosetClassify extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  show_type = () => {
    this.setState({
    });
  }

  render() {
    return (
      <div className={styles.tab_content}>
        <Row className={styles.tag_content}>
          <Col span={20}>
            <Button type="primary" className={styles.tag} onClick={this.show_type}>裙装</Button>
            <Button type="primary" className={styles.tag} onClick={this.show_type}>外套</Button>
            <Button type="primary" className={styles.tag} onClick={this.show_type}>上衣</Button>
            <Button type="primary" className={styles.tag} onClick={this.show_type}>裤装</Button>
            <Button type="primary" className={styles.ellipsis_btn}><Icon type="ellipsis" className={styles.ellipsis_icon} /></Button>
            {/* <Button type="primary" className={styles.tag} onClick={this.show_type}>半裙</Button> */}
          </Col>
          <Col span={4} className={styles.search_btn_content}>
            <Button type="primary" className={styles.search_btn}><Icon type="search" className={styles.search_icon} /></Button>
          </Col>
        {/* 
          <Col span={24}>
            <Button type="primary" className={styles.tag} onClick={this.show_type}>羽绒服</Button>
            <Button type="primary" className={styles.tag} onClick={this.show_type}>泳衣</Button>
          </Col>
          <Col span={24}>
            <Button type="primary" className={styles.tag} onClick={this.show_type}>春夏</Button>
            <Button type="primary" className={styles.tag} onClick={this.show_type}>秋冬</Button>
            <Button type="primary" className={styles.tag} onClick={this.show_type}>冬</Button>
          </Col>
         */}
        </Row>
        <Row>
          <p className={styles.tab_name}>裙装<label htmlFor="">（25）</label></p>
        </Row>
      </div>
    );
  }
}

ClosetClassify.defaultProps = {
}

ClosetClassify.propTypes = {
};
