import React, { Component, PropTypes } from 'react'
import { Router, Route, IndexRoute, Link } from 'react-router'
// 底部导航
import Navigation from '../layouts/NavigationLayout/Navigation'
import { Home } from '../components/home/Home'
import { Profile } from '../components/profile/Profile'
import { MyCloset } from '../components/my_closet/MyCloset'
import { Vip } from '../components/vip/Vip'
// 收费详情
import { ChargeDetail } from '../components/ChargeDetail/ChargeDetail'
// 我的衣橱
import { MyOrder } from '../components/my_order/MyOrder'
import { Success } from '../components/my_order/Success'
import { LogIn } from '../components/log_in/LogIn'
// 个人中心
import { FancClub } from '../components/profile/FancClub'

export class Routes extends Component {
	render() {
		return (
			<Router history={this.props.history}>
		    <Route path="/" component={Navigation} >
          {/* 云衣橱品牌主页 */}
          <IndexRoute component={Home}/>
          {/* 添加Fanc_Club导航路由 */}
          <Route path="/vip" component={FancClub}/>
          {/* 添加我的衣橱导航路由 */}
          <Route path="/MyCloset" component={MyCloset}/>
          {/* 添加个人中心导航路由 */}
          <Route path="/profile" component={Profile}/>
        </Route>
        {/* －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ */}
      	{/* 收费详情 */}
		    <Route path="/charge_detail" component={ChargeDetail} />
        {/* 个人中心相关 */}
        
        {/* 添加衣橱预约路由 */}
        <Route path="/MyOrder" component={MyOrder}/>
        <Route path="/Success" component={Success}/>
        {/* 添加登陆路由 */}
        <Route path="/login" component={LogIn}/>
		  </Router>
		)
	}
}

Routes.defaultProps = {
	
}

Routes.propTypes = {
  history: PropTypes.any,
}
