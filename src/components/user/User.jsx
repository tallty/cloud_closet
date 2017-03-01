// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Icon, Button, Progress } from 'antd'
import auth from '../WechatConect/auth'
import { Level } from './share/Level'
import { Link } from 'react-router'
import css from './user.less'
import SuperAgent from 'superagent'

export class User extends Component {
  state = {
    level: 80,
    level_name: '白金级别',
    user: {
      nickname: null,
      balance: null,
      avatar: null
    },
    grids: [
      { name: '配送篮', message: false, url: '/tickets' },
      { name: '我的订单', message: true, url: '/orders' },
      { name: '系统通知', message: false, url: '/notifications' },
      { name: 'VIP会员', message: false, url: '/vip' },
      { name: '发票', message: false, url: '/receipt' },
      { name: '我的小蜜', message: false, url: '/help' }
    ]
  }

  componentDidMount() {
    SuperAgent
      .get('http://closet-api.tallty.com/user_info')
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
      });
  }

  getGrid() {
    const list = [];
    this.state.grids.forEach((grid, index, obj) => {
      let dot = grid.message ? <div className={css.dot}></div> : null;
      list.push(
        index === 4 ?
          <Col span={8} className={css.item} key={index}>
            {dot}
            <Link to={grid.url}>
              <div className={css.ticket}>6800<span className={css.ticket_icon}>￥</span></div>
              <div>{grid.name}</div>
            </Link>
          </Col> :
          <Col span={8} className={css.item} key={index}>
            {dot}
            <Link to={grid.url}>
              <img src={`/src/images/profile_item${index}.png`} alt=""/>
              <div>{grid.name}</div>
            </Link>
          </Col>
      )
    })
    return list;
  }

  render() {
    // 计算栅格部分容器的高度
    const { user, level, level_name, grids } =  this.state;
    const grids_height = (document.body.clientHeight - 60) * 0.53 - 80;
    let avatar = user.avatar ? user.avatar : 'src/images/default_photo.png';
    let balance = user.balance ? user.balance : 0;

    return (
      <div className={css.personal_center}>
        {/* 头像信息 */}
        <div className={css.user_info} style={{ height: '47%' }}>
          <Link to="/profile" className={css.link_profile}>
            <img src={avatar} alt="头像" />
            <div className={css.user_name}>{user.nickname}</div>
            <Level level={level} level_name={level_name} />
          </Link>
        </div>
        {/* 业务模块 */}
        <div className={css.center_container}>
          <Row className={css.account}>
            <Col span={18} className={css.money}>{balance}</Col>
            <Col span={6} className={css.money_link}>
              <Link to="/bills">账户账单</Link>
              <Icon type="right" />
            </Col>
          </Row>
          <Row>
            <Link to="/recharge?redirect_url=/user">
              <Button type="primary" className={css.charge_btn}>充值</Button>
            </Link>
          </Row>
          <div className={css.grid_container} style={{ height: grids_height }}>
            <Row className={css.grid}>
              {this.getGrid()}
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

User.defaultProps = {

}

User.propTypes = {

}
