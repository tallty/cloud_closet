// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Icon, Button } from 'antd'
import classnames from 'classnames'
import { Link, withRouter } from 'react-router'
import SuperAgent from 'superagent'
import AddressList from './address_list/AddressList'
import styles from './Address.less'
import { Spiner } from '../common/Spiner';
import Toolbar from '../common/Toolbar';

export class Address extends Component {
  state = {
    addresses: null,
    back_url: '/profile'
  }

  componentWillMount() {
    const backUrl = sessionStorage.addresses_back_url;
    if (backUrl) {
      this.setState({ back_url: backUrl });
    }
  }

  componentDidMount() {
    SuperAgent
      .get('http://closet-api.tallty.com/addresses')
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (res.ok) {
          this.setState({ addresses: res.body });
        } else {
          this.setState({ addresses: [] });
        }
      })
  }

  addNewAddress() {
    this.props.router.replace('/set_address');
  }

  render() {
    return (
      <div className={styles.container}>
        <Toolbar title="管理收货地址" url={this.state.back_url} />
        <div className={styles.content}>
          <div className="scrollContainer">
            <div className={styles.list_tab_body}>
              {this.state.addresses ? <AddressList addresses={this.state.addresses} /> : <Spiner />}
            </div>
          </div>
          <Row className={styles.tab_footer}>
            <Col span={24}>
              <button className={styles.add_address_btn} onClick={this.addNewAddress.bind(this)}>
                添加新地址
              </button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

Address.defaultProps = {
}

Address.propTypes = {
};

export default withRouter(Address);
