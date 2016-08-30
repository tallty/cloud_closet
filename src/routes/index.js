import React, { Component, PropTypes } from 'react'
import { Router, Route, IndexRoute, Link } from 'react-router'
import { Home } from '../components/home/Home'

export class Routes extends Component {
	render() {
		return (
			<Router history={this.props.history}>
		    <Route path="/" component={Home} />
		  </Router>
		)
	}
}

Routes.defaultProps = {
	
}

Routes.propTypes = {
  history: PropTypes.any,
}
