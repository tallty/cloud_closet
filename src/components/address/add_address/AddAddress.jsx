// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Radio, Row, Col, Icon, Button } from 'antd'
import NavLink from '../../../layouts/NavigationLayout/NavLink'
import classnames from 'classnames'
import styles from './AddAddress.less'

const RadioGroup = Radio.Group;

export class AddAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    }
  }

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    let tab_height = document.body.clientHeight-80
    return (
      <div className={styles.AddAddress_content}>
        <Row className={styles.tab_cell}>
          <Col span={24}  className={styles.tab_title}>
            <Col span={1} className={styles.location_icon_content}>
              <img src="src/images/location_icon.svg" alt="" className={styles.location_icon}/>
            </Col>
            <Col span={23} className={styles.add_name}>
              黄浦区济南路260弄翠湖天地隽荟12栋6
            </Col>
          </Col>
          <Col span={24}  className={styles.tab_title}>
            <Col span={10} className={styles.people_name}>
              XXX收
            </Col>
            <Col span={14}>
              电话：18743353579
            </Col>
          </Col>
          <Col span={24}  className={styles.tab_title}>
            <Col span={5}>
              <img src="src/images/edit_icon.svg" alt="" className={styles.edit_icon}/>编辑地址
            </Col>
            <Col span={5}>
              <img src="src/images/delete_icon.svg" alt="" className={styles.delete_icon}/>删除地址
            </Col>
            <Col span={5} offset={9}>
              <Radio key="a" value={1} onChange={this.onChange} >设为默认</Radio>
            </Col>
          </Col>
        </Row>

        <Row className={styles.tab_cell}>
          <Col span={24}  className={styles.tab_title}>
            <Col span={1} className={styles.location_icon_content}>
              <img src="src/images/location_icon.svg" alt="" className={styles.location_icon}/>
            </Col>
            <Col span={23} className={styles.add_name}>
              黄浦区济南路260弄翠湖天地隽荟12栋6
            </Col>
          </Col>
          <Col span={24}  className={styles.tab_title}>
            <Col span={10} className={styles.people_name}>
              XXX收
            </Col>
            <Col span={14}>
              电话：18743353579
            </Col>
          </Col>
          <Col span={24}  className={styles.tab_title}>
            <Col span={5}>
              <img src="src/images/edit_icon.svg" alt="" className={styles.edit_icon}/>编辑地址
            </Col>
            <Col span={5}>
              <img src="src/images/delete_icon.svg" alt="" className={styles.delete_icon}/>删除地址
            </Col>
            <Col span={5} offset={9}>
              <Radio key="a" value={1} onChange={this.onChange} >设为默认</Radio>
            </Col>
          </Col>
        </Row>

        <Row className={styles.tab_cell}>
          <Col span={24}  className={styles.tab_title}>
            <Col span={1} className={styles.location_icon_content}>
              <img src="src/images/location_icon.svg" alt="" className={styles.location_icon}/>
            </Col>
            <Col span={23} className={styles.add_name}>
              黄浦区济南路260弄翠湖天地隽荟12栋6
            </Col>
          </Col>
          <Col span={24}  className={styles.tab_title}>
            <Col span={10} className={styles.people_name}>
              XXX收
            </Col>
            <Col span={14}>
              电话：18743353579
            </Col>
          </Col>
          <Col span={24}  className={styles.tab_title}>
            <Col span={5}>
              <img src="src/images/edit_icon.svg" alt="" className={styles.edit_icon}/>编辑地址
            </Col>
            <Col span={5}>
              <img src="src/images/delete_icon.svg" alt="" className={styles.delete_icon}/>删除地址
            </Col>
            <Col span={5} offset={9}>
              <Radio key="a" value={1} onChange={this.onChange} >设为默认</Radio>
            </Col>
          </Col>
        </Row>

        <Row className={styles.tab_cell}>
          <Col span={24}  className={styles.tab_title}>
            <Col span={1} className={styles.location_icon_content}>
              <img src="src/images/location_icon.svg" alt="" className={styles.location_icon}/>
            </Col>
            <Col span={23} className={styles.add_name}>
              黄浦区济南路260弄翠湖天地隽荟12栋6
            </Col>
          </Col>
          <Col span={24}  className={styles.tab_title}>
            <Col span={10} className={styles.people_name}>
              XXX收
            </Col>
            <Col span={14}>
              电话：18743353579
            </Col>
          </Col>
          <Col span={24}  className={styles.tab_title}>
            <Col span={5}>
              <img src="src/images/edit_icon.svg" alt="" className={styles.edit_icon}/>编辑地址
            </Col>
            <Col span={5}>
              <img src="src/images/delete_icon.svg" alt="" className={styles.delete_icon}/>删除地址
            </Col>
            <Col span={5} offset={9}>
              <Radio key="a" value={1} onChange={this.onChange} >设为默认</Radio>
            </Col>
          </Col>
        </Row>

        <Row className={styles.tab_cell}>
          <Col span={24}  className={styles.tab_title}>
            <Col span={1} className={styles.location_icon_content}>
              <img src="src/images/location_icon.svg" alt="" className={styles.location_icon}/>
            </Col>
            <Col span={23} className={styles.add_name}>
              黄浦区济南路260弄翠湖天地隽荟12栋6
            </Col>
          </Col>
          <Col span={24}  className={styles.tab_title}>
            <Col span={10} className={styles.people_name}>
              XXX收
            </Col>
            <Col span={14}>
              电话：18743353579
            </Col>
          </Col>
          <Col span={24}  className={styles.tab_title}>
            <Col span={5}>
              <img src="src/images/edit_icon.svg" alt="" className={styles.edit_icon}/>编辑地址
            </Col>
            <Col span={5}>
              <img src="src/images/delete_icon.svg" alt="" className={styles.delete_icon}/>删除地址
            </Col>
            <Col span={5} offset={9}>
              <Radio key="a" value={1} onChange={this.onChange} >设为默认</Radio>
            </Col>
          </Col>
        </Row>

        <Row className={styles.tab_cell}>
          <Col span={24}  className={styles.tab_title}>
            <Col span={1} className={styles.location_icon_content}>
              <img src="src/images/location_icon.svg" alt="" className={styles.location_icon}/>
            </Col>
            <Col span={23} className={styles.add_name}>
              黄浦区济南路260弄翠湖天地隽荟12栋6
            </Col>
          </Col>
          <Col span={24}  className={styles.tab_title}>
            <Col span={10} className={styles.people_name}>
              XXX收
            </Col>
            <Col span={14}>
              电话：18743353579
            </Col>
          </Col>
          <Col span={24}  className={styles.tab_title}>
            <Col span={5}>
              <img src="src/images/edit_icon.svg" alt="" className={styles.edit_icon}/>编辑地址
            </Col>
            <Col span={5}>
              <img src="src/images/delete_icon.svg" alt="" className={styles.delete_icon}/>删除地址
            </Col>
            <Col span={5} offset={9}>
              <Radio key="a" value={1} onChange={this.onChange} >设为默认</Radio>
            </Col>
          </Col>
        </Row>

        <Row className={styles.tab_cell}>
          <Col span={24}  className={styles.tab_title}>
            <Col span={1} className={styles.location_icon_content}>
              <img src="src/images/location_icon.svg" alt="" className={styles.location_icon}/>
            </Col>
            <Col span={23} className={styles.add_name}>
              黄浦区济南路260弄翠湖天地隽荟12栋6
            </Col>
          </Col>
          <Col span={24}  className={styles.tab_title}>
            <Col span={10} className={styles.people_name}>
              XXX收
            </Col>
            <Col span={14}>
              电话：18743353579
            </Col>
          </Col>
          <Col span={24}  className={styles.tab_title}>
            <Col span={5}>
              <img src="src/images/edit_icon.svg" alt="" className={styles.edit_icon}/>编辑地址
            </Col>
            <Col span={5}>
              <img src="src/images/delete_icon.svg" alt="" className={styles.delete_icon}/>删除地址
            </Col>
            <Col span={5} offset={9}>
              <Radio key="a" value={1} onChange={this.onChange} >设为默认</Radio>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}

AddAddress.defaultProps = {
}

AddAddress.propTypes = {
};
