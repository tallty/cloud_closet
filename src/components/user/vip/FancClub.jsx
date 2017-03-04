// Fanc Club
import React, { Component, PropTypes } from 'react'
import css from './fanc_club.less'
import Level from '../share/Level'
import { Icon } from 'antd'
import { Link } from 'react-router'
import auth from '../../WechatConect/auth'
import SuperAgent from 'superagent'

export default class FancClub extends Component {
  state = {
    points: 5000,
    powers: [{
      id: 1,
      url: '/src/images/icon_vip_birth.png',
      title: '生日积分'
    }],
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

  getPowerImges() {
    const { powers } = this.state;
    return powers.map((item, index) => {
      return (
        <div className={css.power}>
          <img src={item.url} alt="特权" key={index} />
          <p>{item.title}</p>
        </div>
      );
    })
  }

  render() {
    const { points, user } = this.state;
    return (
      <div className={css.container}>
        <div className={css.user_info}>
          <div className={css.back}>
            <Link to="/user" className={css.back_link}>
              <Icon type="left" />
            </Link>
            <div className={css.title}>VIP特权</div>
          </div>
          <Level points={points} color="#fff" />
        </div>

        <div className={css.title_one}>尊享特权</div>
        <div className={css.slider}>
          {this.getPowerImges()}
        </div>
        <Link to="/vip_explain" className={css.title_two}>
          乐存好衣会员权益说明
          <span><Icon type="right" /></span>
        </Link>
      </div>
    )
  }
}
