/**
 * 订单和个人信息的订单标识
 */
import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import css from './state_badge.less';

const { string } = PropTypes;
const cx = classNames.bind(css);

export default class StateBadge extends React.Component {
  static propTypes = {
    now: string,
    next: string,
    bg: string
  };

  render() {
    const { now, next, bg } = this.props;

    return (
      <div className={css.state_badge}>
        <div className={css.first_line} style={{ background: bg }}></div>
        <div className={css.first} style={{ background: bg }}>{now}</div>
        {
          next ? [
            <div key="1" className={css.last_line}></div>,
            <div key="2" className={css.last}>{next}</div>
          ] : null
        }
      </div>
    );
  }
}
