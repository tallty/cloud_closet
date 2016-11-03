// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Icon, Button } from 'antd'
import AddAddress from './add_address/AddAddress'
import { Link, withRouter } from 'react-router'
import classnames from 'classnames'
import styles from './Address.less'
import Toolbar from '../common/Toolbar'
import { Spiner } from '../common/Spiner'
import SuperAgent from 'superagent'

export class Address extends Component {
  state = {
    addresses: null,
    back_url: '/profile'
  }

  componentWillMount() {
    let back_url = sessionStorage.addresses_back_url;
    if (back_url || back_url === null) {
      this.setState({ back_url: back_url });
    }
  }

  componentDidMount() {
    console.log(this.state.back_url)
    SuperAgent
      .get("http://closet-api.tallty.com/addresses")
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (res.ok) {
          this.setState({ addresses: res.body });
        } else {
          alert("获取地址列表失败");
          this.setState({ addresses: [] });
        }
      })
  }

  addNewAddress() {
    this.props.router.replace('/set_address');
  }

  render() {
    return (
      <div className={styles.Address_content}>
        <Toolbar title="管理收货地址" url={this.state.back_url} />
        <div className="scrollContainer" style={{paddingTop: 50}}>
          <div className={styles.list_tab_body}>
            { this.state.addresses ? <AddAddress addresses={this.state.addresses}/> : <Spiner/> }
          </div>
        </div>
        <Row className={styles.tab_footer}>
          <Col span={24}>
            <button className={styles.add_address_btn} onClick={this.addNewAddress.bind(this)}>添加新地址</button>
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

export default withRouter(Address);