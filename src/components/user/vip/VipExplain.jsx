import React, { Component } from 'react';
import css from './explain.less';
import Toolbar from '../../common/Toolbar';

class VipExplain extends Component {
  render() {
    return (
      <div className={css.container}>
        <Toolbar url="/vip" title="我的小蜜" />
        <div className={css.content}>
          <div className={css.des}>乐存好衣会员权益说明</div>
          <div className={css.text}>
            <h3>一、充卡促销（限一次性充值，一元兑换一积分）</h3>
            <p>1000元起充，1000、2000无赠送</p>
            <p>满3000元送100积分（普通会员）</p>
            <p>满5000元送300积分（普通会员）</p>
            <p>满10000元送800积分（银卡会员）</p>
            <p>满20000元送2000积分（银卡会员）</p>
            <p>满50000元送6000积分（金卡会员）</p>
            <p>满100000元送20000积分（钻石卡会员）</p>
            <br />
            <h3>二、会员等级</h3>
            <p>1、普通会员</p>
            <p>注册消费过即可成为会员，累计消费10000元以下的为普通会员</p>
            <p>生日月赠送50积分（系统直接打入账户余额）</p>
            <p>2、银卡会员</p>
            <p>累计消费满 10000 元，50000元以下的</p>
            <p>生日月赠送100积分（系统直接打入账户余额）</p>
            <p>3、金卡会员</p>
            <p>累计消费满 50000元、100000元以下的</p>
            <p>生日月赠送200积分（系统直接打入账户余额）</p>
            <p>4、钻石卡会员</p>
            <p>累计消费满100000元</p>
            <p>生日月赠送300积分（系统直接打入账户余额）</p>
          </div>
        </div>
      </div>
    );
  }
}

export default VipExplain;
