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
    money: null,
    redirect_url: null
  }

  componentWillMount() {
    const redirect_url = this.props.location.query.redirect_url;
    if (redirect_url) {
      this.setState({ redirect_url: redirect_url });
    }
  }

  getChargeObject() {
    const { money } = this.state;
    SuperAgent
      .post(`http://closet-api.tallty.com/get_pingpp_pay_order?openid=${localStorage.openid}&amount=${money}&subject=${'充值'}&body=${'余额充值'}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (!err || err === null) {
          const charge = res.body;
          // 创建付款
          pingpp.createPayment(charge, (result, e) => {
            if (result === 'success') {
              const { redirect_url } = this.state;
              // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
              this.props.router.replace(`/recharge_success?redirect_url=${redirect_url}&money=${money}`);
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
    const cards = [1000, 2000, 3000, 5000, 10000, 20000, 50000, 100000];
    const list = []
    cards.forEach((item, i, obj) => {
      const klass = this.state.money !== item ? css.card : css.card_active;
      list.push(
        <Col span={8} className={css.col} key={item}>
          <Button
            className={klass}
            onClick={this.handleChooseMoney.bind(this, item)}
          >{item}<span>元</span></Button>
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
    console.log("你选择了" + item + "元");
    this.setState({ money: item });
  }

  /**
   * [handlePayment 开始微信支付]
   */
  handlePayment() {
    if (this.state.money > 0) {
      this.getChargeObject();
    } else {
      alert("请选择充值金额");
    }
  }

  render() {
    const { money } = this.state

    return (
      <div className={css.container}>
        <p className={css.title}>充<span>10000</span>元</p>
        <p className={css.title}>升级银卡会员，获得800积分</p>
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
