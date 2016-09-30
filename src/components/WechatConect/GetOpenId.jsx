import SuperAgent from 'superagent'
import React, { Component } from 'react';

export class GetOpenId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openid: '123'
    };
  }

  componentWillMount() {
    var code = this.getQueryString('code')
    var url = "http://wechat-api.tallty.com/cloud_closet_wechat/web_access_token"
    console.log(url);
    //获取open
    SuperAgent.post(url)
              .set('Accept', 'application/json')
              .send({code: code})
              .end( (err, res) => {
                let result = res.openid
                console.log(res)
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
        当前用户的OpenId是: {this.state.openid}
      </div>
    );
  }
}