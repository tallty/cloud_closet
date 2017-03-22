/**
 * 个人中心 - 发票
 */
import React, { Component } from 'react'
import css from './receipt.less'
import Toolbar from '../../common/Toolbar';
import { Link } from 'react-router'

export class Receipt extends Component {
  state = {
    money: 6800
  }
  // 发票金额
  componentWillMount() {
    this.setState({
      money: Number(this.props.location.query.amount) || 0
    });
  }
  //允许点击
  setAllowButton() {
    return (
      <button>
        <Link to="/receipt_info" className={css.link_col}>我要开票</Link>
      </button>
    );
  }
  //不允许点击
  setRefuseButton() {
    return (
      <button>
        <Link to="/receipt_info" className={css.link_col}>我要开票</Link>
      </button>
    );
  }
  render() {
    let tips = this.state.money > 1000
      ? '可开发票额度'
      : '（暂不可开，单张发票需大于1000元）';
    let money = this.state.money;
    return (
      <div className={css.container}>
        <Toolbar url="/user" title="发票" theme="dark">
          <Link to="/receipt_record">开票记录</Link>
        </Toolbar>
        <div className={css.content}>
          <div className={css.money}>{money}元</div>
          <p className={css.tips}>{tips}</p>
          <div className={css.content}>
            {money > 1000 ?
              <button>
                <Link to="/receipt_info" className={css.link_col}>我要开票</Link>
              </button> : <button className={css.refuse_button}>我要开票</button>}
            <ul>
              <li>最高额度仅限实际充值或信用卡的订单费用，不包含任何优惠券、赠送金额、体验券等优惠活动费用</li>
              <li>您可开1张或多张，单张发票不得低于1000元</li>
              <li>开票在5个工作日内处理（不含邮寄时间）</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

Receipt.defaultProps = {}
Receipt.propTypes = {}
