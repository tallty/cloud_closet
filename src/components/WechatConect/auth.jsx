import SuperAgent from 'superagent';
import OAuth from 'wechat-oauth';

module.exports = {

  getSkipUrl(){
    let appid = 'wx47b02e6b45bf1dad'
    let secret = 'b78a5266c57391d8bd7bce75e86fc3c0'
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
   * [authLogin 对用户进行鉴权]
   */
  authLogin() {
    let redirect_url = this.GetUrlRelativePath();
    sessionStorage.setItem('redirect_url', redirect_url);
    console.log("访问的路由："+ redirect_url);
    // 无论本地的openid存不存在，都重新获取一次用户的openid
    // 解决：微信切换账号，云衣橱账号不变的bug
    // 部署时： 使用注释的判断
    // if (!(sessionStorage.is_authenticated === 'true')) {
    // console.log(localStorage.openid);
    // // if (!localStorage.openid) {
    //   this.getSkipUrl();
    // }
    if (localStorage.openid) {
      SuperAgent
        .post("http://closet-api.tallty.com/user_info/check_openid")
        .set('Accept', 'application/json')
        .send({'user': {'openid': localStorage.openid} })
        .end( (err, res) => {
          if (res.ok) {
            let obj = res.body;
            localStorage.setItem('phone',obj.phone);
            localStorage.setItem('authentication_token',obj.authentication_token);
            console.log("鉴权phone: "+localStorage.phone);
            console.log("鉴权authentication_token: "+localStorage.authentication_token)
            console.log("鉴权成功");
          } else {
            console.log("鉴权失败");
            // 重新获取openid
            this.getSkipUrl();
          }
        })
    } else {
      console.log("本地openid为空");
      // 重新获取openid
      this.getSkipUrl();
    }
  }
}