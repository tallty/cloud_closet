import SuperAgent from 'superagent'

var appid = 'wx47b02e6b45bf1dad';
var authorize_url = location.href.split('#')[0];
var share_image_url = 'http://ws.tallty.com/src/image/wechat_share_icon.png';
var share_title = "【上海天气】雨量交通实时查询"
var share_desc = "【上海天气】雨量交通实时查询"
var openid = localStorage.openid

module.exports = {
  getConfig() {
    // 调用接口，获取鉴权签名后的config
    SuperAgent
    .post('http://wechat-api.tallty.com/cloud_closet_wechat/js_hash')
    .set('Accept', 'application/json')
    .send({page_url: authorize_url})
    .end((err, res) => {
      let config = res.body
      console.log('========获取到的config========')
      console.dir(config)
      // 初始化配置
      this.wechartConfig(config)
      this.wechatReady()
    })
  },
 
  // 实例化jdk功能
  wechartConfig(config) {
    // 如果wx 没有初始化过
    if (config) {
      wx.config({
        debug: true,
        appId: appid,
        timestamp: config.timestamp,
        nonceStr: config.noncestr,
        signature: config.signature,
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'chooseWXPay',
          'chooseImage'
        ]
      })
    }
  },

  // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
  // config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相
  // 关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接
  // 调用，不需要放在ready函数中。
  wechatReady() {
    wx.ready(() => {
      this.onMenuShareTimeline();
      this.onMenuShareQQ();
      this.onMenuShareWeibo();
      this.onMenuShareAppMessage();
    })
  },

  // ===============================具体事件=============================

  // 微信支付
  chooseWXPay(){
    var url = "http://wechat-api.tallty.com/cloud_closet_wechat/wx_pay"
    SuperAgent
      .post(url)
      .set('Accept', 'application/json')
      .send( {'openid': localStorage.openid, 'total_fee': 10 } )
      .end( (err, res) => {
        if (res.ok) {
          console.log(appid)
          wx.chooseWXPay({
            appId: appid,
            timestamp: res.body.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: res.body.nonceStr.xml.nonce_str, // 支付签名随机串，不长于 32 位
            package: 'prepay_id='+res.body.nonceStr.xml.prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: res.body.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: res.body.paySign, // 支付签名
            success: function (res) {
              // 支付成功后的回调函数
              if(res.errMsg == "chooseWXPay:ok" ) {
                console.log('success');
              }else{
                alert(res.errMsg);
              }
            },
            cancel:function(res){
              //支付取消
              console.log('cancel');
            }
          });
        }
      })  
  },
  
  // 分享给朋友
  onMenuShareAppMessage() {
    wx.onMenuShareAppMessage({
      title: this.share_title,
      desc: this.share_desc,
      link: this.share_url,
      imgUrl: this.share_image_url,
      trigger: function (res) {
        console.log('用户点击发送给朋友');
      },
      success: function (res) {
        console.log('已分享');
      },
      cancel: function (res) {
        console.log('已取消');
      },
      fail: function (res) {
        console.log(JSON.stringify(res));
      }
    });
  },

  // 分享到朋友圈
  onMenuShareTimeline() {
    wx.onMenuShareTimeline({
      title: this.share_title,
      desc: this.share_desc,
      link: this.share_url,
      imgUrl: this.share_image_url,
      trigger: function (res) {
        console.log('用户点击分享到朋友圈');
      },
      success: function (res) {
        console.log('已分享');
      },
      cancel: function (res) {
        console.log('已取消');
      },
      fail: function (res) {
        console.log(JSON.stringify(res));
      }
    });
  },

  // 分享到QQ
  onMenuShareQQ() {
    wx.onMenuShareQQ({
      title: this.share_title,
      desc: this.share_desc,
      link: this.share_url,
      imgUrl: this.share_image_url,
      trigger: function (res) {
        console.log('用户点击分享到QQ');
      },
      complete: function (res) {
        console.log(JSON.stringify(res));
      },
      success: function (res) {
        console.log('已分享');
      },
      cancel: function (res) {
        console.log('已取消');
      },
      fail: function (res) {
        console.log(JSON.stringify(res));
      }
    });
  },

  // 分享到微博
  onMenuShareWeibo() {
    wx.onMenuShareWeibo({
      title: this.share_title,
      desc: this.share_desc,
      link: this.share_url,
      imgUrl: this.share_image_url,
      trigger: function (res) {
        console.log('用户点击分享到微博');
      },
      complete: function (res) {
        console.log(JSON.stringify(res));
      },
      success: function (res) {
        console.log('已分享');
      },
      cancel: function (res) {
        console.log('已取消');
      },
      fail: function (res) {
        console.log(JSON.stringify(res));
      }
    });
  }
}