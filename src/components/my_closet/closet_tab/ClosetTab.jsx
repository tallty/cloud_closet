import React, { Component, PropTypes } from 'react'
import { Row, Col, Button, Card, Icon } from 'antd'
import classnames from 'classnames'
import styles from './ClosetTab.less'

export class ClosetTab extends Component {
  constructor(props) {
      super(props);
      this.displayName = 'ClosetTab';
  }
  render() {
    return (
      <div className={styles.closet_container}>
        <Row gutter={9} className={styles.my_colset_tab_content}>
          <Col span={12} className={styles.left_tab} >
            <Card className={styles.card_tab}>
              {/* 添加新增标签*/}
              <div className={styles.new_tab}>New</div>
              {/* 添加衣服展示卡片模块*/}
              <div className={styles.card_pic_content}>
                <img alt="example" src="src/images/closet_one.png" />
              </div>
              <div className={styles.card_tab_title}>
                <p className={styles.brand} >DOLCE&GABBANA</p>
                <p className={styles.good_type} >印花包臀短裙</p>
                <sub className={styles.time_line}>入库时间：2016-07-29</sub>
              </div>
              {/* 添加点赞喜欢模块*/}
              <div className={styles.like_tab}><Icon className={styles.heart_icon} type="heart-o" /><br/> <sub>2234</sub></div>
            </Card>
          </Col>
          <Col span={12} className={styles.right_tab}>
            <Card className={styles.card_tab}>
              {/* 添加衣服展示卡片模块*/}
              <div className={styles.card_pic_content}>
                <img alt="example" src="src/images/closet_two.png" />
              </div>
              <div className={styles.card_tab_title}>
                <p className={styles.brand} >DOLCE&GABBANA</p>
                <p className={styles.good_type} >印花包臀短裙</p>
                <sub className={styles.time_line}>入库时间：2016-07-29</sub>
              </div>
              {/* 添加点赞喜欢模块*/}
              <div className={styles.like_tab}><Icon className={styles.heart_icon} type="heart-o" /><br/> <sub>2234</sub></div>
            </Card>
          </Col>
        </Row>
        <Row gutter={9} className={styles.my_colset_tab_content}>
          <Col span={12} className={styles.left_tab} >
            <Card className={styles.card_tab}>
              {/* 添加新增标签*/}
              <div className={styles.new_tab}>New</div>
              {/* 添加衣服展示卡片模块*/}
              <div className={styles.card_pic_content}>
                <img alt="example" src="src/images/closet_one.png" />
              </div>
              <div className={styles.card_tab_title}>
                <p className={styles.brand} >DOLCE&GABBANA</p>
                <p className={styles.good_type} >印花包臀短裙</p>
                <sub className={styles.time_line}>入库时间：2016-07-29</sub>
              </div>
              {/* 添加点赞喜欢模块*/}
              <div className={styles.like_tab}><Icon className={styles.heart_icon} type="heart-o" /><br/> <sub>2234</sub></div>
            </Card>
          </Col>
          <Col span={12} className={styles.right_tab}>
            <Card className={styles.card_tab}>
              {/* 添加衣服展示卡片模块*/}
              <div className={styles.card_pic_content}>
                <img alt="example" src="src/images/closet_two.png" />
              </div>
              <div className={styles.card_tab_title}>
                <p className={styles.brand} >DOLCE&GABBANA</p>
                <p className={styles.good_type} >印花包臀短裙</p>
                <sub className={styles.time_line}>入库时间：2016-07-29</sub>
              </div>
              {/* 添加点赞喜欢模块*/}
              <div className={styles.like_tab}><Icon className={styles.heart_icon} type="heart-o" /><br/> <sub>2234</sub></div>
            </Card>
          </Col>
        </Row>
        <Row gutter={9} className={styles.my_colset_tab_content}>
          <Col span={12} className={styles.left_tab} >
            <Card className={styles.card_tab}>
              {/* 添加新增标签*/}
              <div className={styles.new_tab}>New</div>
              {/* 添加衣服展示卡片模块*/}
              <div className={styles.card_pic_content}>
                <img alt="example" src="src/images/closet_one.png" />
              </div>
              <div className={styles.card_tab_title}>
                <p className={styles.brand} >DOLCE&GABBANA</p>
                <p className={styles.good_type} >印花包臀短裙</p>
                <sub className={styles.time_line}>入库时间：2016-07-29</sub>
              </div>
              {/* 添加点赞喜欢模块*/}
              <div className={styles.like_tab}><Icon className={styles.heart_icon} type="heart-o" /><br/> <sub>2234</sub></div>
            </Card>
          </Col>
          <Col span={12} className={styles.right_tab}>
            <Card className={styles.card_tab}>
              {/* 添加衣服展示卡片模块*/}
              <div className={styles.card_pic_content}>
                <img alt="example" src="src/images/closet_two.png" />
              </div>
              <div className={styles.card_tab_title}>
                <p className={styles.brand} >DOLCE&GABBANA</p>
                <p className={styles.good_type} >印花包臀短裙</p>
                <sub className={styles.time_line}>入库时间：2016-07-29</sub>
              </div>
              {/* 添加点赞喜欢模块*/}
              <div className={styles.like_tab}><Icon className={styles.heart_icon} type="heart-o" /><br/> <sub>2234</sub></div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

ClosetTab.defaultProps = {
}

ClosetTab.propTypes = {
};