import React, { Component, PropTypes } from 'react'
import { Router, Route, IndexRoute, Link } from 'react-router'
import Navigation from '../layouts/NavigationLayout/Navigation'
import { Home } from '../components/home/Home'
import { Profile } from '../components/profile/Profile'
import { MyCloset } from '../components/my_closet/MyCloset'
import { Vip } from '../components/vip/Vip'
import { ChargeDetail } from '../components/ChargeDetail/ChargeDetail'

export class Routes extends Component {
	render() {
		return (
			<Router history={this.props.history}>
		    <Route path="/" component={Navigation} >
          {/* 云衣橱品牌主页 */}
          <IndexRoute component={Home}/>
          {/* 添加Fanc_Club导航路由 */}
          <Route path="/VIP" component={Vip}/>
          {/* 添加我的衣橱导航路由 */}
          <Route path="/MyCloset" component={MyCloset}/>
          {/* 添加个人中心导航路由 */}
          <Route path="/Profile" component={Profile}/>
        </Route>
        
      	{/* 收费详情 */}
		    <Route path="/charge_detail" component={ChargeDetail} />
		  </Router>
		)
	}
}

Routes.defaultProps = {
	
}

Routes.propTypes = {
  history: PropTypes.any,
}
