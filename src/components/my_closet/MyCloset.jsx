// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Button, message } from 'antd'
import MyClosetHeader from './MyClosetHeader'
import ClosetType from './closet_type/ClosetType'
import classnames from 'classnames'
import styles from './MyCloset.less'
import SuperAgent from 'superagent'
import auth from '../WechatConect/auth'

export class MyCloset extends Component {
  state = {
    user: {},
    storingCount: 0,
    storedCount: 0,
    closets: []
  }

  componentDidMount() {
    this.getUserInfo();
    this.getGarments((res) => {
      const closetsArray = res.body.exhibition_chests;
      const countInfo = res.body.chest_other_info;
      this.setState({
        storingCount: countInfo.storing_garments_count,
        storiedCount: countInfo.graments_count,
        closets: closetsArray
      })
    })
  }

  // 获取用户信息
  getUserInfo() {
    SuperAgent
      .get(`http://closet-api.tallty.com/user_info?random=${Math.random()}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (!err || err === null) {
          this.setState({ user: res.body });
        } else {
          auth.authLogin();
        }
      })
  }

  // 获取列表
  getGarments(func) {
    SuperAgent
      .get(`http://closet-api.tallty.com/exhibition_chests?random=${Math.random()}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (!err || err === null) {
          func(res);
        } else {
          message.warning('获取衣橱列表失败, 稍后重试');
        }
      })
  }

  render() {
    let { user, closets, storingCount, storiedCount } = this.state;
    return (
      <div className={styles.my_cliset_content}>
        <MyClosetHeader storiedCount={storiedCount} user={user} storingCount={storingCount} />
        <ClosetType closets={closets} />
      </div>
    );
  }
}
