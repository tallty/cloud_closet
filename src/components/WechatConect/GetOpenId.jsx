import SuperAgent from 'superagent'
import React, { Component } from 'react';
import Navigation from '../../layouts/NavigationLayout/Navigation'

export class GetOpenId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openid: '123'
    };
  }

  componentWillMount() {
    var appid = 'wx47b02e6b45bf1dad'
    var secret = 'b78a5266c57391d8bd7bce75e86fc3c0'
    var code = this.getQueryString('code')

    //获取图片资源
    SuperAgent.get("https://api.weixin.qq.com/sns/oauth2/access_token?appid="+{appid}+"&secret="+{secret}+"&code="+{code}+"&grant_type=authorization_code")
              .set('Accept', 'application/json')
              .end( (err, res) => {
                let result = res.openid
                console.log(result)
                // let openid = result
                // 改变状态
                this.setState({openid:openid})
              })
    
  }

  componentDidMount() {
    // window.location.href='http://localhost:8001/login';
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
      <div>
        {this.state.openid}-45678
      </div>
    );
  }
}