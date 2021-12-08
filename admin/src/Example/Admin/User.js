import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Userview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stagUrl: '',
      nameUser: '',
      submenu: 'false',
      login: 'false'
    }
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'http://localhost:9999/UserMenu',
      data: null
    }).then(res => {
      if (res.data.user === undefined) {
        console.log("err");
      } else {
        this.setState({
          userName: res.data.user.userName
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }
  onClick() {
    console.log(this.state.submenu);
    if (this.state.submenu === 'true') {
      this.setState({
        submenu: 'false'
      });
    } else {
      this.setState({
        submenu: 'true'
      });
    }
  }

  onClickLogOut() {
    axios({
      method: 'GET',
      url: 'http://localhost:9999/Logout',
      data: null
    }).then(res => {
      this.setState({
        login: 'true'
      });
    }).catch(err => {
      console.log(err);
    });
  }
  render() {
    console.log(this.state.login);
    if (this.state.login === 'true') {
      return (<Redirect to="/dang-nhap" />)
    }
    return (
      <div className="name-backgr">
        <div className="header-title">{this.props.stagUrl}</div>
        <div className="icon-profile" onClick={() => this.onClick()}>
          <i className="fas fa-user-circle icon-user"></i>
          <div className="none-select-text">{this.state.userName}</div>
        </div>
        <div className={this.state.submenu === 'true' ? 'sub-menu-user' : 'sub-menu-user class-hide'}>
          <div className="text-menu" onClick={() => this.onClickLogOut()} >
            Thoát
          </div>
        </div>
      </div>
    );
  }
}
export default Userview;
