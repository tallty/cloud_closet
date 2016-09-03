import React, { Component, PropTypes } from 'react'
import { Row, Col, Button } from 'antd'
import classnames from 'classnames'
import styles from './MyCloset.less'

export class ClosetTab extends Component {
  constructor(props) {
      super(props);
      this.displayName = 'ClosetTab';
  }
  render() {
    return (
      <div>
        <Row className={styles.my_cliset_header_part_one_content}>
          <Col span={12} >
          </Col>
          <Col span={12} >
          </Col>
        </Row>
      </div>
    );
  }
}

ClosetTab.defaultProps = {
}

ClosetTab.propTypes = {
};