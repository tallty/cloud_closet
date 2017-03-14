/**
 * 个人资料 - celler
 * name: 名称
 * value: 资料值
 * type: "[text | phone | password | logout]"
 * url: 跳转链接
 * event: 点击事件
 * bottom: 下边距
 * color: 文字颜色
 */
import React, { Component, PropTypes } from 'react'
import css from './celler.less'
import { Link } from 'react-router'

export class Celler extends Component {

  render() {
    const { type, url, name, value, defaultValue, bottom, color, event } = this.props
    const cellClass = (type === 'image') ? css.img_celler : css.celler
    const vlu = value ? value : defaultValue

    return (
      <div>
        {
          event ?
            <div onClick={event} className={cellClass} style={{ marginBottom: bottom, color: color }}>
              <span className="pull-left">{name}</span>
              {
                type === 'image' ? <img src={vlu} className={css.photo} alt="头像" /> : vlu
              }
              {
                type === 'simple' ? null : <img src="/src/images/right_icon.svg" className={css.icon} alt="icon" />
              }
            </div> :
            <Link to={url} className={cellClass} style={{ marginBottom: bottom, color: color }}>
              <span className="pull-left">{name}</span>
              {
                type === 'image' ? <img src={vlu} className={css.photo} alt="头像" /> : vlu
              }
              {
                type === 'simple' ? null : <img src="/src/images/right_icon.svg" className={css.icon} alt="icon" />
              }
            </Link>
        }
      </div>

    )
  }
}

Celler.defaultProps = {
  url: "",
  name: "",
  value: "",
  defaultValue: "",
  type: "text",
  bottom: 1,
  color: "#7F7F7F"
}

Celler.propTypes = {
  url: PropTypes.string,
  event: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
  bottom: PropTypes.number
}
