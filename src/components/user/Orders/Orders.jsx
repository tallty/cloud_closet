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
    appointments: [],
    deliveries: []
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
        } else {
          this.setState({ appointments: [] });
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
        } else {
          this.setState({ deliveries: [] });
        }
      })
  }

  render() {
    const { deliveries, appointments } = this.state;
    const histories = deliveries.concat(appointments);
    return (
      <div className={css.container}>
        <Toolbar title="我的订单" url="/user" theme="dark" />
        <Tabs defaultActiveKey="1" className={css.tab_bar}>
          <TabPane tab="入库订单" key="1">
            {appointments.length > 0 ? <OrdersList type="import" orders={appointments} /> : <Spiner />}
          </TabPane>
          <TabPane tab="配送订单" key="2">
            {deliveries.length > 0 ? <OrdersList type="delivery" orders={deliveries} /> : <Spiner />}
          </TabPane>
          <TabPane tab="历史订单" key="3">
            {histories.length > 0 ? <OrdersList type="history" orders={histories} /> : <Spiner />}
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
