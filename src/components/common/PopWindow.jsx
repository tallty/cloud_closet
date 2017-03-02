/**
 * 弹出框通用组件
 * 使用：
 * <PopWindow show={true|false} direction='bottom|top|left|right' onCancel={this.popCancelEvent}>
 *   你的任意弹出框内容
 * </PopWindow>
 * 注意：外部 Dom 的 z-index < 900,
 * 因为：弹框蒙层 z-index: 900
 *       弹框 z-index: 1000
 */
import React, { Component, PropTypes } from 'react'
import css from './pop_window.less';

export default class PopWindow extends Component {

  render() {
    const { show, direction, onCancel } = this.props;
    let wnd = css[`${direction}_window`];
    let wnd_show = css[`${direction}_window_show`];
    let cls = show ? wnd_show : wnd;

    return (
      <div>
        {/* 透明蒙层 */}
        <div className={css.pop_bg}
          style={{ display: show ? 'block' : 'none' }}
          onClick={onCancel}>
        </div>
        {/* 弹出框 */}
        <div className={cls}>{this.props.children}</div>
      </div>
    )
  }
}

PopWindow.defaultProps = {
  show: false,
  direction: 'bottom',
  onCancel: () => {}
}

PopWindow.PropTypes = {
  show: PropTypes.bool,
  direction: PropTypes.string,
  onCancel: PropTypes.func
}