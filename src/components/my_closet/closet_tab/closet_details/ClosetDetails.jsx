// 我的衣橱 - 详情
import React, { Component, PropTypes } from 'react'
import { Row, Col, Input, Icon, Button, Tag, Tooltip, Menu, Dropdown, message } from 'antd'
import { Link, withRouter } from 'react-router'
import classnames from 'classnames'
import SuperAgent from 'superagent';
import styles from './ClosetDetails.less'

class ClosetDetails extends Component {
  state = {
    garment: {},
    disabled: false,
    tags: [],
    supportTags: []
  }

  componentWillMount() {
    const cacheGarment = JSON.parse(sessionStorage.getItem('garment'));
    const cacheSupportTags = JSON.parse(sessionStorage.getItem('supportTags'));
    const tagList = cacheGarment.tag_list;
    this.setState({
      garment: cacheGarment,
      tags: cacheGarment.tag_list,
      supportTags: cacheSupportTags
    });
  }

  getAllTags() {
    return this.state.tags.map((tag, index) => {
      const isLongTag = tag.length > 20;
      const tagElem = (
        <Tag key={tag} className={styles.tag} closable afterClose={() => this.removeTags(tag)}>
          {isLongTag ? `${tag.slice(0, 20)}...` : tag}
        </Tag>
      );
      return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
    })
  }

  addTags(e) {
    const myTags = this.state.tags;
    if (!myTags.includes(e.key)) {
      myTags.push(e.key);
      this.setState({ tags: myTags });
      this.updateTags(e.key, '');
    }
  }

  goback() {
    history.back()
  }

  parseTime(time) {
    return time.slice(0, -13).split('T').join(' ');
  }

  removeTags = (removedTag) => {
    const myTags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags: myTags });
    this.updateTags('', removedTag);
  }

  showDetailImages() {
    let images = [];
    if (this.state.garment.detail_image) {
      images = this.state.garment.detail_image.map((image, index) => (
        <img src={image} alt="" key={index} />
      ));
    }
    return images;
  }

  addToCart() {
    SuperAgent
      .post('http://closet-api.tallty.com/garments/add_them_to_basket')
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.closet_token)
      .set('X-User-Phone', localStorage.closet_phone)
      .send({ garment_ids: [this.state.garment.id] })
      .end((err, res) => {
        if (!err || err === null) {
          this.setState({
            disabled: true
          })
          message.success('加入配送蓝成功');
        } else {
          message.error('加入配送蓝失败，请稍后重试。');
        }
      })
  }

  updateTags(newTags, removeTags) {
    SuperAgent
      .put(`http://closet-api.tallty.com/garments/${this.state.garment.id}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.closet_token)
      .set('X-User-Phone', localStorage.closet_phone)
      .send({
        garment: {
          add_tag_list: newTags,
          remove_tag_list: removeTags
        }
      })
      .end()
  }

  render() {
    const tabHeight = document.body.clientHeight - 50;
    const { garment, supportTags } = this.state;
    const menu = (
      <Menu onClick={this.addTags.bind(this)}>
        {
          supportTags.map(item => (
            <Menu.Item key={item.title}>{item.title}</Menu.Item>
          ))
        }
      </Menu>
    );
    return (
      <div>
        {/* 返回按钮 */}
        <Button
          type="ghost"
          className={styles.left_link}
          onClick={this.goback.bind(this)}
          shape="circle-outline" icon="left"
        />
        <div className="scrollContainer" style={{ height: tabHeight }}>
          <div className={styles.ClosetDetails_content}>
            {/* 主图模块 */}
            <Row className={styles.ClosetDetails_content_header}>
              <Col span={24} className={styles.main_pic_content}>
                <img src={garment.cover_image} alt="" />
                {garment.garment_status === '已入库' || '配送篮中' ? <i></i> : '' }
              </Col>
            </Row>
            {/* 名称标签模块 */}
            <Row className={styles.ClosetDetails_content_body}>
              <Col span={24} >
                <Row className={styles.name_tab_content_row}>
                  <Col span={24} >
                    <p className={styles.name}>{garment.title}</p>
                    <p className={styles.time_story}>{garment.description}</p>
                    <p className={styles.time_story}>
                      入库时间：{this.parseTime(garment.put_in_time)}
                    </p>
                  </Col>
                  <Col span={24} className={styles.tag_tab}>
                    <div>
                      {this.getAllTags()}
                      <Dropdown overlay={menu} trigger={['click']}>
                        <Button className={styles.tag} size="small" type="dashed" >+</Button>
                      </Dropdown>
                    </div>
                  </Col>
                </Row>
                {/* 细节图模块 */}
                <Row className={styles.detail_pic_content_row}>
                  <Col span={24} className={styles.detail_pic_content_title}>
                    <Col span={10} offset={7} className={styles.detail_pic_content_title_up}>
                      More Figure
                    </Col>
                    <Col span={10} offset={7} >
                      细节图
                    </Col>
                  </Col>
                  <Col span={24} className={styles.detail_pic_content_image} >
                    {this.showDetailImages()}
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
        {/* 加入配送按钮 */}
        <Row>
          <Col span={24} className={styles.dispatching_btn} >
            <Button
              type="primary"
              disabled={this.state.disabled}
              onClick={this.addToCart.bind(this)}
            >
              {this.state.disabled ? '已加入配送' : '加入配送'}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

ClosetDetails.defaultProps = {
}

ClosetDetails.propTypes = {
};

export default withRouter(ClosetDetails);
