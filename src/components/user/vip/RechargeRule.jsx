import React, { Component } from 'react';
import { Link } from 'react-router';
import { Icon } from 'antd';
import css from './fanc_club.less';

class RechargeRule extends Component {
  render() {
    return (
      <div className={css.container} style={{ background: '#fff' }}>
        <div className={css.user_info} style={{ height: 48 }}>
          <div className={css.back}>
            <Link to="/recharge?redirect_url=/user" className={css.back_link}>
              <Icon type="left" />
            </Link>
            <div className={css.title}>充值规则</div>
          </div>
        </div>
        <div className={css.text}>
          <h3>充卡促销（限一次性充值，一元兑换一积分）</h3>
          <p>1000元起充</p>
          <p>满 <span>3000</span> 元送 <span>100</span>积分（普通会员）</p>
          <p>满 <span>5000</span> 元送 <span>300</span> 积分（普通会员）</p>
          <p>满 <span>10000</span> 元送 <span>800</span> 积分（银卡会员）</p>
          <p>满 <span>20000</span> 元送 <span>2000</span> 积分（银卡会员）</p>
          <p>满 <span>50000</span> 元送 <span>6000</span> 积分（金卡会员）</p>
          <p>满 <span>100000</span> 元送 <span>20000</span> 积分（钻石卡会员）</p>
        </div>
      </div>
    );
  }
}

export default RechargeRule;
