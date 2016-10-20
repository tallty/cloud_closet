// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Radio, Row, Col, Icon, Button } from 'antd'
import NavLink from '../../../layouts/NavigationLayout/NavLink'
import classnames from 'classnames'
import { Link, withRouter } from 'react-router'
import styles from './AddAddress.less'

const RadioGroup = Radio.Group;
const date=[{"id": 1,
      "address": "黄浦区济南路260弄翠湖天地隽荟12栋6",
      "name": "李先生",
      "phone": "13912345605",
      "default": true},
      {"id": 2,
      "address": "松江区新桥丽水华庭内(新南路北)",
      "name": "jhon先生",
      "phone": "13934764205",
      "default": true},
      {"id": 3,
      "address": "中环时代广场3号楼(万荣路东)",
      "name": "s先生",
      "phone": "13918033405",
      "default": true}]

class AddAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    }
  }

  onChange = (e) => {
    console.log(e.target.value);
    this.setState({
      value: e.target.value,
    });
  }

  store_address(i){
    var addre = JSON.stringify(date[i])
    console.log(addre);
    localStorage.setItem('store_address', addre)
    this.props.router.replace('/appointment')
  }

  render() {
    let tab_height = document.body.clientHeight-80

    const list_address = []
    for (var i = 0; i < date.length; i++) {
      list_address.push(
        <Row key={i} className={styles.tab_cell} onClick={this.store_address.bind(this,i)}>
          <Col span={24}  className={styles.tab_title}>
            <Col span={1} className={styles.location_icon_content}>
              <img src="src/images/location_icon.svg" alt="" className={styles.location_icon}/>
            </Col>
            <Col span={23} className={styles.add_name}>
              {date[i].address}
            </Col>
          </Col>
          <Col span={24}  className={styles.tab_title}>
            <Col span={10} className={styles.people_name}>
              {date[i].name}收
            </Col>
            <Col span={14}>
              电话：{date[i].phone}
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
              {this.state.value === i ?<Radio key="a" value={i} checked= {true} onChange={this.onChange} >设为默认</Radio>:<Radio key="a" value={i} checked= {false} onChange={this.onChange} >设为默认</Radio>}
            </Col>
          </Col>
        </Row>
      )
    }
    return (
      <div className={styles.AddAddress_content}>
        {list_address}
      </div>
    );
  }
}

export default withRouter(AddAddress);
