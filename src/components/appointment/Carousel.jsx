/**
 * 轮播通用组件
 * 使用：
 * <Carousel />
 */
import React, { Component, PropTypes } from 'react'
import css from './Carousel.less'
import classNames from 'classnames/bind'
import TweenOne from 'rc-tween-one'
import ReactSwipe from 'react-swipes'

const tabWidth = document.body.clientWidth;
export default class Carousel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      replay: this.props.replay,
      title: this.props.titles[0],
      direction: this.props.directions[0],
      url: this.props.urls[0],
      num: '50%',
      show_number: this.props.show_number,
      curCard: this.props.show_number
    }
  }

  changePic(index) {
    const { titles, pics, directions, urls } = this.props
    const show_number = index
    const num = `${-100 * (index) + 50}%`
    this.setState({ replay: !this.state.replay, title: titles[index], direction: directions[index], url: urls[index], show_number: show_number })
  }

  getCarouselList() {
    const { titles, pics } = this.props
    const { show_number, num } = this.state
    const list = []
    pics.forEach((item, index, obj) => {
      list.push(
        <div key={index} className={css.cell_container} >
          <TweenOne
            animation={{ scale: show_number === index ? 1.06 : 0.9, yoyo: false, repeat: 0, duration: 500 }}
            style={{ left: '50%' }}
            className={css.carouse_container_animation}
          >
            {/*<img onClick={this.changePic.bind(this, index)} src={item} alt={titles[index]} />*/}
            <img src={item} alt={titles[index]} />
          </TweenOne>
        </div>
      )
    })
    return list
  }

  render() {
    const { titles, pics, directions, urls } = this.props
    // swipes 的配置
    const opt = {
      distance: tabWidth/2, // 每次移动的距离，卡片的真实宽度
      swTouchend: (ev) => {
        const data = {
          moved: ev.moved,
          originalPoint: ev.originalPoint,
          newPoint: ev.newPoint,
          cancelled: ev.cancelled
        }
        console.log('=========1==========')
        console.log(ev.newPoint)
        console.log(this.state.show_number)
        console.log('=========2==========')
        console.log(ev.originalPoint)
        console.log('=========3==========')
        console.log(ev.moved)
        console.log('=========4==========')
        console.log(data)
        // const showNumber = ev.newPoint <= 0 ? 3 : (ev.newPoint >= 3) ? 0 : ev.newPoint
        const showNumber = ev.newPoint
        const numB = ev.newPoint <= 0 ? '50%' : null
        this.setState({ replay: !this.state.replay, title: titles[showNumber], direction: directions[showNumber], url: urls[showNumber], show_number: showNumber, num: numB })
      }
    }
    return (
      <div className={css.carouse_container}>
        <h3>{this.state.title}</h3>
        <div className={css.carouse_list_container}>
          <div className="card-swipe" >
            <ReactSwipe className="card-slide" options={opt}>
              {this.getCarouselList()}
            </ReactSwipe>
          </div>

          {/*{this.getCarouselList()}*/}
        </div>
        <div className={css.carouse_direction}>
          <p>{this.state.direction}</p>
          <a href={this.state.url}>收费详情</a>
        </div>
      </div>
    )
  }
}

Carousel.defaultProps = {
  titles: ['叠放柜', '挂放柜', '组合柜', '礼服柜'],
  pics: ['src/images/sark_one.png', 'src/images/sark_two.png', 'src/images/sark_three.png', 'src/images/sark_four.png'],
  directions: ['*叠放柜可存放针织类，卫衣棉服等可折叠衣物60件,也可提供真空袋出售；  收费价格：180¥/月', '*挂放柜可存放20件套装衣物，适合存放外套、大衣；  收费价格：300¥/月', '*组合柜可存放60件折叠和20件挂放； 收费价格：400¥/月', '*礼服柜可按需存放贵重礼服，适合存放大件礼服；收费价格：50¥/件'],
  urls: ['/charge_detail', '/charge_detail', '/charge_detail', '/charge_detail'],
  replay: false,
  show_number: 0
}

Carousel.PropTypes = {
  titles: PropTypes.array,
  pics: PropTypes.array,
  directions: PropTypes.array,
  urls: PropTypes.array,
  replay: PropTypes.bool,
  show_number: PropTypes.number,
}
