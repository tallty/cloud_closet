// 品牌主页
import React, { Component, PropTypes } from 'react'
import SuperAgent from 'superagent'
import locationPromise from '../Common/locationPromise'
import { Form, Radio, Button, Checkbox, DatePicker, Row, Col, Input,Icon } from 'antd'
import { Link, withRouter } from 'react-router'
import classnames from 'classnames'
import styles from './appointment.less'

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      name: '',
      phone: '',
      number: '',
      date: ''
    }
  }

  componentWillMount() {
    if (!localStorage.user_name) {
      this.getUserInfo();
    }
    // 调用接口，获取默认地址，然后保存在localStorage 中
  }

  getUserInfo() {
    SuperAgent
      .get("http://closet-api.tallty.com/user_info")
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (res.ok) {
          // 缓存
          localStorage.setItem('user_name', res.body.nickname)
          localStorage.setItem('phone', res.body.phone)
        } else {
          alert("获取用户信息失败")
        }
      })
  }

  choose_address(){
    this.props.router.replace('/address?from=appointment')
  }

  checkOrderTime(rule, value, callback){
    console.log(Date.now());
    console.log(value.valueOf());
    if (value && value.valueOf() < Date.now()) {
      callback(new Error("请选择一个未来的预约时间!"));
    } else {
      callback();
    }
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const store_address = localStorage.store_address ? JSON.parse(localStorage.store_address) : []
    const value = this.props.form.getFieldsValue();

    let address_d = store_address.address
    let name = localStorage.user_name
    let number = value.number
    let date = this.date2str(new Date(value.endDate), "yyyy-MM-d")

    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }else{
        this.pushAppoint(address_d, name, number, date )
      }
    });
  }

  // 时间格式转换函数
  date2str(x,y) { 
    let z ={
      y:x.getFullYear(),
      M:x.getMonth()+1,
      d:x.getDate(),
      h:x.getHours(),
      m:x.getMinutes(),
      s:x.getSeconds()
    }; 

    let value = y.replace(/(y+|M+|d+|h+|m+|s+)/g, (v) => {
                    return ( (v.length>1?"0":"") + eval('z.'+v.slice(-1))).slice(-(v.length>2?v.length:2) )
                  }
                ); 
    return value
  }

  // 预约
  pushAppoint(address_d, name, number, date){
    var url = "http://closet-api.tallty.com/appointments"
    SuperAgent
      .post(url)
      .set('Accept', 'application/json')
      .set('X-User-Phone', localStorage.phone)
      .set('X-User-Token', localStorage.authentication_token)
      .send({'appointment': {'address': address_d, 'name': name, 'phone': localStorage.phone, 'number': number, 'date': date}})
      .end( (err, res) => {
        if (res.ok) {
          this.props.router.replace('/success?action=appointment')
        }
      })   
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const store_address = localStorage.store_address?JSON.parse(localStorage.store_address):[]
    return (
      <div className={styles.order_container}>
        
        <p className={styles.title}>乐存好衣</p>
        
        <Row className={styles.order_content}>
          <Form horizontal onSubmit={this.handleSubmit.bind(this)} >
            <Col span={2} offset={11} className={styles.location_icon_content}>
              <img src="src/images/location_icon.svg" alt="" className={styles.location_icon}/>
            </Col>
            <div onClick={this.choose_address.bind(this)}>
              <Col className={styles.address_show} span={22}>
                {
                  localStorage.store_address ? 
                    <p>
                      {store_address.address}<br/>
                      <span>{store_address.phone} {store_address.name}</span>
                    </p> : 
                    <p>请选择一个地址</p>}
              </Col>
              <Col className={styles.address_show} span={2}>
                <Icon type="right" />
              </Col>
            </div>
            {/*<Col span={22}>
                <FormItem id="control-input1" >
                  {getFieldDecorator('address_city', { initialValue: '' })(
                    <Input id="control-input1" placeholder="上门服务"/>
                  )}
                </FormItem>
              </Col>*/}
            {/*<Col span={22} offset={2}>
              <FormItem id="control-input2">
              {getFieldDecorator('address_number', { initialValue: '' })(
                <Input id="control-input2" placeholder="输入您的所在楼层或门牌号码" className={styles.address_input}/>
              )}
              </FormItem>
            </Col>*/}
            <Col span={24} className={styles.line_two}>
              <FormItem className={styles.clo_number_radio}>
              {getFieldDecorator('number', { initialValue: '10' }, {
                rules: [
                  { required: true, message: 'Please select your gender' },
                ],
              })(
                <RadioGroup>
                  <RadioButton className={styles.label_one} value="10">10件</RadioButton>
                  <RadioButton className={styles.label_two} value="30">30件</RadioButton>
                  <RadioButton className={styles.label_three} value="50">50件</RadioButton>
                </RadioGroup>
              )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem className={styles.date_input}>
              {getFieldDecorator('endDate', {
                rules: [
                  {
                    required: true,
                    type: 'object',
                    message: '请选择预约时间?',
                  }, {
                    validator: this.checkOrderTime,
                  },
                ],
              })(
                <DatePicker placeholder="选择启用时间" />
              )}
              </FormItem>
            </Col>
            <Col span={24} className={styles.line_two}>
              {getFieldDecorator('check', { initialValue: '' }, {
                rules: [
                  { required: true, message: '请确认已阅读并同意遵守《关于云衣橱服装服务条例》' },
                ],
              })(<Checkbox></Checkbox>)}  
              <label className={styles.ruls_label}>我已阅读并同意遵守</label><label className={styles.ruls}>《关于云衣橱服装服务条例》</label>
            </Col>
            <Col span={24}>
              <FormItem>
                <Button className={styles.order_btn} type="primary" htmlType="submit">预 约</Button>
              </FormItem>
            </Col>
          </Form>
        </Row>
      </div>
    );
  }
}

Appointment = Form.create({})(Appointment);

export default withRouter(Appointment);
