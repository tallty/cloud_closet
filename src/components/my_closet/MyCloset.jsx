// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Button } from 'antd'
import MyClosetHeader from './MyClosetHeader'
import ClosetType from './closet_type/ClosetType'
import classnames from 'classnames'
import styles from './MyCloset.less'
import SuperAgent from 'superagent'
import auth from '../WechatConect/auth'

export class MyCloset extends Component {
  state = {
    user: {},
    storing_count: 0,
    current_page: 1,
    total_pages: 1,
    garments: []
  }

  componentDidMount() {
    this.getUserInfo();
    this.getGarments(1, 10, (res) => {
      const obj = res.body;
      this.setState({
        current_page: obj.current_page,
        total_pages: obj.total_pages,
        garments: obj.garments,
        storing_count: obj.storing_garments_count
      })
    })
  }

  // 获取用户信息
  getUserInfo() {
    SuperAgent
      .get('http://closet-api.tallty.com/user_info')
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (!err || err === null) {
          this.setState({ user: res.body });
        } else {
          console.log('获取用户信息失败');
          auth.authLogin();
        }
      })
  }

  // 获取列表
  getGarments(page, per_page, func) {
    SuperAgent
      .get(`http://closet-api.tallty.com/garments?page=${page}&per_page=${per_page}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (!err || err === null) {
          func(res);
        } else {
          console.log('获取衣橱列表失败');
        }
      })
  }

  render() {
    let { garments, user, storing_count } = this.state;
    return (
      <div className={styles.my_cliset_content}>
        <MyClosetHeader garments={garments} user={user} storing_count={storing_count} />
        <ClosetType />
      </div>
    );
  }
}

MyCloset.defaultProps = {
}

MyCloset.propTypes = {
};
