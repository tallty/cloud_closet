/**
 * 轮播通用组件
 * 使用：
 * <Carousel />
 */
import React, { Component, PropTypes } from 'react'
import css from './Carousel.less'
import classNames from 'classnames/bind'
import TweenOne from 'rc-tween-one'

export default class Carousel extends Component {

  constructor(props) {
    super(props);
    this.state={
      replay: this.props.replay,
      title: this.props.titles[1],
      direction: this.props.directions[1],
      url: this.props.urls[1],
      num: '-50%',
      show_number: this.props.show_number
    }
  }

  changePic(index){
    const { titles, pics, directions, urls } = this.props
    const show_number = index
    const num = `${-100*(index)+50}%`
    this.setState({replay: !this.state.replay, title: titles[index], direction: directions[index], url: urls[index], show_number: show_number, num: num })
  }

  getCarouselList() {
    const { titles, pics } = this.props
    const {show_number, num} = this.state
    const list = []
    pics.forEach((item, index, obj) => {
    list.push(
      <div key={index} className={css.cell_container} >
        <TweenOne
          animation={{left: num, scale: show_number==index?1.06:0.9, yoyo: false, repeat: 0, duration: 500}}
          style={{left: '-50%' }}
          className={css.carouse_container_animation}
        >
          <img onClick={this.changePic.bind(this, index)} src={item} alt={titles[index]}/>
        </TweenOne>
      </div>
      )
    })
    return list
  }

  render() {
    const { titles, pics, directions, urls } = this.props
    return (
      <div className={css.carouse_container}>
        <h3>{this.state.title}</h3>
        <div className={css.carouse_list_container}>
          {this.getCarouselList()}
        </div>
        <div className={css.carouse_direction}>
          <p>{this.state.direction}</p>
          <a href={this.state.url}>查看详情</a>
        </div>      
      </div>
    )
  }
}

Carousel.defaultProps = {
  titles:['叠放柜', '挂放柜', '组合柜', '礼服柜'],
  pics:['src/images/sark_one.png', 'src/images/sark_two.png', 'src/images/sark_three.png', 'src/images/sark_four.png'],
  directions:['*叠放柜可存放针织类，卫衣棉服等可折叠衣物60件,也可提供真空袋出售；  收费价格：180¥/月', '*挂放柜可存放20件套装衣物，适合存放外套、大衣；  收费价格：300¥/月', '*组合柜可存放60件折叠和20件挂放； 收费价格：400¥/月', '*礼服柜可按需存放贵重礼服，适合存放大件礼服；收费价格：50¥/件'],
  urls:['/charge_detail', '/charge_detail', '/charge_detail', '/charge_detail'],
  replay: false, 
  show_number: 1
}

Carousel.PropTypes = {
  titles: PropTypes.array,
  pics: PropTypes.array,
  directions: PropTypes.array,
  urls: PropTypes.array,
  replay: PropTypes.bool,
  show_number: PropTypes.interval,
}