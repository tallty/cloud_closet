import React, { Component, PropTypes } from 'react'
import { Router, Route, IndexRoute, Link } from 'react-router'
import Navigation from '../layouts/NavigationLayout/Navigation'
import { Home } from '../components/home/Home'
import { Profile } from '../components/profile/Profile'
import { MyCloset } from '../components/my_closet/MyCloset'
import { Vip } from '../components/vip/Vip'
import { ChargeDetail } from '../components/ChargeDetail/ChargeDetail'
import { MyOrder } from '../components/my_order/MyOrder'

export class Routes extends Component {
	render() {
		return (
			<Router history={this.props.history}>
		    <Route path="/" component={Navigation} >
          {/* 云衣橱品牌主页 */}
          <IndexRoute component={Home}/>
          {/* 添加Fanc_Club导航路由 */}
          <Route path="/vip" component={Vip}/>
          {/* 添加我的衣橱导航路由 */}
          <Route path="/my_closet" component={MyCloset}/>
          {/* 添加个人中心导航路由 */}
          <Route path="/profile" component={Profile}/>
        </Route>
        {/* －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ */}
      	{/* 收费详情 */}
		    <Route path="/charge_detail" component={ChargeDetail} />
        {/* 添加衣橱预约路由 */}
        <Route path="/MyOrder" component={MyOrder}/>
		  </Router>
		)
	}
}

Routes.defaultProps = {
	
}

Routes.propTypes = {
  history: PropTypes.any,
}
