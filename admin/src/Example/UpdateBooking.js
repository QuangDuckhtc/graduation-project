import Header from './Shared/Header';
import Footer from './Shared/Footer';
import Banner from './Shared/Banner';
import './index.css';
import React, { Component } from 'react';
import InfoUser from './InfoUser';

class UpdateBooking extends Component {
  constructor(props){
      super(props);
      this.state = {
        seatscode: '',
        email: '',
        phone: '',
        historytickit: [],
        showdetai: false
      }
  }
  onClickCheckTickit(e) {
        if(this.state.seatscode !== '' || this.state.email !== '' || this.state.phone !== '') {
          this.setState({
            historytickit: [
              {
                id: 1,
                toa: 'SE1',
                customername: 'Nguyễn Văn A',
                cmnd: '652148970',
                Loaghe: 'Người  lớn',
                seats: '1 chỗ số 24',
                typeseast: 'Ngồi mềm điều hòa',
                mave: 'SE012564875',
                giave: 150000,
                giatra: 100000,
                loaive: 'Bình thường',
                trave: false,
                stationstart : 'Sài Gòn',
                stationend: 'Hà Nội',
                timestart: '09/09/2020 10:00',
                isreturn: false,
                inforreturn: ''
              },
              {
                id: 2,
                toa: 'SE1',
                customername: 'Nguyễn Văn A',
                cmnd: '652148970',
                Loaghe: 'Người  lớn',
                seats: '1 chỗ số 24',
                typeseast: 'Ngồi mềm điều hòa',
                mave: 'SE012564875',
                giave: 150000,
                giatra: 100000,
                loaive: 'Bình thường',
                trave: false,
                stationstart : 'Sài Gòn',
                stationend: 'Hà Nội',
                timestart: '09/09/2020 10:00',
                isreturn: false,
                inforreturn: ''
              },
              {
                id:3,
                toa: 'SE1',
                customername: 'Nguyễn Văn A',
                cmnd: '652148970',
                Loaghe: 'Người  lớn',
                seats: '1 chỗ số 24',
                typeseast: 'Ngồi mềm điều hòa',
                mave: 'SE012564875',
                giave: 150000,
                giatra: 100000,
                loaive: 'Bình thường',
                trave: false,
                stationstart : 'Sài Gòn',
                stationend: 'Hà Nội',
                timestart: '08/08/2020 08:00',
                isreturn: true,
                inforreturn: 'Đã thanh toán thành công.'
              }
            ],
            showdetai: true
          });
        } else{
          alert('Vui lòng nhập thông tin tìm kiếm');
        }
      }
  
  onChange  = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
    
  }
  render() {
      return (
    <div className="backgroud-body">
      <Header />
      <Banner />
      <div className={ this.state.showdetai ? 'class-hide' : ''}>
      <div className="container backgroud-white">
        <div className="title-h1">KIỂM TRA VÉ</div>
          <div className="padding-20-50">
            <div className="d-fix form-group">
                <div className="label-form">Mã đặt chỗ</div>
                <input className ="form-control" type="text" placeholder="Nhập mã đặt chỗ" name= "seatscode" value={ this.state.seatscode} onChange ={ this.onChange} />
            </div>
            <div className="d-fix form-group">
                <div className="label-form">Email</div>
                <input className ="form-control" type="text" placeholder="Nhập email của bạn" name="email" value={ this.state.email} onChange ={ this.onChange} />
            </div>
            <div className="d-fix form-group">
                <div className="label-form">Điện thoại</div>
                <input className ="form-control" type="text" placeholder="Nhập số điện thoại" name="phone" value={ this.state.phone} onChange ={ this.onChange} />
            </div>
            <div className="btn btn-check-price" onClick ={ () => {this.onClickCheckTickit()} }>Kiểm tra vé</div> 
          </div>
      </div>
      </div>  
      { this.state.showdetai ? <InfoUser historyval = { this.state.historytickit} /> : '' }
      <Footer/>
    </div>
  );
  }
}

export default UpdateBooking;
