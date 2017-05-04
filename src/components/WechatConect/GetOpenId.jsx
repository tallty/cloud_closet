import SuperAgent from 'superagent'
import { withRouter } from 'react-router';
import React, { Component } from 'react';
/**
 * 当openid不存在是，或 openid 不合法时，执行
 */
import auth from './auth'

class GetOpenId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openid: ''
    };
  }

  componentWillMount() {
    const code = this.getQueryString('code')

    //获取openId
    SuperAgent
      .post("http://wechat-api.tallty.com/cloud_closet_wechat/web_access_token")
      .set('Accept', 'application/json')
      .send({ code: code })
      .end((err, res) => {
        if (res.ok) {
          localStorage.setItem('openid', res.body.openid);
          this.checkOpenid();
        } else {
          this.props.router.replace('/login');
        }
      })
  }

  /**
   * [checkOpenid 验证openId]
   */
  checkOpenid() {
    SuperAgent
      .post("http://closet-api.tallty.com/user_info/check_openid")
      .set('Accept', 'application/json')
      .send({ 'user': { 'openid': localStorage.openid } })
      .end((err, res) => {
        if (res.ok) {
          let obj = res.body;
          localStorage.setItem('phone', obj.phone);
          localStorage.setItem('authentication_token', obj.authentication_token);
          // 添加标志位，防止进入死循环
          sessionStorage.setItem('is_authenticated', 'true');
          this.props.router.replace(sessionStorage.redirect_url);
        } else {
          this.props.router.replace('/login');
        }
      })
  }

  getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default withRouter(GetOpenId);
