import React, { Component } from 'react';
import css from './state_none.less';

class StateNone extends Component {
  render() {
    return (
      <div className={css.none}>
        <img src="/src/images/data_empty.svg" alt="空" />
        <p>{this.props.desc}</p>
      </div>
    );
  }
}

export default StateNone;
