import React from 'react'
import { Link } from 'react-router-dom'
import PaypalExpressBtn from 'react-paypal-express-checkout'
import { axios } from '../../config/constant'

export default function Payment() {

  async function paymentPaypal() {
    
  }

  const onCancel = (data) => {
    console.log('The payment was cancelled!', data);
  }

  const onError = (err) => {
    console.log("Error!", err);
  }
  const onSuccess = (payment) => {
    console.log("The payment was succeeded!", payment);
  }
  return (
    <div className="container" style={{ marginTop: '-5px', padding: '80px' }}>
      <div className="dayrunto text-center" style={{ width: '100%' }}>Thanh toán</div>
      <div className="row form-group table-responsive list-ticket-deskhop" style={{ margin: 'auto' }}>
        <table className="table table-bordered" style={{ width: '100%', paddingRight: '0' }}>
          <thead className="et-table-header">
            <tr>
              <th style={{ backgroundColor: 'lavender', width: '22%' }} className="ng-binding">Họ tên
                {/*Họ tên*/}
              </th>
              <th style={{ backgroundColor: 'lavender', width: '15%' }} className="ng-binding">Thông tin chỗ
                {/*Thông tin chỗ*/}
              </th>
              <th style={{ backgroundColor: 'lavender', width: '13%' }} className="ng-binding">Giá vé
                {/*Giá vé*/}
              </th>
              <th style={{ backgroundColor: 'lavender', width: '15%' }} className="ng-binding">Giảm đối tượng
                {/*Giảm đối tượng*/}
              </th>
              <th style={{ backgroundColor: 'lavender', width: '15%' }} className="ng-binding">Khuyến mại
                {/*Khuyến mại*/}
              </th>
              <th style={{ backgroundColor: 'lavender', width: '15%' }} className="ng-binding">Thành tiền (VNĐ)
                {/*Thành tiền (VNĐ)*/}
              </th>
              <th style={{ backgroundColor: 'lavender', width: '5%' }} />
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="et-table-cell" style={{ padding: '0px', borderBottom: 'solid 2px #ccc' }}>
                <div className="input-group input-group-sm" style={{ marginBottom: '6px', width: '100%' }}>
                  <span className="input-group-addon text-left ng-binding" style={{ width: '84px' }}>Họ tên</span>
                  <input type="text" placeholder="Thông tin hành khách" className="form-control input-sm ng-pristine ng-invalid ng-invalid-required" style={{ borderTopRightRadius: '4px !important', borderBottomRightRadius: '4px !important' }} />
                </div>
                <div className="input-group input-group-sm" style={{ marginBottom: '6px', width: '100%' }}>
                  <span className="input-group-addon text-left ng-binding" style={{ width: '84px' }}>Đối tượng</span>
                  <select className="form-control input-sm ng-pristine ng-valid ng-valid-required" style={{ borderTopRightRadius: '4px !important', borderBottomRightRadius: '4px !important' }} >
                    <option value={0} selected="selected" label="Người lớn">Người lớn</option>
                    <option value={1} label="Trẻ em">Trẻ em</option>
                    <option value={2} label="Sinh viên">Sinh viên</option>
                    <option value={3} label="Người cao tuổi">Người cao tuổi</option>
                    <option value={4} label="Người lớn">Người lớn</option>
                    <option value={5} label="Trẻ em">Trẻ em</option>
                  </select>
                </div>
                <div className="input-group input-group-sm" style={{ width: '100%' }}>
                  <span className="input-group-addon text-left ng-binding" style={{ width: '84px' }}>Số giấy tờ</span>
                  <input type="text" placeholder="Số CMND/ Hộ chiếu/ Ngày tháng năm sinh trẻ em" className="form-control input-sm ng-pristine ng-valid" style={{ borderTopRightRadius: '4px !important', borderBottomRightRadius: '4px !important' }} />
                </div>
              </td>
              <td style={{ fontSize: '10px', borderBottom: 'solid 2px #ccc' }}>
                <div className="text-center ng-hide" ng-show="ve.seat.Status.Status != 6">
                </div>
                <div className="text-center text-info" ng-show="ve.seat.Status.Status == 6">
                  <span className="ng-binding">Giữ trong <span className="text-danger">544</span> giây</span>
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
              <td className="et-table-cell text-right ng-binding" style={{ borderBottom: 'solid 2px #ccc' }}>
                1,237,000
              </td>
              <td className="et-table-cell text-right ng-binding" style={{ borderBottom: 'solid 2px #ccc' }}>
                0
              </td>
              <td className="et-table-cell text-left" style={{ borderBottom: 'solid 2px #ccc' }}>
                <div>
                  <div className="ng-binding ng-hide">
                  </div>
                  <div >
                    <div>
                      <div>
                        <div>
                          <span style={{ fontSize: '12px' }} className="ng-binding">GIẢM GIÁ XA NGÀY THEO CĐ 75/VTSG </span>
                          <span style={{ fontSize: '12px' }} className="ng-binding">(giảm 62,000)</span>
                        </div>
                        <div style={{ fontSize: '12px' }}>
                          <div className="text-danger ng-binding">
                            * Lưu ý:
                            <span className="ng-binding">Đây là vé áp dụng chương trình khuyến mại, đề nghị quý khách đọc kỹ</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ fontSize: '12px' }}>
                        <Link to='/rules' className="ng-binding">
                          Các quy định về điều kiện mua vé, trả vé, đổi vé và hủy vé
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="et-table-cell text-right ng-binding" style={{ borderBottom: 'solid 2px #ccc' }}>
                1,176,000
              </td>
              <td style={{ verticalAlign: 'middle', borderBottom: 'solid 2px #ccc' }}>
                <span className="et-btn-cancel" ></span>
              </td>
            </tr>
          </tbody>

          <tbody className="ng-hide">
            <tr className="et-table-group-header">
              <td colSpan={7}></td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="info">
              <td colSpan={5}>
                <span className="pull-right">
                  <strong className="ng-binding">Tổng tiền</strong>
                </span>
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
          <div style={{ width: '100%', height: '10px', float: 'left' }} />
          <div className="row" style={{ paddingLeft: '5px' }}>
            <div className="et-col-md-2">
              <label className="ng-binding mobi-display-none">
                HỌ TÊN<span style={{ color: 'red' }}>*</span>
              </label><br /><br />
              <label className="ng-binding mobi-display-none">
                SỐ ĐIỆN THOẠI<span style={{ color: 'red' }}>*</span>
              </label><br /><br />
              <label className="ng-binding mobi-display-none">
                EMAIL<span style={{ color: 'red' }}>*</span>
              </label>
            </div>
            <div className="et-col-md-4 mb-w-100">
              <input type="text" name="fullName" className="form-control input-sm ng-pristine ng-invalid ng-invalid-required" placeholder="Họ và tên" required />
              <br />
              <input type="text" id="phoneNumber" required name="phoneNumber" className="form-control input-sm ng-pristine ng-valid" placeholder="Số di động" />
              <br />
              <input type="email" id="email" name="email" className="form-control input-sm ng-pristine ng-valid ng-valid-email" placeholder="Email" />
            </div>
            <div className="et-col-md-2">
              <label className="ng-binding mobi-display-none">
                HỌ TÊN<span style={{ color: 'red' }}>*</span>
              </label><br /><br />

            </div>
            <div className="et-col-md-4 mb-w-100">
              <input type="text" name="fullName" className="form-control input-sm ng-pristine ng-invalid ng-invalid-required" placeholder="Họ và tên" required />
              <br />
              {/* <div style={{ width: '100%' }}>
                <input type="radio" name="phuongThucThanhToan" defaultChecked defaultValue={0} onchange="changePay(0)" className="ng-pristine ng-valid" />
                <span className="et-align-top ng-binding">Thanh toán tại quầy</span>
              </div> */}
              <div style={{ width: '100%' }}>
                <input type="radio" name="phuongThucThanhToan" defaultValue={1} onchange="changePay(1)" className="ng-pristine ng-valid" />
                <span className="et-align-top ng-binding">Thanh toán qua Paypal</span>
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
        <input name="giave" id="giave" type="hidden" />
        <input name="submit" defaultValue={3} type="hidden" />
        <div>
          <div style={{ width: '350px', margin: 'auto' }}>
            {/* <PaypalExpressBtn
              env='sandbox'
              client={{
                sandbox: 'ARYRZbb1hCWx_1RWzAijLMHFgv-zPtDEuuM4HnflIck2cspa-vwvgdgTajTPcqthqRykhdlSWAzUouTv',
                product: 'YOUR-PRODUCTION-APP-ID'
              }}
              currency='USD'
              total={1}
              onError={onError}
              onSuccess={onSuccess}
              onCancel={onCancel}
              style={{
                size: 'large',
                color: 'blue',
                shape: 'rect',
                label: 'checkout'
              }} /> */}
            <button onClick={() => { paymentPaypal() }} className="et-btn ng-binding" style={{ width: '100%' }}>Đăng ký vé</button>
          </div>
        </div>
      </div>
    </div>
  )
}
