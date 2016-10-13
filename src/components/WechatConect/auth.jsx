import SuperAgent from 'superagent';

module.exports = {

  getSkipUrl(){
    var appid = 'wx47b02e6b45bf1dad'
    var secret = 'b78a5266c57391d8bd7bce75e86fc3c0'
    var OAuth = require('wechat-oauth');
    var client = new OAuth(appid, secret);
    var urlt = 'http://closet.tallty.com/'+'get_open_id'
    var url = client.getAuthorizeURL(urlt, '123', 'snsapi_base');
    window.location.href=url;
  },

  GetUrlRelativePath(){
    var url = document.location.toString();
    var arrUrl = url.split("//");
    var start = arrUrl[1].indexOf("/");
    var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符
    if(relUrl.indexOf("?") != -1){
      relUrl = relUrl.split("?")[0];
    }
    return relUrl;
  },

  loggedIn() {
    var r = this.GetUrlRelativePath()
    var url = "http://closet-api.tallty.com/user_info/check_openid"
    if (typeof sessionStorage.openid == 'undefined') {
      sessionStorage.setItem('openid','123456');//使用方法存储数据,推荐
    }
    //获取open
    SuperAgent.post(url)
              .set('Accept', 'application/json')
              .send({'user': {'openid': sessionStorage.openid} })
              .end( (err, res) => {
                // alert(res.ok)
                sessionStorage.setItem('route', r)
                sessionStorage.route = r
                sessionStorage.setItem('state', res.ok)
                sessionStorage.setItem('phone',res.body.phone)
                sessionStorage.setItem('authentication_token',res.body.authentication_token)
              })
              console.log(sessionStorage.route)
              console.log("11111111111")
  },
}