// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Affix, Row, Col, Icon, Button } from 'antd'
import { ClosetClassify } from '../closet_classify/ClosetClassify'
import ClosetTab from '../closet_tab/ClosetTab'
import { Link } from 'react-router'
import classnames from 'classnames'
import styles from './Manage.less'
import SuperAgent from 'superagent'

export class Manage extends Component {
  state = {
    garments: []
  }

  componentDidMount() {
    SuperAgent
      .get(`http://closet-api.tallty.com/garments?page=${1}&per_page=${20}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (!err || err === null) {
          console.log("=========获取衣橱列表成功==========")
          console.dir(res.body);
          let obj = res.body;
          this.setState({ garments: obj.garments });
        } else {
          console.log("获取衣橱列表失败");
        }
      })
  }

  render() {
    let tab_height = document.body.clientHeight - 100;

    return (
      <div className={styles.Manage_content}>
        <Row className={styles.tab_header}>
          <Col span={16} offset={4} className={styles.tab_title}>管理</Col>
          <Col span={4} ><Link to="/MyCloset" style={{color:'#7F7F7F'}}>完成</Link></Col>
        </Row>

        <div className="scrollContainer" style={{height: tab_height}}>
          <div className={styles.tab_body}>
            <ClosetClassify />
            <ClosetTab garments={this.state.garments} />
          </div>
        </div>

        <Row className={styles.tab_footer}>
          <Col span={4}>2件</Col>
          <Col span={6} offset={8}><Button type="primary" className={styles.story_btn}>续存</Button></Col>
          <Col span={6} >
            <Link to="/dispatching">
              <Button type="primary" className={styles.distribution_btn}>加入配送</Button>
            </Link>
          </Col>
        </Row>

      </div>
    );
  }
}

Manage.defaultProps = {
}

Manage.propTypes = {
};
