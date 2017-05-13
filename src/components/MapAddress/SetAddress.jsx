// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Icon, Button, Form, Input, Radio, message } from 'antd'
import classnames from 'classnames'
import { Link, withRouter } from 'react-router'
import Toolbar from '../common/Toolbar';
import PopWindow from '../common/PopWindow';
import styles from './set_address.less'
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
    if (sessionStorage.edit_address) {
      const edit_address = JSON.parse(sessionStorage.edit_address);
      this.setState({
        address: edit_address,
        action: 'edit'
      })
    }
  }

  componentWillUnmount() {
    sessionStorage.removeItem('map_address');
    sessionStorage.removeItem('edit_address');
  }

  handleSubmit(e) {
    e.preventDefault();
    const { address } = this.state;
    let { name, phone, map_address, house_number } = this.props.form.getFieldsValue();

    if (name && phone && map_address && house_number) {
      address.name = name;
      address.phone = phone;
      address.address_detail = map_address;
      address.house_number = house_number;
      // 新建或更新地址
      this.createOrUpdateAddress(address);
    } else {
      message.warning('请完善地址信息');
    }
  }

  createOrUpdateAddress(address) {
    let method = this.state.action === 'new' ? 'POST' : 'PUT';
    let id = this.state.action === 'new' ? '' : address.id;

    Agent(method, `http://closet-api.tallty.com/addresses/${id}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.closet_token)
      .set('X-User-Phone', localStorage.closet_phone)
      .send({
        address: {
          name: address.name,
          phone: address.phone,
          address_detail: address.address_detail,
          house_number: address.house_number
        }
      })
      .end((err, res) => {
        if (!err || err === null) {
          this.props.router.replace('/address');
        } else {
          message.warning('创建或更新地址失败');
        }
      })
  }

  handleMapSelect(address_detail, house_number) {
    this.setState({
      _address_detail: address_detail,
      _house_number: house_number,
      pop: false
    });
  }

  showMap() {
    this.setState({ pop: true });
  }

  onCancel() {
    this.setState({ pop: false });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { action, pop, address } = this.state;
    let title = action === 'new' ? '新建地址' : '编辑地址';
    let menu = action === 'new' ? '保存' : '更新';
    let address_input_value = sessionStorage.map_address ? sessionStorage.map_address : address.address_detail;

    return (
      <div className={styles.new_address}>
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
                      className={styles.set_address_input} />
                  )}
                </FormItem>
              </Col>
            </Col>
            <hr />

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
                      className={styles.set_address_input} />
                  )}
                </FormItem>
              </Col>
            </Col>

            <Col span={24} className={styles.label_input_title}>
              上门地址
            </Col>
            <Col span={24} className={styles.label_input}>
              <Col span={8} className={styles.label_input_head}>小区/大厦/学校:</Col>
              <Col span={13}>
                <FormItem >
                  {getFieldDecorator('map_address', { initialValue: address_input_value })(
                    <Input placeholder="手动输入上门地址" className={styles.set_address_input} />
                  )}
                </FormItem>
              </Col>
              <Col span={3} className={styles.label_input_head}>
                {/* <img src="src/images/orange_location_icon.svg" className={styles.location_icon}/> */}
                <div className={styles.map_location} onClick={this.showMap.bind(this)}>定位</div>
              </Col>
            </Col>

            <Col span={24} className={styles.label_input}>
              <Col span={8} className={styles.label_input_head}>楼号-门牌号:</Col>
              <Col span={16}>
                <FormItem id="control-input4" >
                  {getFieldDecorator('house_number', { initialValue: address.house_number })(
                    <Input id="control-input44" placeholder="例:16号楼423室" className={styles.set_address_input} />
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
          <MapAddress hiddenEvent={this.onCancel.bind(this)} />
        </PopWindow>
      </div>
    );
  }
}

SetAddress = Form.create({})(SetAddress);

export default withRouter(SetAddress);
