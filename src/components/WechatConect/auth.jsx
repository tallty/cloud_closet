import SuperAgent from 'superagent';

module.exports = {

  getSkipUrl(){
    let appid = 'wx47b02e6b45bf1dad'
    let secret = 'b78a5266c57391d8bd7bce75e86fc3c0'
    let OAuth = require('wechat-oauth');
    let client = new OAuth(appid, secret);
    let urlt = 'http://closet.tallty.com/'+'get_open_id'
    let url = client.getAuthorizeURL(urlt, '123', 'snsapi_base');
    window.location.href = url;
  },

  GetUrlRelativePath(){
    let url = document.location.toString();
    let arrUrl = url.split("//");
    let start = arrUrl[1].indexOf("/");
    let relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符
    if(relUrl.indexOf("?") != -1){
      relUrl = relUrl.split("?")[0];
    }
    return relUrl;
  },

  /**
   * [loggedIn 对用户进行鉴权]
   */
  loggedIn() {
    let r = this.GetUrlRelativePath()
    console.log("访问的路由："+ r)
    localStorage.setItem('route', r)

    if (localStorage.openid) {
      SuperAgent
        .post("http://closet-api.tallty.com/user_info/check_openid")
        .set('Accept', 'application/json')
        .send({'user': {'openid': localStorage.openid} })
        .end( (err, res) => {
          let obj = res.body
          localStorage.setItem('state', res.ok)
          console.log("鉴权state: "+localStorage.state)
          if (res.ok) {
            localStorage.setItem('phone',obj.phone)
            localStorage.setItem('authentication_token',obj.authentication_token)
            console.log("鉴权phone: "+localStorage.phone)
            console.log("鉴权authentication_token: "+localStorage.authentication_token)
            console.log("鉴权成功")
          } else {
            console.log("鉴权失败")
            // 重新获取openid
            this.getSkipUrl();
          }
        })
    } else {
      console.log("本地openid为空")
      localStorage.setItem('state', false)
      // 重新获取openid
      this.getSkipUrl();
    }
  }
}