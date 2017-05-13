// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Radio, Row, Col, Icon, Button, message } from 'antd'
import classnames from 'classnames'
import { Link, withRouter } from 'react-router'
import styles from './address_list.less'
import SuperAgent from 'superagent'
import StateNone from '../../common/StateNone';

const { string, number, bool, shape, arrayOf } = PropTypes;
const RadioGroup = Radio.Group;

class AddressList extends Component {
  state = {
    addresses: null
  }

  componentWillMount() {
    this.setState({ addresses: this.props.addresses });
  }

  // 修改默认地址
  setDefaultAddress = (e) => {
    const addressId = e.target.value;
    SuperAgent
      .post(`http://closet-api.tallty.com/addresses/${addressId}/set_default`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.closet_token)
      .set('X-User-Phone', localStorage.closet_phone)
      .end((err, res) => {
        if (!err || err === null) {
          this.getAddresses();
        } else {
          message.error('设置默认地址失败');
        }
      })
  }

  // 编辑地址
  editAddress(address) {
    let str = JSON.stringify(address);
    sessionStorage.setItem('edit_address', str);
    this.props.router.replace('/set_address');
  }

  // 删除地址
  // params: 删除的地址的数组索引
  deleteAddress(address) {
    SuperAgent
      .delete(`http://closet-api.tallty.com/addresses/${address.id}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.closet_token)
      .set('X-User-Phone', localStorage.closet_phone)
      .end((err, res) => {
        if (!err || err === null) {
          this.getAddresses();
          sessionStorage.removeItem('selected_address');
        } else {
          message.error('获取地址列表失败');
        }
      })
  }

  // 获取列表
  getAddresses() {
    SuperAgent
      .get('http://closet-api.tallty.com/addresses')
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.closet_token)
      .set('X-User-Phone', localStorage.closet_phone)
      .end((err, res) => {
        if (res.ok) {
          this.setState({ addresses: res.body });
        } else {
          message.error('获取地址列表失败');
          this.setState({ addresses: [] });
        }
      })
  }

  // 选中地址返回给预约页面（仅适用于预约页面）
  handleSelectAddress(address) {
    const backUrl = sessionStorage.addresses_back_url;
    const addre = JSON.stringify(address)
    sessionStorage.removeItem('addresses_back_url');
    sessionStorage.setItem('selected_address', addre);
    if (backUrl) {
      this.props.router.replace(backUrl);
    }
  }

  setList() {
    let list = [];
    this.state.addresses.forEach((address, i, obj) => {
      list.push(
        <Row key={i} className={styles.tab_cell}>
          <Col span={24} className={styles.tab_title} onClick={this.handleSelectAddress.bind(this, address)}>
            <Col span={1} className={styles.location_icon_content}>
              <img src="src/images/location_icon.svg" alt="" className={styles.location_icon} />
            </Col>
            <Col span={23} className={styles.add_name}>
              {address.address_detail} {address.house_number}
            </Col>
          </Col>
          <Col span={24} className={styles.tab_title}>
            <Col span={10} className={styles.people_name}>
              {address.name}
            </Col>
            <Col span={14}>
              电话：{address.phone}
            </Col>
          </Col>
          <Col span={24} className={styles.tab_title}>
            <Col span={5} onClick={this.editAddress.bind(this, address)}>
              <img src="src/images/edit_icon.svg" alt="" className={styles.edit_icon} />编辑地址
            </Col>
            <Col span={5} onClick={this.deleteAddress.bind(this, address)}>
              <img src="src/images/delete_icon.svg" alt="" className={styles.delete_icon} />删除地址
            </Col>
            <Col span={5} offset={9}>
              {
                address.is_default ?
                  <Radio key="a" value={i} checked >默认地址</Radio> :
                  <Radio key="a" value={address.id} checked={false} onChange={this.setDefaultAddress} >设为默认</Radio>
              }
            </Col>
          </Col>
        </Row>
      )
    });
    if (list.length === 0) {
      list = <StateNone desc="您尚未添加收货地址" />;
    }
    return list;
  }

  render() {
    return (
      <div className={styles.AddressList_content}>
        {this.setList()}
      </div>
    );
  }
}

AddressList.defaultProps = {
  addresses: []
}

AddressList.PropTypes = {
  addresses: arrayOf(
    shape({
      id: number,
      name: string,
      address_detail: string,
      phone: string,
      is_default: bool,
      created_at: string,
      updated_at: string,
      url: string
    })
  )
}
export default withRouter(AddressList);
