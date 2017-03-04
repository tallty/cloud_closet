import React, { Component, PropTypes } from 'react'
import { Row, Col, Button, Card, Icon, Spin } from 'antd'
import { Link, withRouter } from 'react-router'
import classnames from 'classnames'
import styles from './ClosetTab.less'
import SuperAgent from 'superagent'
import { Spiner } from '../../common/Spiner'

const { string, number, bool, arrayOf, shape } = PropTypes;
const height = window.innerHeight - 52;

class ClosetTab extends Component {
  state = {
    garments: [],
    title: ''
  }

  componentDidMount() {
    this.getGarments(1, 100, (res) => {
      const obj = res.body;
      sessionStorage.setItem('garments', JSON.stringify(obj.garments))
      this.setState({
        garments: obj.garments, title: obj.title
      })
    })
  }
  getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

  // 获取列表
  getGarments(page, per_page, func) {
    const id = this.getQueryString('id')
    SuperAgent
      .get(`http://closet-api.tallty.com/exhibition_chests/${id}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.authentication_token)
      .set('X-User-Phone', localStorage.phone)
      .end((err, res) => {
        if (!err || err === null) {
          func(res);
        } else {
          console.log("获取衣橱列表失败");
        }
      })
  }

  initList() {
    let list = [];
    this.state.garments.forEach((garment, i, obj) => {
      list.push(
        <Col span={12} className={styles.left_tab} key={garment.id}>
        <Link to={`/closet_details?id=${i}`}>
          <div style={{ color: '#fff' }}>
            <Card className={styles.card_tab}>
              {/* 添加新增标签*/}
              {garment.is_new ? <div className={styles.new_tab}>New</div> : null}
              {/* 添加衣服展示卡片模块*/}
              <div className={styles.card_pic_content}>
                <img alt="example" src={garment.cover_image} />
              </div>
              <div className={styles.card_tab_title}>
                <p className={styles.brand} ></p>
                <p className={styles.good_type} >{garment.title}</p>
                <sub className={styles.time_line}>入库时间：{this.parseTime(garment.put_in_time, 'yyyy-MM-dd')}</sub><br />
                {/*<sub className={styles.time_line}>到期时间：{this.parseTime(garment.expire_time, "yyyy-MM-dd")}</sub>*/}
              </div>
              {/* 添加点赞喜欢模块*/}
              {/* <div className={styles.like_tab}><Icon className={styles.heart_icon} type="heart-o" /><br/> <sub>2234</sub></div> */}
            </Card>
          </div>
        </Link>
        </Col>
      )
    })
    return list;
  }

  parseTime(x,y) { 
    var x = new Date(x)
    var z ={
        y:x.getFullYear(),
        M:x.getMonth()+1,
        d:x.getDate(),
        h:x.getHours(),
        m:x.getMinutes(),
        s:x.getSeconds()}; 
    return y.replace(/(y+|M+|d+|h+|m+|s+)/g,function(v) {
        return ((v.length>1?"0":"")+eval('z.'+v.slice(-1))).slice(-(v.length>2?v.length:2))
     }); 
  }

  goback(){
    history.back()
  }

  render() {
    const { garments, title } = this.state
    return (
      <div>
        <div className={styles.tool_bar}>
          <div className={styles.back} onClick={this.goback} >
            <Icon type="left" />
          </div>
          <div className={styles.title}>
            <img src="src/images/sark_one_icon.png" alt="" /><p>{title}</p>
          </div>
          <div className={styles.menu} ><Link to={`/manage?id=${this.getQueryString('id')}`}>管理</Link></div>
        </div>
        <div className={styles.closet_container} style={{height: height}}>
          <div className={styles.tab_content}>
            <Row className={styles.tag_content}>
              <Col span={24}>
                <Button type="primary" className={styles.tag} onClick={this.show_type}>裙装</Button>
                <Button type="primary" className={styles.tag} onClick={this.show_type}>外套</Button>
                <Button type="primary" className={styles.tag} onClick={this.show_type}>上衣</Button>
                <Button type="primary" className={styles.tag} onClick={this.show_type}>裤装</Button>
                <Button type="primary" className={styles.tag} onClick={this.show_type}>裤装</Button>
                <Button type="primary" className={styles.tag} onClick={this.show_type}>裤装</Button>
                {/*<Button type="primary" className={styles.ellipsis_btn}><Icon type="ellipsis" className={styles.ellipsis_icon} /></Button>*/}
              </Col>
            </Row>
          </div>
          <div className={styles.cloth_number}>
            {`数量（${garments.length})`}
            <Link to="/cart" className={styles.cart}>
              <img src="/src/images/icon_cart.svg" alt="cart" />
              <div className={styles.dot}></div>
            </Link>
          </div>
          <Row gutter={9} className={styles.my_colset_tab_content}>
            { garments?this.initList():<Spin size="large" /> }
          </Row>
        </div>
      </div>
    );
  }
}

ClosetTab.defaultProps = {
  garments: []
}

ClosetTab.propTypes = {
  garments: arrayOf(
    shape({
      id: number,
      title: string,
      put_in_time: string,
      expire_time: string,
      is_new: bool,
      cover_image: string
    })
  )
};

export default withRouter(ClosetTab);
