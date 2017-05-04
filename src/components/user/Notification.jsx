// 个人中心 - 系统通知
import React, { Component } from 'react'
import css from './ticket_notification.less'
import Toolbar from '../common/Toolbar'
import { Spiner } from '../common/Spiner'
import { Link } from 'react-router'
import { Row, Col } from 'antd'
import StateNone from '../common/StateNone';

export class Notification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cells: null
    }
  }

  componentWillMount() {
    this.setState({ cells: [] });
  }

  cells() {
    let list = []
    this.state.cells.forEach((cell, index, array) => {
      list.push(
        <Link to="/notifications" className={css.notification_cell} key={cell.id}>
          <Row>
            <Col span={19}>
              {/*<img src={cell.url} alt="卡券图标" />*/}
              <p>{cell.name}</p>
              <p className={css.content}>{cell.content}</p>
            </Col>
            <Col span={5}>
              <span className={css.time}>{cell.time}</span>
            </Col>
          </Row>
        </Link>
      )
    });
    if (list.length === 0) {
      list = <StateNone desc="暂无任何消息" />;
    }
    return list;
  }

  render() {
    return (
      <div className={css.container}>
        <Toolbar title="消息中心" url="/user" />
        <div className={css.content}>
          <div style={{ height: 10 }}></div>
          {this.state.cells ? this.cells() : <Spiner />}
        </div>
      </div>
    )
  }
}

Notification.defaultProps = {

}

Notification.propTypes = {

}
