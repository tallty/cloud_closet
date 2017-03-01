// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Input, Icon, Button, DatePicker, Radio } from 'antd'
import NavLink from '../../layouts/NavigationLayout/NavLink'
import classnames from 'classnames'
import styles from './Dispatching.less'
import { DispatchingCard } from './dispatching_card/DispatchingCard';

const RadioGroup = Radio.Group;

export class Dispatching extends Component {
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
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
      float: 'right'
    };
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
          <div className={styles.time_btn}><DatePicker placeholder="选择配送时间" /></div>
        </Row>
        <Row className={styles.tab_cell}>
          <Col span={4}>配送方式:</Col>
          <Col span={20}>
            <RadioGroup onChange={this.onChange} value={this.state.value}>
              <Radio style={radioStyle} value={1}><span className={styles.span_color}>适用于可以折叠类的衣物</span><span className={styles.span_color_one}>快递配送</span></Radio>
              <Radio style={radioStyle} value={2}><span className={styles.span_color}>适用于礼服套装类的衣物</span><span className={styles.span_color_one}>官方人员配送</span></Radio>
            </RadioGroup>
          </Col>
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
      </div>
    );
  }
}

Dispatching.defaultProps = {
}

Dispatching.propTypes = {
};
