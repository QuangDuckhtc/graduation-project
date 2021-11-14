import React, { Component } from 'react';
import Footer from './Shared/Footer';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Paymenth extends Component {
    constructor(props) {
        super(props);
        this.state={
            login: '',
            username: '',
            password: ''
        }
    }

   
    render() {
        
        return (
            <div className="container">
        <div className="dayrunto text-center div1">Thanh toán</div>
        <div className="row form-group table-responsive list-ticket-deskhop margin-auto">
            <table className="table table-bordered">
                <thead className="et-table-header">
                    <tr>
                        <th className="ng-binding mac-train">Họ tên
                        </th>
                        <th  className="ng-binding train-money-header">Thông tin chỗ
                        </th>
                        <th  className="ng-binding train-in-header">Giá vé
                        </th>
                        <th className="ng-binding train-in-header">Giảm đối tượng
                        </th>
                        <th className="ng-binding train-in-header">Khuyến mại
                        </th>
                        <th  className="ng-binding train-in-header">Bảo hiểm
                        </th>
                        <th  className="ng-binding train-money-header">Thành tiền (VNĐ)
                        </th>
                        <th className="res-sdf"></th>
                    </tr>
                </thead>
                <tbody ng-show="ves.chieuDi.length > 0" className="">
                    <tr>
                        <td className="et-table-cell dic-12">
                            <div className="input-group input-group-sm smsd">
                                <span className="input-group-addon text-left ng-binding ww84">Họ tên</span>
                                <input type="text" placeholder="Thông tin hành khách" ng-model="ve.hanhKhach.hoTen" className="form-control input-sm ng-pristine ng-invalid ng-invalid-required input-pay" 
                                    required=""/>
                            </div>
                            <div className="input-group input-group-sm smsd">
                                <span className="input-group-addon text-left ng-binding ww84" >Đối tượng</span>
                                <select className="form-control input-sm ng-pristine ng-valid ng-valid-required input-pay" ng-model="ve.hanhKhach.loaiKhach"
                                    id="pt103888574" required=""><optgroup label="Người Việt Nam"><option value="0" selected="selected" label="Người lớn">Người lớn</option><option value="1" label="Trẻ em">Trẻ em</option><option value="2" label="Sinh viên">Sinh viên</option><option value="3" label="Người cao tuổi">Người cao tuổi</option></optgroup><optgroup label="Người nước ngoài"><option value="4" label="Người lớn">Người lớn</option><option value="5" label="Trẻ em">Trẻ em</option></optgroup></select>
                            </div>
                            <div className="input-group input-group-sm"  className = "width100persent">
                                <span className="input-group-addon text-left ng-binding ww84">Họ tên</span>
                                <input type="text" placeholder="Số CMND/ Hộ choếu"  maxlength="19" className="form-control input-sm ng-pristine ng-valid input-pay" 
                                    ng-change="syncRegister($index, true)"/>
                            </div>
                        </td>
                        <td className="divs">
                            <div className="text-center ng-hide" ng-show="ve.seat.Status.Status != 6">
                            </div>
                            <div className="text-center text-info" ng-show="ve.seat.Status.Status == 6">
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
                                    Toa 6 chỗ 40
                                </div>
                                <div className="ng-binding">
                                    Nằm khoang 6 điều hòa T2
                                </div>
                            </div>
                        </td>
                        <td className="et-table-cell text-right ng-binding mmda">
                            1,237,000
                        </td>
                        <td className="et-table-cell text-right ng-binding mmda" >
                            0
                        </td>
                        <td className="et-table-cell text-left mmda">
                       
                            <div ng-show="ve.isloadedKhuyenMai" className="">
                                <div ng-show="ve.ListKhuyenMai.length==0" className="ng-binding ng-hide">
                                 
                                </div>
                                <div ng-show="ve.ListKhuyenMai.length>0" className="">
                                    <div ng-show="ve.ListKhuyenMaiIDApDung.length>0" className="">
                                        <div>
                                            <div>
                                                <span className="ng-binding font-size12">GIẢM GIÁ XA NGÀY THEO CĐ 75/VTSG (SE7/8, SE10) - THẤP ĐIỂM SAU TẾT - thêm 277/VTSG ngày 04/03/2020</span>
                                                <span  className="ng-binding font-size12">(giảm 62,000)</span>
                                            </div>
                                            <div ng-show="ve.khuyenMai&amp;&amp;ve.TangGiam!=0" className="font-size12">
                                                <div className="text-danger ng-binding">
                                                    * Lưu ý:
                                                 
                                                    <span ng-bind-html="'PBuyTicket_luuYTraVeChiTiet'|translate" className="ng-binding">Đây là vé áp dụng chương trình khuyến mại, đề nghị quý khách đọc kỹ</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="font-size12">
                                            <a href="javascript:;" ng-click="openSelectKhuyenMai(ve)" className="ng-binding">
                                                    Các quy định về điều kiện mua vé, trả vé, đổi vé và hủy vé
                                                </a>
                                        </div>
                                    </div>
                                    <div ng-show="ve.ListKhuyenMaiIDApDung.length==0" className="ng-hide">
                                        <div className="ng-binding font-size12">Không sử dụng khuyến mại
                                        </div>
                                        <div className="font-size12">
                                            <a href="javascript:;" ng-click="openSelectKhuyenMai(ve)" className="ng-binding">
                                                    Chọn khuyến mại
                                                </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="et-table-cell text-right ng-binding mmda" >
                            1,000
                        </td>
                        <td className="et-table-cell text-right ng-binding mmda" >
                            1,176,000
                        </td>
                        <td className="mmda vlt-ali">
                            <a analytics-on="click" analytics-event="removeTicket" href="" className="et-btn-cancel" ng-click="removeTicket(ve)" ng-show="!ve.seat.waiting"></a>
                        </td>
                    </tr>
                </tbody>
                <tbody ng-show="ves.chieuVe.length > 0" className="ng-hide">
                    <tr className="et-table-group-header" ng-show="ves.khuHoi.length > 0 || ves.chieuDi.length > 0">
                        <td colspan="8">
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr className="info">
                        <td colspan="6">
                            <span className="pull-right"><strong className="ng-binding">Tổng tiền</strong></span>
                        </td>
                        <td className="text-right">
                            <strong className="ng-binding">1,176,000</strong>
                        </td>
                        <td>&nbsp;</td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div className="et-register-block">

            <h5 className="ng-binding">Thông tin người đặt vé</h5>

            <div className="row text-info ng-binding">

                Quý khách vui lòng điền đẩy đủ và chính xác các thông tin về người mua vé dưới đây. Các thông tin này sẽ được sử dụng để xác minh người mua vé và lấy vé tại ga trước khi lên tàu theo đúng các quy định của Tổng công ty Đường sắt Việt Nam.

            </div>

            <div className="form-horizontal et-col-md-12 form-group">
                <div className="d-l2"></div>
                <div className="row d-l1">

                    <label className="et-col-md-2 ng-binding mobi-display-none text-red">HỌ TÊN, SỐ ĐIỆN THOẠI, EMAIL<span >*</span></label>

                    <div className="et-col-md-4 mb-w-100">

                        <input type="text" name="fullName" className="form-control input-sm ng-pristine ng-invalid ng-invalid-required" placeholder="Họ và tên" required=""/>
                        <br/>
                        <input type="text" id="phoneNumber" required="" name="phoneNumber" className="form-control input-sm ng-pristine ng-valid" placeholder="Số di động"/>
                        <br/>
                        <input type="email" id="email" name="email" className="form-control input-sm ng-pristine ng-valid ng-valid-email" placeholder="Email"/>
                    </div>

                    <div className="et-col-md-6 sdasda">
                        <h5 className="ng-binding font-size20">CHỌN HÌNH THỨC THANH TOÁN</h5>
                        <div className="row">

                            <div  className = "width100persent">

                                <input type="radio" name="phuongThucThanhToan" checked="" value="0" onchange="changePay(0)" className="ng-pristine ng-valid"/>

                                <span className="et-align-top ng-binding">Tại văn phòng (65 Tân Quý, Tân Phú, TPHCM)</span>

                            </div>

                            <div  className = "width100persent">

                                <input type="radio" name="phuongThucThanhToan" value="1" onchange="changePay(1)" className="ng-pristine ng-valid"/>

                                <span className="et-align-top ng-binding">Thanh toán qua ngân hàng</span>

                            </div>

                            <div  className = "width100persent">

                                <input onchange="changePay(2)" type="radio" name="phuongThucThanhToan" value="2" className="ng-pristine ng-valid"/>

                                <span className="et-align-top ng-binding">Thanh toán tại nhà</span>

                            </div>

                        </div>
                        <div className="row">

                            <div id="diachi" className="et-col-md-6 ddtssa">



                                <div className="et-col-md-8">

                                    <input type="text" name="diachinha" className="form-control input-sm ng-pristine ng-valid ng-valid-email" placeholder="Địa chỉ nhà"/>

                                </div>

                            </div>
                            <div id="thenganhang" className="et-col-md-6 display-none">

                                <div className="mb-pos-relative sda-ff">

                                    <div className="et-col-md-4 width50percentlefft">
                                        <input checked="" type="radio" name="nganghangthanhtoan" value="Ngân hàng thương mại cổ phần Ngoại thương Việt Nam Vietcombank-Tên tài khoản : 	PHẠM DUY KHÁNH (GĐ Tài Chính)-Số tài khoản : 	0071000794841-Chi Nhánh 	Tân Bình, Tp.HCM" className="ng-pristine ng-valid"/>
                                        <span className="et-align-top ng-binding">Vietcombank</span>
                                    </div>
                                    <div className="et-col-md-4 width50percentlefft" >
                                        <input type="radio" name="nganghangthanhtoan" value="Ngân Hàng TMCP Kỹ Thương Việt Nam-Tên tài khoản : 	PHẠM DUY KHÁNH (GĐ Tài Chính)-Số tài khoản : 	19027544365017-Chi Nhánh: 	Tân Bình" className="ng-pristine ng-valid"/>
                                        <span className="et-align-top ng-binding">Techcombank</span>
                                    </div>
                                    <div className="et-col-md-4 width50percentlefft" >
                                        <input type="radio" name="nganghangthanhtoan" value="Ngân hàng TMCP Á Châu ACB-Tên tài khoản : 	PHẠM DUY KHÁNH (GĐ Tài Chính)-Số tài khoản : 	 165981239-Chi Nhánh: 	 Cộng Hòa" className="ng-pristine ng-valid"/>
                                        <span className="et-align-top ng-binding">Á Châu ACB</span>
                                    </div>
                                    <div className="et-col-md-4 width50percentlefft">
                                        <input type="radio" name="nganghangthanhtoan" value="Ngân Hàng TMCP Đông Á-Tên tài khoản : 	PHẠM DUY KHÁNH (GĐ Tài Chính)-Số tài khoản : 	0103353679-Chi Nhánh: 	 Cộng Hòa" className="ng-pristine ng-valid"/>
                                        <span className="et-align-top ng-binding">Đông Á</span>
                                    </div>
                                    <div className="et-col-md-4 width50percentlefft" >
                                        <input type="radio" name="nganghangthanhtoan" value="Ngân Hàng Đầu Tư Và Phát Triển Việt Nam BIDV-Tên tài khoản : 	PHẠM DUY KHÁNH (GĐ Tài Chính)-Số tài khoản : 	31310000627658-Chi Nhánh: 	Cộng Hòa" className="ng-pristine ng-valid"/>
                                        <span className="et-align-top ng-binding">BIDV</span>
                                    </div>
                                    <div className="et-col-md-4 width50percentlefft" >
                                        <input type="radio" name="nganghangthanhtoan" value="Ngân Hàng Nông Nghiệp Và Phát Triển Nông Thôn Việt Nam Agribank-Tên tài khoản : 	PHẠM DUY KHÁNH (GĐ Tài Chính)-Số tài khoản : 	1604205284040-Chi Nhánh: 	Phú Nhuận" className="ng-pristine ng-valid"/>
                                        <span className="et-align-top ng-binding">Agribank</span>
                                    </div>
                                    <div className="et-col-md-4 width50percentlefft" >
                                        <input type="radio" name="nganghangthanhtoan" value="TMCP Công Thương Việt Nam Vietinbank-Tên tài khoản : 	PHẠM DUY KHÁNH-Số tài khoản : 	105006520979-Chi Nhánh: 	 Tân Bình" className="ng-pristine ng-valid"/>
                                        <span className="et-align-top ng-binding">Vietinbank</span>
                                    </div>
                                    <div className="et-col-md-4 width50percentlefft">
                                        <input type="radio" name="nganghangthanhtoan" value="Ngân hàng TMCP Sài Gòn Thương Tín Sacombank-Tên tài khoản : 	PHẠM DUY KHÁNH (GĐ Tài Chính)-Số tài khoản : 	060072656663-Chi Nhánh: 	Tân Bình" className="ng-pristine ng-valid"/>
                                        <span className="et-align-top ng-binding">Sacombank</span>
                                    </div>
                                    <div className="et-col-md-4 width50percentlefft">
                                        <input type="radio" name="nganghangthanhtoan" value="Ngân hàng Quân Đội-Tên tài khoản : 	PHẠM DUY KHÁNH (GĐ Tài Chính)-Số tài khoản : 	1010142359005-Chi Nhánh: 	 Tân Bình" className="ng-pristine ng-valid"/>
                                        <span className="et-align-top ng-binding">MB Bank</span>
                                    </div>
                                    <div className="et-col-md-4 width50percentlefft" >
                                        <input type="radio" name="nganghangthanhtoan" value="Ngân hàng TMCP Phát triển Tp Hồ Chí Minh-Tên tài khoản : 	PHẠM DUY KHÁNH (GĐ Tài Chính)-Số tài khoản : 	 006704070004092-Chi Nhánh: 	 Cộng Hòa" className="ng-pristine ng-valid"/>
                                        <span className="et-align-top ng-binding">HD Bank</span>
                                    </div>
                                    <div className="et-col-md-4 width50percentlefft">
                                        <input type="radio" name="nganghangthanhtoan" value="Ngân Hàng Xuất nhập khẩu VIỆT NAM-Tên tài khoản : 	PHẠM DUY KHÁNH (GĐ Tài Chính)-Số tài khoản : 	140415053848869-Chi Nhánh: 	Tân Bình" className="ng-pristine ng-valid"/>
                                        <span className="et-align-top ng-binding">EximBank</span>
                                    </div>
                                    <div className="et-col-md-4 width50percentlefft" >
                                        <input type="radio" name="nganghangthanhtoan" value="Ngân hàng TMCP Việt Nam Thịnh Vượng-Tên tài khoản : 	PHẠM DUY KHÁNH (GĐ Tài Chính)-Số tài khoản : 	 54947801-Chi Nhánh 	Cộng Hòa, Tân Bình" className="ng-pristine ng-valid"/>
                                        <span className="et-align-top ng-binding">VPBank</span>
                                    </div>



                                </div>

                            </div>

                        </div>
                    </div>

                </div>

                <div className="row">
                </div>

                <div className="row">
                    <div className="et-col-md-6">
                    </div>
                </div>
            </div>

            <input name="giadi" id="giadi" type="hidden" />

            <input name="giave" id="giave" type="hidden"/>

            <input name="submit" value="3" type="hidden"/>

            <div>
                <div className="sau-tin ">
                    <a id="submit_btn" className="et-btn ng-binding"  className = "btn btn-primary width100persent" 
                        href="http://localhost:8888/order/create_payment_url" >Đăng ký vé
                    </a>
                </div>
            </div>
        </div>
    <Footer/>
    </div>
    );
    }
  }
export default Paymenth;
