import React, { Component } from 'react';
import css from './recharge.less';
import { withRouter } from 'react-router';
import { Button } from 'antd';

class RechargeSuccess extends Component {

  state = {
    redirectUrl: '',
    money: 0
  }

  componentWillMount() {
    const soneRedirectUrl = this.props.location.query.redirect_url;
    const someMoney = this.props.location.query.money;
    if (soneRedirectUrl && someMoney) {
      this.setState({
        redirectUrl: soneRedirectUrl,
        money: someMoney
      });
    }
  }

  handleClick() {
    this.props.router.replace(this.state.redirectUrl);
  }

  render() {
    return (
      <div className={css.success}>
        <img src="src/images/recharge_ok_icon.svg" alt="success" />
        <p className={css.title}>充值成功</p>

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
