/**
 * 个人中心 - 充值
 */
import SuperAgent from 'superagent'
import React, { Component, PropTypes } from 'react'
import WechatKit from '../../WechatConect/WechatKit'
import css from './recharge.less'
import { Link, withRouter } from 'react-router'
import { Row, Col, Button, message } from 'antd';
import pingpp from 'pingpp-js';

class Recharge extends Component {
  state = {
    selected: {},
    redirect_url: null,
    rules: []
  }

  componentWillMount() {
    const redirectUrl = this.props.location.query.redirect_url;
    SuperAgent
      .get('http://closet-api.tallty.com/recharge_rules')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (!err || err === null) {
          this.setState({
            rules: res.body.recharge_rules,
            selected: res.body.recharge_rules[0],
            redirect_url: redirectUrl
          })
        }
      })
  }

  getChargeObject() {
    const { selected } = this.state;
    SuperAgent
      .post(`http://closet-api.tallty.com/get_pingpp_pay_order?openid=${localStorage.openid}&amount=${selected.amount}&subject=${'充值'}&body=${'余额充值'}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (!err || err === null) {
          const charge = res.body;
          // 创建付款
          pingpp.createPayment(charge, (result, e) => {
            if (result === 'success') {
              const { redirect_url } = this.state;
              // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
              this.props.router.replace(`/recharge_success?redirect_url=${redirect_url}&money=${selected.amount}`);
            } else if (result === 'fail') {
              // charge 不正确或者微信公众账号支付失败时会在此处返回
            } else if (result === 'cancel') {
              // 微信公众账号支付取消支付
            }
          });
        }
      })
  }

  /**
   * 充值面额
   */
  getMoneyCard() {
    const { rules } = this.state;
    const list = []
    rules.forEach((item, i, obj) => {
      const klass = this.state.selected.amount !== item.amount ? css.card : css.card_active;
      list.push(
        <Col span={8} className={css.col} key={item.amount}>
          <Button
            className={klass}
            onClick={this.handleChooseMoney.bind(this, item)}
          >{item.amount}<span>元</span></Button>
        </Col>
      )
    });
    list.push(
      <Col span={8} className={css.col} key="rule">
        <Link to="" className={css.show_rule}>查看充值规则>></Link>
      </Col>
    );
    return list
  }

  /**
   * 选择充值面额点击事件
   */
  handleChooseMoney(item) {
    this.setState({ selected: item });
  }

  /**
   * [handlePayment 开始微信支付]
   */
  handlePayment() {
    if (this.state.selected.amount > 0) {
      this.getChargeObject();
    } else {
      alert('请选择充值金额');
    }
  }

  render() {
    const { selected } = this.state

    return (
      <div className={css.container}>
        <p className={css.title}>充<span>{selected.amount}</span>元</p>
        <p className={css.title}>获得{selected.credits}积分</p>
        <img src="/src/images/recharge_icon.svg" className={css.mainIcon} alt="充值" />
        {/* 充值面额 */}
        <div className={css.kinds}>
          <Row className={css.row}>
            {this.getMoneyCard()}
          </Row>
        </div>

        {/* 操作 */}
        <div className={css.actions}>
          <Button className={css.pay_btn} onClick={this.handlePayment.bind(this)}>
            我要充值
          </Button>
          <p className={css.search}>
            <Link to="/user">查询我的余额</Link>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <Link to="/user">我的充值记录</Link>
          </p>
        </div>
      </div>
    )
  }
}

export default withRouter(Recharge);
