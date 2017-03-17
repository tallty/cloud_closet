/**
 * 轮播通用组件
 * 使用：
 * <ClosetType />
 */
import React, { Component, PropTypes } from 'react'
import css from './ClosetType.less'
import SuperAgent from 'superagent'
import { Link, withRouter } from 'react-router'
import classNames from 'classnames/bind'
import { Row, Col, Button } from 'antd'

// 解析衣类图片
const imageMap = new Map([
  ['叠放柜', '/src/images/icon_stack_sm.svg'],
  ['挂放柜', '/src/images/icon_hang_sm.svg'],
  ['组合柜', '/src/images/icon_hang_sm.svg'],
  ['单件礼服', '/src/images/icon_full_dress_sm.svg'],
  ['礼服柜', '/src/images/icon_full_dress_sm.svg'],
  ['真空袋-中', '/src/images/icon_bag_sm.svg'],
  ['真空袋-大', '/src/images/icon_bag_sm.svg']
]);

class ClosetType extends Component {
  getCarouselList() {
    const { closets } = this.props;
    const list = [];
    closets.forEach((item, index, obj) => {
      list.push(
        <div key={index} >
          <Link to={`/closet_tabs?id=${item.id}`} >
            <Row className={css.closet_type_img_row}>
              <Col span={4} className={css.closet_type_img_row_cell_one}>
                <img src={imageMap.get(item.title)} alt="icon" />
              </Col>
              <Col span={8} className={css.closet_type_img_row_cell_two}>{item.title}</Col>
              <Col span={12} className={css.closet_type_img_row_cell_three}>
                {item.max_count - item.remain_space_count}/{item.max_count}
              </Col>
            </Row>
          </Link>
        </div>
      )
    })
    return list
  }

  render() {
    return (
      <div className={css.closet_type_container}>
        {this.getCarouselList()}
      </div>
    )
  }
}

ClosetType.defaultProps = {
  closets: []
}

ClosetType.PropTypes = {
  closets: PropTypes.array
}
export default withRouter(ClosetType);
