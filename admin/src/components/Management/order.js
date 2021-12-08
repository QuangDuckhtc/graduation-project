import React, { useEffect, useState } from 'react'
import { axios } from '../../config/constant'
import { Pagination } from 'antd'



export default function Order() {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage,setTotalPage]= useState(0)
  const [dataOrder, setDataOrder] = useState([])


  function format_curency(a) {
    a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    return a;
  }

  async function getDataOrderByPage(page) {
    await axios.get(`/order-page?page=${page}`
    ).then(function (res) {
      setDataOrder(res.data.data)
      setTotalPage(res.data.totalPage)
    }).catch(function (err) {
      console.log(err)
    })
  }

  useEffect(() => {
    getDataOrderByPage(currentPage - 1)
  }, [])

  return (
    <div>
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
              <div className="btn-search-f" onClick={() => { }}>Tìm kiếm</div>
            </div>
          </div>

        </div>
        <div id='info' style={{ display: 'block' }} >
          <div className="margin-10px">
            <div className="row form-group table-responsive list-ticket-deskhop margin-auto" >
              <table className="table table-bordered">
                <thead className="et-table-header">
                  <tr>
                    <th className="ng-binding train-in-header" style={{ width: '12%' }}>Mã đặt vé</th>
                    <th className="ng-binding train-in-header" style={{ width: '15%' }}>Họ tên</th>
                    <th className="ng-binding train-in-header" style={{ width: '9%' }}>Ga đi</th>
                    <th className="ng-binding train-in-header" style={{ width: '9%' }}>Ga đến</th>
                    <th className="ng-binding train-in-header" style={{ width: '10%' }}>Ngày đi</th>
                    <th className="ng-binding train-in-header" style={{ width: '10%' }}>Thời gian</th>
                    <th className="ng-binding train-in-header" style={{ width: '10%' }}>Số lượng vé</th>
                    <th className="ng-binding train-in-header" style={{ width: '13%' }}>Tổng tiền</th>
                    <th className="ng-binding train-in-header" style={{ width: '12%' }}></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="et-table-cell tabl-cell">111-111-1111</td>
                    <td className="et-table-cell tabl-cell">Phạm Đình Thái Ngân</td>
                    <td className="et-table-cell tabl-cell">Sài Gòn</td>
                    <td className="et-table-cell tabl-cell">Hà Nội</td>
                    <td className="et-table-cell tabl-cell">30/12/2020</td>
                    <td className="et-table-cell tabl-cell">8:00 PM</td>
                    <td className="et-table-cell tabl-cell" style={{ textAlign: 'center' }}>5 vé</td>
                    <td className="et-table-cell tabl-cell">20.000.000 VND</td>
                    <td className="et-table-cell tabl-cell"><button className='btn btn-primary'>In vé</button>{"  "}<button className='btn btn-danger'>Hủy vé</button></td>
                  </tr>
                  {dataOrder.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="et-table-cell tabl-cell">{item._id}</td>
                        <td className="et-table-cell tabl-cell">{item.customerName}</td>
                        <td className="et-table-cell tabl-cell">{item.phone}</td>
                        <td className="et-table-cell tabl-cell">{item.email}</td>
                        <td className="et-table-cell tabl-cell">{item.idCart}</td>
                        <td className="et-table-cell tabl-cell"></td>
                        <td className="et-table-cell tabl-cell" style={{ textAlign: 'center' }}>{item.countTicket}</td>
                        <td className="et-table-cell tabl-cell">{format_curency(item.totalPrice) + " VND"}</td>
                        <td className="et-table-cell tabl-cell"><button className='btn btn-primary'>In vé</button>{"  "}<button className='btn btn-danger'>Hủy vé</button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <Pagination defaultPageSize={1} current={currentPage} total={totalPage}>

              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
