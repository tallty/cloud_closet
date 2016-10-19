// 异步获取定位信息
// 外部调用：locationPromise().then((value) => {...})
// import tencentToBaidu from './tencentToBaidu'

const locationPromise = () => {
  return new Promise((resolve, reject) => {
    console.log("开始定位")
    var geolocation = new qq.maps.Geolocation("OZBBZ-ZQLC3-MKF3U-3VCU4-DFWO7-AGFPB", "weather_survey")
    console.log(`获取到de定位对象：${geolocation}`);
    geolocation.getLocation((poi) => { 
      console.log("定位成功")
      console.dir(poi)
      let _poi = poi
      // 标准坐标转百度坐标
      // let lng_lat = tencentToBaidu(_poi.lng, _poi.lat)
      // _poi.lng = lng_lat.lng
      // _poi.lat = lng_lat.lat
      // 修改为百度地图地址（腾讯返回地址与百度返回地址不同）
      // let geoc = new BMap.Geocoder()
      // let point = new BMap.Point(_poi.lng,_poi.lat);
      // geoc.getLocation(point, (rs) => {
      //  _poi.addr = rs.address
     //   resolve(_poi)
      // })
      resolve(_poi)
    }, { 
      enableHighAccuracy: true
    })
  })
}

export default locationPromise


