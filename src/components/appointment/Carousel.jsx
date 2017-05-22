/**
 * 轮播通用组件
 * 使用：
 * <Carousel />
 */
import React, { Component, PropTypes } from 'react'
import css from './Carousel.less'
import classNames from 'classnames/bind'
import TweenOne from 'rc-tween-one'
import ReactSwipe from './react-swiper/react-swipes'
import { Link } from 'react-router';

const tabWidth = document.body.clientWidth;
let timer = null;

export default class Carousel extends Component {
  state = {
    title: this.props.titles[0],
    direction: this.props.descriptions[0],
    position: this.props.position,
    offset: 0
  }

  componentDidMount() {
    const { titles, descriptions } = this.props;
    const swipeNode = document.getElementsByClassName('card-slide')[0];
    timer = setInterval(() => {
      let pos = this.state.position + 1;
      let oft = this.state.offset + tabWidth / 2;
      if (pos === 4) {
        pos = 0;
        oft = 0;
      }
      swipeNode.style.transform = `translate3d(-${oft}px, 0px, 0px)`;
      this.setState({
        position: pos,
        offset: oft,
        title: titles[pos],
        direction: descriptions[pos]
      });
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  getCarouselList() {
    const { titles, pics } = this.props;
    const { position } = this.state;
    const list = [];
    pics.forEach((item, index, obj) => {
      list.push(
        <div key={index} className={css.cell_container} >
          <TweenOne
            animation={{
              scale: position === index ? 1.06 : 0.9,
              yoyo: false,
              repeat: 0,
              duration: 500
            }}
            style={{ left: '50%' }}
            className={css.carouse_container_animation}
          >
            <Link to="/charge_detail">
              <img src={item} alt={titles[index]} />
            </Link>
          </TweenOne>
        </div>
      )
    })
    return list;
  }

  render() {
    const { titles, pics, descriptions, position } = this.props
    // swipes 的配置
    const opt = {
      distance: tabWidth / 2, // 每次移动的距离，卡片的真实宽度
      currentPoint: position,
      swTouchend: (ev) => {
        const data = {
          moved: ev.moved,
          originalPoint: ev.originalPoint,
          newPoint: ev.newPoint,
          cancelled: ev.cancelled
        }
        const nowPoint = ev.newPoint
        this.setState({
          title: titles[nowPoint],
          direction: descriptions[nowPoint],
          position: nowPoint,
          offset: nowPoint * (tabWidth / 2)
        })
      }
    }
    return (
      <div className={css.carouse_container}>
        <h3>{this.state.title}</h3>
        <div className={css.carouse_list_container}>
          <div className="card-swipe" >
            <ReactSwipe className="card-slide" id="scrollSlide" options={opt}>
              {this.getCarouselList()}
            </ReactSwipe>
          </div>
        </div>
        <div className={css.carouse_direction}>
          <p>{this.state.direction}</p>
        </div>
      </div>
    )
  }
}

Carousel.defaultProps = {
  titles: ['叠放柜', '挂放柜', '组合柜', '礼服柜'],
  pics: [
    'src/images/sark_one.png',
    'src/images/sark_two.png',
    'src/images/sark_three.png',
    'src/images/sark_four.png'
  ],
  descriptions: [
    '*叠放柜可存放针织类，卫衣棉服等可折叠衣物60件,也可提供真空袋出售； 收费价格：180¥/月',
    '*挂放柜可存放20件套装衣物，适合存放外套、大衣；  收费价格：300¥/月',
    '*组合柜可存放60件折叠和20件挂放； 收费价格：400¥/月',
    '*礼服柜可按需存放贵重礼服，适合存放大件礼服；收费价格： 60¥/件'
  ],
  position: 0
}

Carousel.PropTypes = {
  titles: PropTypes.array,
  pics: PropTypes.array,
  descriptions: PropTypes.array,
  position: PropTypes.number
}
