import React, { Component } from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router-dom';
import Menuview from './menu'
import UserView from './User'
import { Link } from 'react-router-dom';

class TicketView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stageUrrl: 'Thông tin vé đặt',
            thestation: [],
            madatve: '',
            login: '',
            chitietve: [],
        }
    }
    componentDidMount() {
        axios({
            method: 'GET',
            url: 'http://localhost:9999/theInfo',
            data: null
        }).then(res => {
            this.setState({
                thestation: res.data
            })
        }).catch(err => {
            console.log(err);
        });
    }
    loadChiTietVe() {
        var ma = 'md2020218072812';
		axios.post('http://localhost:9999/theInfoDetail', { maDatVe: ma})
			.then(res => {
				if (res.data.length > 0) {
					this.setState({
                        chitietve: res.data
                    });
                    console.log(res.data.length);
				}
				console.log("Loi: "+ res.data.length);
			})
	}




    onChangeStart() {
        document.getElementById('detail').style.display = 'block';
        document.getElementById('info').style.display = 'none';
        alert(document.getElementById("td").value);


    }
    render() {
        var chitietthongtindat = this.state.chitietve.map((xvalue, index) => {
            return (
                <tr key={index} >
                    <td className="et-table-cell tabl-cell">{xvalue.maDat}</td>
                    <td className="et-table-cell tabl-cell">{xvalue.hoTen}</td>
                    <td className="et-table-cell tabl-cell">{xvalue.email}</td>
                    <td className="et-table-cell tabl-cell">{xvalue.sdt}</td>
                    <td className="et-table-cell text-right ng-binding tag-mone">{xvalue.ngayDat}</td>
                    <td className="et-table-cell text-right ng-binding tag-mone">{xvalue.tongTien}</td>
                </tr>
            )
        });
        var thongtindat = this.state.thestation.map((xvalue, index) => {
            return (
                <tr key={index} >
                    <td className="et-table-cell tabl-cell">{xvalue.maDat}</td>
                    <td className="et-table-cell tabl-cell">{xvalue.hoTen}</td>
                    <td className="et-table-cell tabl-cell">{xvalue.email}</td>
                    <td className="et-table-cell tabl-cell">{xvalue.sdt}</td>
                    <td className="et-table-cell text-right ng-binding tag-mone">{xvalue.ngayDat}</td>
                    <td className="et-table-cell text-right ng-binding tag-mone">{xvalue.tongTien}</td>
                    <td className="et-table-cell tabl-cell"><a href="#" onClick={this.onChangeStart}> Chi tiết</a></td>
                </tr>
            )
        });
        return (
            <div className="d-fix">
                <Menuview />
                <div className="menu-bodername">
                    <UserView stagUrl={this.state.stageUrrl} nameUser={this.state.nameUser} />
                    <div>
                        <div className="schedule-width" >
                            <div className="schedule-backgr">
                                <div className="d-fix">
                                    <div className="width25percent">
                                        <div className="padding-5px">
                                            <input className="form-control form-group" type="text" placeholder="Mã đặt vé" />
                                        </div>
                                    </div>
                                    <div className="width25percent">
                                        <div className="padding-5px">
                                            <input className="form-control form-group" type="text" placeholder="Tên người đặt" />
                                        </div>
                                    </div>
                                    <div className="width25percent">
                                        <div className="padding-5px">
                                            <div className="form-group d-fix">
                                                <input className="form-control form-group" type="text" placeholder="Email" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="width25percent">
                                        <div className="padding-5px">
                                            <input className="form-control" type="text" placeholder="Số điện thoại" />
                                        </div>
                                    </div>
                                </div>
                                <div className="cover-btn-schedule">
                                    <div className="btn-search-f" onClick={this.loadChiTietVe}>Tìm kiếm</div>
                                </div>
                            </div>

                        </div>
                        <div id='info' style={{ display: 'block' }} >
                            <div className="margin-10px">
                                <div className="row form-group table-responsive list-ticket-deskhop margin-auto" >
                                    <table className="table table-bordered">
                                        <thead className="et-table-header">
                                            <tr>
                                                {/* kk 
                                <th className="mac-train ng-binding">Mã đặt vé</th>
                                <th className="ng-binding mun-train">Họ tên</th>
                                <th className="ng-binding train-in-header">Email</th>
                                <th className="ng-binding train-money-header">Số diện thoại</th>
                                <th className="ng-binding mun-train">Ngày đặt</th>
                                */}
                                                <th className="ng-binding train-in-header">Mã đặt vé</th>
                                                <th className="mac-train ng-binding">Họ tên</th>
                                                <th className="ng-binding train-money-header">Email</th>
                                                <th className="ng-binding train-money-header">Số diện thoại</th>
                                                <th className="ng-binding train-money-header">Ngày đặt</th>
                                                <th className="ng-binding train-money-header">Tổng tiền</th>
                                                <th className="ng-binding train-in-header"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {thongtindat}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="detail" style={{ display: 'block' }}>
                        <div className="margin-10px">
                            <div className="row form-group table-responsive list-ticket-deskhop margin-auto" >
                                <table className="table table-bordered">
                                    <thead className="et-table-header">
                                        <tr>
                                            {/* kk 
                                <th className="mac-train ng-binding">Mã đặt vé</th>
                                <th className="ng-binding mun-train">Họ tên</th>
                                <th className="ng-binding train-in-header">Email</th>
                                <th className="ng-binding train-money-header">Số diện thoại</th>
                                <th className="ng-binding mun-train">Ngày đặt</th>
                                */}
                                            <th className="ng-binding train-in-header">Mã vé</th>
                                            <th className="ng-binding train-in-header">Mã ghế </th>
                                            <th className="ng-binding train-in-header">Ga đi</th>
                                            <th className="ng-binding train-in-header">Ga đến</th>
                                            <th className="ng-binding train-in-header">Giá vé</th>
                                            <th className="ng-binding train-in-header">Ngày đi</th>
                                            <th className="ng-binding train-in-header">Họ tên</th>
                                            <th className="ng-binding train-in-header">CMND</th>
                                            <th className="ng-binding train-in-header"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            {/* <td className="et-table-cell tabl-cell">v01</td>
                                            <td className="et-table-cell tabl-cell">1</td>
                                            <td className="et-table-cell tabl-cell">Sài Gòn</td>
                                            <td className="et-table-cell tabl-cell">Huế</td>
                                            <td className="et-table-cell tabl-cell">2.000.000 VND</td>
                                            <td className="et-table-cell tabl-cell">30/12/2020</td>
                                            <td className="et-table-cell tabl-cell">Nguyễn Trung Thái</td>
                                            <td className="et-table-cell tabl-cell">022033199</td>
                                            <td className="et-table-cell tabl-cell"><a href="#">In vé</a>  |  <a href="#">Hủy vé</a></td> */}
                                            {chitietthongtindat}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default TicketView;
