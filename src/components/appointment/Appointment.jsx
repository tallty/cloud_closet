// 品牌主页
import React, { Component, PropTypes } from 'react'
import SuperAgent from 'superagent'
import locationPromise from '../Common/locationPromise'
import { Spiner } from '../common/Spiner';
import { Form, Radio, Button, Checkbox, DatePicker, Row, Col, Input, Icon, Menu, Dropdown, Select, message } from 'antd'
import { Link, withRouter } from 'react-router'
import classnames from 'classnames'
import styles from './appointment.less'
import Carousel from './Carousel.jsx'

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const height = window.innerHeight * 0.305;
const Option = Select.Option;

class Appointment extends Component {
  state = {
    defaultAddress: null,
    agree: true,
    storeTime: '3个月',
    showDateTips: false
  }

  componentWillMount() {
    // 如果是手动选择地址，显示选择的地址
    if (sessionStorage.selected_address) {
      const address = JSON.parse(sessionStorage.selected_address);
      this.setState({ defaultAddress: address });
    }
  }

  componentDidMount() {
    this.getUserInfo();
  }

  componentWillUnmount() {
    // 是否手动选择地址
    sessionStorage.removeItem('is_select_address');
  }

  getUserInfo() {
    SuperAgent
      .get('http://closet-api.tallty.com/user_info')
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.closet_token)
      .set('X-User-Phone', localStorage.closet_phone)
      .end((err, res) => {
        if (!err || err === null) {
          // 缓存
          const user = res.body;
          const str = JSON.stringify(user);
          localStorage.setItem('user', str);
          // 如果没有手动选择地址，显示默认地址
          if (!sessionStorage.selected_address) {
            this.getDefaultAddress(user.default_address_id);
          }
        } else {
          message.warning('获取用户信息失败');
        }
      })
  }

  getDefaultAddress(default_address_id) {
    SuperAgent
      .get(`http://closet-api.tallty.com/addresses/${default_address_id}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.closet_token)
      .set('X-User-Phone', localStorage.closet_phone)
      .end((err, res) => {
        if (!err || err === null) {
          const addre = JSON.stringify(res.body);
          sessionStorage.setItem('selected_address', addre);
          this.setState({ defaultAddress: res.body });
        } else {
          this.setState({ defaultAddress: {} });
        }
      })
  }

  choose_address() {
    sessionStorage.setItem('addresses_back_url', '/appointment');
    this.props.router.replace('/address');
  }

  checkOrderTime(rule, value, callback) {
    if (value && value.valueOf() < Date.now()) {
      callback(new Error('我们的服务需提前三日预约!'));
    } else {
      callback();
    }
  }

  handleMenuClick(e) {
    this.setState({ storeTime: e.key })
  }

  handleCheck(e) {
    this.setState({ agree: !e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const selected_address = sessionStorage.selected_address ? JSON.parse(sessionStorage.selected_address) : {};
    const value = this.props.form.getFieldsValue();

    if (value.check) {
      this.props.form.validateFieldsAndScroll((errors, values) => {
        if (errors) {
          message.warning('表单填写有误');
        } else {
          this.pushAppoint(selected_address, value);
        }
      });
    } else {
      this.setState({ agree: false });
    }
  }

  // 时间格式转换函数
  date2str(x, y) {
    const z = {
      y: x.getFullYear(),
      M: x.getMonth() + 1,
      d: x.getDate(),
      h: x.getHours(),
      m: x.getMinutes(),
      s: x.getSeconds()
    };

    const value = y.replace(/(y+|M+|d+|h+|m+|s+)/g, (v) => {
      return ((v.length > 1 ? '0' : '') + eval('z.' + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2))
    });
    return value
  }

  // 预约
  pushAppoint(selected_address, value) {
    let address_detail = selected_address.address_detail;
    let name = selected_address.name;
    let number = value.number;
    let date = this.date2str(new Date(value.endDate), "yyyy-MM-d");

    if (address_detail && number && date) {
      SuperAgent
        .post("http://closet-api.tallty.com/appointments")
        .set('Accept', 'application/json')
        .set('X-User-Phone', localStorage.closet_phone)
        .set('X-User-Token', localStorage.closet_token)
        .send({ 'appointment': { 'address': address_detail, 'name': name, 'phone': localStorage.closet_phone, 'number': number, 'date': date } })
        .end((err, res) => {
          if (res.ok) {
            sessionStorage.removeItem('selected_address');
            this.props.router.replace('/success?action=appointment')
          }
        })
    } else {
      message.warning('请选择地址');
    }
  }

  disabledDate(current) {
    var d = new Date();
    // 将日期向后推2天
    d.setDate(d.getDate() + 2);
    return current && current.valueOf() < d;
  }

  showTips() {
    const sta = this.state.showDateTips
    this.setState({ showDateTips: !sta })
  }

  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick.bind(this)}>
        <Menu.Item key="3个月">3个月</Menu.Item>
        <Menu.Item key="6个月">6个月</Menu.Item>
        <Menu.Item key="9个月">9个月</Menu.Item>
        <Menu.Item key="1年">1年</Menu.Item>
        <Menu.Item key="2年">2年</Menu.Item>
      </Menu>
    );
    const { defaultAddress, agree, showDateTips } = this.state;
    const { getFieldDecorator } = this.props.form;
    const selected_address = sessionStorage.selected_address ? JSON.parse(sessionStorage.selected_address) : null;
    return (
      <div className={styles.order_container}>

        {/*<p className={styles.title}>乐存好衣</p>autoplay*/}
        {/*<img className={styles.appointment_top_bg} src="src/images/appointment_top_bg.png" alt=""/>*/}
        <div style={showDateTips ? {} : { display: 'none' }} className={styles.calendarTip}><label>我们的服务需提前三日预约</label></div>
        <Row className={styles.appointment_top_sark}>
          <Col span={24} style={{ height: height }}>
            <Carousel />
          </Col>
        </Row>
        <Row className={styles.order_content}>
          {
            defaultAddress ?
              <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)} >
                <Col span={20} offset={2} className={styles.location_icon_content}>
                  <img src="src/images/orange_location_icon.svg" alt="" className={styles.location_icon} />
                </Col>
                <div onClick={this.choose_address.bind(this)}>
                  <Col className={styles.address_show} span={20} offset={2}>
                    {
                      selected_address ?
                        <p>
                          {selected_address.address_detail} {selected_address.house_number}<br />
                          <span>{selected_address.phone} {selected_address.name}</span>
                        </p> :
                        <p style={{ height: 42, lineHeight: '40px' }}>请选择一个地址</p>}
                  </Col>
                  <Col className={styles.address_show} span={2}>
                    <Icon type="right" />
                  </Col>
                </div>
                <Col span={24} className={styles.line_no_two}>
                  <FormItem className={styles.clo_number_radio}>
                    {getFieldDecorator('number', { initialValue: '10' }, {
                      rules: [
                        { required: true, message: '请选择衣服数量' },
                      ]
                    })(
                      <RadioGroup>
                        <RadioButton className={styles.label_one} value="10">5-20件</RadioButton>
                        <RadioButton className={styles.label_two} value="30">20-50件</RadioButton>
                        <RadioButton className={styles.label_three} value="50">大于50件</RadioButton>
                      </RadioGroup>
                      )}
                  </FormItem>
                </Col>
                <div className={styles.timeSlector}>
                  <Col span={12}>
                    <FormItem className={styles.date_input}>
                      {getFieldDecorator('endDate', {
                        rules: [
                          {
                            required: true,
                            type: 'object',
                            message: '请选择服务时间?'
                          }, {
                            validator: this.checkOrderTime
                          }
                        ]
                      })(
                        <DatePicker disabledDate={this.disabledDate} showToday={false} onOpenChange={this.showTips.bind(this)} placeholder="选择服务时间" />
                        )}
                    </FormItem>
                  </Col>
                  <Col span={12} className={styles.dateSelector}>
                    <p>使用</p>
                    <Dropdown overlay={menu} trigger={['click']}>
                      <Button style={{ width: '100%' }}>
                        {this.state.storeTime}<Icon type="down" />
                      </Button>
                    </Dropdown>
                  </Col>
                </div>
                <Col span={24} className={styles.line_tips}>*选择预计存衣数量与使用时间，我们将更效率的完成收取工作。</Col>
                <Col span={24} className={styles.line_two}>
                  {getFieldDecorator('check', { initialValue: false }, {
                    rules: [
                      { required: true, message: '*预约成功后，我们将上门服务并计算最终费用，确认请点击预约。' }
                    ],
                  })(<Checkbox onChange={this.handleCheck.bind(this)}></Checkbox>)}
                  <label className={styles.ruls_label}>我已阅读并同意遵守</label><Link to="/protocol"><label className={styles.ruls}>《关于云衣橱服装服务条例》</label></Link>
                </Col>
                <Col span={24}>
                  {agree ? null : <p className={styles.hint}>*预约成功后，我们将上门服务并计算最终费用，确认请点击预约。</p>}
                </Col>
                <Col span={24}>
                  <FormItem>
                    <Button className={styles.order_btn} type="primary" htmlType="submit">预 约</Button>
                  </FormItem>
                </Col>
              </Form> : <Spiner />
          }
        </Row>
      </div>
    );
  }
}

Appointment = Form.create({})(Appointment);

export default withRouter(Appointment);
