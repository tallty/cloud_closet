// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Input, Icon, Button } from 'antd'
import NavLink from '../../layouts/NavigationLayout/NavLink'
import classnames from 'classnames'
import Picker from 'react-mobile-picker';
import styles from './Dispatching.less'
import { DispatchingCard } from './dispatching_card/DispatchingCard';

const InputGroup = Input.Group;

export class Dispatching extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPickerShow: false,
      valueGroups: {
        title: '普通干洗',
      }, 
      optionGroups: {
        title: ['普通干洗', '精洗', '普通水洗', '特殊护理'],
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

    const {isPickerShow, optionGroups, valueGroups} = this.state;
    const maskStyle = {
      display: isPickerShow ? 'block' : 'none'
    };
    const pickerModalClass = classnames(
      styles.picker_modal,
      isPickerShow ? styles.picker_modal_toggle : ''
    );
    return (
      <div className={styles.Dispatching_content}>
        <Row className={styles.Dispatching_content_header}>
          <Col className={styles.cross_icon_col} span={2} offset={22}>
            <NavLink to="/manage"><Icon type="cross" className={styles.cross_icon} /></NavLink>
          </Col>
        </Row>
        <Row className={styles.tab_cell}>
          <NavLink to="/address">
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
              <Col span={5} offset={19} className={styles.address}>
                默认地址
              </Col>
            </Col>
          </NavLink>
        </Row>
        <Row className={styles.tab_cell}>
          <DispatchingCard />
          <div className={styles.time_btn}><Button>选择启用时间段</Button></div>
        </Row>
        <Row className={styles.tab_cell}>
          <Col span={4} >护理方式</Col>
          <Col span={18} >
            <input type="text" className={styles.weui_select} value={valueGroups.title} readOnly onClick={this.togglePicker} />
          </Col>
          <Col span={2} className={styles.icon_down}><Icon type="down" /></Col>
        </Row>
        <Row className={styles.tab_cell}>
          特别备注:对本次交易的特殊备注说明
        </Row>
        <Row className={styles.tab_cell}>
          <Col span={24} className={styles.pay_one}>运费：xxx</Col>
          <Col span={24} className={styles.pay_one}>服务费：xxx</Col>
          <Col span={24} className={styles.pay_two}>合计：<label>200.00</label></Col>
        </Row>
        <Row className={styles.dispatching_btn_div}>
          <Col span={24} className={styles.dispatching_btn_col}><Button className={styles.dispatching_btn}>确认配送</Button></Col>
        </Row>
        <Row className={styles.dispatch_footer_modal}>
          <Col span={24}>
            <div className={styles.picker_modal_container}>
              <div className={styles.picker_modal_mask} style={maskStyle} onClick={this.togglePicker}></div>
              <div className={pickerModalClass}>
                <header>
                  <div className={styles.title}>选择你的护理方式</div>
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

Dispatching.defaultProps = {
}

Dispatching.propTypes = {
};
