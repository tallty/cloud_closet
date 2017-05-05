import React, { Component, PropTypes } from 'react'
import { Progress } from 'antd'
import { Link } from 'react-router';
import css from './share.less'

export default class Level extends Component {
  getTicks() {
    if (!this.props.info.level_now) {
      return null;
    }
    const now = this.props.info.level_now.substring(0, 2);
    return ['普通', '银卡', '金卡', '钻石'].map((item, index) => {
      const style = now === item ? { color: '#757575', fontWeight: 'blod' } : null;
      return (
        <div className={css.item} style={style} key={index}>{item}</div>
      );
    })
  }

  calcPercent() {
    if (!this.props.info.level_now) {
      return 0;
    }
    const { exp_now, need_exp, level_now } = this.props.info;
    const levelNow = level_now.substring(0, 2);
    let tickIndex = 0;
    ['普通', '银卡', '金卡', '钻石'].forEach((item, index) => {
      tickIndex = item === levelNow ? index : tickIndex;
    });
    const stagePercent = ((Math.abs(exp_now) / Math.abs(need_exp)) * 33.33) || 0;
    const basePercent = tickIndex * 33.33;
    const allPercent = (basePercent + stagePercent) > 100 ? 100 : (basePercent + stagePercent);
    return allPercent;
  }

  render() {
    const { info } = this.props;
    const percent = this.calcPercent();
    return (
      <div className={css.level}>
        <div className={css.title}>
          <span>会员积分</span>
          <span className={css.title_level}>{info.credit_total}分</span>
        </div>
        <div className={css.content}>
          <div className={css.progress_div}>
            <Progress percent={percent} status="active" strokeWidth={10} showInfo={false} />
            <span className={css.points}></span>
            <div className={css.tick_bg}></div>
            <div className={css.tick}>
              {this.getTicks()}
            </div>
          </div>
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
