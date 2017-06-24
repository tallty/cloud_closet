// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Input, Icon, Button, DatePicker, Radio, message } from 'antd'
import NavLink from '../../layouts/NavigationLayout/NavLink'
import { Link, withRouter } from 'react-router';
import classnames from 'classnames'
import SuperAgent from 'superagent';
import styles from './Dispatching.less'
import { DispatchingCard } from './dispatching_card/DispatchingCard';

const RadioGroup = Radio.Group;

class Dispatching extends Component {
  state = {
    way: '官方人员配送',
    garments: [],
    time: '',
    remark: '',
    address: {},
    isDefaultAddress: false,
    user: {},
    serviceCost: 100,
    deliveryCost: 0,
    loading: false,
    isSubmited: false,
    order: {}
  }

  componentWillMount() {
    const data = JSON.parse(sessionStorage.getItem('dispatchGarments')) || {};
    const userObj = JSON.parse(localStorage.getItem('closet_user')) || {};
    this.setState({
      garments: data,
      user: userObj
    });
    this.getDefaultAddress(userObj.default_address_id);
  }

  onDeliveryChange(e) {
    const str = e.target.value;
    this.setState({
      way: str,
      serviceCost: str === '官方人员配送' ? 100 : 0
    });
  }

  onDateChange(date, dateString) {
    this.setState({ time: dateString });
  }

  onSubmit() {
    const { address, time, way, remark, garments, deliveryCost, serviceCost } = this.state;
    if (!address.name || !time || !way) {
      message.error('请完善配送订单信息');
      return;
    }
    if (garments.length <= 0) {
      message.error('未选择配送的衣服');
      return;
    }
    this.setState({ loading: true });
    const ids = garments.map(item => item.id);
    const orderData = {
      address: address.address_detail,
      name: address.name,
      phone: address.phone,
      delivery_time: time,
      delivery_method: way,
      delivery_cost: deliveryCost,
      service_cost: serviceCost,
      garment_ids: ids
    };
    if (!!remark) {
      orderData.remark = remark;
    }
    SuperAgent
      .post('http://closet-api.tallty.com/delivery_orders')
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.closet_token)
      .set('X-User-Phone', localStorage.closet_phone)
      .send({ delivery_order: orderData })
      .end((err, res) => {
        if (!err || err === null) {
          this.setState({ loading: false, isSubmited: true, order: res.body });
          message.success('配送订单生成成功');
        } else {
          this.setState({ loading: false });
          message.error('配送订单生成失败');
        }
      })
  }

  onPayOrder() {
    this.setState({ loading: true });
    const order = this.state.order;
    SuperAgent
      .post(`http://closet-api.tallty.com/delivery_orders/${order.id}/pay`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.closet_token)
      .set('X-User-Phone', localStorage.closet_phone)
      .end((err, res) => {
        if (!err || err === null) {
          this.setState({ loading: false });
          message.success('配送订单支付成功');
          this.props.router.replace('/orders');
        } else {
          this.setState({ loading: false });
          message.error('配送订单支付失败');
        }
      })
  }

  onCancelOrder() {
    this.setState({ loading: true });
    const order = this.state.order;
    SuperAgent
      .delete(`http://closet-api.tallty.com/delivery_orders/${order.id}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.closet_token)
      .set('X-User-Phone', localStorage.closet_phone)
      .end((err, res) => {
        if (!err || err === null) {
          this.setState({ loading: false });
          message.success('配送订单取消成功');
          this.props.router.replace('/MyCloset');
        } else {
          this.setState({ loading: false });
          message.error('配送订单取消失败');
        }
      })
  }

  getDefaultAddress(id) {
    const addressStr = sessionStorage.selected_address;
    if (addressStr) {
      this.setState({
        address: JSON.parse(addressStr)
      })
      return;
    }
    SuperAgent
      .get(`http://closet-api.tallty.com/addresses/${id}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.closet_token)
      .set('X-User-Phone', localStorage.closet_phone)
      .end((err, res) => {
        if (!err || err === null) {
          const addre = JSON.stringify(res.body);
          sessionStorage.setItem('selected_address', addre);
          this.setState({
            address: res.body,
            isDefaultAddress: true
          });
        } else {
          this.setState({ address: {} });
        }
      })
  }

  disabledDate(current) {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return current && current.valueOf() < date;
  }

  chooseAddress() {
    sessionStorage.setItem('addresses_back_url', '/dispatching');
    this.props.router.push('/address');
  }

  remarkChange(e) {
    this.setState({ remark: e.target.value });
  }

  render() {
    const { garments, isDefaultAddress, address, remark, serviceCost, deliveryCost, loading, isSubmited } = this.state;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px'
    };
    return (
      <div className={styles.Dispatching_content}>
        <Row className={styles.Dispatching_content_header}>
          <Col className={styles.cross_icon_col} span={2} offset={22}>
            <NavLink to="/MyCloset"><Icon type="cross" className={styles.cross_icon} /></NavLink>
          </Col>
        </Row>
        <Row className={styles.tab_cell}>
          <div onClick={isSubmited ? null : this.chooseAddress.bind(this)}>
            <Col span={22}>
              <Col span={24} className={styles.tab_title}>
                <Col span={1} className={styles.location_icon_content}>
                  <img src="src/images/location_icon.svg" alt="" className={styles.location_icon} />
                </Col>
                <Col span={23} className={styles.add_name}>
                  &nbsp;&nbsp;{address.address_detail}
                </Col>
              </Col>
              <Col span={24} className={styles.tab_title}>
                <Col span={10} className={styles.people_name}>
                  收件人：{address.name}
                </Col>
                <Col span={14}>
                  电话：{address.phone}
                </Col>
              </Col>
            </Col>
            <Col className={styles.address_show} span={2}>
              {isSubmited ? null : <Icon type="right" />}
            </Col>
            {
              isDefaultAddress ?
                <Col span={24} className={styles.tab_title}>
                  <Col span={5} offset={19} className={styles.address}>
                    默认地址
                  </Col>
                </Col> : null
            }
          </div>
        </Row>
        <Row className={styles.tab_cell}>
          <DispatchingCard garments={garments} />
          <div className={styles.time_btn}>
            <DatePicker
              disabled={isSubmited}
              disabledDate={this.disabledDate}
              onChange={this.onDateChange.bind(this)}
              placeholder="选择配送时间" />
          </div>
        </Row>
        <Row className={styles.tab_cell}>
          <Col span={24}>配送方式:</Col>
          <Col span={24}>
            <RadioGroup onChange={this.onDeliveryChange.bind(this)} value={this.state.way} disabled={isSubmited}>
              <Radio style={radioStyle} value="快递配送">
                <span className={styles.span_color_one}>快递（顺丰到付）</span>
                <span className={styles.span_color}>适用于可以折叠类的衣物</span>
              </Radio>
              <Radio style={radioStyle} value="官方人员配送">
                <span className={styles.span_color_one}>专员限时配送 </span>
                <span className={styles.span_color}> 适用于礼服套装类的衣物</span>
              </Radio>
            </RadioGroup>
          </Col>
        </Row>
        <Row className={styles.tab_cell}>
          <Col span={6}>
            <p style={{ lineHeight: '28px' }}>特别备注:</p>
          </Col>
          <Col span={18}>
            <Input
              type="text"
              disabled={isSubmited}
              onChange={this.remarkChange.bind(this)}
              value={remark}
              placeholder="对本次交易的特殊备注说明"
              style={{ textAlign: 'left' }} />
          </Col>
        </Row>
        <Row className={styles.tab_cell}>
          <Col span={24} className={styles.pay_one}>服务费：{serviceCost} 元</Col>
          <Col span={24} className={styles.pay_two}>合计：<label>{serviceCost}</label></Col>
        </Row>
        <Row className={styles.dispatching_btn_div}>
          <Col span={24} className={styles.dispatching_btn_col}>
            {
              isSubmited ?
                <div>
                  <Button loading={loading} className={styles.dispatching_btn} onClick={this.onPayOrder.bind(this)}>立即付款</Button>
                  <Button loading={loading} className={styles.cancelBtn} onClick={this.onCancelOrder.bind(this)}>取消订单</Button>
                </div> :
                <Button loading={loading} className={styles.dispatching_btn} onClick={this.onSubmit.bind(this)}>确认配送</Button>
            }
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

export default withRouter(Dispatching);
