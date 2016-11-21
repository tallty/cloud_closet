import React, { Component, PropTypes } from 'react'
import { Row, Col, Button } from 'antd'
import classnames from 'classnames'
import { Link } from 'react-router'
import styles from './MyCloset.less'

const { string, number, bool, arrayOf, shape } = PropTypes;

class MyClosetHeader extends React.Component {
  constructor(props) {
      super(props);
      this.displayName = 'MyClosetHeader';
  }
  render() {
    let { garments, user } = this.props;
    let photo = user.avatar ? user.avatar : "src/images/default_photo.png";
    return (
      <div>
        <Row className={styles.my_cliset_header_part_one_content}>
          <Col span={12} className={styles.user_name}>{user.nickname}</Col>
          <Col span={11} offset={1} className={styles.user_pic_content}>
            <div className={styles.user_pic_position}>
              <img className={styles.user_pic} src={photo} alt=""/>
              <div className={styles.empty_cicle}></div>
            </div>
          </Col>
        </Row>
        <Row className={styles.my_cliset_header_part_two_content}>
          <Col span={9} className={styles.left_closet_number}>
            <div className={styles.center_item}>
              <div htmlFor="" className={styles.number_closet}>{garments.length}</div>
              <div htmlFor="">衣橱存数</div>
            </div>
          </Col>

          <Col span={6} className={styles.addClothesDiv}>
            <Link to='/appointment'><Button type="primary" className={styles.input_closet_btn}>添加新衣</Button></Link>
          </Col>

          <Col span={9} className={styles.right_closet_number}>
            <div className={styles.center_item}>
              <div htmlFor="" className={styles.number_closet}>{this.props.storing_count}</div>
              <div htmlFor="">入库中</div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}


MyClosetHeader.defaultProps = {
  garments: [],
  user: {}
}

MyClosetHeader.propTypes = {
  garments: arrayOf(
    shape({
      id: number,
      title: string,
      put_in_time: string,
      expire_time: string,
      is_new: bool,
      cover_image: string
    })
  ),
  user: shape({
    phone: string,
    mail: string,
    nickname: string,
    avatar: string
  })
};

export default MyClosetHeader;