{/* 倒计时按钮 */}
import SuperAgent from 'superagent'
import React, { Component, PropTypes } from 'react'
import { Button } from 'antd'
import classnames from 'classnames'
import styles from './Countdown.less'

const timer = 0
class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: true,
      number: 40,
    }
  }

  componentWillUnmount() {
    clearInterval()
  }

  // 定时器执行函数
  timerCallback() {
    if (this.state.number > 0) {
      var num = this.state.number-1
      this.setState({
        number: num, state: false,
      });
    }else{
      this.setState({
        state: true, number: 40
      });
      clearInterval(this.timer)
    }
  }

  enterIconLoading(){
    var phone = this.props.phone;
    if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){ 
      alert("手机号码有误，请重填");  
    }else{
      this.timer = setInterval(this.timerCallback.bind(this), 1000)
      var url = "http://closet-api.tallty.com/sms_tokens/register"
      console.log(this.props.phone);
      //获取验证码
      SuperAgent.post(url)
                .set('Accept', 'application/json')
                .send( {'sms_token': {'phone': phone} } )
                .end( (err, res) => {
                  let result = res.body.token
                  console.log(res)
                  console.log(result)
                  this.setState({
                    state: false,
                  });
                })
    }
  }

  render() {
    return (
      this.state.state ? <Button className={styles.checked_number_btn} onClick={this.enterIconLoading.bind(this)}>获取验证码</Button> : <Button className={styles.checked_number_btn_f} disabled >{this.state.number}s</Button>
    );
  }
}

export default Countdown