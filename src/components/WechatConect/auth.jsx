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
    localStorage.setItem('route', r)
    localStorage.route = r
    var url = "http://closet-api.tallty.com/user_info/check_openid"
    console.log(localStorage.openid);
    if (typeof localStorage.openid == 'undefined') {
      localStorage.state = false
    }else{
      //获取open
      SuperAgent.post(url)
                .set('Accept', 'application/json')
                .send({'user': {'openid': localStorage.openid} })
                .end( (err, res) => {
                  localStorage.state = res.ok
                  localStorage.phone = res.body.phone
                  localStorage.authentication_token = res.body.authentication_token
                })
                console.log(localStorage.authentication_token)
                console.log(localStorage.state)
                console.log(localStorage.openid)
                console.log(localStorage.phone)
                console.log("11111111111")
    }
  },
}