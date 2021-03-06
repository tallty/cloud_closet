import React, { Component, PropTypes } from 'react'
import css from './profile.less'
import { Celler } from '../../common/Celler'
import PopWindow from '../../common/PopWindow'
import SuperAgent from 'superagent'
import { Input, Button, Form, Spin, message } from 'antd';

const FormItem = Form.Item;
const PHOTO_MAX_SIZE = 1024;

class MyProfile extends Component {
  state = {
    pop: false,
    user: {},
    popTitle: '',
    update_key: '',
    update_value: '',
    upadte_type: 'string',
    loading: true
  }

  componentWillMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    SuperAgent
      .get(`http://closet-api.tallty.com/user_info?random=${Math.random()}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.closet_token)
      .set('X-User-Phone', localStorage.closet_phone)
      .end((err, res) => {
        if (!err || err === null) {
          this.setState({ user: res.body, loading: false });
          // 缓存
          const userStr = JSON.stringify(res.body);
          localStorage.setItem('user', userStr);
        } else {
          this.setState({ loading: false });
          message.error(res.body.error);
        }
      })
  }

  /**
   * 全局更新函数
   */
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = new FormData();
        formData.append(this.state.update_key, values.value);
        this.updateUserInfo(formData);
      }
    });
  }

  updateUserInfo(formData) {
    this.setState({ loading: true });
    SuperAgent
      .put(`http://closet-api.tallty.com/user_info?random=${Math.random()}`)
      .set('Accept', 'application/json')
      .set('X-User-Token', localStorage.closet_token)
      .set('X-User-Phone', localStorage.closet_phone)
      .send(formData)
      .end((er, res) => {
        if (!er || er === null) {
          // 缓存
          const userStr = JSON.stringify(res.body);
          localStorage.setItem('user', userStr);
          this.setState({
            user: res.body,
            pop: false,
            loading: false
          })
          message.success('更新用户信息成功');
        } else {
          this.setState({ loading: false });
          message.error('更新用户信息失败');
        }
      })
  }

  /**
   * [handlePhotoChange 获取图片对象，并上传]
   * @param  {[type]} e [文件表单对象]
   */
  handlePhotoChange(e) {
    const formData = new FormData(this.refs.photo);
    formData.append('user_info[avatar_attributes][photo]', e.target.files[0]);
    this.updateUserInfo(formData);
  }

  /**
   * [hidePopWindow 隐藏弹出框]
   */
  hidePopWindow() {
    this.setState({ pop: false })
  }

  /**
   * [handlePopInputChange 弹出框表单监听]
   */
  handlePopInputChange(e) {
    this.setState({ update_value: e.target.value })
  }

  handleNickname() {
    this.setState({
      pop: true,
      popTitle: '修改昵称',
      update_key: 'user_info[nickname]',
      update_value: this.state.user.nickname,
      updateType: 'string'
    });
    this.props.form.setFieldsValue({
      value: this.state.user.nickname
    })
  }

  handleMail() {
    this.setState({
      pop: true,
      popTitle: '修改邮箱',
      update_key: 'user_info[mail]',
      update_value: this.state.user.mail,
      updateType: 'email'
    });
    this.props.form.setFieldsValue({
      value: this.state.user.mail
    })
  }

  handleSafe() {

  }

  handlePassword() {

  }

  formatPhoto() {
    const tel = this.state.phone;
    return `${tel.substring(0, 3)}****${tel.substring(7, 11)}`;
  }

  handleSignout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  }


  render() {
    const { pop, user, popTitle, update_key, update_value, updateType, loading } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        {loading ? <div className={css.spinContainer}><Spin /></div> : null}
        <div className={css.container}>
          <span className={css.photoInput}>
            <input type="file" accept="image/*" multiple={false} onChange={this.handlePhotoChange.bind(this)} />
            <Celler
              name="我的头像"
              type="image"
              value={user.avatar}
              bottom={14}
              defaultValue="src/images/default_photo.svg"
              event={() => { }}
            />
          </span>
          <Celler name="昵称" value={user.nickname} event={this.handleNickname.bind(this)} />
          <Celler name="邮箱" value={user.mail} bottom={14} event={this.handleMail.bind(this)} />
          {/*
            <Celler name="账号安全" value={this.formatPhone} type="phone" event={this.handleSafe.bind(this)} />
            <Celler name="密码" value="●●●●●●●●●" bottom={14} event={this.handlePassword.bind(this)} />
          */}
          <Celler name="收货地址" url="/address" bottom={14} />
          <Celler name="退出登录" type="simple" color="#F2C27F" event={this.handleSignout} />

          {/* 弹出框：修改资料 */}
          <PopWindow show={pop} onCancel={this.hidePopWindow.bind(this)}>
            <div className={css.popContainer}>
              <p className={css.title}>{popTitle}</p>
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormItem hasFeedback>
                  {getFieldDecorator('value', {
                    rules: [{
                      type: `${updateType}`, message: '格式不正确'
                    }, {
                      required: true, message: '请输入正确格式的信息'
                    }]
                  })(
                    <Input size="large" />
                    )}
                </FormItem>
                <Button htmlType="submit" className={css.update}>更新</Button>
              </Form>
            </div>
          </PopWindow>
        </div>
      </div>
    )
  }
}

const Profile = Form.create()(MyProfile);

export default Profile;
