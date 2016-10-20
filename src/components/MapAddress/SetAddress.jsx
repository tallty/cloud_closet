// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Icon, Button, Form, Input, Radio } from 'antd'
import classnames from 'classnames'
import { Link, withRouter } from 'react-router'
import NavLink from '../../layouts/NavigationLayout/NavLink'
import styles from '../address/new_address/NewAddress.less'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class SetAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillUnmount() {
    localStorage.removeItem('title');
    localStorage.removeItem('address');
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('Received values of form:', this.props.form.getFieldsValue());
    this.props.router.replace('/address')
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.NewAddress_content}>
        <Form horizontal >
          <Row className={styles.new_address_header}>
            <Col span={2} ><NavLink to="/address" style={{color:'#fff'}}><Icon type="left" /></NavLink></Col>
            <Col span={16} offset={2}  className={styles.tab_title}>新建地址</Col>
            <Col span={4}  className={styles.tab_save}>
              <Button type="primary" className={styles.add_new_address_btn} onClick={this.handleSubmit.bind(this)}>保存</Button>
            </Col>
          </Row>
          <Row className={styles.set_address_form}>
            <Col span={24} className={styles.label_input_title}>
              联系人
            </Col>
            <Col span={24} className={styles.label_input}>
              <Col span={6} className={styles.label_input_head}>姓名:</Col>
              <Col span={18}>
                <FormItem id="control-input1" >
                {getFieldDecorator('name', { initialValue: '' })(
                  <Input id="control-input11" placeholder="请填写寄货/收货人的姓名" className={styles.set_address_input}/>
                )}
                </FormItem>
              </Col>
            </Col>
            <Col span={24} className={styles.label_sex_input}>
              <Col span={6} offset={6}>
                <Button className={styles.sex_button} type="ghost" icon="search">女士</Button>
              </Col>
              <Col span={6} >
                <Button className={styles.sex_button} type="ghost" icon="search">男士</Button>
              </Col>
            </Col>
            <Col span={24} className={styles.label_input}>
              <Col span={6} className={styles.label_input_head}>电话:</Col>
              <Col span={18}>
                <FormItem id="control-input2">
                {getFieldDecorator('phone', { initialValue: '' })(
                  <Input id="control-input22" placeholder="请填写寄货/收货人的手机号码" className={styles.set_address_input}/>
                )}
              </FormItem>
              </Col>
              
            </Col>
            <Col span={24} className={styles.label_input_title}>
              上门地址
            </Col>
            <Col span={24} className={styles.label_input}>
              <Col span={8} className={styles.label_input_head}>小区/大厦/学校:</Col>
              <NavLink to="/map_address">
                <Col span={12} className={styles.label_input_head}>
                  <Row>
                    <Col span={2} className={styles.location_icon_content}>
                      <img src="src/images/location_icon.svg" alt="" className={styles.location_icon}/>
                    </Col>
                    <Col span={22} className={styles.location_icon_content}>
                      {localStorage.address || localStorage.title ? localStorage.title + localStorage.address:'点击这里'}
                    </Col>
                  </Row>
                </Col>
                <Col span={4} className={styles.label_input_head}><Icon type="right" /></Col>
              </NavLink>
            </Col>
            <Col span={24} className={styles.label_input}>
              <Col span={8} className={styles.label_input_head}>楼号-门牌号:</Col>
              <Col span={16}>
                <FormItem id="control-input4" >
                {getFieldDecorator('address_number', { initialValue: '' })(
                  <Input id="control-input44" placeholder="例:16号楼423室" className={styles.set_address_input}/>
                )}
              </FormItem>
              </Col>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

SetAddress = Form.create({})(SetAddress);

export default withRouter(SetAddress)