// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Button } from 'antd'
import MyClosetHeader from './MyClosetHeader'
import { ClosetRank } from './closet_rank/ClosetRank'
import { ClosetClassify } from './closet_classify/ClosetClassify'
import ClosetTab from './closet_tab/ClosetTab'
import classnames from 'classnames'
import styles from './MyCloset.less'
import SuperAgent from 'superagent'

export class MyCloset extends Component {
  state = {
    user: {},
    current_page: 1,
    total_pages: 1,
    garments: []
  }

  componentDidMount() {
    this.getUserInfo();
    this.getGarments(1, 10, (res) => {
      console.log("=========获取衣橱列表成功==========")
      console.dir(res.body);
      let obj = res.body;
      this.setState({
        current_page: obj.current_page,
        total_pages: obj.total_pages,
        garments: obj.garments
      })
    })
  }

  // 获取用户信息
  getUserInfo() {
    SuperAgent
      .get(`http://closet-api.tallty.com/user_info`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (!err || err === null) {
          this.setState({ user: res.body });
        } else {
          console.log("获取用户信息失败");
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
          console.log("获取衣橱列表失败");
        }
      })
  }

  render() {
    let { garments, user } = this.state;

    return (
      <div className={styles.my_cliset_content}>
        <MyClosetHeader garments={garments} user={user}/>
        <ClosetRank />
        <div className={styles.closet_content_down}>
          <ClosetClassify />
          <p className={styles.tab_name}>数量<label htmlFor="">（{garments.length}）</label></p>
          <ClosetTab garments={garments}/>
        </div>
      </div>
    );
  }
}

MyCloset.defaultProps = {
}

MyCloset.propTypes = {
};
