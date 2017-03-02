// 通用Toolbar组件
// title: 标题,
// url: 返回的链接,
// style: toolbar样式,
// back_style: 返回按钮的样式
// 说明：
// 1、url存在，返回url, 不存在，使用goBack()
import React, { Component, PropTypes } from 'react'
import { Link, withRouter } from 'react-router'
import { Icon } from 'antd'
import css from './toolbar.less'

class Toolbar extends Component {

  handleBack() {
    this.props.router.goBack();
  }

  render() {
    const { title, url, theme, children } = this.props;
    const img = theme === 'default' ? 'toolbar_back_white' : 'toolbar_back_dark';
    const klass = theme === 'default' ? css.toolbar : css.toolbarDark;
    return (
      <div className={klass}>
        {
          url ?
            <Link to={url} className={css.back} >
              <img src={`/src/images/${img}.svg`} alt="back" />
            </Link> :
            <div className={css.back} onClick={this.handleBack.bind(this)}>
              <img src={`/src/images/${img}.svg`} alt="back" />
            </div>
        }
        <div className={css.title}>
          <span>{title}</span>
        </div>

        <div className={css.menu}>{children}</div>
      </div>
    )
  }
}

Toolbar.defaultProps = {
  title: '',
  url: null,
  theme: 'default'
}

Toolbar.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  theme: PropTypes.string
}

export default withRouter(Toolbar);
