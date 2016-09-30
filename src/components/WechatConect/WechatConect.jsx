import SuperAgent from 'superagent'
import React, { Component } from 'react';

export class WechatConect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openid: '123'
    };
  }
  
  appid = 'wx47b02e6b45bf1dad'
  secret = 'b78a5266c57391d8bd7bce75e86fc3c0'

  componentWillMount() {
    var OAuth = require('wechat-oauth');
    var client = new OAuth(this.appid, this.secret);
    var url = client.getAuthorizeURL('http://closet.tallty.com', '123', 'snsapi_base');
    console.log(url);
    this.skipUrl(url)
  }

  skipUrl(url) {
    window.location.href=url;
  }

  render() {
    return (
      <div></div>
    );
  }
}