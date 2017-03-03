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

class ClosetType extends Component {

  constructor(props) {
    super(props);
    this.state = {
      types: []
    }
  }

  componentWillMount() {
    SuperAgent
      .get(`http://closet-api.tallty.com/exhibition_chests`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (!err || err === null) {
          this.setState({ types: res.body });
        } else {
          console.log("获取列表失败");
        }
      })
  }

  getCarouselList() {
    const { types } = this.state
    console.log(types)
    const list = []
    const that = this
    types.forEach((item, index, obj) => {
    list.push(
      <div key={index} >
        <Link to={`/closet_tabs?id=${item.id}`} >
          <Row className={css.closet_type_img_row}>
            <Col span={4} className={css.closet_type_img_row_cell_one}><img src="src/images/sark_one_icon.png" width="100%" alt={item.title}/></Col>
            <Col span={8} className={css.closet_type_img_row_cell_two}>{item.title}</Col>
            <Col span={12} className={css.closet_type_img_row_cell_three}>{item.remain_space_count}/{item.max_count}</Col>
          </Row>
        </Link>
      </div>
      )
    })
    return list
  }

  showList() {
    SuperAgent
      .get(`http://closet-api.tallty.com/exhibition_chests`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (!err || err === null) {
          this.setState({ types: res.body });
        } else {
          console.log("获取列表失败");
        }
      })
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