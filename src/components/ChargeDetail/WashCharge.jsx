import React, { Component } from 'react';
import css from './charge_detail.less';

class WashCharge extends Component {
  render() {
    return (
      <div className={css.wash_container}>
        {
          this.props.location.query.kind === 'ucc' ?
            <div>
              <img className={css.logo} src="/src/images/icon_logo_ucc.png" alt="logo " />
              <img src="/src/images/icon_wash_ucc.svg" alt="detail" />
            </div> :
            <div>
              <img className={css.logo} src="/src/images/icon_logo_hotel.png" alt="logo " />
              <img src="/src/images/icon_wash_hotel.svg" alt="detail" />
            </div>
        }
      </div>
    );
  }
}

export default WashCharge;
