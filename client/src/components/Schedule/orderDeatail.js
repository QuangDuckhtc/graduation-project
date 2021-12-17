import React from 'react'
import { useState } from 'react'
import { Banner } from '../_App/Index'
import { axios } from '../../config/constant';
import { Popconfirm, message } from 'antd'

export default function OrderDeatail() {
  const [dataTickets, setDataTickets] = useState([])
  const [dataSearch, setDataSearch] = useState('')

  function format_curency(a) {
    a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    return a;
  }
  async function cancelTicket(id) {
    await axios.put(`/ticket-status-3?id=${id}`
    ).then(function (res) {
      if (res.data.status === 'success') {
        message.success(res.data.message)
      }
    })
  }

  async function getDataTickets() {
    await axios.get(`/ticket-idorder-4?idOrder=${dataSearch}`
    ).then(function (res) {

      if (res.data.status === 'success') {
        setDataTickets(res.data.data)
        console.log(res.data.data)
      }
    }).catch(function (err) {
      console.log(err)
    })

  }
  return (

    <div>
      <Banner />
      <div className="container backgroud-white">
        <div className="title-h1">KIỂM TRA VÉ</div>
        <div className="padding-20-50">
          <div className="d-fix form-group">
            <div className="label-form">Mã đặt vé</div>
            <input className="form-control col-6" type="text" placeholder="Nhập mã đặt vé"
              onChange={(e) => { setDataSearch(e.target.value) }}
            />
            <button className="btn btn-check-price" onClick={() => { getDataTickets() }}>Kiểm tra vé</button>
          </div>
        </div>
      </div>
      <div className="margin-10px container">
        <div className="row form-group table-responsive list-ticket-deskhop margin-auto" >
          <table className="table table-bordered">
            <thead className="et-table-header">
              <tr>
                <th className="ng-binding train-in-header" style={{ width: '10%' }}>Mã vé</th>
                <th className="ng-binding train-in-header" style={{ width: '15%' }}>Họ tên</th>
                <th className="ng-binding train-in-header" style={{ width: '10%' }}>Mã ghế</th>
                <th className="ng-binding train-in-header" style={{ width: '9%' }}>Loại ghế</th>
                <th className="ng-binding train-in-header" style={{ width: '7%' }}>Giờ đi</th>
                <th className="ng-binding train-in-header" style={{ width: '8%' }}>Ngày đi</th>
                <th className="ng-binding train-in-header" style={{ width: '8%' }}>Ga đi</th>
                <th className="ng-binding train-in-header" style={{ width: '9%' }}>Ga đến</th>
                <th className="ng-binding train-in-header" style={{ width: '10%' }}>Giá vé</th>
                <th className="ng-binding train-in-header" style={{ width: '8%' }}></th>
              </tr>
            </thead>
            <tbody>
              {dataTickets.map((item, index) => {
                return (
                  <tr key={index}>
                    <th className="et-table-cell tabl-cell" style={{ textAlign: 'left' }}>{item.idShow.replace(/-/g, "").slice(0, -14)}</th>
                    <td className="et-table-cell tabl-cell" style={{ textAlign: 'center' }}>{item.customerName}</td>
                    <td className="et-table-cell tabl-cell" style={{ textAlign: 'center' }}>{item.seat}</td>
                    <td className="et-table-cell tabl-cell" style={{ textAlign: 'center' }}>{item.carriage}</td>
                    <td className="et-table-cell tabl-cell" style={{ textAlign: 'center' }}>{item.timeStart.split(':')[0] + "h" + item.timeStart.split(':')[1] + "p"}</td>
                    <td className="et-table-cell tabl-cell" style={{ textAlign: 'center' }}>{item.dateStart}</td>
                    <td className="et-table-cell tabl-cell" style={{ textAlign: 'center' }}>{item.stationFrom.name}</td>
                    <td className="et-table-cell tabl-cell" style={{ textAlign: 'center' }}>{item.stationTo.name}</td>
                    <td className="et-table-cell tabl-cell" style={{ textAlign: 'right' }}>{format_curency(item.price.toString()) + " VND"} </td>
                    <td className="et-table-cell tabl-cell" style={{ textAlign: '' }}>
                      <Popconfirm title="Xác nhận hủy vé" okText="Yes" cancelText="No"
                        onConfirm={() => {
                          cancelTicket(item._id)
                        }}
                      >
                        <button className='btn btn-danger'>Cancel</button>
                      </Popconfirm>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
