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
    pop: false
  }

  componentWillUnmount() {
    localStorage.removeItem('title');
    localStorage.removeItem('address');
  }

  handleSubmit(e) {
    e.preventDefault();
    let { name, phone, address_number } = this.props.form.getFieldsValue();
    if (name && phone && address_number) {
      let address = {
        name: name,
        phone: phone,
        address_detail: localStorage.address + address_number
      }

      this.createAddress(address);
    } else {
      alert("请完善地址信息");
    }
  }

  createAddress(address) {
    Agent
      .post('http://closet-api.tallty.com/addresses')
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .send({address: address})
      .end((err, res) => {
        if (!err || err === null) {
          console.log(res.body);
          this.props.router.replace('/address');
        } else {
          console.log("创建新地址失败")
          console.dir(err);
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
    const { pop } = this.state;
    return (
      <div className={styles.NewAddress_content}>
        <Form horizontal >
          <Toolbar url="/address" title="新建地址">
            <div onClick={this.handleSubmit.bind(this)}>保 存</div>
          </Toolbar>

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
              <Col span={12} className={styles.label_input_head}>
                <Row onClick={this.showMap.bind(this)}>
                  <Col span={2} className={styles.location_icon_content}>
                    <img src="src/images/location_icon.svg" alt="" className={styles.location_icon}/>
                  </Col>
                  <Col span={22} className={styles.location_icon_content}>
                    {localStorage.address ? localStorage.address : '点击这里'}
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