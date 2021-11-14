import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Menuview from './menu'
import UserView from './User'

class ScheduleView extends Component {
    constructor(props) {
        super(props);
        this.state={
            stageUrrl: 'Quản lý lịch trình',
            nameUser: 'Nguyễn Trung Thái'
        }
    }

   
    render() {
        return (
    <div className="d-fix">
        <Menuview/>
        <div className="menu-bodername">
            <UserView stagUrl ={ this.state.stageUrrl }/>
            <div>
            <div className="schedule-width" >
                <div className="schedule-backgr">
                    <div className="d-fix">
                        <div className="width25percent">
                            <div className="padding-5px">
                                <input className="form-control form-group" type="text" placeholder="Mã vé tàu" />
                                <input className="form-control form-group" type="text" placeholder="Số CMND hoặc hộ chiếu" />
                            </div>
                        </div>
                        <div className="width25percent">
                            <div className="padding-5px">
                                <select className="form-group form-control">
                                        <option>Ga đi</option>
                                            <option>Sài Gòn</option>
                                            <option>Hà Nội</option>
                                        </select>
                                <input className="form-control form-group" type="text" placeholder="Mác tàu (SE1, SE2,...)" />
                            </div>
                        </div>
                        <div className="width25percent">
                            <div className="padding-5px">
                                <div className="form-group d-fix">
                                    <select className="form-control">
                                        <option>Ga đến</option>
                                            <option>Sài Gòn</option>
                                            <option>Hà Nội</option>
                                        </select>
                                </div>
                            </div>
                        </div>
                        <div className="width25percent">
                            <div className="padding-5px">
                                <input className="form-control" type="text" placeholder="Ngày đi" />
                            </div>
                        </div>
                    </div>
                    <div className="cover-btn-schedule">
                        <div className="btn-search-f">Tìm kiếm</div>
                        <div className="btn-add-f">Thêm tàu đi</div>
                    </div>
                </div>

            </div>
            <div className="margin-10px">
                <div className="row form-group table-responsive list-ticket-deskhop margin-auto" >
                    <table className="table table-bordered">
                        <thead className="et-table-header">
                            <tr>
                                <th className="mac-train ng-binding">Mác tàu
                                </th>
                                <th className="ng-binding mun-train">Số toa
                                </th>
                                <th className="ng-binding train-in-header">Nhân viên
                                </th>
                                <th className="ng-binding train-in-header">Thông tin toa
                                </th>
                                <th className="ng-binding train-in-header">
                                </th>
                                <th className="ng-binding train-money-header">Thành tiền (VNĐ)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="et-table-cell tabl-cell">

                                </td>
                                <td className="intab">
                                    <div className="text-center ng-hide">
                                         {/* <img src="/images/waring20.png" tooltip="" class="ng-scope"> */}
                                    </div>
                                    <div className="text-center text-info">
                                        {/* <!--Giữ trong <span class="text-danger">{{ve.seat.Status.Duration}}</span> giây--> */}
                                        <span ng-bind-html="'PBuyTicket_thoiGianTamGiu'|translate:ve.seat.Status.Duration" className="ng-binding">Giữ trong <span className="text-danger">544</span> giây</span>
                                    </div>
                                    <div>
                                        <div className="ng-binding">
                                            SE8 Sài Gòn-Hà Nội
                                        </div>
                                        <div className="ng-binding">
                                            21/11/2020 06:00
                                        </div>
                                        <div className="ng-binding">
                                            {/* <!--{{'Toa ' + ve.carNo + ' chỗ ' + ve.seat.ChoSo}}--> */}
                                            Toa 6 chỗ 40
                                        </div>
                                        <div className="ng-binding">
                                            Nằm khoang 6 điều hòa T2
                                        </div>
                                    </div>
                                </td>
                                <td className="et-table-cell text-right ng-binding tag-mone">
                                    1,237,000
                                </td>
                                <td className="et-table-cell text-left tag-mone">
                                    {/* <!-- <div ng-show="!ve.isloadedKhuyenMai" class="ng-binding ng-hide">
                                            Đang tìm khuyến mại...
                                            Dang tìm khuyến mại...
                                        </div> --> */}
                                    <div ng-show="ve.isloadedKhuyenMai">
                                        <div ng-show="ve.ListKhuyenMai.length==0" className="ng-binding ng-hide">
                                            {/* <!-- Không có khuyến mại cho vé này -->
                                            <!--Không có khuyến mại--> */}
                                        </div>
                                        <div ng-show="ve.ListKhuyenMai.length>0" >
                                            <div ng-show="ve.ListKhuyenMaiIDApDung.length>0">
                                                <div>
                                                    <div>
                                                        <span className="ng-binding font-size12px">GIẢM GIÁ XA NGÀY THEO CĐ 75/VTSG (SE7/8, SE10) - THẤP ĐIỂM SAU TẾT - thêm 277/VTSG ngày 04/03/2020</span>
                                                        <span className="ng-binding font-size12px">(giảm 62,000)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="et-table-cell text-right ng-binding tag-mone">
                                    1,000
                                </td>
                                <td className="et-table-cell text-right ng-binding tag-mone">
                                    1,176,000
                                </td>
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
export default ScheduleView;
