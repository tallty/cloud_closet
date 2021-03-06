// 收费详情
import React, { Component, PropTypes } from 'react'
import { Row, Col, Button, message } from 'antd'
import agent from 'superagent';
import styles from './charge_detail.less'
import classNames from 'classnames'
import classBind from 'classnames/bind'
import { Link } from 'react-router'

// 垂直居中
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

export class ChargeDetail extends Component {
  state = {
    rules: []
  }

  componentWillMount() {
    agent
      .get('http://closet-api.tallty.com/price_systems')
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.closet_token)
      .set('X-User-Phone', localStorage.closet_phone)
      .end((err, res) => {
        if (!err || err === null) {
          this.setState({ rules: res.body.price_systems });
        } else {
          message.warning('获取收费详情信息失败，稍后重试。');
        }
      });
  }

  // 收费详情列表
  getList() {
    const list = []
    this.props.detail.forEach((item, index, obj) => {
      list.push(
        <Col span={12} key={index} className={styles.item}>
          <Row className={styles.item_row}>
            <Col span={24} className={styles.list_cell_title}>{item[0]}</Col>
            <Col span={24} className={styles.list_img_content}>
              <img src={`/src/images/${item[1]}.png`} className={styles.list_img} alt={item[1]} />
            </Col>
            <Col span={24} className={styles.list_cell_center}>{item[2]}</Col>
            <Col span={24} className={styles.list_cell_dis}>{item[3]}</Col>
            <Col span={12}>租柜价格：</Col>
            <Col span={12} className={styles.list_cell_price}>{item[4]}</Col>
            <Col span={24} className={styles.list_cell_price}>{item[5]}</Col>
          </Row>
        </Col>
      )
    })
    return list
  }

  render() {
    return (
      <div>
        <Row>
          <img src="src/images/charge_head_bg.png" alt="" className={styles.topbar_bg} />
          <Col span={24} className={styles.topbar}>收费详情</Col>
        </Row>
        {/*收费详情*/}
        <div className={styles.detail}>
          <div className={styles.detail_content}>
            <Row>
              {this.getList()}
            </Row>
          </div>
        </div>
        {/*服务说明*/}
        <div className={styles.explain}>
          <div className={styles.title}>• 注意事项：</div>
          <div className={styles.content}>除柜体租借费用外，我们将收取以下额外的费用<br />
            <div className={styles.attention}>
              <label>1.  服务费：</label>
              <p>我们的服务费包括上门收衣和出库配送的物流费和人工服务费(专车专员配送), 上海市内一律100¥／次(首次上门收衣免服务费)，也可选快递配送，费用自理；</p>
            </div>

            <div className={styles.attention}>
              <label>2. 护理费：</label>
              <p>
                我们提供沪上两家高端洗衣中心选择<br />
                <strong>UCC国际洗衣 <Link to="/wash_charge?kind=ucc">点击查看价格表</Link></strong><br />
                <strong>嘉里酒店精洗 <Link to="/wash_charge?kind=hotel">点击查看价格表</Link></strong>
              </p>
            </div>

            <div className={styles.attention}>
              <label> 3. 真空袋：</label>
              <p>(中号)用于叠放柜(10个)10¥/个；<br />(大号)用于叠放柜(5个)15¥/个。</p>
            </div>
          </div>
        </div>
        {/*Join Us*/}
        <div className={styles.join}>
          <a href="/appointment">
            <Button className={styles.btn} type="primary" >马上预约</Button>
          </a>
        </div>
      </div>
    )
  }
}

ChargeDetail.defaultProps = {
  detail: [
    ['叠放柜', 'sark_one', '400mm*100mm*560mm', '• 叠放柜可存放针织类，卫衣棉服等可折叠衣物60件,也可提供真空袋出售；', '180￥/月', ''],
    ['挂放柜', 'sark_two', '1200mm*100mm*560mm', '• 挂放柜可存放16件套装衣物，适合存放外套、大衣等大件衣物；', '300￥/月', ''],
    ['组合柜', 'sark_three', '1600mm*100mm*560mm', '• 组合柜可存放60件折叠和16件挂放衣物，适合灵活存挂衣物；', '400￥/月', ''],
    ['礼服柜', 'sark_four', '2400mm*100mm*560mm', '• 礼服柜可存放12件贵重礼服，适合存放大件礼服；', '60￥/件', '600￥/月', '']
  ]
}

ChargeDetail.propsTypes = {
  detail: React.PropTypes.array.isRequired
}
