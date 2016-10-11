/**
 * 预约入库
 */
import React, { Component, PropTypes } from 'react'

export class WareHouse extends Component {
	componentDidMount() {
		console.dir(this.props.location.params)	
	}

	render() {
		return (
			<div>
				预约入库
			</div>
		);
	}
}

WareHouse.defaultProps = {

}

WareHouse.propTypes = {

}