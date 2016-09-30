import SuperAgent from 'superagent';

module.exports = {

  getSkipUrl(){
    var appid = 'wx47b02e6b45bf1dad'
    var secret = 'b78a5266c57391d8bd7bce75e86fc3c0'
    var OAuth = require('wechat-oauth');
    var client = new OAuth(appid, secret);
    var urlt = 'http://closet.tallty.com/'+'get_open_id'
    var url = client.getAuthorizeURL(urlt, '123', 'snsapi_base');
    console.log(url);
    window.location.href=url;
  },
  
  getOpendId() {
    var code = this.getQueryString('code')
    var url = "http://wechat-api.tallty.com/cloud_closet_wechat/web_access_token"
    console.log(url);
    //获取open
    SuperAgent.post(url)
              .set('Accept', 'application/json')
              .send({code: code})
              .end( (err, res) => {
                if (res.ok) {
                  let result = res.body.openid
                  localStorage.openid = res.body.openid
                } else {
                  alert('获取用户信息失败，请重新进入！');
                }
              })

    return localStorage.openid
  },

  loggedIn(openid) {
    var url = "http://closet-api.tallty.com/user_info/check_openid"
    console.log(url);
    //获取open
    SuperAgent.post(url)
              .set('Accept', 'application/json')
              .send({'user': {'openid': openid} })
              .end( (err, res) => {
                state = res.ok
              })

    return state
  },
}