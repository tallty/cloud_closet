import SuperAgent from 'superagent'
import { withRouter } from 'react-router';
import React, { Component } from 'react';
import auth from './auth'

class GetOpenId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openid: ''
    };
  }

  componentWillMount() {
    // this.props.router.replace('/user')
    // this.props.router.replace(localStorage.route)
    var code = this.getQueryString('code')
    console.log(code)
    console.log(localStorage.route);
    console.log(localStorage.openid);
    var url = "http://wechat-api.tallty.com/cloud_closet_wechat/web_access_token"
    //获取openId
    SuperAgent.post(url)
              .set('Accept', 'application/json')
              .send({code: code})
              .end( (err, res) => {
                if (res.ok) {
                  localStorage.setItem('openid', res.body.openid)
                  localStorage.openid = res.body.openid
                  console.log(localStorage.openid);
                  // if (res.body.openid != 'undefined') {
                  //   localStorage.openid = res.body.openid
                  //   // alert(res.body.openid)
                  // }else{
                  //   alert('获取用户信息失败，请重新进入！')
                  // }
                  var url = "http://closet-api.tallty.com/user_info/check_openid"
                  //验证openId
                  SuperAgent.post(url)
                            .set('Accept', 'application/json')
                            .send({'user': {'openid': localStorage.openid} })
                            .end( (erro, ress) => {
                              if (ress.ok){
                                localStorage.state = 'true'
                                this.props.router.replace(localStorage.route)
                                console.log(localStorage.route);
                              }else{
                                this.props.router.replace('/login')
                              }
                            })
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