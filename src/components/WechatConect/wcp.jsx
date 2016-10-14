import SuperAgent from 'superagent'
import React, { Component } from 'react';

export class WechatShare extends Component {
  appid = 'wx47b02e6b45bf1dad'
  share_url = location.href.split('#')[0]
  share_image_url = 'http://ws.tallty.com/src/image/wechat_share_icon.png'
  share_title = "【上海天气】雨量交通实时查询"

  state = {
    share_desc: null,
    config: null
  }

  componentDidMount() {
    // 调用接口，获取鉴权签名后的config
    SuperAgent
    .post('http://wechat-api.tallty.com/cloud_closet_wechat/js_hash')
    .send({page_url: this.share_url})
    .set('Accept', 'application/json')
    .end((err, res) => {
      let config = res.body
      // 初始化配置
      this.wechartConfig(config)
      this.setState({ config: config })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("2、组件更新成功")
    // wechat 事件
    this.wechatReady()
  }
 
  // 实例化jdk功能
  wechartConfig(config) {
    console.log("1、")
    console.log(config)
    // 如果wx 没有初始化过
    if (config) {
      wx.config({
        debug: false,
        appId: this.appid,
        timestamp: config.timestamp,
        nonceStr: config.noncestr,
        signature: config.signature,
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'chooseWXPay'
        ]
      })
    }
  }

  // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
  // config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相
  // 关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接
  // 调用，不需要放在ready函数中。
  wechatReady() {
    if (this.state.config) {
      console.log("3、wechat ready")
      wx.ready(() => {
        this.onMenuShareTimeline();
        this.onMenuShareQQ();
        this.onMenuShareWeibo();
        this.onMenuShareAppMessage();
        this.chooseWXPay();
      })
    }
  }

  // ===============================具体事件=============================
  // 微信支付
  chooseWXPay(){
    var url = "http://wechat-api.tallty.com/cloud_closet_wechat/wx_pay"
    SuperAgent.post(url)
                .set('Accept', 'application/json')
                .send( {'openid': 'olclvwCOMobnRYQRtXLAdhujZbtM', 'total_fee': 1 } )
                .end( (err, res) => {
                  if (res.ok) {
                    
                    console.log(res.body.nonceStr.xml.prepay_id)
                    console.log(res.body.nonceStr)
                    wx.chooseWXPay({
                      timestamp: res.body.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                      nonceStr: res.body.nonceStr, // 支付签名随机串，不长于 32 位
                      package: 'prepay_id='+res.body.nonceStr.xml.prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                      signType: res.body.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                      paySign: res.body.paySign, // 支付签名
                      success: function (res) {
                          // 支付成功后的回调函数
                          console.log('支付成功');
                      }
                    });
                  }
                })  
  }
  // 分享给朋友
  onMenuShareAppMessage() {
    wx.onMenuShareAppMessage({
      title: this.share_title,
      desc: this.state.share_desc,
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
  }

  // 分享到朋友圈
  onMenuShareTimeline() {
    wx.onMenuShareTimeline({
      title: this.share_title,
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
  }

  // 分享到QQ
  onMenuShareQQ() {
    wx.onMenuShareQQ({
      title: this.share_title,
      desc: this.state.share_desc,
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
  }

  // 分享到微博
  onMenuShareWeibo() {
    wx.onMenuShareWeibo({
      title: this.share_title,
      desc: this.state.share_desc,
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

  render() {
    return (
      <div></div>
    );
  }
}