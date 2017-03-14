import React, { Component, PropTypes } from 'react'
import { Progress } from 'antd'
import { Link } from 'react-router';
import css from './share.less'

export default class Level extends Component {
  render() {
    return (
      <div className={css.level}>
        <div className={css.title}>
          <span>会员级别</span>
          <span className={css.title_level}>{this.props.level}</span>
        </div>
        <div className={css.content}>
          <div className={css.progress_div}>
            <Progress percent={this.props.percent} status="active" strokeWidth={10} showInfo={false} />
            <span className={css.points} style={{ color: this.props.color }}>{this.props.points}分</span>
          </div>
          {/*<span className={css.tips}> | <Link to="/user">查看积分机制</Link></span>*/}
        </div>
      </div>
    )
  }
}

Level.defaultProps = {
  points: 0,
  color: '#EBBA6C',
  percent: 50,
  level: ''
}

Level.propTypes = {
  points: PropTypes.number,
  color: PropTypes.string,
  percent: PropTypes.number,
  level: PropTypes.string
}
