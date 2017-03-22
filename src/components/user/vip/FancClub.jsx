// Fanc Club
import React, { Component, PropTypes } from 'react'
import css from './fanc_club.less'
import Level from '../share/Level'
import { Icon } from 'antd'
import { Link } from 'react-router'
import auth from '../../WechatConect/auth'
import SuperAgent from 'superagent'
import VipExplain from './VipExplain'

export default class FancClub extends Component {
  state = {
    points: 5000,
    percent: 60,
    // powers: [{
    //   id: 1,
    //   url: '/src/images/icon_vip_birth.png',
    //   title: '生日积分'
    // }],
    user: {}
  }

  componentWillMount() {
    SuperAgent
      .get(`http://closet-api.tallty.com/user_info?random=${Math.random()}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (res.ok) {
          // 缓存
          localStorage.setItem('user', JSON.stringify(res.body));
          this.setState({ user: res.body });
        } else {
          auth.authLogin();
        }
      })
  }

  // getPowerImges() {
  //   const { powers } = this.state;
  //   return powers.map((item, index) => {
  //     return (
  //       <div key={index} className={css.power}>
  //         <img src={item.url} alt="特权" key={index} />
  //         <p>{item.title}</p>
  //       </div>
  //     );
  //   })
  // }

  render() {
    const { points, user, percent } = this.state;
    return (
      <div className={css.container}>
        <div className={css.user_info}>
          <div className={css.back}>
            <Link to="/user" className={css.back_link}>
              <Icon type="left" />
            </Link>
            <div className={css.title}>VIP特权</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#4A4A4A', fontSize: 24 }}>{user.nickname}</p>
            <Level info={user.vip_level_info} />
          </div>
        </div>

        <div className={css.title_one}>尊享特权</div>
        {/*<div className={css.slider}>
          {this.getPowerImges()}
        </div>*/}
        {/*<Link to="/vip_explain" className={css.title_two}>*/}
        {/*乐存好衣会员权益说明*/}
        {/*<span><Icon type="right" /></span>*/}
        {/*</Link>*/}

        <div className={css.des}>乐存好衣会员权益说明</div>
        <div className={css.vip_card}>
          <div className={css.title}><span>VIP</span> 会员等级</div>
          <img src="/src/images/vip_card.png" alt="img" />
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
    )
  }
}
