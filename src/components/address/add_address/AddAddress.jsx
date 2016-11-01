// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Radio, Row, Col, Icon, Button } from 'antd'
import NavLink from '../../../layouts/NavigationLayout/NavLink'
import classnames from 'classnames'
import { Link, withRouter } from 'react-router'
import styles from './AddAddress.less'

const { string, number, bool, shape, arrayOf } = PropTypes;
const RadioGroup = Radio.Group;

class AddAddress extends Component {
  state = {
    value: 1,
  }

  onChange = (e) => {
    console.log(e.target.value);
    this.setState({
      value: e.target.value,
    });
  }

  store_address(i){
    var addre = JSON.stringify(date[i])
    console.log("选择了地址"+addre);
    localStorage.setItem('store_address', addre)
    this.props.router.goBack();
  }

  setList() {
    let list = [];
    console.log(this.props.addresses)
    this.props.addresses.forEach((address, i, obj) => {
      list.push(
         <Row key={i} className={styles.tab_cell}>
          <Col span={24}  className={styles.tab_title} onClick={this.store_address.bind(this,i)}>
            <Col span={1} className={styles.location_icon_content}>
              <img src="src/images/location_icon.svg" alt="" className={styles.location_icon}/>
            </Col>
            <Col span={23} className={styles.add_name}>
              { address.address_detail }
            </Col>
          </Col>
          <Col span={24}  className={styles.tab_title} onClick={this.store_address.bind(this,i)}>
            <Col span={10} className={styles.people_name}>
              { address.name }收
            </Col>
            <Col span={14}>
              电话：{address.phone}
            </Col>
          </Col>
          <Col span={24}  className={styles.tab_title}>
            <NavLink to="/address/new">
              <Col span={5}>
                <img src="src/images/edit_icon.svg" alt="" className={styles.edit_icon}/>编辑地址
              </Col>
            </NavLink>
            <Col span={5}>
              <img src="src/images/delete_icon.svg" alt="" className={styles.delete_icon}/>删除地址
            </Col>
            <Col span={5} offset={9}>
              {
                this.state.value === i ? 
                  <Radio key="a" value={i} checked= {true} onChange={this.onChange} >设为默认</Radio> : 
                  <Radio key="a" value={i} checked= {false} onChange={this.onChange} >设为默认</Radio>
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
