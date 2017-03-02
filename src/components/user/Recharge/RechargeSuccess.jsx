import React, { Component } from 'react';
import css from './recharge.less';
import { withRouter } from 'react-router';
import { Button } from 'antd';

class RechargeSuccess extends Component {

  state = {
    redirect_url: "",
    money: 0
  }

  componentWillMount() {
    console.log(this.props.location);
    let redirect_url = this.props.location.query.redirect_url;
    let money = this.props.location.query.money;
    if (redirect_url && money) {
      this.setState({ 
        redirect_url: redirect_url,
        money: money
      });
    }
  }

  handleClick() {
    this.props.router.replace(this.state.redirect_url);
  }

  render() {
    return (
      <div className={css.success}>
        <img src="src/images/recharge_ok_icon.svg" alt="success"/>
        <p className={css.title}>成功充值</p>

        <div className={css.content}>
          <p>支付方式<span className={css.orange}>微信支付</span></p>
          <p>充值金额<span>￥ {this.state.money}</span></p>
        </div>

        <Button className={css.complete_btn} onClick={this.handleClick.bind(this)}>完成</Button>
      </div>
    );
  }
}

export default withRouter(RechargeSuccess);