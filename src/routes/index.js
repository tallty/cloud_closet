import React, { Component, PropTypes } from 'react'
import { Router, Route, IndexRoute, Link } from 'react-router'
// 底部导航
import Navigation from '../layouts/NavigationLayout/Navigation'
import { Home } from '../components/home/Home'
import { User } from '../components/user/User'
import { MyCloset } from '../components/my_closet/MyCloset'
import { Vip } from '../components/vip/Vip'
// 收费详情
import { ChargeDetail } from '../components/ChargeDetail/ChargeDetail'
// 我的衣橱
import { Appointment } from '../components/appointment/Appointment'
import { Success } from '../components/appointment/Success'
import { LogIn } from '../components/log_in/LogIn'
// 个人中心
import { Profile } from '../components/user/Profile/Profile'
import { FancClub } from '../components/user/FancClub'
import { Orders } from '../components/user/Orders/Orders'
import { Ticket } from '../components/user/Ticket'
import { Notification } from '../components/user/Notification'
import { Recharge } from '../components/user/Recharge'
import { Withdraw } from '../components/user/Withdraw'
//搜索
import { Search } from '../components/my_closet/search/Search'
import { Manage } from '../components/my_closet/manage/Manage'
import { ClosetDetails } from '../components/my_closet/closet_tab/closet_details/ClosetDetails'
//地址
import { Address } from '../components/address/Address'
import { NewAddress } from '../components/address/new_address/NewAddress'
//配送
import { Dispatching } from '../components/dispatching/Dispatching'

export class Routes extends Component {
	render() {
		return (
			<Router history={this.props.history}>
		    <Route path="/" component={Navigation} >
          {/* 云衣橱品牌主页 */}
          <IndexRoute component={Home}/>
          {/* 添加Fanc_Club导航路由 */}
          <Route path="vip" component={FancClub}/>
          {/* 添加我的衣橱导航路由 */}
          <Route path="MyCloset" component={MyCloset}/>
          {/* 添加个人中心导航路由 */}
          <Route path="user" component={User}/>
        </Route>
        {/* －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ */}
      	{/* 收费详情 */}
		    <Route path="/charge_detail" component={ChargeDetail} />
        {/* 个人中心相关 */}
        <Route path="/profile" component={Profile} />
        <Route path="/orders" component={Orders} />
        <Route path="/tickets" component={Ticket} />
        <Route path="/notifications" component={Notification} />
        <Route path="/recharge" component={Recharge} />
        <Route path="/withdraw" component={Withdraw} />
        {/* 搜索 */}
        <Route path="/search" component={Search} />
        {/* 添加衣橱详情页 */}
        <Route path="/closet_details" component={ClosetDetails} />
        {/* 添加衣橱管理路由 */}
        <Route path="/manage" component={Manage} />
        {/* 添加衣橱预约路由 */}
        <Route path="/appointment" component={Appointment}/>
        {/* 添加衣橱预约成功路由 */}
        <Route path="/success" component={Success}/>
        {/* 添加登陆路由 */}
        <Route path="/login" component={LogIn}/>
        {/* 添加地址路由 */}
        <Route path="/address" component={Address}/>
        {/* 添加新增地址路由 */}
        <Route path="/add_address" component={AddAddress}/>

        <Route path="/address/new" component={NewAddress}/>
        {/* 添加配送路由 */}
        <Route path="/dispatching" component={Dispatching}/>
        {/* 添加续存路由 */}
        <Route path="/dispatching" component={Dispatching}/>

		  </Router>
		)
	}
}

Routes.defaultProps = {
	
}

Routes.propTypes = {
  history: PropTypes.any,
}
