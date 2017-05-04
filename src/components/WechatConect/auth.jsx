import SuperAgent from 'superagent';
import OAuth from 'wechat-oauth';

module.exports = {

  getSkipUrl() {
    const appid = 'wx47b02e6b45bf1dad'
    const secret = 'b78a5266c57391d8bd7bce75e86fc3c0'
    const client = new OAuth(appid, secret);
    const urlt = 'http://closet.tallty.com/' + 'get_open_id'
    const url = client.getAuthorizeURL(urlt, '123', 'snsapi_base');
    window.location.href = url;
  },

  GetUrlRelativePath() {
    const url = document.location.toString();
    const arrUrl = url.split('//');
    const start = arrUrl[1].indexOf('/');
    let relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符
    if (relUrl.indexOf('?') != -1) {
      relUrl = relUrl.split('?')[0];
    }
    return relUrl;
  },

  /**
   * [authLogin 对用户进行鉴权]
   */
  authLogin() {
    const redirect_url = this.GetUrlRelativePath();
    sessionStorage.setItem('redirect_url', redirect_url);
    if (localStorage.openid) {
      SuperAgent
        .post('http://closet-api.tallty.com/user_info/check_openid')
        .set('Accept', 'application/json')
        .send({ 'user': { 'openid': localStorage.openid } })
        .end((err, res) => {
          if (res.ok) {
            const obj = res.body;
            localStorage.setItem('phone', obj.phone);
            localStorage.setItem('authentication_token', obj.authentication_token);
          } else {
            // 重新获取openid
            this.getSkipUrl();
          }
        })
    } else {
      // 重新获取openid
      this.getSkipUrl();
    }
  }
}
