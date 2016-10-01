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
    var code = this.getQueryString('code')
    var url = "http://wechat-api.tallty.com/cloud_closet_wechat/web_access_token"
    console.log(url);
    this.props.router.replace('/login')
    //获取open
    SuperAgent.post(url)
              .set('Accept', 'application/json')
              .send({code: code})
              .end( (err, res) => {
                if (res.ok) {
                  sessionStorage.openid = res.body.openid
                  var url = "http://closet-api.tallty.com/user_info/check_openid"
                  //获取open
                  SuperAgent.post(url)
                            .set('Accept', 'application/json')
                            .send({'user': {'openid': sessionStorage.openid} })
                            .end( (err, res) => {
                              if (res.ok){
                                this.props.router.replace('/appointment')
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