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
    let { type, url, name, value, defaultValue, bottom, color, event } = this.props
    let cell_class = (type === "image") ? css.img_celler : css.celler
    let _value = value ? value : defaultValue
      
    return (
      <div>
        {
          event ? 
            <div onClick={event} className={cell_class} style={{marginBottom: bottom, color: color}}>
              <span className="pull-left">{name}</span>
              { 
                type === "image" ? <img src={_value} className={css.photo} alt="头像"/> : _value
              }
              { 
                type === "simple" ? null : <img src="/src/images/right_icon.svg" className={css.icon} alt="icon"/> 
              }
            </div> :
            <Link to={url} className={cell_class} style={{marginBottom: bottom, color: color}}>
              <span className="pull-left">{name}</span>
              { 
                type === "image" ? <img src={_value} className={css.photo} alt="头像"/> : _value
              }
              { 
                type === "simple" ? null : <img src="/src/images/right_icon.svg" className={css.icon} alt="icon"/> 
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