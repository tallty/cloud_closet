/**
 * 个人中心 - 我的小蜜
 */
import React, { Component, PropTypes } from 'react'
import css from './help.less'
import { Toolbar } from '../common/Toolbar'
import { Collapse } from 'antd'
import { Link } from 'react-router'

const Panel = Collapse.Panel

export class Help extends Component {
	render() {
		console.log(Panel.props)
		return (
			<div>
				<Toolbar title="我的小蜜" url="/user"/>
				<div className={css.help_container}>
					<p className={css.title}>常见问题</p>
					<div className={css.content}>
					  <Collapse accordion>
					    <Panel header={'问题1'} key="1">
					      <p>这是问题1</p>
					    </Panel>
					    <Panel header={'问题2'} key="2">
					      <p>这是问题2</p>
					    </Panel>
					    <Panel header={'问题3'} key="3">
					      <p>这是问题3</p>
					    </Panel>
					    <Panel header={'问题4'} key="4">
					      <p>这是问题4</p>
					    </Panel>
					  </Collapse>

					  <div style={{height: 28}}></div>

					  <div className={css.border_div} style={{paddingTop: 7}}>
							<Link to="/help">平台在线客服</Link>
					  </div>

					  <div className={css.border_div}>
							<a href="tel:400-123-2345">
								<div>平台客服热线</div>
								<div>400-123-2345</div>
							</a>
					  </div>
					</div>
				</div>
			</div>
		)
	}
}

Help.defaultProps = {

}
Help.propTypes = {

}