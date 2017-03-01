/**
 * 轮播通用组件
 * 使用：
 * <ClosetType />
 */
import React, { Component, PropTypes } from 'react'
import css from './ClosetType.less'
import { Link, withRouter } from 'react-router'
import classNames from 'classnames/bind'
import { Row, Col, Button } from 'antd'

class ClosetType extends Component {

  constructor(props) {
    super(props);
    this.state={
      
    }
  }

  getCarouselList() {
    const { types, titles, pics, numbers } = this.props
    const list = []
    const that = this
    types.forEach((item, index, obj) => {
    list.push(
      <div key={index} >
        <Link to={`/closet_tabs?id=${item.id}`} >
          <Row className={css.closet_type_img_row}>
            <Col span={4} className={css.closet_type_img_row_cell_one}><img src={item.pic} width="100%" alt={item.title}/></Col>
            <Col span={8} className={css.closet_type_img_row_cell_two}>{item.title}</Col>
            <Col span={12} className={css.closet_type_img_row_cell_three}>{item.number}</Col>
          </Row>
        </Link>
      </div>
      )
    })
    return list
  }

  render() {
    const { titles, pics, directions, urls } = this.props
    return (
      <div className={css.closet_type_container}>
        {this.getCarouselList()}
      </div>
    )
  }
}

ClosetType.defaultProps = {
  types:[{id: 1, title: '叠放柜', pic: 'src/images/sark_one_icon.png', number: '12/34'},
  {id: 2, title: '挂放柜', pic: 'src/images/sark_two_icon.png', number: '12/34'},
  {id: 3, title: '组合柜', pic: 'src/images/sark_three_icon.png', number: '12/34'},
  {id: 4, title: '礼服柜', pic: 'src/images/sark_four_icon.png', number: '12/34'},
  {id: 5, title: '礼服柜', pic: 'src/images/sark_one_icon.png', number: '12/34'}
  ],
}

ClosetType.PropTypes = {
  types: PropTypes.array,
}
export default withRouter(ClosetType);