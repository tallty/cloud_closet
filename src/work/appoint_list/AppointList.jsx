/**
 * 预约清单
 */
import React, { Component } from 'react'
import css from './appoint.less'
import { Toolbar } from '../../components/common/Toolbar'
import { Spiner } from '../../components/common/Spiner'
import { Affix } from 'antd'
import { Link } from 'react-router'

export class AppointList extends Component {
	state = {
		list: null
	}

	componentDidMount() {
		// 模拟数据
		this.setState({ list: this.props.list })
	}

	initList() {
		let sort = ''
		let list_view = []
		this.state.list.forEach((item, index, obj) => {
			let date_time = this.parseTime(item.date_time)
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
					<Link to={`/work_warehouse?id=${item.id}`} className={css.item}>
						<div className={css.item_content}>
							<div className={css.content_left}>
								<p>用户：<span>{item.name}</span></p>
								<p>电话：<span>{item.phone}</span></p>
							</div>
							<div className={css.content_right}>
								<img src={item.photo} alt="头像"/>
							</div>
						</div>
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
			color: '#fff',
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0
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
					{ this.state.list ? this.initList() : <Spiner/> }
				</div>
			</div>
		)
	}
}

AppointList.defaultProps = {
	list: [
		{
			id: 1,
			name: 'Snow',
			phone: '18675346566',
			address: '黄浦区济南路260弄翠湖天地隽荟12栋603号',
			photo: 'src/images/photo.png',
			date_time: '2016-10-11T14:00:00.000+08:00' 
		}, 
		{
			id: 2,
			name: 'Jane',
			phone: '18675346566',
			address: '黄浦区济南路260弄翠湖天地隽荟12栋603号',
			photo: 'src/images/photo.png',
			date_time: '2016-10-11T14:00:00.000+08:00'
		},
		{
			id: 3,
			name: 'S',
			phone: '18675346566',
			address: '黄浦区济南路260弄翠湖天地隽荟12栋603号',
			photo: 'src/images/photo.png',
			date_time: '2016-10-11T14:00:00.000+08:00'
		},
		{
			id: 4,
			name: 'Jane',
			phone: '18675346566',
			address: '黄浦区济南路260弄翠湖天地隽荟12栋603号',
			photo: 'src/images/photo.png',
			date_time: '2016-10-11T14:00:00.000+08:00'
		},
		{
			id: 5,
			name: 'S',
			phone: '18675346566',
			address: '黄浦区济南路260弄翠湖天地隽荟12栋603号',
			photo: 'src/images/photo.png',
			date_time: '2016-10-11T14:00:00.000+08:00'
		},
		{
			id: 6,
			name: 'J',
			phone: '18675346566',
			address: '黄浦区济南路260弄翠湖天地隽荟12栋603号',
			photo: 'src/images/photo.png',
			date_time: '2016-10-10T14:00:00.000+08:00'
		},
		{
			id: 7,
			name: 'J',
			phone: '18675346566',
			address: '黄浦区济南路260弄翠湖天地隽荟12栋603号',
			photo: 'src/images/photo.png',
			date_time: '2016-10-10T14:00:00.000+08:00'
		},
				{
			id: 8,
			name: 'J',
			phone: '18675346566',
			address: '黄浦区济南路260弄翠湖天地隽荟12栋603号',
			photo: 'src/images/photo.png',
			date_time: '2016-10-10T14:00:00.000+08:00'
		},
		{
			id: 9,
			name: 'J',
			phone: '18675346566',
			address: '黄浦区济南路260弄翠湖天地隽荟12栋603号',
			photo: 'src/images/photo.png',
			date_time: '2016-10-10T14:00:00.000+08:00'
		},
		{
			id: 10,
			name: 'J',
			phone: '18675346566',
			address: '黄浦区济南路260弄翠湖天地隽荟12栋603号',
			photo: 'src/images/photo.png',
			date_time: '2016-10-10T14:00:00.000+08:00'
		},
		{
			id:1,
			name: 'Sn',
			phone: '18675346566',
			address: '黄浦区济南路260弄翠湖天地隽荟12栋603号',
			photo: 'src/images/photo.png',
			date_time: '2016-10-09T14:00:00.000+08:00'
		}
	]
}
