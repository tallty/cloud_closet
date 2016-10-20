import React, { Component, PropTypes } from 'react'
import tencentToBaidu from '../Common/tencentToBaidu'
import locationPromise from '../Common/locationPromise'
import { Row, Col, Spin } from 'antd'
import MapTabResult from './MapTabResult'
import { Link, withRouter } from 'react-router'
import styles from './MapAddress.less'

const height = document.body.offsetHeight*0.4
const map = null
const timer = null

export class MapAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poi: null,
      keyword: ''
    }
  }

  componentDidMount() {
    console.log(this.height);

    // this.map = new AMap.Map('map-container',{zoom: 10,center: [121.5059,31.2335]});
    // // 初始化地图
    this.map = new BMap.Map("map-container")
    this.map.centerAndZoom(new BMap.Point(121.5059,31.2335), 15) // 初始化地图,设置中心点坐标和地图级别
    // 获取当前定位
    this.getCurrentPosition()
  }

  // 获取当前定位
  getCurrentPosition() {
    locationPromise().then(
      value => {
        console.log("腾讯地图定位")
        console.dir(value)
        let poi = {
          address: value.addr,
          position: { lng: value.lng, lat: value.lat },
          province: value.province,
          city: value.city,
          district: value.district
        }
        this.setState({ 
          poi: poi,
        })
        this.defaultPointAndData(poi)
        // 当定位成功后，即可注册手动选点功能
        this.chooseMapPoint()
      }
    )
  }

  //初始化定位
  defaultPointAndData(poi) {
    if (!poi) { return ;}
    console.dir(poi)
    // 转化：调用接口使用标准坐标
    let lng_lat = tencentToBaidu(poi.position.lng, poi.position.lat)
    poi.position.lng = lng_lat.lng
    poi.position.lat = lng_lat.lat
    // 更新地图标注
    let location_point = new BMap.Point(poi.position.lng, poi.position.lat)
    let location_icon = new BMap.Icon("src/images/loc_icon.svg", new BMap.Size(66, 66))
    let marker = new BMap.Marker(location_point, {icon: location_icon});
    this.map.clearOverlays();
    this.map.addOverlay(marker);
    this.map.panTo(location_point)

    // 更新状态（位置改变了，需要重新后去雨量信息，所以需要重置rainData）
    this.setState({ 
      poi: poi,
    })
  }

  // 点击地图选点，根据坐标添加标注，并获取数据
  updatePointAndData(poi) {
    if (!poi) { return ;}
    console.dir(poi)
    // 更新地图标注
    let location_point = new BMap.Point(poi.position.lng, poi.position.lat)
    let location_icon = new BMap.Icon("src/images/loc_icon.svg", new BMap.Size(66, 66))
    let marker = new BMap.Marker(location_point, {icon: location_icon});
    this.map.clearOverlays();
    this.map.addOverlay(marker);
    this.map.panTo(location_point)
    // 更新状态（位置改变了，需要重新后去雨量信息，所以需要重置rainData）
    this.setState({
      poi: poi,
    })
  }

  // 手动选点功能 , 使用【百度地图】选点
  chooseMapPoint() {
    const geocoder = new BMap.Geocoder()
    this.map.addEventListener("click", (e) => {
      let point = e.point
      geocoder.getLocation(point, (rs) => {
        console.log("百度地图定位")
        console.dir(rs)
        let poi = {
          address: rs.address,
          position: { lng: point.lng, lat: point.lat },
          province: rs.addressComponents.province,
          city: rs.addressComponents.city,
          district: rs.addressComponents.district
        }
        // 标注并更新数据
        this.updatePointAndData(poi)
      })
    })
  }

  render() {
    return (
      <div className={styles.dhContainer} >
        <div id="map-container" className={styles.baidumap} style={{height: height}}></div>
          {this.state.poi ? <MapTabResult map={this.map} {...this.state} /> : <div className={styles.spin_content}><Spin size="large"/></div>}
        {console.log('=========================')}
        {console.log(this.state.poi)}
      </div>
    )
  }
}