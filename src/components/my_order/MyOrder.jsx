// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Form, Radio, Button, Checkbox, DatePicker, Row, Col, Input } from 'antd'
import NavLink from '../../layouts/NavigationLayout/NavLink'
import classnames from 'classnames'
import styles from './MyOrder.less'

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export class MyOrder extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: true, };
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log('收到表单值：', this.props.form.getFieldsValue());
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className={styles.order_container}>
        {this.props.children}
        <p className={styles.title}>乐存</p>
        
        <Row className={styles.order_content}>
          <Form horizontal onSubmit={this.handleSubmit} >
            <Col span={2}>
              <img src="src/images/location_icon.svg" alt="" className={styles.location_icon}/>
            </Col>
            <Col span={22}>
              <FormItem id="control-input1">
                <Input id="control-input1" placeholder="上门服务" />
              </FormItem>
            </Col>
            <Col span={22} offset={2}>
              <FormItem id="control-input2">
                <Input id="control-input2" placeholder="输入您的所在楼层或门牌号码" className={styles.address_input}/>
              </FormItem>
            </Col>
            <Col span={24} className={styles.line_two}>
              <FormItem className={styles.clo_number_radio}>
                <RadioGroup {...getFieldProps('rg')}>
                  <RadioButton className={styles.label_one} value="10">10件</RadioButton>
                  <RadioButton className={styles.label_two} value="30">30件</RadioButton>
                  <RadioButton className={styles.label_three} value="50">50件</RadioButton>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem className={styles.date_input}>
                <DatePicker placeholder="选择启用时间" {...getFieldProps('startDate')} />
              </FormItem>
            </Col>
            <Col span={24} className={styles.line_two}>
              <Checkbox></Checkbox>  <label className={styles.ruls_label}>我已阅读并同意遵守</label><label className={styles.ruls}>《关于云衣橱服装服务条例》</label>
            </Col>
            <Col span={24}>
              <FormItem>
                <NavLink to="/login" >
                  <Button className={styles.order_btn} type="primary" htmlType="submit">预 约</Button>
                </NavLink>
              </FormItem>
            </Col>
          </Form>
        </Row>
      </div>
    );
  }
}

MyOrder.defaultProps = {
}

MyOrder.propTypes = {
};

MyOrder = Form.create()(MyOrder);


