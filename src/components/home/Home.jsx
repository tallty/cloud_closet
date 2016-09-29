// 品牌主页
import React, { Component, PropTypes } from 'react'
import SuperAgent from 'superagent'
import { Row, Col } from 'antd'
import { Link } from 'react-router'
import classnames from 'classnames'
import styles from './Home.less'

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openid: '123'
    };
  }

  componentWillMount() {
    var appid = 'wx47b02e6b45bf1dad'
    var secret = 'b78a5266c57391d8bd7bce75e86fc3c0'
    var OAuth = require('wechat-oauth');
    var client = new OAuth(appid, secret);
    var code = this.getQueryString('code')
    var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid="+appid+"&secret="+secret+"&code="+code+"&grant_type=authorization_code"
    console.log(url);

    SuperAgent.get(url)
              .end( (err, res) => {
                let result = res.openid
                console.log(result)
                // let openid = result
                // 改变状态
                this.setState({openid:openid})
              })
  }

  getQueryString(name) { 
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) { 
      return unescape(r[2]); 
    }
      return null;
  }

	render() {
		return (
			<div className={styles.home_content}>
        <img src="src/images/home_one.png" alt="" className={styles.home_pic}/>
        <Row className={styles.home_order_content}>
          <Col span={24} className={styles.home_order}>
            打造美感与舒适感相结合的完美成衣
          </Col>
          <Col span={24} className={styles.home_order}>
            体验为使命的专业成衣管家
          </Col>
          <Col span={24} className={styles.home_order}>
            {this.state.openid}
          </Col>
          <Col span={24} className={styles.home_order_line}>
            _____
          </Col>
          <Col span={24} className={styles.home_order_btn}>
            <Link to="/appointment">马上预约</Link>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <img src="src/images/home_two.png" alt="" className={styles.home_pic}/>
            <img src="src/images/home_three.png" alt="" className={styles.home_pic}/>
            <img src="src/images/home_fore.png" alt="" className={styles.home_pic}/>
          </Col>
        </Row>
      </div>
		);
	}
}

Home.defaultProps = {
}

Home.propTypes = {
};
