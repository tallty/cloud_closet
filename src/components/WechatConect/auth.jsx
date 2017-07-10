import SuperAgent from 'superagent';
import OAuth from 'wechat-oauth';

module.exports = {

  getSkipUrl() {
    const appid = 'wx47b02e6b45bf1dad';
    const secret = 'b78a5266c57391d8bd7bce75e86fc3c0';
    const client = new OAuth(appid, secret);
    const urlt = 'http://closet.tallty.com/get_open_id';
    const url = client.getAuthorizeURL(urlt, '123', 'snsapi_base');
    window.location.href = url;
  },

  getUrlRelativePath() {
    const url = document.location.toString();
    const arrUrl = url.split('//');
    const start = arrUrl[1].indexOf('/');
    let relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符
    if (relUrl.indexOf('?') !== -1) {
      relUrl = relUrl.split('?')[0];
    }
    return relUrl;
  },

  /**
   * [authLogin 对用户进行鉴权]
   */
  authLogin() {
    const redirectUrl = this.getUrlRelativePath();
    sessionStorage.setItem('redirect_url', redirectUrl);
    // localStorage.setItem('closet_openid', 'olclvwCOMobnRYQRtXLAdhujZbtM');
    const mOpenid = localStorage.getItem('closet_openid');
    if (mOpenid) {
      SuperAgent
        .post('http://closet-api.tallty.com/user_info/check_openid')
        .set('Accept', 'application/json')
        .send({ user: { openid: mOpenid } })
        .end((err, res) => {
          if (res.ok) {
            const obj = res.body;
            localStorage.setItem('closet_phone', obj.phone);
            localStorage.setItem('closet_token', obj.authentication_token);
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
