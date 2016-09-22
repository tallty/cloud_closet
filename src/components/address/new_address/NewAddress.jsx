// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Icon, Button } from 'antd'
import Picker from 'react-mobile-picker';
import NavLink from '../../../layouts/NavigationLayout/NavLink'
import classnames from 'classnames'
import styles from './NewAddress.less'

export class NewAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPickerShow: false,
      valueGroups: {
        title: 'Mr.',
        firstName: 'Micheal',
        secondName: 'Jordan'
      }, 
      optionGroups: {
        title: ['Mr.', 'Mrs.', 'Ms.', 'Dr.'],
        firstName: ['John', 'Micheal', 'Elizabeth'],
        secondName: ['Lennon', 'Jackson', 'Jordan', 'Legend', 'Taylor']
      }
    }
  }

  // Update the value in response to user picking event 
  handleChange = (name, value) => {
    this.setState(({valueGroups}) => ({
      valueGroups: {
        ...valueGroups,
        [name]: value
      }
    }));
  }

  togglePicker = () => {
    this.setState(({isPickerShow}) => ({
      isPickerShow: !isPickerShow
    }));
  }

  render() {
    let tab_height = document.body.clientHeight;
    const {isPickerShow, optionGroups, valueGroups} = this.state;
    const maskStyle = {
      display: isPickerShow ? 'block' : 'none'
    };
    const pickerModalClass = classnames(
      styles.picker_modal,
      isPickerShow ? styles.picker_modal_toggle : ''
    );
    return (
      <div className={styles.NewAddress_content} style={{height: tab_height}}>
        <Row className={styles.new_address_header}>
          <Col span={2} ><NavLink to="/address" style={{color:'#fff'}}><Icon type="left" /></NavLink></Col>
          <Col span={16} offset={2}  className={styles.tab_title}>编辑地址</Col>
          <Col span={4}  className={styles.tab_save}>
            <NavLink to="/address" style={{color:'#fff'}}>
              <Button type="primary" className={styles.add_new_address_btn}>保存</Button>
            </NavLink>
          </Col>
        </Row>
        <Row className={styles.new_address_body}>
          <Col span={24} className={styles.new_address_input_col}>
            <Col span={6} className={styles.new_address_input_col_label}>收件人</Col>
            <Col span={18} className={styles.new_address_input_col_input}>
              <input type=" " placeholder="收件人姓名" />
            </Col>
          </Col>
          <Col span={24} className={styles.new_address_input_col}>
            <Col span={6} className={styles.new_address_input_col_label} >联系电话</Col>
            <Col span={18} className={styles.new_address_input_col_input}>
              <input type="number" placeholder="请输入收件人联系电话"/>
            </Col>
          </Col>
          <Col span={24} className={styles.new_address_input_col}>
            <Col span={6} className={styles.new_address_input_col_label} >所在地址</Col>
            <Col span={18} className={styles.new_address_input_col_input}>
              <Col span={22} >
                <input
                type="text"
                className={styles.weui_select}
                value={valueGroups.title + '-' + valueGroups.firstName + '-' + valueGroups.secondName}
                readOnly
                onClick={this.togglePicker} />
              </Col>
              <Col span={2} className={styles.icon_down}><Icon type="down" /></Col>
            </Col>
          </Col>
          <Col span={24} className={styles.new_address_input_col}>
            <Col span={24} className={styles.new_address_input_col_input}>
              <textarea className={styles.new_address_input_col_input_textarea} placeholder="详细地址" name="address" rows="4" cols="30" />
            </Col>
          </Col>
        </Row>
        <Row className={styles.new_address_footer}>
          <Col span={24}>
            <NavLink to="/address" style={{color:'#fff'}}>
              <Button type="primary" className={styles.delete_new_address_btn}>取消</Button>
            </NavLink>
          </Col>
        </Row>

        <Row className={styles.new_address_footer_modal}>
          <Col span={24}>
            <div className={styles.picker_modal_container}>
              <div className={styles.picker_modal_mask} style={maskStyle} onClick={this.togglePicker}></div>
              <div className={pickerModalClass}>
                <header>
                  <div className={styles.title}>选择你所在街道</div>
                  <a href="javascript:;" onClick={this.togglePicker}>完成</a>
                </header>
                <Picker
                 optionGroups={optionGroups}
                 valueGroups={valueGroups}
                 onChange={this.handleChange} />
              </div>
            </div>
          </Col>
        </Row>

      </div>
    );
  }
}

NewAddress.defaultProps = {
}

NewAddress.propTypes = {
};
