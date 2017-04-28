import React, { Component, PropTypes } from 'react';
import { Tabs } from 'antd';
import SuperAgent from 'superagent';
import css from './orders.less';
import Toolbar from '../../common/Toolbar';
import { Spiner } from '../../common/Spiner';
import OrdersList from './OrdersList';

const TabPane = Tabs.TabPane;

export class Orders extends Component {
  state = {
    appointments: null,
    deliveries: null
  }

  componentDidMount() {
    this.getAppointments(1);
    this.getDeliveries(1);
  }

  getAppointments(page) {
    SuperAgent
      .get(`http://closet-api.tallty.com/appointments?page=${page}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (res.ok) {
          const obj = res.body;
          this.setState({ appointments: obj.appointments.reverse() });
          console.log(obj);
        } else {
        }
      })
  }

  getDeliveries(page) {
    SuperAgent
      .get(`http://closet-api.tallty.com/delivery_orders?page=${page}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (res.ok) {
          const obj = res.body;
          this.setState({ deliveries: obj.delivery_orders });
          console.log(obj);
        } else {
        }
      })
  }

  render() {
    const { deliveries, appointments } = this.state;
    return (
      <div className={css.container}>
        <Toolbar title="我的订单" url="/user" theme="dark" />
        <Tabs defaultActiveKey="1" className={css.tab_bar}>
          <TabPane tab="入库订单" key="1">
            {appointments ? <OrdersList type="import" orders={appointments} /> : <Spiner />}
          </TabPane>
          <TabPane tab="配送订单" key="2">
            {deliveries ? <OrdersList type="delivery" orders={deliveries} /> : <Spiner />}
          </TabPane>
          <TabPane tab="历史订单" key="3">
            {appointments ? <OrdersList type="history" orders={appointments} /> : <Spiner />}
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
