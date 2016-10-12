/**
 * 预约入库
 */
import React, { Component, PropTypes } from 'react';
import css from './ware_house.less';
import { Link } from 'react-router';
import { UserInfo } from '../user_info/UserInfo';
import { ClothesTable } from '../clothes_table/ClothesTable';
import { Spiner } from '../../components/common/Spiner'
import { Row, Col, Button, Radio } from 'antd';
import SuperAgent from 'superagent'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export class WareHouse extends Component {
	state = {
		appointment: null
	}
	data = [
		{
			kind: '上衣',
			season: '春夏',
			time_length: '3个月',
			count: 10,
			price: 20.0,
			total_price: 200.0
		},
		{
			kind: '连衣裙',
			season: '秋冬',
			time_length: '3个月',
			count: 18,
			price: 38.0,
			total_price: 684.0
		}
	]

	componentDidMount() {
		let apointment_id = this.props.location.query.appointment_id
		SuperAgent
			.get(`http://closet-api.tallty.com/appointments/${apointment_id}`)
			.set('Accept', 'application/json')
			.set('X-User-Token', 'tqjqxAi9dLLJUmK9xjr9')
			.set('X-User-Phone', '18516591232')
			.end((err, res) => {
				if (!err || err === null) {
					this.setState({ appointment: res.body })
				} else {
					alert("获取信息失败")
				}
			})
	}

	onChange(e) {
		console.log(`radio checked:${e.target.value}`);
	}

	render() {
		let appointment = this.state.appointment
		return (
			<div className={css.container}>
				{/* 用户信息 */}
				{
					appointment ? 
						<UserInfo name={appointment.name} photo="src/images/photo.png" phone={appointment.phone} />
						: <Spiner />
				}
				
				{/* 季款 */}
				<div className={css.season}>
					<span>季款：&nbsp;&nbsp;</span>
					<RadioGroup onChange={this.onChange.bind(this)} defaultValue="spring_summer">
			      <RadioButton value="spring_summer">春夏</RadioButton>
			      <RadioButton value="fall_winter">秋冬</RadioButton>
			      <RadioButton value="winter">冬</RadioButton>
			    </RadioGroup>
				</div>
				{/* 衣服种类 */}
				<div className={css.clothe_kind}>
					<Row>
			      <Col span={6}>
							<Button>
								<img src="src/images/shangyi.png" alt="上衣"/>
								<p>上衣</p>
							</Button>
			      </Col>
			      <Col span={6}>
							<Button>
								<img src="src/images/lianyiqun.png" alt="连衣裙"/>
								<p>连衣裙</p>
							</Button>
			      </Col>
			      <Col span={6}>
							<Button>
								<img src="src/images/kuzhuang.png" alt="裤装"/>
								<p>裤装</p>
							</Button>
			      </Col>
			      <Col span={6}>
							<Button>
								<img src="src/images/banqun.png" alt="半裙"/>
								<p>半裙</p>
							</Button>
			      </Col>
			      <Col span={6}>
							<Button>
								<img src="src/images/waitao.png" alt="外套"/>
								<p>外套</p>
							</Button>
			      </Col>
			      <Col span={6}>
							<Button>
								<img src="src/images/yurongfu.png" alt="羽绒服"/>
								<p>羽绒服</p>
							</Button>
			      </Col>
			      <Col span={6}>
							<Button>
								<img src="src/images/yongzhuang.png" alt="泳装"/>
								<p>泳装</p>
							</Button>
			      </Col>
			    </Row>
				</div>
				{/* 存衣数量 */}
				<div className={css.pane}>
					<div className={css.pane_header}>存衣数量</div>
					<div className={css.pane_body}>
						<ClothesTable data={this.data} />
					</div>
				</div>
				{/* price */}
				<div className={css.tips_container}>
					<Row className={css.tips}>
						<Col span={12}>护理要求：&nbsp;&nbsp;<span>每次护理</span></Col>
						<Col span={12} className="text-right">运费：xxx</Col>
					</Row>
					<p className="text-right">服务费：xxx</p>
					<p className={css.total_price}>合计：<span>884.0</span></p>
				</div>
				{/* 入库 */}
				<Link to="/work_appoint_order" className={css.tab_btn}>入库</Link>
			</div>
		);
	}
}

WareHouse.defaultProps = {

}

WareHouse.propTypes = {

}