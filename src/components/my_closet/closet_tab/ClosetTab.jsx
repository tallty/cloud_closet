import React, { Component, PropTypes } from 'react'
import { Row, Col, Button, Card, Icon } from 'antd'
import NavLink from '../../../layouts/NavigationLayout/NavLink'
import classnames from 'classnames'
import styles from './ClosetTab.less'
import { Spiner } from '../../common/Spiner'

const { string, number, bool, arrayOf, shape } = PropTypes;

export class ClosetTab extends Component {
  constructor(props) {
      super(props);
      this.displayName = 'ClosetTab';
  }

  initList() {
    let list = [];

    this.props.garments.forEach((garment, i, obj) => {
      list.push(
        <Col span={12} className={styles.left_tab} key={garment.id}>
          <NavLink to="/closet_details" style={{color:'#fff'}}>
            <Card className={styles.card_tab}>
              {/* 添加新增标签*/}
              {/* <div className={styles.new_tab}>New</div> */}
              {/* 添加衣服展示卡片模块*/}
              <div className={styles.card_pic_content}>
                <img alt="example" src={garment.cover_image} />
              </div>
              <div className={styles.card_tab_title}>
                <p className={styles.brand} ></p>
                <p className={styles.good_type} >{garment.title}</p>
                <sub className={styles.time_line}>入库时间：{this.parseTime(garment.put_in_time)}</sub><br/>
                <sub className={styles.time_line}>到期时间：{this.parseTime(garment.expire_time)}</sub>
              </div>
              {/* 添加点赞喜欢模块*/}
              { /* <div className={styles.like_tab}><Icon className={styles.heart_icon} type="heart-o" /><br/> <sub>2234</sub></div> */ }
            </Card>
          </NavLink>
        </Col>
      )
    })

    return list;
  }

  parseTime(time) {
    let t = new Date(time);
    return `${t.getYear()}-${t.getMonth()+1}-${t.getDay()}`
  }

  render() {
    return (
      <div className={styles.closet_container}>
        <Row gutter={9} className={styles.my_colset_tab_content}>
          { this.initList() }
        </Row>
      </div>
    );
  }
}

ClosetTab.defaultProps = {
  garments: []
}

ClosetTab.propTypes = {
  garments: arrayOf(
    shape({
      id: number,
      title: string,
      put_in_time: string,
      expire_time: string,
      is_new: bool,
      cover_image: string
    })
  )
};