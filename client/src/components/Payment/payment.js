import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PaypalExpressBtn from 'react-paypal-express-checkout'
import { useSelector, useDispatch } from 'react-redux';
import { axios } from '../../config/constant'
import { message } from 'antd';

export default function Payment() {

  const dispatch = useDispatch();
  const reloadCart = useSelector(state => state.reloadCart)

  const [dataCart, setDataCart] = useState(JSON.parse(localStorage.getItem('cart')))
  const [disable, setDisable] = useState(true)
  const [dataOrder, setDataOrder] = useState({
    idShow: '',
    customerName: '',
    phone: '',
    email: '',
    idCard: '',
    countTicket: '',
    date: '',
    totalPrice: '',
  })



  function totalPrice() {
    let total = 0
    dataCart.forEach(element => {
      total += element.priceDiscount
    });
    return total
  }
  function format_curency(a) {
    a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    return a;
  }
  function handleOrder() {
    let err = false;
    dataCart.forEach(element => {
      if (element.customerName.trim() === '' || element.indentityCard.trim() === '') {
        err = true
      }
    });
    const regEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const regSDT = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
    if (!err) {
      if (dataOrder.customerName.trim() !== '' && dataOrder.phone.trim() !== '' && dataOrder.email.trim() !== '' && dataOrder.idCard.trim() !== '') {
        if (regSDT.test(dataOrder.phone)) {
          if (regEmail.test(dataOrder.email)) {
            setDisable(false)
          } else {
            message.error('Email không hợp lệ')
          }
        } else {
          message.error('Số điện thoại không hợp lệ')
        }
      } else {
        message.error('Chưa nhập đủ thông tin người đặt vé')
      }
    } else {
      message.error('Chưa nhập thông tin khách đi tàu')
    }
  }
  function handleOrderCOD() {
    let err = false;
    dataCart.forEach(element => {
      if (element.customerName.trim() === '' || element.indentityCard.trim() === '') {
        err = true
      }
    });
    const regEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const regSDT = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
    if (!err) {
      if (dataOrder.customerName.trim() !== '' && dataOrder.phone.trim() !== '' && dataOrder.email.trim() !== '' && dataOrder.idCard.trim() !== '') {
        if (regSDT.test(dataOrder.phone)) {
          if (regEmail.test(dataOrder.email)) {
            paymentCOD()
          } else {
            message.error('Email không hợp lệ')
          }
        } else {
          message.error('Số điện thoại không hợp lệ')
        }
      } else {
        message.error('Chưa nhập đủ thông tin người đặt vé')
      }
    } else {
      message.error('Chưa nhập thông tin khách đi tàu')
    }
  }
  function getDataOrderDefault() {
    setDataOrder({
      ...dataOrder,
      idShow: 'ORDER-' + new Date().toISOString(),
      countTicket: dataCart.length,
      date: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(new Date()),
      totalPrice: totalPrice(),
    })
  }
  async function paymentPaypal() {
    await axios.post('/ticket', {
      tickets: dataCart,
      order: dataOrder,
      statusTicket: 1
    }).then(function (res) {
      if (res.data.status === 'success') {
        message.success(res.data.message)
        localStorage.setItem('cart', [])
        setTimeout(() => {
          window.location.pathname = '/'
        }, 1000);
      }
    }).catch(function (err) {
      console.log(err)
    })
  }
  async function paymentCOD() {
    await axios.post('/ticket', {
      tickets: dataCart,
      order: dataOrder,
      statusTicket: 0
    }).then(function (res) {
      if (res.data.status === 'success') {
        message.success(res.data.message)
        localStorage.setItem('cart', [])
        setTimeout(() => {
          window.location.pathname = '/'
        }, 1000);
      }
    }).catch(function (err) {
      console.log(err)
    })
  }
  const onCancel = (data) => {
    console.log('The payment was cancelled!', data);
  }
  const onError = (err) => {
    console.log("Error!", err);
  }
  const onSuccess = (payment) => {
    console.log("The payment was succeeded!", payment);
    paymentPaypal()
  }

  useEffect(() => {
    getDataOrderDefault()
  }, [])
  useEffect(() => {
    if (reloadCart) {
      dispatch({ type: 'NO_RELOAD_CART' })
    }
  }, [reloadCart])

  return (
    <div className="container" style={{ marginTop: '-5px', padding: '80px' }}>
      <div className="dayrunto text-center" style={{ width: '100%' }}>Thanh toán</div>
      <div className="row form-group table-responsive list-ticket-deskhop" style={{ margin: 'auto' }}>
        <table className="table table-bordered" style={{ width: '100%', paddingRight: '0' }}>
          <thead className="et-table-header">
            <tr>
              <th style={{ backgroundColor: 'lavender', width: '23%' }} className="ng-binding">Họ tên
                {/*Họ tên*/}
              </th>
              <th style={{ backgroundColor: 'lavender', width: '15%' }} className="ng-binding">Thông tin chỗ
                {/*Thông tin chỗ*/}
              </th>
              <th style={{ backgroundColor: 'lavender', width: '13%' }} className="ng-binding">Giá vé
                {/*Giá vé*/}
              </th>
              <th style={{ backgroundColor: 'lavender', width: '14%' }} className="ng-binding">Giảm đối tượng
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
            {dataCart.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="et-table-cell" style={{ padding: '10px 0', paddingRight: '10px', borderBottom: 'solid 2px #ccc' }}>
                    <div className="input-group input-group-sm" style={{ marginBottom: '6px', width: '100%' }}>
                      <span className="input-group-addon text-left ng-binding" style={{ width: '84px' }}>Họ tên</span>
                      <input type="text" placeholder="Thông tin hành khách" className="form-control input-sm ng-pristine ng-invalid ng-invalid-required" style={{ borderTopRightRadius: '4px !important', borderBottomRightRadius: '4px !important' }}
                        onChange={(e) => {
                          dataCart[index].customerName = e.target.value
                          setDataCart([
                            ...dataCart
                          ])
                        }}
                      />
                    </div>
                    <div className="input-group input-group-sm" style={{ marginBottom: '6px', width: '100%' }}>
                      <span className="input-group-addon text-left ng-binding" style={{ width: '84px' }}>Đối tượng</span>
                      <select className="form-control input-sm ng-pristine ng-valid ng-valid-required" style={{ borderTopRightRadius: '4px !important', borderBottomRightRadius: '4px !important' }}
                        onChange={(e) => {
                          dataCart[index].discount = e.target.value
                          dataCart[index].priceDiscount = item.price - item.price * e.target.value
                          setDataCart([
                            ...dataCart
                          ])
                          dispatch({ type: 'RELOAD_CART' })
                        }}
                      >
                        <option value={0}>Người lớn</option>
                        <option value={0.5} label="Trẻ em">Trẻ em</option>
                        <option value={0.5} label="Người cao tuổi">Người cao tuổi</option>
                        <option value={0.2} label="Sinh viên">Sinh viên</option>
                      </select>
                    </div>
                    <div className="input-group input-group-sm" style={{ width: '100%' }}>
                      <span className="input-group-addon text-left ng-binding" style={{ width: '84px' }}>Số giấy tờ</span>
                      <input type="text" placeholder="Số CMND/ CCCD/ Ngày tháng năm sinh trẻ em" className="form-control input-sm ng-pristine ng-valid" style={{ borderTopRightRadius: '4px !important', borderBottomRightRadius: '4px !important' }}
                        onChange={(e) => {
                          dataCart[index].indentityCard = e.target.value
                          setDataCart([
                            ...dataCart
                          ])
                        }}
                      />
                    </div>
                  </td>
                  <td style={{ fontSize: '10px', borderBottom: 'solid 2px #ccc' }}>
                    <div className="text-center ng-hide" ng-show="ve.seat.Status.Status != 6">
                    </div>
                    {/* <div className="text-center text-info" ng-show="ve.seat.Status.Status == 6">
                      <span className="ng-binding">Giữ trong <span className="text-danger">544</span> giây</span>
                    </div> */}
                    <div>
                      <div className="ng-binding">
                        {item.idSeat.split('-')[0] + " " + item.stationFrom.name + " - " + item.stationTo.name}
                      </div>
                      <div className="ng-binding">
                        {item.dateStart + " " + item.timeStart + 'p'}
                      </div>
                      <div className="ng-binding">
                        {'Carriage: ' + item.idSeat.split('-')[1] + ' - Seat: ' + item.idSeat.split('-')[2]}
                      </div>
                      <div className="ng-binding">
                        {item.nameCarriage}
                      </div>
                    </div>
                  </td>
                  <td className="et-table-cell text-right ng-binding" style={{ borderBottom: 'solid 2px #ccc' }}>
                    {format_curency((item.price).toString()) + " VND"}
                  </td>
                  <td className="et-table-cell text-right ng-binding" style={{ borderBottom: 'solid 2px #ccc' }}>
                    {item.discount !== 0 ? item.discount * 100 + "%" : item.discount}
                  </td>
                  <td className="et-table-cell text-left" style={{ borderBottom: 'solid 2px #ccc' }}>
                    <div style={{ display: item.discount === 0 && 'none' }}>
                      <div className="ng-binding ng-hide">
                      </div>
                      <div>
                        <div>
                          <div>
                            <span style={{ fontSize: '12px' }} className="ng-binding">GIẢM GIÁ ĐỐI TƯỢNG THEO CĐ 75/VTSG </span>
                            <span style={{ fontSize: '12px' }} className="ng-binding">(giảm {item.price - item.priceDiscount})</span>
                          </div>
                          <div style={{ fontSize: '12px' }}>
                            <div className="text-danger ng-binding">
                              * Lưu ý:
                              <span className="ng-binding">Đây là vé áp dụng khuyến mại, đề nghị quý khách đọc kỹ</span>
                            </div>
                          </div>
                        </div>
                        <div style={{ fontSize: '12px' }}>
                          <Link to='/regulation' className="ng-binding">
                            Các quy định về điều kiện mua vé, trả vé, đổi vé và hủy vé
                          </Link>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="et-table-cell text-right ng-binding" style={{ borderBottom: 'solid 2px #ccc' }}>
                    {format_curency(item.priceDiscount.toString()) + " VND"}
                  </td>
                  <td style={{ verticalAlign: 'middle', borderBottom: 'solid 2px #ccc' }}>
                    <span className="et-btn-cancel" ></span>
                  </td>
                </tr>
              )
            })}

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
                <strong className="ng-binding">{format_curency(totalPrice().toString()) + " VND"}</strong>
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
        <div className="form-horizontal et-col-md-12 form-group" >
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
              <input type="text" className="form-control input-sm ng-pristine ng-invalid ng-invalid-required" placeholder="Họ và tên"
                onChange={(e) => {
                  setDataOrder({
                    ...dataOrder,
                    customerName: e.target.value
                  })
                }}
              />
              <br />
              <input type="text" className="form-control input-sm ng-pristine ng-valid" placeholder="Số di động"
                onChange={(e) => {
                  setDataOrder({
                    ...dataOrder,
                    phone: e.target.value
                  })
                }}
              />
              <br />
              <input type="email" className="form-control input-sm ng-pristine ng-valid ng-valid-email" placeholder="Email"
                onChange={(e) => {
                  setDataOrder({
                    ...dataOrder,
                    email: e.target.value
                  })
                }}
              />
            </div>
            <div className="et-col-md-2">
              <label className="ng-binding mobi-display-none">
                Số CMND / CCCD<span style={{ color: 'red' }}>*</span>
              </label><br /><br />

            </div>
            <div className="et-col-md-4 mb-w-100">
              <input type="text" className="form-control input-sm ng-pristine ng-invalid ng-invalid-required" placeholder="Số CMND / CCCD"
                onChange={(e) => {
                  setDataOrder({
                    ...dataOrder,
                    idCard: e.target.value
                  })
                }}
              />
              <br />
              <div style={{ width: '100%' }}>
                <input type="radio" className="ng-pristine ng-valid"
                  onChange={() => {
                    // handleOrder()
                    setDisable(true)
                  }}

                  checked={disable}
                />
                <span className="et-align-top ng-binding">Thanh toán tại quầy</span>
              </div>
              <div style={{ width: '100%' }}>
                <input type="radio" className="ng-pristine ng-valid"
                  onChange={() => {
                    handleOrder()
                  }}
                  checked={!disable}
                />
                <span className="et-align-top ng-binding">Thanh toán qua Paypal</span>
              </div>

            </div>
          </div>
        </div>
        <div style={{ width: '350px', margin: 'auto', display: disable ? 'none' : '', marginTop: '20px' }}>
          <PaypalExpressBtn
            env='sandbox'
            client={{
              sandbox: 'AWTh6CiECUbml80ayCI8uJaMlKs5Sd_4mrwEz_T0u0auNCqVy6drdKSnuICLch_v0NktF1CWWilCHK9v',
              product: 'YOUR-PRODUCTION-APP-ID'
            }}
            currency='USD'
            total={
              1
              // parseInt(dataOrder.totalPrice / 23025)
            }
            onError={onError}
            onSuccess={onSuccess}
            onCancel={onCancel}
            style={{
              size: 'large',
              color: 'blue',
              shape: 'rect',
              label: 'checkout',
            }} />
        </div>
        <div style={{ width: '350px', margin: 'auto', display: !disable ? 'none' : '' }}>
          <button onClick={() => {
            handleOrderCOD()
          }} className="et-btn ng-binding" style={{ width: '100%' }}>Đăng ký vé</button>
        </div>
      </div>
    </div >
  )
}
