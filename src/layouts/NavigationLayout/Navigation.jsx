import React from 'react'
import { Link } from 'react-router'
import Home from '../../components/home/Home'
import NavLink from './NavLink'
import classnames from 'classnames'
import styles from './Navigation.less'
import { Icon, Row, Col } from 'antd'

export default class Navigation extends React.Component {
  /**
   * 活动状态图标
   */
  getIconWithUrl(iconName, url) {
    if (location.pathname === url) {
      return <img src={`/src/images/${iconName}_active.svg`} className={styles.home_icon}/>
    } else {
      return <img src={`/src/images/${iconName}.svg`} className={styles.home_icon}/>
    }
  }

  render() {
    let tab_height = document.body.clientHeight - 60
    return (
      <div className={styles.container}>
        {/* tab内容 */}
        <div style={{height: tab_height}} className="scrollContainer">
        {this.props.children || <Home/>}
        </div>
        {/* 底部导航条 */}
        <Row className={styles.nav_ul}>
          <NavLink to="/" onlyActiveOnIndex={true}>
            <Col span={6} className={styles.home_tab_btn}>
              <Col span={24} className={styles.icon_col}>
                { this.getIconWithUrl('home', '/') }
              </Col>
              <Col span={24}>
                主页
              </Col>
            </Col>
          </NavLink>
          <NavLink to="/vip" >
            <Col span={6} className={styles.home_tab_btn}>
              <Col span={24} className={styles.icon_col}>
                { this.getIconWithUrl('fc', '/vip') }
              </Col>
              <Col span={24}>
                Fanc Club
              </Col>
            </Col>
          </NavLink>
          <NavLink to="/MyCloset" >
            <Col span={6} className={styles.home_tab_btn}>
              <Col span={24} className={styles.icon_col}>
                { this.getIconWithUrl('closet', '/MyCloset') }
              </Col>
              <Col span={24}>
                我的衣橱
              </Col>
            </Col>
          </NavLink>
          <NavLink to="/user" >
            <Col span={6} className={styles.home_tab_btn}>
              <Col span={24} className={styles.icon_col}>
                { this.getIconWithUrl('user', '/user') }
              </Col>
              <Col span={24}>
                个人中心
              </Col>
            </Col>
          </NavLink>
        </Row>
      </div>
    )
  }  
}
