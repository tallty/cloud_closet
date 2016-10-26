// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Icon, Button } from 'antd'
import AddAddress from './add_address/AddAddress'
import NavLink from '../../layouts/NavigationLayout/NavLink'
import classnames from 'classnames'
import styles from './Address.less'
import Toolbar from '../common/Toolbar'

export class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className={styles.Address_content}>
        <Toolbar title="管理收货地址" />
        <div className="scrollContainer" style={{paddingTop: 50}}>
          <div className={styles.list_tab_body}>
            <AddAddress />
          </div>
        </div>
        <Row className={styles.tab_footer}>
          <Col span={24}>
            <NavLink to="/set_address" style={{color:'#fff'}}>
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
