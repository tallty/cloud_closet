/**
 * 个人中心 - 我的小蜜
 */
import React, { Component, PropTypes } from 'react'
import css from './help.less'
import Toolbar from '../common/Toolbar'
import { Collapse } from 'antd'
import { Link } from 'react-router'

const Panel = Collapse.Panel

export class Help extends Component {
  render() {
    return (
      <div className={css.container}>
        <Toolbar title="我的小蜜" url="/user" />
        <div className={css.help_container}>
          <p className={css.title}>常见问题</p>
          <div className={css.content}>
            <Collapse accordion>
              <Panel header={'1、乐存好衣主要存放哪些物品？'} key="1">
                <p>乐存好衣作为移动互联网平台上的生活服务提供商，可为您提供有关个人和家庭的服装衣物的存储、打理、派送等一站式服务，并即将开通衣物的二手处置平台。</p>
              </Panel>
              <Panel header={'2、乐存好衣主要存放哪些物品？'} key="2">
                <p>乐存好衣的专业储存空间里主要存放家庭日常衣物和礼服，未来也将开通皮草类贵重衣物的存储服务。暂时不提供鞋、包类的存储服务。</p>
              </Panel>
              <Panel header={'3、乐存好衣的租期是怎样的？最短租期？'} key="3">
                <p>乐存好衣提供灵活的租期供您选择，从3个月到长期不等，租期最短3个月。</p>
              </Panel>
              <Panel header={'4、怎么收费及付款？'} key="4">
                <p>乐存好衣提供存储打理和派送等多种收费服务，可根据会员级别的不同提供优惠套餐，可接受微信、转账、信用卡等多种形式的支付方式。</p>
              </Panel>
              <Panel header={'5、如何续租和退租？'} key="5">
                <p>乐存好衣服务团队将在租期即将到期前的适当时间，通过各种方式提醒会员即将到期，会员可通过微信客户端或与我们的服务团队联系，确认续租续费，在新订单确认后，会员将可以享受到一致的服务。</p>
              </Panel>
              <Panel header={'6、清洁保养问题'} key="6">
                <p>乐存好衣和知名洗衣护理机构UCC国际洗衣连锁集团合作，专业提供高档品牌服饰洗护服务，拥有全线顶级洗护设备及专业服务管理团队，优雅的服务环境，让您的衣物清洗毫无后顾之忧。</p>
              </Panel>
              <Panel header={'7、存放安全问题'} key="7">
                <p>乐存好衣专业仓库具备全天候的安保技防措施-海康威视（HIKVISION）萤石网络安防系统，和专业的温度湿度控制系统。仓储区域内实行无死角全天候监控，仓储区域外实行全网络实时监控，同时配备IPC全系列红外线移动侦测报警系统，工作人员凭门禁卡方可进入。</p>
              </Panel>
              <Panel header={'8、运输搬运问题'} key="8">
                <p>订单确认后，乐存好衣将在约定服务时间内由专业服务人员提供门到门的衣物收取和派送的服务，并对衣物运送过程中的安全性给予保障。</p>
              </Panel>
              <Panel header={'9、乐存好衣的营业时间'} key="9">
                <p>乐存好衣的营业时间为周一到周五 8:30- 20:30, 法定假日除外。</p>
              </Panel>
            </Collapse>

            <div style={{height: 28}}></div>

            <div className={css.border_div} style={{paddingTop: 7}}>
              <Link to="/help">平台在线客服</Link>
            </div>

            <div className={css.border_div}>
              <a href="tel:15800634815">
                <div>平台客服热线</div>
                <div>158-0063-4815</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Help.defaultProps = {

}
Help.propTypes = {

}