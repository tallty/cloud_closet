import React, { Component, PropTypes } from 'react'
import { Row, Col, Button, Card, Icon, Spin, message } from 'antd'
import { Link, withRouter } from 'react-router'
import classnames from 'classnames'
import styles from './ClosetTab.less'
import SuperAgent from 'superagent'
import { Spiner } from '../../common/Spiner'

const { string, number, bool, arrayOf, shape } = PropTypes;
const height = window.innerHeight - 52;

class ClosetTab extends Component {
  state = {
    id: this.props.location.query.id,
    garments: null,
    closet: null,
    needJoin: true,
    title: '',
    supportTags: [],
    selectedTag: '全部'
  }

  componentDidMount() {
    this.getGarments();
    this.getTags();
  }

  // 获取列表
  getGarments() {
    SuperAgent
      .get(`http://closet-api.tallty.com/exhibition_chests/${this.state.id}?random=${Math.random()}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.closet_token)
      .set('X-User-Phone', localStorage.closet_phone)
      .end((err, res) => {
        if (!err || err === null) {
          const obj = res.body;
          console.log(obj)
          sessionStorage.setItem('closetTitle', JSON.stringify(obj.custom_title))
          this.setState({
            needJoin: obj.need_join,
            garments: obj.garments,
            title: obj.custom_title,
            closet: obj
          });
        } else {
          message.error('获取衣橱列表失败, 请稍后重试');
          this.setState({
            garments: [], title: ''
          })
        }
      })
  }

  getTags() {
    SuperAgent
      .get('http://closet-api.tallty.com/constant_tags')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (!err || err === null) {
          const obj = res.body;
          sessionStorage.setItem('supportTags', JSON.stringify(obj));
          this.setState({ supportTags: obj });
        } else {
          message.error('获取标签列表失败');
        }
      })
  }

  addToCart(id) {
    SuperAgent
      .post('http://closet-api.tallty.com/garments/add_them_to_basket')
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.closet_token)
      .set('X-User-Phone', localStorage.closet_phone)
      .send({ garment_ids: [id] })
      .end((err, res) => {
        if (!err || err === null) {
          this.setState({
            disabled: true
          })
          message.success('加入配送篮成功');
        } else {
          message.error('加入配送篮失败，请稍后重试。');
        }
      })
  }

  showGarments() {
    const { garments, selectedTag, closet, needJoin } = this.state;
    const list = [];
    if (!garments) return list;
    garments.forEach((garment, i, obj) => {
      if (garment.tag_list.includes(selectedTag) || selectedTag === '全部') {
        list.push(
          <Col span={12} className={styles.left_tab} key={garment.id}>
            <div style={{ color: '#fff' }}>
              <Card className={styles.card_tab} onClick={this.showDetail.bind(this, garment)}>
                {/* 添加新增标签*/}
                {garment.is_new ? <div className={styles.new_tab}>New</div> : null}
                {/* 添加衣服展示卡片模块*/}
                <div className={styles.card_pic_content}>
                  <img alt="example" src={garment.cover_image} />
                  {console.log(garment)}
                  {garment.garment_status === '已入库' || garment.garment_status === '配送篮中' ? '' : <i><div className={styles.state_tab}>{garment.garment_status}</div></i>}
                </div>
                <div className={styles.card_tab_title}>
                  <p className={styles.brand} ></p>
                  <p className={styles.good_type} >{garment.title}</p>
                  <sub className={styles.time_line}>
                    {
                      needJoin ?
                        <span>
                          到期时间：{this.parseTime(garment.expire_time)}
                        </span> : ''
                    }
                  </sub>
                  <br />
                </div>
              </Card>
              <button
                className={styles.peisong}
                onClick={this.addToCart.bind(this, garment.id)}
              >
                加入配送篮
              </button>
            </div>
          </Col>
        )
      }
    });
    if (closet.remain_space_count === closet.max_count) {
      list.push(<div className={styles.release_content} style={{ height: height - 150 }} key={0}>
        <h3>当前衣柜为空!</h3>
        {/* <Button type="primary" className={styles.tag} onClick={this.removeCloset.bind(this)}>释放衣柜</Button> */}
      </div>)
    }
    return list;
  }

  showDetail(garment) {
    sessionStorage.setItem('garment', JSON.stringify(garment));
    this.props.router.push('/closet_details')
  }

  removeCloset() {
    SuperAgent
      .post(`http://closet-api.tallty.com/exhibition_chests/${this.state.id}/delete_his_val_chest`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.closet_token)
      .set('X-User-Phone', localStorage.closet_phone)
      .end((err, res) => {
        if (!err || err === null) {
          message.success('释放衣柜成功');
          this.props.router.replace('/MyCloset');
        } else {
          message.error('释放衣柜失败');
        }
      })
  }

  parseTime(time) {
    return time.slice(0, -10).split('T')[0];
  }

  goback() {
    history.back()
  }

  showSupportTags() {
    return this.state.supportTags.map((item, index) => (
      <button
        key={index}
        className={styles.tag}
        onClick={this.selectedTag.bind(this, item)}
      > {item.title}
      </button>
    ));
  }

  selectedTag(tag) {
    this.setState({ selectedTag: tag.title });
  }

  render() {
    const { garments, title, selectedTag } = this.state;
    const garmentList = this.showGarments();
    return (
      <div>
        <div className={styles.tool_bar}>
          <Link className={styles.back} to="/MyCloset" >
            <Icon type="left" />
          </Link>
          <div className={styles.title}>
            <p>{title}</p>
          </div>
          <div className={styles.menu} ><Link to={`/manage?id=${this.state.id}`}>管理</Link></div>
        </div>
        <div className={styles.closet_container} style={{ height: height }}>
          <div className={styles.tab_content}>
            <Row className={styles.tag_content}>
              <Col span={24}>
                <button
                  className={styles.tag}
                  onClick={this.selectedTag.bind(this, { title: '全部' })}>全部</button>
                {this.showSupportTags()}
              </Col>
            </Row>
          </div>
          <div className={styles.cloth_number}>
            {`【${selectedTag}】数量（${garmentList.length})`}
            <Link to={`/cart?back_url=/closet_tabs?id=${this.state.id}`} className={styles.cart}>
              <span className={styles.cart_span}>配送篮</span>
              <img src="/src/images/icon_cart.svg" alt="cart" />
              <div className={styles.dot}></div>
            </Link>
          </div>
          <Row gutter={9} className={styles.my_colset_tab_content}>
            {garments ? garmentList : <Spiner />}
          </Row>
        </div>
      </div>
    );
  }
}

ClosetTab.defaultProps = {
  garments: [],
  need_join: true
}

ClosetTab.propTypes = {
  need_join: Boolean,
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
