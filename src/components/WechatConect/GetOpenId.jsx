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

  appid = 'wx47b02e6b45bf1dad'
  secret = 'b78a5266c57391d8bd7bce75e86fc3c0'

  componentWillMount() {
    var code = this.getQueryString('code')
    var OAuth = require('wechat-oauth');
    var client = new OAuth(this.appid, this.secret);
    console.log('out of token function')
    console.log(code);
    console.log(client);
    client.getAccessToken(code, function (err, result) {
      console.log('in token function line 1');
      var accessToken = result.data.access_token;
      var openid = result.data.openid;
      this.setState({ openid: openid  });
      console.log(openid);
      console.log('in token function line the end');
    });  
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