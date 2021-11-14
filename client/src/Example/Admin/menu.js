import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class MenuView extends Component {
    constructor(props) {
        super(props);
        this.state={
            permission: '1',
            login: 'false',
            userName: ''
        }
    }

    componentDidMount(){
        axios({
          method: 'GET',
          url: 'http://localhost:9999/UserMenu',
          data: null
        }).then(res=> 
          {
              console.log(res.data.user.userName );
              if(res.data.user.userName === undefined){
                this.setState({
                    login: 'true'
                });
              }else{    
                this.setState({
                    permission : '' + res.data.user.vaiTro +'',
                    userName: res.data.user.userName
                });
              }
          }).catch(err=>
          {
            console.log(err);
          });
      }

    render() {
        if(this.state.login === 'true'){
            return (<Redirect to="/dang-nhap"/>)
        }
        return (
            <div className="menu-admin">
            <div className="menu-br">
                <div className="cv-image-menu">
                    <img src="images/Logo.png" width="100px;"/>
                </div>
                <i className="fas fa-bars icon-menu-sty"></i>
            </div>
            <div className="backgroud-in-menu">
                <div className="padding-10">
                    <div className="input-group md-form form-sm form-2 pl-0">
                        {/* <input className="form-control my-0 py-1 red-border" type="text" placeholder="Tìm kiếm" aria-label="Search"/>
                        <div className="input-group-append">
                            <span className="input-group-text red lighten-3" id="basic-text1"><i className="fas fa-search text-grey"
                              aria-hidden="true"></i></span>
                        </div> */}
                    </div>
                    <div className="padding-top-10">
                        <a href="/admin">
                            <div className="btn-menu" >
                                <i className="fas fa-home fa-menu"></i>Trang chủ
                            </div>
                        </a>
                    </div>
                    <div className={ this.state.permission === '1' ? 'padding-top-10' : 'padding-top-10 class-hide'}>
                        <a href="/quan-ly-lich-trinh">
                            <div className="btn-menu">
                                <i className="fas fa-calendar-week fa-menu"></i>Quản lý lịch trình
                            </div>
                        </a>
                    </div>
                    <div className={ this.state.permission === '1' ? 'padding-top-10' : 'padding-top-10 class-hide'} >
                        <a href="/thong-ke-doanh-thu">
                            <div className="btn-menu">
                                <i className="fa fa-calculator fa-menu"></i>Thống kê doanh thu
                            </div>
                        </a>
                    </div>
                    <div className="padding-top-10" >
                        <a href="/thong-tin-dat-ve">
                            <div className="btn-menu">
                                <i className="fa fa-cart-plus fa-menu"></i>Thông tin vé đặt
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
    }
  }
export default MenuView;
