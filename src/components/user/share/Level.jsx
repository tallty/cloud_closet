import React, { Component, PropTypes } from 'react'
import { Progress } from 'antd'
import { Link } from 'react-router';
import css from './share.less'

export default class Level extends Component {
  render() {
    const { info } = this.props;
    const percent = ((Math.abs(info.exp_now) / Math.abs(info.need_exp)) * 100) || 0;

    return (
      <div className={css.level}>
        <div className={css.title}>
          <span>{info.level_now}</span>
          <span className={css.title_level}>{info.credit_total}</span>
        </div>
        <div className={css.content}>
          <div className={css.progress_div}>
            <Progress percent={percent} status="active" strokeWidth={10} showInfo={false} />
            <span className={css.points}>{info.level_next}</span>
          </div>
          {/*<span className={css.tips}> | <Link to="/user">查看积分机制</Link></span>*/}
        </div>
      </div>
    )
  }
}

Level.defaultProps = {
  info: {}
}

Level.propTypes = {
  info: PropTypes.object
}
