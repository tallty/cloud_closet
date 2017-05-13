/**
 * 个人中心 - 发票
 */
import React, { Component } from 'react'
import css from './receipt.less'
import Toolbar from '../../common/Toolbar';
import { Link } from 'react-router'
import SuperAgent from 'superagent';
import { message } from 'antd';

export class Receipt extends Component {
  state = {
    money: 0,
    isActive: false
  }

  // 发票金额
  componentWillMount() {
    SuperAgent
      .get(`http://closet-api.tallty.com/user_info?random=${Math.random()}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.closet_token)
      .set('X-User-Phone', localStorage.closet_phone)
      .end((err, res) => {
        if (!err || err === null) {
          // 缓存
          localStorage.setItem('closet_user', JSON.stringify(res.body));
          const amount = Number(res.body.recharge_amount) || 0;
          const active = amount >= 3000;
          this.setState({
            money: amount,
            isActive: active
          });
        } else {
          message.error('获取用户信息失败', 4);
        }
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
    const { money, isActive } = this.state;
    const tips = isActive ? '可开发票额度' : '（暂不可开，单张发票需大于1000元）';

    return (
      <div className={css.container}>
        <Toolbar url="/user" title="发票" theme="dark">
          <Link to="/receipt_record">开票记录</Link>
        </Toolbar>
        <div className={css.content}>
          <div className={css.money}>{money}元</div>
          <p className={css.tips}>{tips}</p>
          <div className={css.content}>
            {
              isActive ?
                <button>
                  <Link to="/receipt_info" className={css.link_col}>我要开票</Link>
                </button> :
                <button className={css.refuse_button}>金额不足</button>
            }
            <ul>
              <li>最高额度仅限实际充值或信用卡的订单费用，不包含任何优惠券、赠送金额、体验券等优惠活动费用</li>
              <li>您可开1张或多张，单张发票不得低于3000元</li>
              <li>开票在5个工作日内处理（不含邮寄时间）</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

