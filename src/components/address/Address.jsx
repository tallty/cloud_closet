// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Icon, Button } from 'antd'
import AddAddress from './add_address/AddAddress'
import { Link } from 'react-router'
import classnames from 'classnames'
import styles from './Address.less'
import Toolbar from '../common/Toolbar'
import { Spiner } from '../common/Spiner'
import SuperAgent from 'superagent'

export class Address extends Component {
  state = {
    addresses: null
  }

  componentDidMount() {
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
        }
      })
  }

  render() {
    let url_from = this.props.location.query.from;
    let back_url = url_from ? `/${url_from}` : "/profile";

    return (
      <div className={styles.Address_content}>
        <Toolbar title="管理收货地址" url={back_url} />
        <div className="scrollContainer" style={{paddingTop: 50}}>
          <div className={styles.list_tab_body}>
            { this.state.addresses ? <AddAddress addresses={this.state.addresses}/> : <Spiner/> }
          </div>
        </div>
        <Row className={styles.tab_footer}>
          <Col span={24}>
            <Link to="/set_address" style={{color:'#fff'}}>
              <Button type="primary" className={styles.add_address_btn}>添加新地址</Button>
            </Link>
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
