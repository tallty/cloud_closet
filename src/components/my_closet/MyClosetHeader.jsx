import React, { Component, PropTypes } from 'react'
import { Row, Col, Button } from 'antd'
import classnames from 'classnames'
import styles from './MyCloset.less'


class MyClosetHeader extends React.Component {
  constructor(props) {
      super(props);
      this.displayName = 'MyClosetHeader';
  }
  render() {
    return (
      <div>
        <Row className={styles.my_cliset_header_part_one_content}>
          <Col span={12} className={styles.user_name}>
            John Snow
          </Col>
          <Col span={11} offset={1} className={styles.user_pic_content}>
            <div className={styles.user_pic_position}>
              <img className={styles.user_pic} src="src/images/photo.png" alt=""/>
              <div className={styles.empty_cicle}></div>
            </div>
          </Col>
        </Row>
        <Row className={styles.my_cliset_header_part_two_content}>
          <Col span={14} className={styles.closet_number_tab}>
            <Col span={8}>
              <div htmlFor="" className={styles.number_closet}>120</div>
              <div htmlFor="">衣橱存数</div>
            </Col>
            <Col span={8} offset={7}>
              <Button type="primary" className={styles.input_closet_btn}>添加新衣</Button>
            </Col>
          </Col>
          <Col span={10} className={styles.closet_number_tab}>
            <Col span={12} className={styles.input_closet_number_tab}>
              <div htmlFor="" className={styles.number_closet}>20</div>
              <div htmlFor="">入库</div>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MyClosetHeader;