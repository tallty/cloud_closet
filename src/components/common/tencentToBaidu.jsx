/**
 * 标准坐标转百度地图坐标
 */

const tencentToBaidu = (lng, lat) => {
  let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
  let x = lng;
  let y = lat;  
  let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);  
  let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);  
  let _lng = z * Math.cos(theta) + 0.0065;
  let _lat = z * Math.sin(theta) + 0.006;

  return { lng: _lng, lat: _lat };
}

export default tencentToBaidu;
