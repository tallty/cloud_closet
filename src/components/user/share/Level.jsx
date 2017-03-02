import React, { Component, PropTypes } from 'react'
import { Progress } from 'antd'
import css from './share.less'

export default class Level extends Component {
  render() {
    return (
      <div className={css.level}>
        <div className={css.title}>会员积分</div>
        <div className={css.content}>
          <span className={css.points}>{this.props.points}</span>
          <span className={css.char}>分</span>
          <span className={css.tips}> | 查看积分机制</span>
        </div>
      </div>
    )
  }
}

Level.defaultProps = {
  points: 80
}

Level.propTypes = {
  points: PropTypes.number
}