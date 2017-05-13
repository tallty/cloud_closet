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
    deliveries: [],
    loading: false
  }

  componentDidMount() {
    this.getAppointments(1);
    this.getDeliveries(1);
  }

  getAppointments(page) {
    this.setState({ loading: true });
    SuperAgent
      .get(`http://closet-api.tallty.com/appointments?page=${page}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.closet_token)
      .set('X-User-Phone', localStorage.closet_phone)
      .end((err, res) => {
        if (res.ok) {
          const obj = res.body;
          this.setState({ appointments: obj.appointments.reverse(), loading: false });
        } else {
          this.setState({ appointments: [], loading: false });
        }
      })
  }

  getDeliveries(page) {
    this.setState({ loading: true });
    SuperAgent
      .get(`http://closet-api.tallty.com/delivery_orders?page=${page}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.closet_token)
      .set('X-User-Phone', localStorage.closet_phone)
      .end((err, res) => {
        if (res.ok) {
          const obj = res.body;
          this.setState({ deliveries: obj.delivery_orders, loading: false });
        } else {
          this.setState({ deliveries: [], loading: false });
        }
      })
  }

  handleChange(key) {
    if (Number(key) === 1) {
      this.setState({ appointments: [] });
      this.getAppointments(1);
    } else if (Number(key) === 2) {
      this.setState({ delimiters: [] });
      this.getDeliveries(1);
    } else if (Number(key) === 3) {
      this.setState({ delimiters: [], appointments: [] });
      this.getDeliveries(1);
      this.getAppointments(1);
    }
  }

  render() {
    const { deliveries, appointments, loading } = this.state;
    const histories = deliveries.concat(appointments);
    return (
      <div className={css.container}>
        <Toolbar title="我的订单" url="/user" theme="dark" />
        <Tabs defaultActiveKey="1" className={css.tab_bar} onChange={this.handleChange.bind(this)}>
          <TabPane tab="入库订单" key="1">
            {loading ? <Spiner /> : <OrdersList type="import" orders={appointments} />}
          </TabPane>
          <TabPane tab="配送订单" key="2">
            {loading ? <Spiner /> : <OrdersList type="delivery" orders={deliveries} />}
          </TabPane>
          <TabPane tab="历史订单" key="3">
            {loading ? <Spiner /> : <OrdersList type="history" orders={histories} />}
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
