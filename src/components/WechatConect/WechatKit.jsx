import SuperAgent from 'superagent'

const appid = 'wx47b02e6b45bf1dad';
const shareUrl = location.href.split('#')[0];
const shareImageUrl = 'http://closet.tallty.com/src/images/logo.png';
const shareTitle = '乐存好衣';
const shareDesc = '您的私人云衣橱';
const openid = localStorage.closet_openid

module.exports = {
  getConfig() {
    // 调用接口，获取鉴权签名后的config
    SuperAgent
      .post('http://wechat-api.tallty.com/cloud_closet_wechat/js_hash')
      .set('Accept', 'application/json')
      .send({ page_url: shareUrl })
      .end((err, res) => {
        // 初始化配置
        this.wechartConfig(res.body);
        this.wechatReady();
      })
  },

  // 实例化jdk功能
  wechartConfig(config) {
    // 如果wx 没有初始化过
    if (config) {
      window.wx.config({
        debug: false,
        appId: appid,
        timestamp: config.timestamp,
        nonceStr: config.noncestr,
        signature: config.signature,
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo'
        ]
      })
    }
  },

  // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
  // config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相
  // 关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接
  // 调用，不需要放在ready函数中。
  wechatReady() {
    window.wx.ready(() => {
      this.onMenuShareTimeline();
      this.onMenuShareQQ();
      this.onMenuShareWeibo();
      this.onMenuShareAppMessage();
    })
  },

  // ===============================具体事件=============================

  // 分享给朋友
  onMenuShareAppMessage() {
    window.wx.onMenuShareAppMessage({
      title: shareTitle,
      desc: shareDesc,
      link: shareUrl,
      imgUrl: shareImageUrl,
      trigger: (res) => {
        console.log('用户点击发送给朋友');
      },
      success: (res) => {
        console.log('已分享');
      },
      cancel: (res) => {
        console.log('已取消');
      },
      fail: (res) => {
        console.log(JSON.stringify(res));
      }
    });
  },

  // 分享到朋友圈
  onMenuShareTimeline() {
    window.wx.onMenuShareTimeline({
      title: shareTitle,
      desc: shareDesc,
      link: shareUrl,
      imgUrl: shareImageUrl,
      trigger: (res) => {
        console.log('用户点击分享到朋友圈');
      },
      success: (res) => {
        console.log('已分享');
      },
      cancel: (res) => {
        console.log('已取消');
      },
      fail: (res) => {
        console.log(JSON.stringify(res));
      }
    });
  },

  // 分享到QQ
  onMenuShareQQ() {
    window.wx.onMenuShareQQ({
      title: shareTitle,
      desc: shareDesc,
      link: shareUrl,
      imgUrl: shareImageUrl,
      trigger: (res) => {
        console.log('用户点击分享到QQ');
      },
      complete: (res) => {
        console.log(JSON.stringify(res));
      },
      success: (res) => {
        console.log('已分享');
      },
      cancel: (res) => {
        console.log('已取消');
      },
      fail: (res) => {
        console.log(JSON.stringify(res));
      }
    });
  },

  // 分享到微博
  onMenuShareWeibo() {
    window.wx.onMenuShareWeibo({
      title: shareTitle,
      desc: shareDesc,
      link: shareUrl,
      imgUrl: shareImageUrl,
      trigger: (res) => {
        console.log('用户点击分享到微博');
      },
      complete: (res) => {
        console.log(JSON.stringify(res));
      },
      success: (res) => {
        console.log('已分享');
      },
      cancel: (res) => {
        console.log('已取消');
      },
      fail: (res) => {
        console.log(JSON.stringify(res));
      }
    });
  }
}
