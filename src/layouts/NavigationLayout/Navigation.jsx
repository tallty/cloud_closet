import React from 'react'
import { Link } from 'react-router'
import Home from '../../components/home/Home'
import NavLink from './NavLink'
import classnames from 'classnames'
import styles from './Navigation.less'
import { Affix, Menu, Icon, Row, Col } from 'antd'


export default class Navigation extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        {/* tab内容 */}
        {this.props.children || <Home/>}
        {/* 底部导航条 */}
        <Affix offsetBottom={0}>
          <Row className={styles.nav_ul}>
            <NavLink to="/" onlyActiveOnIndex={true}>
              <Col span={6} className={styles.home_tab_btn}>
                <Col span={24}>
                  <img src="src/images/home.svg" alt="" className={styles.home_icon}/>
                </Col>
                <Col span={24}>
                  主页
                </Col>
              </Col>
            </NavLink>
            <NavLink to="/vip" >
              <Col span={6} className={styles.home_tab_btn}>
                <Col span={24}>
                  <img src="src/images/fc.svg" alt="" className={styles.home_icon}/>
                </Col>
                <Col span={24}>
                  Fanc Club
                </Col>
              </Col>
            </NavLink>
            <NavLink to="/my_closet" >
              <Col span={6} className={styles.home_tab_btn}>
                <Col span={24}>
                  <img src="src/images/closet.svg" alt="" className={styles.home_icon}/>
                </Col>
                <Col span={24}>
                  我的衣橱
                </Col>
              </Col>
            </NavLink>
            <NavLink to="/profile" >
              <Col span={6} className={styles.home_tab_btn}>
                <Col span={24}>
                  <img src="src/images/my.svg" alt="" className={styles.home_icon}/>
                </Col>
                <Col span={24}>
                  个人中心
                </Col>
              </Col>
            </NavLink>
          </Row>
        </Affix>
      </div>
    )
  }  
}
