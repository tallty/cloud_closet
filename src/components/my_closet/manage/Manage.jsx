// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Input, Icon, Button } from 'antd'
import NavLink from '../../../layouts/NavigationLayout/NavLink'
import classnames from 'classnames'
import styles from './Manage.less'

const InputGroup = Input.Group;

export class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className={styles.Manage_content}>
        
      </div>
    );
  }
}

Manage.defaultProps = {
}

Manage.propTypes = {
};
