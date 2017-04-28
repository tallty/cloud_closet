import React, { Component, PropTypes } from 'react'
import { Router, Route, IndexRoute, Link, Redirect } from 'react-router'
// 微信api相关功能
import auth from '../components/WechatConect/auth'
import WechatKit from '../components/WechatConect/WechatKit'
import GetOpenId from '../components/WechatConect/GetOpenId'
// 底部导航
import Navigation from '../layouts/NavigationLayout/Navigation'
import { Home } from '../components/home/Home'
import { Process } from '../components/Process/Process'
import { Protocol } from '../components/Protocol/Protocol'
import { User } from '../components/user/User'
import { MyCloset } from '../components/my_closet/MyCloset'
// 收费详情
import { ChargeDetail } from '../components/ChargeDetail/ChargeDetail'
import WashCharge from '../components/ChargeDetail/WashCharge'
// 我的衣橱
import Appointment from '../components/appointment/Appointment'
import { MapAddress } from '../components/MapAddress/MapAddress'
import SetAddress from '../components/MapAddress/SetAddress'
import { Success } from '../components/success/Success'
import { LogIn } from '../components/log_in/LogIn'
import Cart from '../components/cart/Cart';
// 个人中心
import Profile from '../components/user/Profile/Profile'
import FancClub from '../components/user/vip/FancClub'
// import VipExplain from '../components/user/vip/VipExplain';
import { Orders } from '../components/user/Orders/Orders'
import Order from '../components/user/Orders/Order'
import PaySuccess from '../components/user/Orders/PaySuccess';
import { Ticket } from '../components/user/Ticket'
import { Notification } from '../components/user/Notification'
import Recharge from '../components/user/Recharge/Recharge'
import RechargeRule from '../components/user/vip/RechargeRule'
import RechargeSuccess from '../components/user/Recharge/RechargeSuccess'
import { Withdraw } from '../components/user/Withdraw'
import { Help } from '../components/user/Help'
// 用户发票
import { Receipt } from '../components/user/receipt/Receipt'
import { ReceiptRecord } from '../components/user/receipt/ReceiptRecord';
import ReceiptInfo from '../components/user/receipt/ReceiptInfo';
import { ReceiptSuccess } from '../components/user/receipt/ReceiptSuccess';

// 用户账单
import Bills from '../components/user/Bill/Bills'
import { Bill } from '../components/user/Bill/Bill'
//搜索
import { Search } from '../components/my_closet/search/Search'
import Manage from '../components/my_closet/manage/Manage'
import { ClosetDetails } from '../components/my_closet/closet_tab/closet_details/ClosetDetails'
import ClosetTab from '../components/my_closet/closet_tab/ClosetTab'
//地址
import Address from '../components/address/Address'
import AddAddress from '../components/address/add_address/AddAddress'
import { NewAddress } from '../components/address/new_address/NewAddress'
//配送
import { Dispatching } from '../components/dispatching/Dispatching'

export class Routes extends Component {
  componentWillMount() {
    WechatKit.getConfig();
  }

  /**
   * [requireAuth 对进入的组件进行鉴权，根据本地openid检测用户合法性]
   * 失败：重新获取openid，然后重定向到用户访问页；
   * 成功：直接重定向到用户访问页；
   */
  requireAuth() {
    auth.authLogin();
  }

  render() {
    return (
      <Router history={this.props.history}>
        <Route path="/" component={Navigation} >
          {/* 云衣橱品牌主页 */}
          <IndexRoute component={Home} />
          {/* 添加Fanc_Club导航路由 */}
          <Route path="vip" component={FancClub} onEnter={this.requireAuth} />
          {/* 添加我的衣橱导航路由 */}
          <Route path="MyCloset" component={MyCloset} onEnter={this.requireAuth} />
          {/* 添加个人中心导航路由 */}
          <Route path="user" component={User} onEnter={this.requireAuth} />
        </Route>
        {/* 收费详情 */}
        <Route path="/charge_detail" component={ChargeDetail} />
        <Route path="/wash_charge" component={WashCharge} />
        {/* 服务协议 */}
        <Route path="/protocol" component={Protocol} />

        {/* 个人中心相关 */}
        <Route path="/profile" component={Profile} />
        <Route path="/orders" component={Orders} />
        <Route path="/order" component={Order} />
        <Route path="/pay_success" component={PaySuccess} onEnter={this.requireAuth} />
        <Route path="/tickets" component={Ticket} />
        <Route path="/notifications" component={Notification} />
        <Route path="/recharge" component={Recharge} onEnter={this.requireAuth} />
        <Route path="/recharge_rules" component={RechargeRule} />
        <Route path="/recharge_success" component={RechargeSuccess} />
        <Route path="/withdraw" component={Withdraw} />
        <Route path="/help" component={Help} />
        {/* 用户发票 */}
        <Route path="/receipt" component={Receipt} />
        <Route path="/receipt_info" component={ReceiptInfo} onEnter={this.requireAuth} />
        <Route path="/receipt_success" component={ReceiptSuccess} />
        <Route path="/receipt_record" component={ReceiptRecord} />


        {/* 用户账单 */}
        <Route path="/bills" component={Bills} />
        <Route path="/bills/:id" component={Bill} />
        {/* 会员权益说明 */}
        {/* <Route path="/vip_explain" component={VipExplain} onEnter={this.requireAuth} /> */}
        {/* 服务流程 */}
        <Route path="/process" component={Process} />
        {/* 搜索 */}
        <Route path="/search" component={Search} />
        {/* 添加衣橱详情页 */}
        <Route path="/closet_tabs" component={ClosetTab} />
        <Route path="/cart" component={Cart} />
        {/* 添加衣橱详情页 */}
        <Route path="/closet_details" component={ClosetDetails} />
        {/* 添加衣橱管理路由 */}
        <Route path="/manage" component={Manage} />
        {/* 添加衣橱预约路由 */}
        <Route path="/appointment" component={Appointment} onEnter={this.requireAuth} />
        {/* 获取地图成功路由 */}
        <Route path="/map_address" component={MapAddress} />
        {/* 获取地图成功路由 */}
        <Route path="/set_address" component={SetAddress} />
        {/* 添加衣橱预约成功路由 */}
        <Route path="/success" component={Success} />
        {/* 添加地址路由 */}
        <Route path="/address" component={Address} />
        {/* 添加新增地址路由 */}
        <Route path="/add_address" component={AddAddress} />
        <Route path="/address/new" component={NewAddress} />
        {/* 添加配送路由 */}
        <Route path="/dispatching" component={Dispatching} />
        {/* 添加续存路由 */}
        <Route path="/dispatching" component={Dispatching} />
        {/* 获取用户open */}
        <Route path="/get_open_id" component={GetOpenId} />
        {/* 添加登陆路由 */}
        <Route path="/login" component={LogIn} />
      </Router>
    )
  }
}

Routes.defaultProps = {

}

Routes.propTypes = {
  history: PropTypes.any
}
