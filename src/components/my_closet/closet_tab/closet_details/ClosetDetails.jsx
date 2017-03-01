// 我的衣橱 - 详情
import React, { Component, PropTypes } from 'react'
import { Row, Col, Input, Icon, Button, Tag, Tooltip, Menu, Dropdown } from 'antd'
import { Link } from 'react-router'
import classnames from 'classnames'
import styles from './ClosetDetails.less'

export class ClosetDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      garment: null,
      tags: ['Tag 1', 'Tag 2'],
    }
  }

  componentWillMount() {
    let str = sessionStorage.garment;
    let garment = JSON.parse(str);
    this.setState({ garment: garment });
  }

  goback(){
    history.back()
  }

  parseTime(time) {
    let t = new Date(time);
    return `${t.getYear()}-${t.getMonth()+1}-${t.getDay()}`
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  }

  handleMenuClick(e) {
    const tags = this.state.tags;
    const new_tags = [...tags, e.key];
    console.log(tags);
    this.setState({
      tags: new_tags
    });
  }

  saveInputRef = input => this.input = input

  render() {
    let tab_height = document.body.clientHeight - 50;
    let { garment, tags } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick.bind(this)}>
        <Menu.Item key="上装">上装</Menu.Item>
        <Menu.Item key="夏装">夏装</Menu.Item>
        <Menu.Item key="冬装">冬装</Menu.Item>
        <Menu.Item key="下装">下装</Menu.Item>
      </Menu>
    );
    return (
      <div>
        {/* 返回按钮 */}
        <Button type="ghost" className={styles.left_link} onClick={this.goback.bind(this)} shape="circle-outline" icon="left" />
        <div className="scrollContainer" style={{height: tab_height}}>
          <div className={styles.ClosetDetails_content}>
            {/* 主图模块 */}
            <Row className={styles.ClosetDetails_content_header}>
              <Col span={24} className={styles.main_pic_content}>
                <img src={garment.cover_image} alt=""/>
              </Col>
            </Row>
            {/* 名称标签模块 */}
            <Row className={styles.ClosetDetails_content_body}>
              <Col span={24} >
                <Row className={styles.name_tab_content_row}>
                  <Col span={24} >
                    <p className={styles.name}>{garment.title}</p>
                    <p className={styles.time_story}>
                      入库时间：{ this.parseTime(garment.put_in_time) }<br/>
                      到期时间：{ this.parseTime(garment.expire_time) }
                    </p>
                  </Col>
                  <Col span={24} className={styles.tag_tab}>
                    <div>
                      {tags.map((tag, index) => {
                        const isLongTag = tag.length > 20;
                        const tagElem = (
                          <Tag key={tag} className={styles.tag} closable={true} afterClose={() => this.handleClose(tag)}>
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                          </Tag>
                        );
                        return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
                      })}
                      <Dropdown overlay={menu}>
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
                    <img src="src/images/detail_pic_two.png" alt=""/>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
        {/* 加入配送按钮 */}
        <Row>
          <Link to="/dispatching">
            <Col span={24} className={styles.dispatching_btn} >
              <Button type="primary" >加入配送</Button>
            </Col>
          </Link>
        </Row>
      </div>
    );
  }
}

ClosetDetails.defaultProps = {
}

ClosetDetails.propTypes = {
};
