/**
 * 预约清单
 */
import React, { Component } from 'react'
import css from './appoint.less'
import { Toolbar } from '../../components/common/Toolbar'
import { Spiner } from '../../components/common/Spiner'
import { Affix } from 'antd'
import { Link } from 'react-router'
import { UserInfo } from '../user_info/UserInfo'
import SuperAgent from 'superagent'

export class AppointList extends Component {
	state = {
		appointments: null
	}

	componentDidMount() {
		SuperAgent
			.get('http://closet-api.tallty.com/appointments')
			.set('Accept', 'application/json')
			.set('X-User-Token', 'tqjqxAi9dLLJUmK9xjr9')
			.set('X-User-Phone', '18516591232')
			.end((err, res) => {
				if (!err || err === null) {
					let appointments = res.body.appointments
					this.setState({ appointments: appointments })	
				} else {
					alert("获取信息失败")
					this.setState({ appointments: [] })	
				}
			})
	}

	initList() {
		let sort = ''
		let list_view = []
		this.state.appointments.forEach((item, index, obj) => {
			let date_time = this.parseTime(item.date)
			let header = null
			// 按照时间归类
			if (date_time === sort) {
				header = null
			} else {
				sort = date_time
				header = (<Affix offsetTop={50}>
										<div className={css.item_header}>{date_time}</div>
									</Affix>)
			}
			// 加入列表
			list_view.push(
				<div key={index}>
					{ header }
					<Link to={`/work_warehouse?appointment_id=${item.id}`} className={css.item}>
						<UserInfo name={item.name} photo={item.photo} phone={item.phone} />
						<div className={css.item_footer}>
							<img src="src/images/address_icon.svg" alt="icon"/>
							<span>{item.address}</span>
						</div>
					</Link>
				</div>
				
			)
		})
		return list_view
	}

	// 清单预约时间解析
	parseTime(time) {
		// 清单预约时间
		let _time = new Date(time)
		let _time_year = _time.getFullYear()
		let _time_month = _time.getMonth() + 1
		let _time_day = _time.getDate()
		// 当期时间
		let now_time = new Date()
		let now_year = now_time.getFullYear()
		let now_month = now_time.getMonth() + 1
		let now_day = now_time.getDate()
		// 返回值
		let return_time = `${_time_year}-${_time_month}-${_time_day}`
		// 优化相邻几天的显示情况
		if (now_year === _time_year && now_month === _time_month) {
			switch (now_day - _time_day) {
				case 0:
					return_time = `今天 (${return_time})`
					break;
				case 1:
					return_time = `昨天 (${return_time})`
					break;
				case 2:
					return_time = `前天 (${return_time})`
					break;
				case -1:
					return_time = `明天 (${return_time})`
					break;
				case -2:
					return_time = `后天 (${return_time})`
					break;
			}
		}
		return return_time
	}

	render() {
		let toolbar_style = {
			background: '#FF9241', 
			color: '#fff'
		}
		let back_style = {
			color: '#fff'
		}

		return (
			<div>
				<Toolbar title="预约清单" 
								back="/work_desk" 
								style={toolbar_style} 
								back_style={back_style} />
				<div className={css.list_view}>
					{ this.state.appointments ? this.initList() : <Spiner/> }
				</div>
			</div>
		)
	}
}
