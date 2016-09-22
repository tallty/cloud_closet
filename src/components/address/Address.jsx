// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Icon, Button } from 'antd'
import { AddAddress } from './add_address/AddAddress'
import NavLink from '../../layouts/NavigationLayout/NavLink'
import classnames from 'classnames'
import styles from './Address.less'

export class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let tab_height = document.body.clientHeight-80
    return (
      <div className={styles.Address_content}>
        <Row className={styles.tab_header}>
          <Col span={2} ><NavLink to="/MyCloset" style={{color:'#fff'}}><Icon type="left" /></NavLink></Col>
          <Col span={20}  className={styles.tab_title}>管理收货地址</Col>
        </Row>
        <div className={styles.list_tab_body} style={{height: tab_height, overflow: "auto"}}>
          <AddAddress />
        </div>
        <Row className={styles.tab_footer}>
          <Col span={24}>
            <NavLink to="/address/new" style={{color:'#fff'}}>
              <Button type="primary" className={styles.add_address_btn}>添加新地址</Button>
            </NavLink>
          </Col>
        </Row>
      </div>
    );
  }
}

Address.defaultProps = {
}

Address.propTypes = {
};
