import React, { Component, PropTypes } from 'react'
import { Progress } from 'antd'
import { Link } from 'react-router';
import css from './share.less'

export default class Level extends Component {
  render() {
    return (
      <div className={css.level}>
        <div className={css.title}>会员积分</div>
        <div className={css.content}>
          <span className={css.points} style={{ color: this.props.color }}>{this.props.points}</span>
          <span className={css.char} style={{ color: this.props.color }}>分</span>
          <span className={css.tips}> | <Link to="/user">查看积分机制</Link></span>
        </div>
      </div>
    )
  }
}

Level.defaultProps = {
  points: 0,
  color: '#EBBA6C'
}

Level.propTypes = {
  points: PropTypes.number,
  color: PropTypes.string
}
