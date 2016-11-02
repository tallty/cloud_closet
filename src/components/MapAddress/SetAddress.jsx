// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Icon, Button, Form, Input, Radio } from 'antd'
import classnames from 'classnames'
import { Link, withRouter } from 'react-router'
import Toolbar from '../common/Toolbar';
import PopWindow from '../common/PopWindow';
import styles from '../address/new_address/NewAddress.less'
import { MapAddress } from '../MapAddress/MapAddress'
import Agent from 'superagent';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class SetAddress extends Component {
  state = {
    action: 'new',
    pop: false,
    address: {}
  }

  componentWillMount() {
    console.log(localStorage.edit_address)
    let edit_address = JSON.parse(localStorage.edit_address);
    if (edit_address) {
      this.setState({
        address: edit_address,
        action: 'edit'
      })
    }
  }

  componentWillUnmount() {
    localStorage.removeItem('map_address');
    localStorage.setItem('edit_address', null);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { address } = this.state;
    let { name, phone, address_number } = this.props.form.getFieldsValue();

    if (name && phone && address_number) {
      address.name = name;
      address.phone = phone;
      address.address_detail = localStorage.map_address + address_number;
      // 新建或更新地址
      this.createOrUpdateAddress(address);
    } else {
      alert("请完善地址信息");
    }
  }

  createOrUpdateAddress(address) {
    let method = this.state.action === 'new' ? 'POST' : 'PUT';
    let id = this.state.action === 'new' ? '' : address.id;

    Agent(method, `http://closet-api.tallty.com/addresses/${id}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .send({
        address: {
          name: address.name,
          phone: address.phone,
          address_detail: address.address_detail
        }
      })
      .end((err, res) => {
        if (!err || err === null) {
          console.log(res.body);
          this.props.router.replace('/address');
        } else {
          console.log("创建或更新地址失败")
        }
      })
  }

  showMap() {
    this.setState({pop: true});
  }

  onCancel() {
    this.setState({pop: false});
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { action, pop, address } = this.state;
    let title = action === 'new' ? '新建地址' : '编辑地址';
    let menu = action === 'new' ? '保存' : '更新';

    return (
      <div className={styles.NewAddress_content}>
        <Form horizontal >
          <Toolbar url="/address" title={title}>
            <div onClick={this.handleSubmit.bind(this)}>{menu}</div>
          </Toolbar>

          <Row className={styles.set_address_form}>
            <Col span={24} className={styles.label_input_title}>
              联系人
            </Col>
            <Col span={24} className={styles.label_input}>
              <Col span={6} className={styles.label_input_head}>姓名:</Col>
              <Col span={18}>
                <FormItem id="control-input1" >
                {getFieldDecorator('name', { initialValue: address.name })(
                  <Input id="control-input11" 
                         placeholder="请填写寄货/收货人的姓名" 
                         className={styles.set_address_input}/>
                )}
                </FormItem>
              </Col>
            </Col>
            {
              /*
              <Col span={24} className={styles.label_sex_input}>
                <Col span={6} offset={6}>
                  <Button className={styles.sex_button} type="ghost" icon="search">女士</Button>
                </Col>
                <Col span={6} >
                  <Button className={styles.sex_button} type="ghost" icon="search">男士</Button>
                </Col>
              </Col>
               */
            }
            <Col span={24} className={styles.label_input}>
              <Col span={6} className={styles.label_input_head}>电话:</Col>
              <Col span={18}>
                <FormItem id="control-input2">
                {getFieldDecorator('phone', { initialValue: address.phone })(
                  <Input id="control-input22" 
                         placeholder="请填写寄货/收货人的手机号码" 
                         className={styles.set_address_input}/>
                )}
              </FormItem>
              </Col>
              
            </Col>
            <Col span={24} className={styles.label_input_title}>
              上门地址
            </Col>
            <Col span={24} className={styles.label_input}>
              <Col span={8} className={styles.label_input_head}>小区/大厦/学校:</Col>
              <Col span={12} className={styles.label_input_head}>
                <Row onClick={this.showMap.bind(this)}>
                  <Col span={2} className={styles.location_icon_content}>
                    <img src="src/images/location_icon.svg" alt="" className={styles.location_icon}/>
                  </Col>
                  <Col span={22} className={styles.location_icon_content}>
                    {localStorage.map_address ? localStorage.map_address : '点击这里'}
                  </Col>
                </Row>
              </Col>
              <Col span={4} className={styles.label_input_head}><Icon type="right" /></Col>
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
        
        {/* 地图选址 */}
        <PopWindow show={pop} 
                   direction='right' 
                   onCancel={this.onCancel.bind(this)}>
          <MapAddress hiddenEvent={this.onCancel.bind(this)}/>
        </PopWindow>
      </div>
    );
  }
}

SetAddress = Form.create({})(SetAddress);

export default withRouter(SetAddress)