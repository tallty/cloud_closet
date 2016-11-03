// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Radio, Row, Col, Icon, Button } from 'antd'
import NavLink from '../../../layouts/NavigationLayout/NavLink'
import classnames from 'classnames'
import { Link, withRouter } from 'react-router'
import styles from './AddAddress.less'
import SuperAgent from 'superagent'

const { string, number, bool, shape, arrayOf } = PropTypes;
const RadioGroup = Radio.Group;

class AddAddress extends Component {
  state = {
    addresses: null
  }

  componentWillMount() {
    this.setState({addresses: this.props.addresses});
  }

  // 修改默认地址
  setDefaultAddress = (e) => {
    console.log(e.target.value);
    let address_id = e.target.value;
    SuperAgent
      .post(`http://closet-api.tallty.com/addresses/${address_id}/set_default`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (!err || err === null) {
          this.getAddresses();
        } else {
          alert("设置默认地址失败");
        }
      })
  }

  // 编辑地址
  editAddress(address) {
    let str = JSON.stringify(address);
    localStorage.setItem('edit_address', str);
    this.props.router.replace('/set_address');
  }

  // 删除地址
  // params: 删除的地址的数组索引
  deleteAddress(address) {
    SuperAgent
      .delete(`http://closet-api.tallty.com/addresses/${address.id}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (!err || err === null) {
          this.getAddresses();
        } else {
          alert("获取地址列表失败");
        }
      })
  }

  // 获取列表
  getAddresses() {
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
  
  // 选中地址返回给预约页面（仅适用于预约页面）
  store_address(address){
    var addre = JSON.stringify(address)
    console.log("选择了地址"+addre);
    localStorage.removeItem('addresses_back_url');
    localStorage.setItem('store_address', addre);
    this.props.router.replace('/appointment');
  }

  setList() {
    let list = [];
    this.state.addresses.forEach((address, i, obj) => {
      let back_url = localStorage.addresses_back_url;
      let itemEvent = back_url === "/appointment" ? this.store_address.bind(this,address) : null;
      
      list.push(
         <Row key={i} className={styles.tab_cell}>
          <Col span={24}  className={styles.tab_title} onClick={itemEvent}>
            <Col span={1} className={styles.location_icon_content}>
              <img src="src/images/location_icon.svg" alt="" className={styles.location_icon}/>
            </Col>
            <Col span={23} className={styles.add_name} onClick={itemEvent}>
              { address.address_detail }
            </Col>
          </Col>
          <Col span={24}  className={styles.tab_title}>
            <Col span={10} className={styles.people_name}>
              { address.name } 收
            </Col>
            <Col span={14}>
              电话：{address.phone}
            </Col>
          </Col>
          <Col span={24}  className={styles.tab_title}>
            <Col span={5} onClick={this.editAddress.bind(this, address)}>
              <img src="src/images/edit_icon.svg" alt="" className={styles.edit_icon}/>编辑地址
            </Col>
            <Col span={5} onClick={this.deleteAddress.bind(this, address)}>
              <img src="src/images/delete_icon.svg" alt="" className={styles.delete_icon}/>删除地址
            </Col>
            <Col span={5} offset={9}>
              {
                address.is_default ? 
                  <Radio key="a" value={i} checked= {true} >默认地址</Radio> : 
                  <Radio key="a" value={address.id} checked= {false} onChange={this.setDefaultAddress} >设为默认</Radio>
              }
            </Col>
          </Col>
        </Row>
      )
    })
    return list;
  }

  render() {
    let tab_height = document.body.clientHeight-80;

    return (
      <div className={styles.AddAddress_content}>
        { this.setList() }
      </div>
    );
  }
}

AddAddress.defaultProps = {
  addresses: []
}

AddAddress.PropTypes = {
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
export default withRouter(AddAddress);
