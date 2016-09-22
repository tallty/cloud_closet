// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Row, Col, Input, Icon, Button } from 'antd'
import NavLink from '../../../../layouts/NavigationLayout/NavLink'
import classnames from 'classnames'
import styles from './ClosetDetails.less'

export class ClosetDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let tab_height = document.body.clientHeight - 50
    return (
      <div>
        <div className={styles.ClosetDetails_content} style={{height: tab_height, overflow: "auto"}}>
          {/* 返回按钮 */}
          <NavLink to="/MyCloset" className={styles.left_link}><Button type="ghost" shape="circle-outline" icon="left" /></NavLink>
          {/* 主图模块 */}
          <Row className={styles.ClosetDetails_content_header}>
            <Col span={24} className={styles.main_pic_content} >
              <img src="src/images/detail_pic_one.png" alt=""/>
            </Col>
          </Row>
          {/* 名称标签模块 */}
          <Row className={styles.ClosetDetails_content_body}>
            <Col span={24} >
              <Row className={styles.name_tab_content_row}>
                <Col span={24} >
                  <p className={styles.name}>DOLCE&GABBANA<br/>印花包臀短裙</p>
                  <p className={styles.time_story}>入库时间：2015-12-29<br/>预存1年</p>
                </Col>
                <Col span={24} className={styles.tag_tab}>
                  <Button type="primary" className={styles.tag} >约会</Button>
                  <Button type="primary" className={styles.tag} >裙装</Button>
                  <Button type="primary" className={styles.tag} >连衣裙</Button>
                </Col>
              </Row>
              {/* 衣服详情模块 */}
              <Row className={styles.size_detail_content_row}>
                <Col span={24} className={styles.size_detail_content_name}>
                  DOLCE&GABBANA印花包臀短裙
                </Col>
                <Col span={24} className={styles.size_detail_content_size}>
                  码数：s码
                </Col>
                <Col span={24} className={styles.size_detail_content_size}>
                  Measurement：腰宽：32cm 裙长：110cm
                </Col>
              </Row>
              {/* 细节图模块 */}
              <Row className={styles.detail_pic_content_row}>
                <Col span={24} className={styles.detail_pic_content_title}>
                  <Col span={10} offset={7} className={styles.detail_pic_content_title_up}>
                    More Figure
                  </Col>
                  <Col span={10} offset={7} >
                    细节图
                  </Col>
                </Col>
                <Col span={24} className={styles.detail_pic_content_image} >
                  <img src="src/images/detail_pic_two.png" alt=""/>
                </Col>
              </Row>
              {/* 信息补充 */}
              <Row className={styles.profile_pic_content_row}>
                <Col span={24}>
                  <Col span={24} className={styles.line_profile}></Col>
                  <Col span={10} offset={7} className={styles.user_pic_content}>
                    <div className={styles.user_pic_position}>
                      <img className={styles.user_pic} src="src/images/photo.png" alt=""/>
                      <div className={styles.empty_cicle}></div>
                    </div>
                  </Col>
                  <Col span={24} >
                    <p className={styles.owner_name}>John Snow</p>
                    <p className={styles.owner_message}>衣主信息补充</p>
                  </Col>
                </Col>
              </Row>
              {/* 为你推荐 */}
              <Row className={styles.recommend_content_row}>
                <Col span={24} >
                  <Row>
                    <Col span={24} className={styles.line_profile}></Col>
                    <Col span={4} offset={10} className={styles.line_title}>为您推荐</Col>
                  </Row>
                  <Row className={styles.recommend_tab}>
                    <Col span={8} className={styles.recommend_tab_pic}>
                      <img src="src/images/recommend_one.png" alt=""/>
                      <small>MSGM</small><br/>
                      <small>轻奢主义 深蓝束腰连衣裙</small><br/>
                      <label>吊牌价：¥ 1,990</label>
                    </Col>
                    <Col span={8} className={styles.recommend_tab_pic}>
                      <img src="src/images/recommend_two.png" alt=""/>
                      <small>MSGM</small><br/>
                      <small>轻奢主义 深蓝束腰连衣裙</small><br/>
                      <label>吊牌价：¥ 1,990</label>
                    </Col>
                    <Col span={8} className={styles.recommend_tab_pic}>
                      <img src="src/images/recommend_three.png" alt=""/>
                      <small>MSGM</small><br/>
                      <small>轻奢主义 深蓝束腰连衣裙</small><br/>
                      <label>吊牌价：¥ 1,990</label>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        {/* 加入配送按钮 */}
        <Row>
          <Col span={24} className={styles.dispatching_btn} >
            <Button type="primary" >加入配送</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

ClosetDetails.defaultProps = {
}

ClosetDetails.propTypes = {
};
