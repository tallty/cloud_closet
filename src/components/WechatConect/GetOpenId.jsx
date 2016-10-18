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
    let code = this.getQueryString('code')

    //获取openId
    SuperAgent
      .post("http://wechat-api.tallty.com/cloud_closet_wechat/web_access_token")
      .set('Accept', 'application/json')
      .send({code: code})
      .end( (err, res) => {
        if (res.ok) {
          localStorage.setItem('openid', res.body.openid)
          localStorage.openid = res.body.openid
          console.log("获取到的openid: "+ res.body.openid)
          this.checkOpenid();
        } else {
          alert('获取用户信息失败，请重新进入！')
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
      .send({'user': {'openid': localStorage.openid} })
      .end( (err, res) => {
        if (res.ok){
          localStorage.setItem('state', res.ok)
          console.log("鉴权的状态："+localStorage.route);
          console.log("跳转的路由： "+localStorage.route);
          this.props.router.replace(localStorage.route)
        }else{
          this.props.router.replace('/login')
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

export default withRouter(GetOpenId)