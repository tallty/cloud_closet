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
    appointments: null
  }

  componentDidMount() {
    this.getAppointments(1);
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
        }
      })
  }

  render() {
    const { appointments } = this.state;
    return (
      <div className={css.container}>
        <Toolbar title="我的订单" url="/user" theme="dark" />
        <Tabs defaultActiveKey="1" className={css.tab_bar}>
          <TabPane tab="当前订单" key="1">
            {appointments ? <OrdersList type="active" orders={appointments} /> : <Spiner />}
          </TabPane>
          <TabPane tab="历史订单" key="2">
            {appointments ? <OrdersList type="history" orders={appointments} /> : <Spiner />}
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
