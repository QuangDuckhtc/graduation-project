import React from 'react'

export default function Ticket() {
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
