// 封装的spin组件，props请参考antd组件Spin
import React, { Component, PropTypes } from 'react'
import { Tabs, Row, Col } from 'antd'
import { Link, withRouter } from 'react-router'
import styles from './MapTabResult.less'

const TabPane = Tabs.TabPane;

class MapTabResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '上海',
      list: [],
    }
  }

  componentDidMount() {
    console.log('=========位置信息===========')
    console.log(this.props.poi)
    this.searchNearby(this.state.keyword)
  }

  componentWillReceiveProps(nextProps) {
    this.searchNearby(this.state.keyword);
  }



  local_address(address){
    sessionStorage.setItem('map_address', address);
    console.log("选中了============>" + address);
    this.props.hiddenEvent();
  }

  searchNearby(keyword){
    let { map, poi } = this.props;
    let point = new BMap.Point(poi.position.lng, poi.position.lat) // 初始化地图,设置中心点坐标和地图级别  
    let options = {
      onSearchComplete: function(results){      
        if (local.getStatus() == BMAP_STATUS_SUCCESS){
          var list = []
          // 加入目前定位的地址
          list.push(
            <Row key={0} className={styles.add_col} 
                         onClick={this.local_address.bind(this, poi.address)}>
              <Col span={3} className={styles.location_icon_content}>
                <img src="src/images/location_icon.svg" className={styles.location_icon}/>
              </Col>
              <Col span={21} className={styles.add_name}><span>[当前] </span>{poi.address}</Col>
            </Row>
          );
          // 判断状态是否正确        
          for (var i = 0; i < results.getCurrentNumPois(); i ++){
            let title = results.getPoi(i).title;
            let address = results.getPoi(i).address;

            list.push(
              <Row key={i+1} className={styles.add_col} 
                           onClick={this.local_address.bind(this, address)}>
                <Col span={3} className={styles.location_icon_content}>
                  <img src="src/images/location_icon.svg" className={styles.location_icon}/>
                </Col>
                <Col span={21} className={styles.add_name}>{title}</Col>
                <Col span={21} offset={3} className={styles.add_address}>{address}</Col>
              </Row>
            )
          }
          this.setState({list: list, keyword: keyword})
        }
      }.bind(this)
    };      
    let local = new BMap.LocalSearch(map, options);
    local.setPageCapacity = 80;
    local.searchNearby(keyword, point, 2000);
  }

  render() {
    const height = document.body.clientHeight*0.6-37;

    return (
      <div className={styles.container}>
        <Tabs defaultActiveKey="上海" onChange={this.searchNearby.bind(this)}>
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