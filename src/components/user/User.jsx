// 品牌主页
import React, { Component, PropTypes } from 'react';
import { Row, Col, Icon, Button, Progress } from 'antd';
import { Link } from 'react-router';
import SuperAgent from 'superagent';
import auth from '../WechatConect/auth';
import Level from './share/Level';
import css from './user.less';

export class User extends Component {
  state = {
    user: {},
    loadingText: '',
    amount: '5800',
    grids: [
      { name: '配送篮', message: false, url: '/cart' },
      { name: '我的订单', message: true, url: '/orders' },
      { name: '消息中心', message: false, url: '/notifications' },
      { name: 'VIP会员', message: false, url: '/vip' },
      { name: '发票', message: false, url: '/receipt' },
      { name: '我的小蜜', message: false, url: '/help' }
    ]
  }

  componentDidMount() {
    SuperAgent
      .get(`http://closet-api.tallty.com/user_info?random=${Math.random()}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (!err || err === null) {
          // 缓存
          localStorage.setItem('user', JSON.stringify(res.body));
          this.setState({ user: res.body });
        } else {
          auth.authLogin();
        }
      });
  }

  getGrid() {
    const list = [];
    const { recharge_amount } = this.state.user;
    sessionStorage.setItem('receipt_amount', recharge_amount);
    this.state.grids.forEach((grid, index, obj) => {
      const dot = grid.message ? <div className={css.dot}></div> : null;
      list.push(
        index === 4 ?
          <Col span={8} className={css.item} key={index}>
            {dot}
            <Link to={grid.url}>
              <div className={css.ticket}>{recharge_amount}<span className={css.ticket_icon}>￥</span></div>
              <div>{grid.name}</div>
            </Link>
          </Col> :
          <Col span={8} className={css.item} key={index}>
            {dot}
            <Link to={grid.url}>
              <img src={`/src/images/profile_item${index}.png`} alt="" />
              <div>{grid.name}</div>
            </Link>
          </Col>
      )
    })
    return list;
  }

  changePhotoBg(e) {
    this.setState({ loadingText: '上传中...' });
    const formData = new FormData(this.refs.photoBg);
    formData.append('user_info[user_info_cover_attributes][photo]', e.target.files[0]);
    SuperAgent
      .put('http://closet-api.tallty.com/user_info')
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .send(formData)
      .end((er, res) => {
        if (!er || er === null) {
          // 缓存
          const userStr = JSON.stringify(res.body);
          localStorage.setItem('user', userStr);
          this.setState({ user: res.body, loadingText: '' });
        } else {
          this.setState({ loadingText: '上传失败' });
        }
      })
  }

  render() {
    // 计算栅格部分容器的高度
    const { user, grids, loadingText } = this.state;
    const gridsHeight = (document.body.clientHeight - 60) * 0.53 - 80;
    const avatar = user.avatar ? user.avatar : 'src/images/default_photo.svg';
    const photoBg = user.user_info_cover ? user.user_info_cover : '#d8d8d8';
    let balance = user.balance ? user.balance : 0;

    return (
      <div className={css.personal_center}>
        {/* 可上传背景代码 */}
        {/*<div
          className={css.user_info}
          style={{ height: '47%', background: `url(${photoBg}) no-repeat` }}
        >
        <input
            type="file"
            multiple={false}
            accept="image/*"
            capture="camera"
            ref="photoBg"
            onChange={this.changePhotoBg.bind(this)}
          />
          <span className={css.bg_loading_text}>{loadingText}</span>
        */}
        <div
          className={css.user_info}
          style={{ height: '47%' }}
        >
          <div className={css.link_profile}>
            <Link to="/profile">
              <div className={css.avatar} style={{ background: `url(${avatar})` }}>
                {
                  user.vip_level_info ?
                    <div className={css.level_name}>{user.vip_level_info.level_now}</div> : null
                }
              </div>
              <div className={css.user_name}>{user.nickname}</div>
              <Level info={user.vip_level_info} />
            </Link>
          </div>
        </div>

        {/* 业务模块 */}
        <div className={css.center_container}>
          <Row className={css.account}>
            <Col span={14} className={css.money}>
              {balance}
              <span> 余额</span>
            </Col>
            <Col span={10} className={css.money_link}>
              <Link to="/bills">账户账单</Link>
              <Icon type="right" />
            </Col>
          </Row>
          <Row>
            <Link to="/recharge?redirect_url=/user">
              <Button type="primary" className={css.charge_btn}>充值</Button>
            </Link>
          </Row>
          <div className={css.grid_container} style={{ height: gridsHeight }}>
            <Row className={css.grid}>
              {this.getGrid()}
            </Row>
          </div>
        </div>
      </div>
    )
  }
}
