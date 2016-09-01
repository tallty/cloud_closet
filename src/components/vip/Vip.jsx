// 品牌主页
import React, { Component, PropTypes } from 'react';
import { Button } from 'antd';

export class Vip extends Component {

  render() {
    return (
		  <div>
		    <Button type="primary">Primary</Button>
		    <Button>Default</Button>
		    <Button type="ghost">Ghost</Button>
		    <Button type="dashed">Dashed</Button>
		  </div>
    );
  }
}

Vip.defaultProps = {
}

Vip.propTypes = {
};
