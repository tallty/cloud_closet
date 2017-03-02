// 品牌主页
import React, { Component, PropTypes } from 'react'
import { Affix, Row, Col, Icon, Button, Card, Input } from 'antd'
import { Link } from 'react-router'
import SuperAgent from 'superagent'
import classnames from 'classnames'
import PopWindow from '../../common/PopWindow'
import Picker from 'react-mobile-picker';
import styles from '../closet_tab/ClosetTab.less'
import css from './Manage.less'
import Toolbar from '../../common/Toolbar';


export class Manage extends Component {
  state = {
    pop: false,
    popTitle: "",
    update_key: "",
    update_value: "",
    selectes: [],
    garments: [],
    isPickerShow: false,
    valueGroups: {
      title: '移动至',
    }, 
    optionGroups: {
      title: ['移动至','叠放柜一', '叠放柜二', '挂柜一', '礼服柜']
    }
  }

  componentWillMount() {
    let garments = JSON.parse(sessionStorage.garments)
    const selectes = new Array(garments.length).fill(false)
    this.setState({ garments: garments, selectes: selectes })
  }

  // Update the value in response to user picking event 
  handleChange = (name, value) => {
    this.setState(({valueGroups}) => ({
      valueGroups: {
        ...valueGroups,
        [name]: value
      }
    }));
  }

  togglePicker = () => {
    this.setState(({isPickerShow}) => ({
      isPickerShow: !isPickerShow
    }));
  }

  selecte(index, id){
    const {selectes} = this.state
    selectes[index] = !selectes[index]
    this.setState({selectes: selectes})
  }

  initList() {
    let list = [];
    const {selectes} = this.state
    this.state.garments.forEach((garment, i, obj) => {
      list.push(
        <Col span={12} className={styles.left_tab} key={garment.id}>
          <div style={{color:'#fff'}}>
            <Card className={styles.card_tab} style={selectes[i]?{border:"1px solid #ECC17D"}:{}} onClick={this.selecte.bind(this, i, garment.id)}>
              {/* 添加新增标签*/}
              {
                garment.is_new ? <div className={styles.new_tab}>New</div> : null
              }
              {/* 添加衣服展示卡片模块*/}
              <div className={styles.card_pic_content}>
                <img alt="example" src={garment.cover_image} />
              </div>
              <div className={styles.card_tab_title}>
                <p className={styles.brand} ></p>
                <p className={styles.good_type} >{garment.title}</p>
                <sub className={styles.time_line}>入库时间：{this.parseTime(garment.put_in_time, "yyyy-MM-dd")}</sub><br/>
                {/*<sub className={styles.time_line}>到期时间：{this.parseTime(garment.expire_time, "yyyy-MM-dd")}</sub>*/}
              </div>
              {/* 添加点赞喜欢模块*/}
              { /* <div className={styles.like_tab}><Icon className={styles.heart_icon} type="heart-o" /><br/> <sub>2234</sub></div> */ }
            </Card>
          </div>
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

  /**
   * [hidePopWindow 隐藏弹出框]
   */
  hidePopWindow() {
    console.log("=====弹出框关闭=====")
    this.setState({ pop: false })
  }

  /**
   * [handlePopInputChange 弹出框表单监听]
   */
  handlePopInputChange(e) {
    this.setState({ update_value: e.target.value })
  }

  changename(){
    console.log("点击了重命名")
    this.setState({ 
      pop: true,
      popTitle: "修改名称",
      update_key: "user_info[nickname]",
      update_value: ""
    })
  }

  handleMenuClick(e) {
    console.log('click', e);
  }


  render() {
    const tab_height = document.body.clientHeight - 100;
    const {garments, pop, update_key, update_value, popTitle, isPickerShow, optionGroups, valueGroups } = this.state
    const maskStyle = {
      display: isPickerShow ? 'block' : 'none'
    };
    const pickerModalClass = classnames(
      css.picker_modal,
      isPickerShow ? css.picker_modal_toggle : ''
    );
    return (
      <div className={styles.Manage_content}>
        <div className={styles.tool_bar}>
          <div className={styles.back} onClick={this.goback} >
            <Icon type="left" />
          </div>
          <div className={styles.title}>
            <p>挂柜（2）</p>
          </div>
          <div className={styles.menu} onClick={this.changename.bind(this)} >重命名</div>
        </div>
        
        <div className={styles.closet_container} style={{height: tab_height}}>
          <div className={styles.tab_content}>
            <Row className={styles.tag_content}>
              <Col span={24}>
                <Button type="primary" className={styles.tag} onClick={this.show_type}>裙装</Button>
                <Button type="primary" className={styles.tag} onClick={this.show_type}>外套</Button>
                {/*<Button type="primary" className={styles.ellipsis_btn}><Icon type="ellipsis" className={styles.ellipsis_icon} /></Button>*/}
              </Col>
            </Row>
          </div>
          <p className={styles.cloth_number}>{`数量（${garments.length})`}</p>
          <Row gutter={9} className={styles.my_colset_tab_content}>
            { this.initList() }
          </Row>
        </div>
        <Row className={css.tab_footer}>
          <Col span={5} >
            <input type="text" className={styles.weui_select} value={valueGroups.title} readOnly onClick={this.togglePicker} />
          </Col>
          <Col span={1}>
            <Icon type="down" />
          </Col>
          <Col span={6} offset={12}>
            <Link to="/dispatching">
              <Button type="primary" className={css.distribution_btn}>加入配送</Button>
            </Link>
          </Col>
        </Row>
        <Row className={css.dispatch_footer_modal}>
          <Col span={24}>
            <div className={css.picker_modal_container}>
              <div className={css.picker_modal_mask} style={maskStyle} onClick={this.togglePicker}></div>
              <div className={pickerModalClass}>
                <header>
                  <div className={css.title}>选择你的柜子</div>
                  <a href="javascript:;" onClick={this.togglePicker}>完成</a>
                </header>
                <Picker
                 optionGroups={optionGroups}
                 valueGroups={valueGroups}
                 onChange={this.handleChange} />
              </div>
            </div>
          </Col>
        </Row>
        {/* 弹出框：修改资料 */}
        <PopWindow show={pop} onCancel={this.hidePopWindow.bind(this)}>
          <div className={css.popContainer}>
            <p className={css.title}>{popTitle}</p>
            <Input size="large" value={update_value} onChange={this.handlePopInputChange.bind(this)}/>
            <Button className={css.update}>更新</Button>
          </div>
        </PopWindow>
      </div>
    );
  }
}
