import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Banner } from './../_App/Index';
import { Image, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { axios } from '../../config/constant';


export default function DetailSchedule(props) {
  const dataSchedule = useSelector(state => state.valueSearch)
  const [changeTrain, setChangeTrain] = useState(0);
  const [changeCarriage, setChangeCarriage] = useState(-1);
  const [dataTrain, setDataTrain] = useState([])
  const [dataCarriage, setDataCarriage] = useState([])
  const [dataSeat, setDataSeat] = useState([])
  const [idTrain, setIdTrain] = useState('')
  const [dataCarriageDetail, setDataCarriageDetail] = useState({
    idShow: '',
    name: ''
  })
  const [dataHandle, setDataHandle] = useState({
    idTrain: '',
    idCarriage: '',
  })
  // const [changeSeat, setChangSeat] = useState(-1);
  // const [cart, setCart] = useState([]);
  // const [ticket, setTicket] = useState({
  //   idTrain: '',
  //   stationFrom: '',
  //   stationTo: '',
  //   date: '',
  //   time: '',
  //   idCarriage: '',
  //   idSeat: ''
  // })

  async function getDataDefault() {
    await axios.get('/train'
    ).then(function (res) {
      setDataTrain(res.data.data);
      setDataCarriage(res.data.data[0].carriage)
      setDataSeat(res.data.data[0].carriage[0].seat)

      setIdTrain(res.data.data[0].idShow)
      setDataCarriageDetail({
        idShow: res.data.data[0].carriage[0].idShow,
        name: res.data.data[0].carriage[0].name
      })
      setDataHandle({
        ...dataHandle,
        idTrain: res.data.data[0]._id
      })
    }).catch(function (err) {
      console.log(err);
    })
  }
  async function handleTrain(id) {
    await axios.get(`/carriage?id=${id}`
    ).then(function (res) {
      setChangeCarriage(-1)

      setDataCarriage(res.data.data.carriage)
      setDataSeat(res.data.data.carriage[0].seat)

      setIdTrain(res.data.data.idShow)
      setDataCarriageDetail({
        idShow: res.data.data.carriage[0].idShow,
        name: res.data.data.carriage[0].name
      })

      setDataHandle({
        ...dataHandle,
        idTrain: id
      })
    }).catch(function (err) {
      console.log(err)
    })
  }
  async function handleCarriage(id) {
    await axios.get(`/seat?idtrain=${dataHandle.idTrain}&&idcarriage=${id}`
    ).then(function (res) {
      setDataSeat(res.data.data.seat)

      setDataCarriageDetail({
        idShow: res.data.data.idShow,
        name: res.data.data.name
      })
      setDataHandle({
        ...dataHandle,
        idCarriage: id
      })
    }).catch(function (error) {
      console.log(error)
    })
  }

  useEffect(() => {
    console.log(dataSchedule)
    getDataDefault()
    // setTimeout(() => {
    //   setTest(true);
    // }, 7000);
  }, [])

  return (
    <div>
      <Banner />
      <div className="container" style={{ display: 'flex' }}>
        <div className="col-left-70">
          <div>
            <div className="dayrunto">Chiều đi: Ngày 27/11/2020 từ Sài Gòn đến Hà Nội</div>
            {/* danh sach  tau */}
            <div className="margin10 backgroud-white">
              {dataTrain.map((item, index) => {
                return (
                  index < 4 &&
                  <div key={index} className="col-xs-4 col-sm-3 et-col-md-2 et-train-block"
                    onClick={() => {
                      setChangeTrain(index);
                      handleTrain(item._id)
                    }}
                  >
                    <div className={changeTrain === index ? 'et-train-head backgroud-train-toa' : 'et-train-head'}>
                      <div className="row center-block" style={{ width: '40%', marginBottom: '3px' }}>
                        <div className="et-train-lamp text-center" style={{ color: 'rgb(85, 85, 85)' }}>{item.idShow}</div>
                      </div>
                      <div className="et-train-head-info">
                        <div className="row et-no-margin"><span className="pull-left et-bold " style={{ width: '30%' }}>TG đi</span> <span className="pull-right " style={{ width: '70%', textAlign: 'end' }}>19/11 21:55</span></div>
                        <div className="row et-no-margin"><span className="pull-left et-bold " style={{ width: '30%' }}>TG đến</span><span className="pull-right" style={{ width: '70%', textAlign: 'end' }}>21/11 05:30</span></div>
                        <div className="row et-no-margin">
                          <div className="et-col-50">
                            <div className="et-text-sm ">SL chỗ đặt</div>
                            <div className="et-text-large et-bold pull-left " style={{ marginLeft: '5px' }}>0</div>
                          </div>
                          <div className="et-col-50 text-center">
                            <div className="et-text-sm ">SL chỗ trống</div>
                            <div className="et-text-large et-bold pull-right " style={{ marginRight: '5px' }}>184</div>
                          </div>
                        </div>
                      </div>
                      <div className="row et-no-margin">
                        <div className="et-col-50"><span className="et-train-lamp-bellow-left" /></div>
                        <div className="et-col-50"><span className="et-train-lamp-bellow-right" /></div>
                      </div>
                    </div>
                    <div className="et-train-base" />
                    <div className="et-train-base-2" />
                    <div className="et-train-base-3" />
                    <div className="et-train-base-4" />
                    <div className="et-train-base-5" />
                  </div>
                )
              })}
            </div>
            {/* danh sach toa */}
            <div className="col-md-12 et-no-margin text-center" style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'left' }}>
              {/* dautoa */}
              <div className="et-car-block ng-scope">
                <div className="et-car-block">
                  <div className="et-car-icon">
                    <Image src="images/train2.png" alt='Hinh' />
                  </div>
                  <div className="text-center text-info et-car-label ng-binding">{idTrain}</div>
                </div>
              </div>
              {/* toa */}
              {dataCarriage.map((item, index) => {
                return (
                  <div key={index} className="et-car-block ng-scope">
                    <div className="et-car-block"
                      onClick={() => {
                        setChangeCarriage(index)
                        setDataHandle({
                          ...dataHandle,
                          idCarriage: item.idShow
                        })
                        handleCarriage(item.idShow)
                      }}
                    >
                      <div className={changeCarriage === index ? "et-car-icon et-car-icon-selected" : "et-car-icon et-car-icon et-car-icon-avaiable"}>
                        <Image src="images/trainCar2.png" alt='Hinh' />
                      </div>
                      <div className="text-center text-info et-car-label ng-binding">{index + 1}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* danh sach ghe  */}
            {dataCarriageDetail.idShow.includes('NM') ?
              //  toa ngoi mem *
              <div>
                <div style={{ textAlign: 'center', fontSize: '20px', margin: '10px' }}>{dataCarriageDetail.name} ({dataCarriageDetail.idShow}  - TG đi 21/11/2020 06:00)</div>
                <div className="row et-car-floor">
                  <div className="et-full-width">
                    <div className="et-car-nm-64-half-block">
                      {dataSeat.map((item, index) => {
                        return (
                          index < 20 &&
                          <div key={index} className="et-car-nm-64-sit ng-isolate-scope" style={{ width: '20%' }}>
                            <div className="et-car-seat-right et-seat-h-35">
                              <div className="et-col-16 et-sit-side" />
                              <div className="et-col-84 et-sit-sur-outer">
                                <div className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                  <div className="et-sit-no ng-scope">
                                    <span className>{index + 1}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className="et-car-seperator">
                      <div />
                      <div />
                    </div>
                    <div className="et-car-nm-64-half-block">
                      {dataSeat.map((item, index) => {
                        return (
                          index > 19 &&
                          <div key={index} className="et-car-nm-64-sit ng-isolate-scope" style={{ width: '20%' }}>
                            <div className="et-car-seat-right et-seat-h-35">
                              <div className="et-col-16 et-sit-side" />
                              <div className="et-col-84 et-sit-sur-outer">
                                <div className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                  <div className="et-sit-no ng-scope">
                                    <span>{index + 1}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div> :
              dataCarriageDetail.idShow.includes('NC') ?
                //toa ngoi cung
                <div>
                  <div style={{ textAlign: 'center', fontSize: '20px', margin: '10px' }}>{dataCarriageDetail.name} ({dataCarriageDetail.idShow} - TG đi 21/11/2020 06:00)</div>
                  <div className="row et-car-floor">
                    <div className="et-full-width">
                      {dataSeat.map((item, index) => {
                        return (
                          index % 2 === 0 ?
                            <div className="et-col-1-20 et-seat-h-35 ng-isolate-scope"
                              onClick={() => {
                                // setChangSeat(0)
                              }}
                            >
                              <div className="et-car-seat-left et-seat-h-35">
                                <div className="et-col-16 et-sit-side" />
                                <div className="et-col-84 et-sit-sur-outer">
                                  <div className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                    <div className="et-sit-no ng-scope">
                                      <span className>{index + 1}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div> :
                            <div className="et-col-1-20 et-seat-h-35 ng-isolate-scope">
                              <div className="et-car-seat-left et-seat-h-35">
                                <div className="et-col-84 et-sit-sur-outer">
                                  <div className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                    <div className="et-sit-no ng-scope">
                                      <span className>{index + 1}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="et-col-16 et-sit-side" />
                              </div>
                            </div>
                        )
                      })}

                    </div>
                  </div>
                </div> :
                dataCarriageDetail.idShow.includes('N4') ?
                  //toa nam loai 4
                  <div>
                    <div style={{ textAlign: 'center', fontSize: '20px', margin: '10px' }}>{dataCarriageDetail.name} ({dataCarriageDetail.idShow} - TG đi 21/11/2020 06:00)</div>
                    <div className="row et-car-floor">
                      <div className="et-col-8-9 mb-w-100">
                        <div className="et-col-1-16 et-car-floor-full-height">
                          <div className="et-bed-way et-full-width" />
                          <div className="et-bed-way et-full-width text-center small ">Tầng 2</div>
                          <div className="et-bed-way et-full-width text-center small ">Tầng 1</div>
                        </div>
                        <div className="et-bed-way et-full-width et-text-sm">
                          {dataSeat.map((item, index) => {
                            return (
                              (index + 1) % 4 === 0 &&

                              <div className="et-col-1-8 text-center ">Khoang {(index + 1) / 4}</div>
                            )
                          })}
                        </div>
                        {dataSeat.map((item, index) => {
                          return (
                            index % 2 === 1 &&
                            <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope">
                              <div className="et-bed-left">
                                <div className="et-bed-outer">
                                  <div className="et-bed tooltiptop text-center et-sit-avaiable">
                                    <div className="et-sit-no ng-scope">
                                      <span className>{index + 1}</span>
                                    </div>
                                  </div>
                                  <div className="et-bed-illu" />
                                </div>
                              </div>
                            </div>
                          )
                        })}
                        {/* ---- */}
                        <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope" />
                        {/* ---- */}
                        {dataSeat.map((item, index) => {
                          return (
                            index % 2 === 0 &&
                            <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope">
                              <div className="et-bed-left">
                                <div className="et-bed-outer">
                                  <div className="et-bed tooltiptop text-center et-sit-avaiable">
                                    <div className="et-sit-no ng-scope"><span className>{index + 1}</span></div>
                                    <div className="popover top fade in tooltip_description">
                                      <div className="arrow" />
                                    </div>
                                  </div>
                                  <div className="et-bed-illu" />
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div> :
                  // toa nam loai 6
                  <div>
                    <div style={{ textAlign: 'center', fontSize: '20px', margin: '10px' }}>{dataCarriageDetail.name} ({dataCarriageDetail.idShow} - TG đi 21/11/2020 06:00)</div>
                    <div>
                      <div>
                        <div className="row et-car-floor">
                          <div className="et-col-8-9 mb-w-100">
                            <div className="et-col-1-18 et-car-floor-full-height">
                              <div className="et-bed-way et-full-width" />
                              <div className="et-bed-way et-full-width text-center small ng-binding">Tầng 3</div>
                              <div className="et-bed-way et-full-width text-center small ng-binding">Tầng 2</div>
                              <div className="et-bed-way et-full-width text-center small ng-binding">Tầng 1</div>
                            </div>
                            <div className="et-bed-way et-full-width et-text-sm">
                              {dataSeat.map((item, index) => {
                                return (
                                  (index + 1) % 6 === 0 &&
                                  <div className="et-col-1-8 text-center ng-binding">Khoang {(index + 1) / 6}</div>
                                )
                              })}
                            </div>
                            {dataSeat.map((item, index) => {
                              return (
                                (index + 1) % 3 === 2 &&
                                <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope">
                                  <div className="et-bed-left">
                                    <div className="et-bed-outer">
                                      <div className="et-bed tooltiptop text-center et-sit-avaiable">
                                        <div className="et-sit-no ng-scope">
                                          <span className="ng-binding">{index + 1}</span>
                                        </div>
                                      </div>
                                      <div className="et-bed-illu" />
                                    </div>
                                  </div>
                                </div>

                              )
                            })}
                            <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope" />
                            {dataSeat.map((item, index) => {
                              return (
                                (index + 1) % 3 === 1 &&
                                <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope">
                                  <div className="et-bed-left">
                                    <div className="et-bed-outer">
                                      <div className="et-bed tooltiptop text-center et-sit-avaiable">
                                        <div className="et-sit-no ng-scope"><span className="ng-binding">{index + 1}</span></div>
                                      </div>
                                      <div className="et-bed-illu" />
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                            <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope" />
                            {dataSeat.map((item, index) => {
                              return (
                                (index + 1) % 3 === 0 &&
                                <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope">
                                  <div className="et-bed-left">
                                    <div className="et-bed-outer">
                                      <div className="et-bed tooltiptop text-center et-sit-avaiable">
                                        <div className="et-sit-no ng-scope">
                                          <span className="ng-binding">{index + 1}</span>
                                        </div>
                                        <div className="popover top fade in tooltip_description">
                                          <div className="arrow" />
                                          <div className="popover-inner">
                                            <h3 className="popover-title ng-binding" style={{ color: '#000', background: '#FFFF00' }}>Nhấp CHỌN, Nhấp đôi BỎ</h3>
                                            <div className="popover-content ng-binding">Giá vé: 1446,000 VNĐ</div>
                                            <div className="popover-content ng-binding"><select size={1}><option>Thông tin chi tiết</option><option>Giá chưa thuế phí dv: 1346,000 VNĐ</option><option>Gồm thuế VAT dv:30,000đ</option><option>Giao vé:20,000đ</option><option>Giao xuất hóa đơn: 20,000đ</option><option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option><option>Phí bảo trì hệ thống:10,000đ</option></select></div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="et-bed-illu" />
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>}
          </div>
          <div style={{ marginTop: '50px', display: 'none' }}>
            <div className="dayrunto">Chiều về: Ngày 27/11/2020 từ Sài Gòn đến Hà Nội</div>
            {/* danh sach  tau */}
            <div className="margin10 backgroud-white">
              {dataTrain.map((item, index) => {
                return (
                  index < 4 &&
                  <div key={index} className="col-xs-4 col-sm-3 et-col-md-2 et-train-block"
                    onClick={() => {
                      setChangeTrain(index);
                      handleTrain(item._id)
                    }}
                  >
                    <div className={changeTrain === index ? 'et-train-head backgroud-train-toa' : 'et-train-head'}>
                      <div className="row center-block" style={{ width: '40%', marginBottom: '3px' }}>
                        <div className="et-train-lamp text-center" style={{ color: 'rgb(85, 85, 85)' }}>{item.idShow}</div>
                      </div>
                      <div className="et-train-head-info">
                        <div className="row et-no-margin"><span className="pull-left et-bold " style={{ width: '30%' }}>TG đi</span> <span className="pull-right " style={{ width: '70%', textAlign: 'end' }}>19/11 21:55</span></div>
                        <div className="row et-no-margin"><span className="pull-left et-bold " style={{ width: '30%' }}>TG đến</span><span className="pull-right" style={{ width: '70%', textAlign: 'end' }}>21/11 05:30</span></div>
                        <div className="row et-no-margin">
                          <div className="et-col-50">
                            <div className="et-text-sm ">SL chỗ đặt</div>
                            <div className="et-text-large et-bold pull-left " style={{ marginLeft: '5px' }}>0</div>
                          </div>
                          <div className="et-col-50 text-center">
                            <div className="et-text-sm ">SL chỗ trống</div>
                            <div className="et-text-large et-bold pull-right " style={{ marginRight: '5px' }}>184</div>
                          </div>
                        </div>
                      </div>
                      <div className="row et-no-margin">
                        <div className="et-col-50"><span className="et-train-lamp-bellow-left" /></div>
                        <div className="et-col-50"><span className="et-train-lamp-bellow-right" /></div>
                      </div>
                    </div>
                    <div className="et-train-base" />
                    <div className="et-train-base-2" />
                    <div className="et-train-base-3" />
                    <div className="et-train-base-4" />
                    <div className="et-train-base-5" />
                  </div>
                )
              })}
            </div>
            {/* danh sach toa */}
            <div className="col-md-12 et-no-margin text-center" style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'left' }}>
              {/* dautoa */}
              <div className="et-car-block ng-scope">
                <div className="et-car-block">
                  <div className="et-car-icon">
                    <Image src="images/train2.png" alt='Hinh' />
                  </div>
                  <div className="text-center text-info et-car-label ng-binding">{idTrain}</div>
                </div>
              </div>
              {/* toa */}
              {dataCarriage.map((item, index) => {
                return (
                  <div key={index} className="et-car-block ng-scope">
                    <div className="et-car-block"
                      onClick={() => {
                        setChangeCarriage(index)
                        setDataHandle({
                          ...dataHandle,
                          idCarriage: item.idShow
                        })
                        handleCarriage(item.idShow)
                      }}
                    >
                      <div className={changeCarriage === index ? "et-car-icon et-car-icon-selected" : "et-car-icon et-car-icon et-car-icon-avaiable"}>
                        <Image src="images/trainCar2.png" alt='Hinh' />
                      </div>
                      <div className="text-center text-info et-car-label ng-binding">{index + 1}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* danh sach ghe  */}
            {dataCarriageDetail.idShow.includes('NM') ?
              //  toa ngoi mem *
              <div>
                <div style={{ textAlign: 'center', fontSize: '20px', margin: '10px' }}>{dataCarriageDetail.name} ({dataCarriageDetail.idShow}  - TG đi 21/11/2020 06:00)</div>
                <div className="row et-car-floor">
                  <div className="et-full-width">
                    <div className="et-car-nm-64-half-block">
                      {dataSeat.map((item, index) => {
                        return (
                          index < 20 &&
                          <div key={index} className="et-car-nm-64-sit ng-isolate-scope" style={{ width: '20%' }}>
                            <div className="et-car-seat-right et-seat-h-35">
                              <div className="et-col-16 et-sit-side" />
                              <div className="et-col-84 et-sit-sur-outer">
                                <div className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                  <div className="et-sit-no ng-scope">
                                    <span className>{index + 1}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className="et-car-seperator">
                      <div />
                      <div />
                    </div>
                    <div className="et-car-nm-64-half-block">
                      {dataSeat.map((item, index) => {
                        return (
                          index > 19 &&
                          <div key={index} className="et-car-nm-64-sit ng-isolate-scope" style={{ width: '20%' }}>
                            <div className="et-car-seat-right et-seat-h-35">
                              <div className="et-col-16 et-sit-side" />
                              <div className="et-col-84 et-sit-sur-outer">
                                <div className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                  <div className="et-sit-no ng-scope">
                                    <span>{index + 1}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div> :
              dataCarriageDetail.idShow.includes('NC') ?
                //toa ngoi cung
                <div>
                  <div style={{ textAlign: 'center', fontSize: '20px', margin: '10px' }}>{dataCarriageDetail.name} ({dataCarriageDetail.idShow} - TG đi 21/11/2020 06:00)</div>
                  <div className="row et-car-floor">
                    <div className="et-full-width">
                      {dataSeat.map((item, index) => {
                        return (
                          index % 2 === 0 ?
                            <div className="et-col-1-20 et-seat-h-35 ng-isolate-scope"
                              onClick={() => {
                                // setChangSeat(0)
                              }}
                            >
                              <div className="et-car-seat-left et-seat-h-35">
                                <div className="et-col-16 et-sit-side" />
                                <div className="et-col-84 et-sit-sur-outer">
                                  <div className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                    <div className="et-sit-no ng-scope">
                                      <span className>{index + 1}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div> :
                            <div className="et-col-1-20 et-seat-h-35 ng-isolate-scope">
                              <div className="et-car-seat-left et-seat-h-35">
                                <div className="et-col-84 et-sit-sur-outer">
                                  <div className="et-sit-sur tooltiptop text-center et-sit-avaiable">
                                    <div className="et-sit-no ng-scope">
                                      <span className>{index + 1}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="et-col-16 et-sit-side" />
                              </div>
                            </div>
                        )
                      })}

                    </div>
                  </div>
                </div> :
                dataCarriageDetail.idShow.includes('N4') ?
                  //toa nam loai 4
                  <div>
                    <div style={{ textAlign: 'center', fontSize: '20px', margin: '10px' }}>{dataCarriageDetail.name} ({dataCarriageDetail.idShow} - TG đi 21/11/2020 06:00)</div>
                    <div className="row et-car-floor">
                      <div className="et-col-8-9 mb-w-100">
                        <div className="et-col-1-16 et-car-floor-full-height">
                          <div className="et-bed-way et-full-width" />
                          <div className="et-bed-way et-full-width text-center small ">Tầng 2</div>
                          <div className="et-bed-way et-full-width text-center small ">Tầng 1</div>
                        </div>
                        <div className="et-bed-way et-full-width et-text-sm">
                          {dataSeat.map((item, index) => {
                            return (
                              (index + 1) % 4 === 0 &&

                              <div className="et-col-1-8 text-center ">Khoang {(index + 1) / 4}</div>
                            )
                          })}
                        </div>
                        {dataSeat.map((item, index) => {
                          return (
                            index % 2 === 1 &&
                            <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope">
                              <div className="et-bed-left">
                                <div className="et-bed-outer">
                                  <div className="et-bed tooltiptop text-center et-sit-avaiable">
                                    <div className="et-sit-no ng-scope">
                                      <span className>{index + 1}</span>
                                    </div>
                                  </div>
                                  <div className="et-bed-illu" />
                                </div>
                              </div>
                            </div>
                          )
                        })}
                        {/* ---- */}
                        <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope" />
                        {/* ---- */}
                        {dataSeat.map((item, index) => {
                          return (
                            index % 2 === 0 &&
                            <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope">
                              <div className="et-bed-left">
                                <div className="et-bed-outer">
                                  <div className="et-bed tooltiptop text-center et-sit-avaiable">
                                    <div className="et-sit-no ng-scope"><span className>{index + 1}</span></div>
                                    <div className="popover top fade in tooltip_description">
                                      <div className="arrow" />
                                    </div>
                                  </div>
                                  <div className="et-bed-illu" />
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div> :
                  // toa nam loai 6
                  <div>
                    <div style={{ textAlign: 'center', fontSize: '20px', margin: '10px' }}>{dataCarriageDetail.name} ({dataCarriageDetail.idShow} - TG đi 21/11/2020 06:00)</div>
                    <div>
                      <div>
                        <div className="row et-car-floor">
                          <div className="et-col-8-9 mb-w-100">
                            <div className="et-col-1-18 et-car-floor-full-height">
                              <div className="et-bed-way et-full-width" />
                              <div className="et-bed-way et-full-width text-center small ng-binding">Tầng 3</div>
                              <div className="et-bed-way et-full-width text-center small ng-binding">Tầng 2</div>
                              <div className="et-bed-way et-full-width text-center small ng-binding">Tầng 1</div>
                            </div>
                            <div className="et-bed-way et-full-width et-text-sm">
                              {dataSeat.map((item, index) => {
                                return (
                                  (index + 1) % 6 === 0 &&
                                  <div className="et-col-1-8 text-center ng-binding">Khoang {(index + 1) / 6}</div>
                                )
                              })}
                            </div>
                            {dataSeat.map((item, index) => {
                              return (
                                (index + 1) % 3 === 2 &&
                                <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope">
                                  <div className="et-bed-left">
                                    <div className="et-bed-outer">
                                      <div className="et-bed tooltiptop text-center et-sit-avaiable">
                                        <div className="et-sit-no ng-scope">
                                          <span className="ng-binding">{index + 1}</span>
                                        </div>
                                      </div>
                                      <div className="et-bed-illu" />
                                    </div>
                                  </div>
                                </div>

                              )
                            })}
                            <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope" />
                            {dataSeat.map((item, index) => {
                              return (
                                (index + 1) % 3 === 1 &&
                                <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope">
                                  <div className="et-bed-left">
                                    <div className="et-bed-outer">
                                      <div className="et-bed tooltiptop text-center et-sit-avaiable">
                                        <div className="et-sit-no ng-scope"><span className="ng-binding">{index + 1}</span></div>
                                      </div>
                                      <div className="et-bed-illu" />
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                            <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope" />
                            {dataSeat.map((item, index) => {
                              return (
                                (index + 1) % 3 === 0 &&
                                <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope">
                                  <div className="et-bed-left">
                                    <div className="et-bed-outer">
                                      <div className="et-bed tooltiptop text-center et-sit-avaiable">
                                        <div className="et-sit-no ng-scope">
                                          <span className="ng-binding">{index + 1}</span>
                                        </div>
                                        <div className="popover top fade in tooltip_description">
                                          <div className="arrow" />
                                          <div className="popover-inner">
                                            <h3 className="popover-title ng-binding" style={{ color: '#000', background: '#FFFF00' }}>Nhấp CHỌN, Nhấp đôi BỎ</h3>
                                            <div className="popover-content ng-binding">Giá vé: 1446,000 VNĐ</div>
                                            <div className="popover-content ng-binding"><select size={1}><option>Thông tin chi tiết</option><option>Giá chưa thuế phí dv: 1346,000 VNĐ</option><option>Gồm thuế VAT dv:30,000đ</option><option>Giao vé:20,000đ</option><option>Giao xuất hóa đơn: 20,000đ</option><option>Hỗ trợ đến 22h mỗi ngày:20,000đ</option><option>Phí bảo trì hệ thống:10,000đ</option></select></div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="et-bed-illu" />
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>}
          </div>
          {/* notebook */}
          <div className="et-legend mt-3">
            <div className="width50persent" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className="d-fix">
                <div className="et-car-nm-64-sit" style={{ width: '50px' }}>
                  <div className="et-col-16 et-sit-side"></div>
                  <div className="et-col-64 et-sit-sur-outer">
                    <div className="et-sit-sur text-center et-sit-bought" style={{ background: '#df5327' }}></div>
                  </div>
                </div>
                <div className="et-bed-left et-no-padding width11persent">
                  <div className="et-bed-outer">
                    <div className="et-bed text-center et-sit-bought" style={{ background: '#df5327' }}></div>
                    <div className="et-bed-illu"></div>
                  </div>
                </div>
                <div className="et-legend-label ng-binding">Chỗ đã bán, không bán</div>
              </div>
              <div className="d-fix">
                <div className="et-car-nm-64-sit" style={{ width: '50px' }}>
                  <div className="et-col-16 et-sit-side"></div>
                  <div className="et-col-64 et-sit-sur-outer">
                    <div className="et-sit-sur text-center et-sit-bought" style={{ background: '#fff' }}></div>
                  </div>
                </div>
                <div className="et-bed-left et-no-padding width11persent">
                  <div className="et-bed-outer">
                    <div className="et-bed text-center et-sit-bought" style={{ background: '#fff' }}></div>
                    <div className="et-bed-illu"></div>
                  </div>
                </div>
                <div className="et-legend-label ng-binding">Chỗ trống</div>
              </div>
              <div className="d-fix">
                <div className="et-car-nm-64-sit" style={{ width: '50px' }}>
                  <div className="et-col-16 et-sit-side"></div>
                  <div className="et-col-64 et-sit-sur-outer">
                    <div className="et-sit-sur text-center et-sit-bought" style={{ background: '#a6b727' }}></div>
                  </div>
                </div>
                <div className="et-bed-left et-no-padding width11persent">
                  <div className="et-bed-outer">
                    <div className="et-bed text-center et-sit-bought" style={{ background: '#a6b727' }}></div>
                    <div className="et-bed-illu"></div>
                  </div>
                </div>
                <div className="et-legend-label ng-binding">Chỗ đang chọn</div>
              </div>
            </div>
            <div className="width50persent">
            </div>
          </div>

        </div>
        <div className="col-right-30">
          <div className="carditem" style={{ border: '1px solid #ccc' }}>
            <div style={{ color: '#2573a0', fontWeight: 600, borderBottom: '2px solid #2573a0' }}><i className="fas fa-bars" /> Giỏ vé</div>
            <div>
              <div style={{ padding: '10px' }}>
                <div style={{ textAlign: 'center' }}>Chiều đi</div>
                <div>ES3 - Sài Gòn - Hà Nội</div>
                <div>21/11/2020 06:00</div>
                <div>Chỗ 17 - Ngồi mềm điều hòa</div>
              </div>
              <hr />
              <div>
                <Link to='/payment'>
                  <div style={{ backgroundColor: 'red', padding: '10px', width: '60%', margin: 'auto', textAlign: 'center', color: '#ffffff', cursor: 'pointer' }}>MUA VÉ</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
