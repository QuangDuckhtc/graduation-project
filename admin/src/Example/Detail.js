import Header from './Shared/Header';
import Footer from './Shared/Footer';
import Banner from './Shared/Banner';
import React, { Component } from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router-dom';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thestation: [],
            isReturnHome: 'false',
            stationstart: '',
            stationend: '',
            dateform: '',
            dateto: '',
            startSchedule: '',
            stoaTau: [],
            card: []
        }
    }



    onLoadTheTrain(ma) {
        console.log(this.state.stoaTau);


    }

    onloadTheChair() {
        var ischair = {}
        ischair.stag = "Chiều";
        ischair.name = "ES3 - Sài Gòn - Hà Nội";
        ischair.time = "21/11/2020 06:00";
        ischair.local = "Chỗ 17 - Ngồi mềm điều hòa";
        this.state.card.push(ischair);
        console.log(this.state.card);
    }


    render() {
        // if(this.state.isReturnHome === 'true'){
        //     return (<Redirect to="/"/>)
        //     }
        // var elmCard = this.state.card.map((value, index) => {
        //     console.local(123);
        //     return(
        //         <div key={index} className="padding-10">
        //                 <div className="text-center">{ value.stag }</div>
        //                 <div>{ value.name } </div>
        //                 <div> { value.time } </div>
        //                 <div> { value.local } </div>
        //             </div>
        //     );
        // });
        var elmCard = this.state.card.map((value, index) => {
            console.local(123);
            return (
                <div key={index} className="padding-10">1
                    {/* <div className="text-center">{ value.stag }</div>
                                <div>{ value.name } </div>
                                <div> { value.time } </div>
                                <div> { value.local } </div> */}
                </div>
            )
        });

        var elmstationstatrt = this.state.thestation.map((xvalue, index) => {
            var backgr = this.state.startSchedule === xvalue.maLich ? 'et-train-head backgroud-train-toa' : 'et-train-head';
            return (
                <div key={index} className="col-xs-4 col-sm-3 et-col-md-2 et-train-block" onClick={() => this.onLoadTheTrain(xvalue.maLich)}>
                    <div className={backgr}>
                        <div className="row center-block train-se-lam-w">
                            <div className="et-train-lamp text-center">{xvalue.toaTau}</div>
                        </div>
                        <div className="et-train-head-info">
                            <div className="row et-no-margin"><span className="pull-left et-bold widhth30-text-start">TG
                                đi</span> <span className="pull-right width70-text-end">19/11
                                    21:55</span></div>
                            <div className="row et-no-margin"><span className="pull-left et-bold widhth30-text-start">TG
                                đến</span><span className="pull-right width70-text-end">21/11
                                    05:30</span></div>
                            <div className="row et-no-margin">
                                <div className="et-col-50">
                                    <div className="et-text-sm ">SL chỗ đặt</div>
                                    <div className="et-text-large et-bold pull-left margin-left-5px">0</div>
                                </div>
                                <div className="et-col-50 text-center">
                                    <div className="et-text-sm ">SL chỗ trống</div>
                                    <div className="et-text-large et-bold pull-right margin-right-5px" >184</div>
                                </div>
                            </div>
                        </div>
                        <div className="row et-no-margin">
                            <div className="et-col-50"><span className="et-train-lamp-bellow-left"></span></div>
                            <div className="et-col-50"><span className="et-train-lamp-bellow-right"></span></div>
                        </div>
                    </div>
                    <div className="et-train-base"></div>
                    <div className="et-train-base-2"></div>
                    <div className="et-train-base-3"></div>
                    <div className="et-train-base-4"></div>
                    <div className="et-train-base-5"></div>
                </div>
            )
        });
        var emlToa = this.state.stoaTau.map((xvalue, index) => {
            console.log(xvalue);
            return (
                <div className="et-car-block ng-scope" tooltip={xvalue.tenToa}>
                    <div key={index} className="et-car-block">
                        <div className="et-car-icon"><img src="images/train2.png" /></div>
                        <div className="text-center text-info et-car-label ng-binding">{index}</div>
                    </div>
                </div>
            )
        }
        );
        return (
            <div>
                <Header />
                <Banner />
                <div className="container d-fix">
                    <div className="col-left-70">
                        <div className="dayrunto">Chiều đi: ngày 22/11/2020 từ Sài Gòn đến Hà Nội</div>
                        <div className="margin10 backgroud-white">
                            {elmstationstatrt}
                        </div>
                        <div className="col-md-12 et-no-margin text-center">
                            {emlToa}
                        </div>
                        <div>
                            <div className="detail-title">Ngồi mềm điều hòa
                                (SE8 - NML56 - TG đi 21/11/2020 06:00)</div>
                            <div>
                                <div>
                                    <div className="row et-car-floor">
                                        <div className="et-full-width">
                                            <div className="et-car-nm-64-half-block">
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML560"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">1</span></div>
                                                                {/* <!-- <div className="popover top fade in tooltip_description">
                                                        <div className="arrow"></div>
                                                        <div className="popover-inner">
                                                            <h3 className="popover-title " style="color: #000;background:#FFFF00;">Nhấp CHỌN, Nhấp đôi BỎ</h3>
                                                            <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                            <div className="popover-content "><select size="1" className = "d-fix"><option>Thông tin chi tiết</option><option>Giá chưa thuế phí dv: 966,000 VNĐ</option><option>Gồm thuế VAT dv:30,000đ</option><option>Giao vé:20,000đ</option><option>Giao xuất hóa đơn: 20,000đ</option><option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option><option>Phí bảo trì hệ thống:10,000đ</option></select></div>
                                                        </div>
                                                    </div> --> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML561"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">8</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML562"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">9</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML563"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">16</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML564"
                                                                className="et-sit-sur tooltiptop text-center et-sit-buying">
                                                                <div className="et-sit-no ng-scope"><span className="">17</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML565"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">24</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML566"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">25</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML567"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">32</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML568"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">2</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div onclick="addCart('c_diNML569', 'di', 'SE8 - Sài Gòn - Hà Nội - 21/11/2020 06:00 chỗ 7 Ngồi mềm điều hòa', 'SE8 Sài Gòn-Hà Nội', '21/11/2020 06:00', 'chỗ 7', '1066', 'Ngồi mềm điều hòa - NML56');"
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML569"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">7</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5610"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">10</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5611"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">15</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5612"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">18</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5613"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">23</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5614"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">26</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5615"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">31</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5616"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">3</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5617"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">6</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5618"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">11</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5619"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">14</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5620"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">19</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5621"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">22</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5622"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">27</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5623"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">30</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5624"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">4</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5625"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">5</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5626"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">12</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5627"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">13</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5628"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">20</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5629"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">21</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5630"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">28</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div className="et-col-16 et-sit-side"></div>
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5631"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">29</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="et-car-seperator">
                                                <div></div>
                                                <div></div>
                                            </div>
                                            <div className="et-car-nm-64-half-block">
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5632"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">33</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5633"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">40</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5634"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">41</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5635"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">48</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5636"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">49</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5637"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">56</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5638"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">57</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5639"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">64</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5640"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">34</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5641"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">39</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5642"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">42</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5643"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">47</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5644"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">50</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5645"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">55</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5646"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">58</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5647"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">63</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5648"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">35</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5649"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">38</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5650"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">43</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5651"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">46</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5652"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">51</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5653"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">54</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5654"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">59</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5655"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">62</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5656"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">36</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5657"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">37</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5658"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">44</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5659"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">45</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5660"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">52</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5661"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">53</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5662"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">60</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                                <div className="et-car-nm-64-sit ng-isolate-scope" onClick={() => this.onloadTheChair()}>
                                                    <div className="et-car-seat-right et-seat-h-35">
                                                        <div
                                                            className="et-col-84 et-sit-sur-outer">
                                                            <div id="c_diNML5663"
                                                                className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                                                <div className="et-sit-no ng-scope"><span className="">61</span></div>
                                                                <div className="popover top fade in tooltip_description">
                                                                    <div className="arrow"></div>
                                                                    <div className="popover-inner">
                                                                        <h3 className="popover-title detail-item">Nhấp CHỌN, Nhấp
                                                                            đôi BỎ</h3>
                                                                        <div className="popover-content ">Giá vé: 1066,000 VNĐ</div>
                                                                        <div className="popover-content "><select size="1"
                                                                            className="d-fix">
                                                                            <option>Thông tin chi tiết</option>
                                                                            <option>Giá chưa thuế phí dv: 966,000 VNĐ</option>
                                                                            <option>Gồm thuế VAT dv:30,000đ</option>
                                                                            <option>Giao vé:20,000đ</option>
                                                                            <option>Giao xuất hóa đơn: 20,000đ</option>
                                                                            <option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option>
                                                                            <option>Phí bảo trì hệ thống:10,000đ</option>
                                                                        </select></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="et-col-16 et-sit-side"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-right-30">
                        <div className="carditem border-card">
                            <div className="cover-txt-cart"><i className="fas fa-bars"></i> Giỏ vé</div>
                            <div>
                                {elmCard}
                                <hr />
                                <div>
                                    <a href="/thanh-toan"><div className="btn-buy-ticket" >MUA VÉ</div></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
export default Detail;
