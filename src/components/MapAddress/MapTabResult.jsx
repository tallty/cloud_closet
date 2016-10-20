// 封装的spin组件，props请参考antd组件Spin
import React, { Component, PropTypes } from 'react'
import { Tabs, Row, Col } from 'antd'
import { Link, withRouter } from 'react-router'
import styles from './MapTabResult.less'

const TabPane = Tabs.TabPane;
const height = document.body.offsetHeight*0.6-37

class MapTabResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '上海',
      poi: this.props.poi,
      list: [],
    }
  }

  componentDidMount() {
    this.searchNearby(this.state.keyword)
  }

  componentWillUpdate(nextProps, nextState) {
    // this.searchNearby(this.state.keyword)
  }

  local_address(title, address){
    localStorage.setItem('title', title)
    localStorage.setItem('address', address)
    console.log(title);
    this.props.router.replace('/set_address')
  }

  searchNearby(keyword){
    var poi = this.props.poi
    var point = new BMap.Point(poi.position.lng, poi.position.lat) // 初始化地图,设置中心点坐标和地图级别  
    var options = {
      onSearchComplete: function(results){      
        if (local.getStatus() == BMAP_STATUS_SUCCESS){
          var list = []
          // 判断状态是否正确        
          for (var i = 0; i < results.getCurrentNumPois(); i ++){
            list.push(
              <Row key={i} className={styles.add_col} onClick={this.local_address.bind(this,results.getPoi(i).title, results.getPoi(i).address)}>
                <Col span={2} className={styles.location_icon_content}>
                  <img src="src/images/location_icon.svg" alt="" className={styles.location_icon}/>
                </Col>
                <Col span={22} className={styles.add_name}>{results.getPoi(i).title}</Col>
                <Col span={22} offset={2}>{results.getPoi(i).address}</Col>
              </Row>
            )
          }
          console.log('=========??????============');
          console.log(list);
          this.setState({list: list, keyword: keyword})
        }
      }.bind(this)
    };      
    var local = new BMap.LocalSearch(this.props.map, options);
    local.setPageCapacity = 80;
    local.searchNearby(keyword, point, 2000);
  }

  callback(key) {
    this.searchNearby(key)
  }

  render() {
    return (
      <div className={styles.container}>
        {console.log('=========+++++===========')}
        {console.log(this.props.poi)}
        <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
          <TabPane tab="全部" key="上海"></TabPane>
          <TabPane tab="小区" key="小区"></TabPane>
          <TabPane tab="写字楼" key="写字楼"></TabPane>
          <TabPane tab="学校" key="学校"></TabPane>
        </Tabs>
        <div className={styles.address_list} style={{height: height}}>{this.state.list}</div>
      </div>
    )
  }
}

export default withRouter(MapTabResult);