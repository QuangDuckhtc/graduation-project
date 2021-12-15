import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Banner } from './../_App/Index';
import { Image } from 'react-bootstrap';
import { axios } from '../../config/constant';
import { message } from 'antd';
import _findIndex from 'lodash/findIndex'
import { useHistory } from 'react-router';


export default function DetailSchedule() {

  const history = useHistory();
  const dispatch = useDispatch();
  const dataSchedule = useSelector(state => state.dataSchedule)
  const valueSearch = useSelector(state => state.valueSearch)
  const reloadSeat = useSelector(state => state.reloadSeat)
  const reloadSeat1 = useSelector(state => state.reloadSeat1)
  const reloadCart = useSelector(state => state.reloadCart)

  const [changeTrain0, setChangeTrain0] = useState(0);
  const [changeTrain1, setChangeTrain1] = useState(0);
  const [changeCarriage, setChangeCarriage] = useState(0);
  const [changeCarriage1, setChangeCarriage1] = useState(0);

  const [dataTrain, setDataTrain] = useState([])
  const [dataTrain1, setDataTrain1] = useState([])
  const [dataCarriage, setDataCarriage] = useState([])
  const [dataCarriage1, setDataCarriage1] = useState([])
  const [dataSeat, setDataSeat] = useState([])
  const [dataSeat1, setDataSeat1] = useState([])
  const [idTrain, setIdTrain] = useState('')
  const [idTrain1, setIdTrain1] = useState('')
  const [dataCarriageDetail, setDataCarriageDetail] = useState({
    idShow: '',
    name: ''
  })
  const [dataCarriageDetail1, setDataCarriageDetail1] = useState({
    idShow: '',
    name: ''
  })
  const [dataHandle, setDataHandle] = useState({
    idTrain: '',
    idCarriage: '',
  })
  const [dataHandle1, setDataHandle1] = useState({
    idTrain: '',
    idCarriage: '',
  })
  const [arrTickets, setArrTickets] = useState([])
  const [arrTickets1, setArrTickets1] = useState([])
  const [ticket, setTicket] = useState({
    idShow: '',
    idSchedule: '',
    price: '',
    priceDiscount: '',
    idSeat: '',
    nameCarriage: '',
    timeStart: '',
    dateStart: '',
    stationFrom: {
      idShow: '',
      name: '',
      minutes: '',
      distance: '',
    },
    stationTo: {
      idShow: '',
      name: '',
      minutes: '',
      distance: '',
    },
    discount: 0,
    customerName: '',
    identityCard: '',
  })
  const [ticket1, setTicket1] = useState({
    //co gia mac dinh nhung co thể thay đổi
    idSchedule: '',
    timeStart: '',
    nameCarriage: '',
    price: '',
    priceDiscount: '',

    // chưa gán giá trị mặc đijnh
    idSeat: '',

    //giá trị có định không đổi
    dateStart: '',
    stationFrom: {
      idShow: '',
      name: '',
      minutes: '',
      distance: '',
    },
    stationTo: {
      idShow: '',
      name: '',
      minutes: '',
      distance: '',
    },
    discount: 0,
    customerName: '',
    identityCard: '',
  })
  const [cart, setCart] = useState([])


  function setRealTime(timeStart, timeRun) {
    let hoursStart = parseInt(timeStart.split(':')[0])
    let hoursRun = parseInt(timeRun.split(':')[0])
    let minutesRun = parseInt(timeRun.split(':')[1])
    let hours = (hoursStart + hoursRun) % 24
    return hours + ":" + minutesRun
  }
  async function getDataTicket(idSchedule, idStationFrom, idStationTo) {
    await axios.get(`/ticket?idSchedule=${idSchedule}&&idStationFrom=${idStationFrom}&&idStationTo=${idStationTo}`
    ).then(function (res) {
      setArrTickets(res.data.data)

    }).catch(function (err) {
      console.log(err)
    })
  }
  async function getDataTicket1(idSchedule, idStationFrom, idStationTo) {
    await axios.get(`/ticket?idSchedule=${idSchedule}&&idStationFrom=${idStationFrom}&&idStationTo=${idStationTo}`
    ).then(function (res) {
      setArrTickets1(res.data.data)

    }).catch(function (err) {
      console.log(err)
    })
  }
  async function getDataDefault() {
    await axios.post('/schedule', { arrData: dataSchedule }
    ).then(async function (res) {
      if (res.data.status === 'success') {
        let price = parseInt(res.data.schedule[0][0].train.carriage[0].unitPrice) * Math.abs(parseInt(res.data.stationFrom.distance) - parseInt(res.data.stationTo.distance))

        getDataTicket(res.data.schedule[0][0]._id, res.data.stationFrom.idShow, res.data.stationTo.idShow)
        setTicket({
          ...ticket,
          idSchedule: res.data.schedule[0][0]._id,
          nameCarriage: res.data.schedule[0][0].train.carriage[0].name,
          dateStart: valueSearch.startDate,
          timeStart: setRealTime(res.data.schedule[0][0].time, valueSearch.stationFrom.minutes),
          price: price > res.data.schedule[0][0].train.carriage[0].minPrice ? price : res.data.schedule[0][0].train.carriage[0].minPrice,
          priceDiscount: price > res.data.schedule[0][0].train.carriage[0].minPrice ? price : res.data.schedule[0][0].train.carriage[0].minPrice,

          stationFrom: {
            idShow: res.data.stationFrom.idShow,
            name: res.data.stationFrom.name,
            minutes: res.data.stationFrom.minutes,
            distance: res.data.stationFrom.distance,
          },
          stationTo: {
            idShow: res.data.stationTo.idShow,
            name: res.data.stationTo.name,
            minutes: res.data.stationTo.minutes,
            distance: res.data.stationTo.distance,
          }
        })
        setDataTrain(res.data.schedule[0]);
        setDataCarriage(res.data.schedule[0][0].train.carriage)
        setDataSeat(res.data.schedule[0][0].train.carriage[0].seat)

        setIdTrain(res.data.schedule[0][0].train.idShow)
        setDataCarriageDetail({
          idShow: res.data.schedule[0][0].train.carriage[0].idShow,
          name: res.data.schedule[0][0].train.carriage[0].name
        })
        setDataHandle({
          ...dataHandle,
          idTrain: res.data.schedule[0][0].train._id
        })

        let price1 = parseInt(res.data.schedule[1][0].train.carriage[0].unitPrice) * Math.abs(parseInt(res.data.stationFrom.distance) - parseInt(res.data.stationTo.distance))

        getDataTicket1(res.data.schedule[1][0]._id, res.data.stationFrom.idShow, res.data.stationTo.idShow)
        setTicket1({
          ...ticket1,
          idSchedule: res.data.schedule[1][0]._id,

          nameCarriage: res.data.schedule[1][0].train.carriage[0].name,
          dateStart: valueSearch.returnDate,
          timeStart: setRealTime(res.data.schedule[1][0].time, valueSearch.stationFrom.minutesRev),
          price1: price1 > res.data.schedule[1][0].train.carriage[0].unitPrice ? price1 : res.data.schedule[1][0].train.carriage[0].unitPrice,
          priceDiscount: price1 > res.data.schedule[1][0].train.carriage[0].unitPrice ? price1 : res.data.schedule[1][0].train.carriage[0].unitPrice,

          stationFrom: {
            idShow: res.data.stationTo.idShow,
            name: res.data.stationTo.name,
            minutes: res.data.stationTo.minutes,
            distance: res.data.stationTo.distance,
          },
          stationTo: {
            idShow: res.data.stationFrom.idShow,
            name: res.data.stationFrom.name,
            minutes: res.data.stationFrom.minutes,
            distance: res.data.stationFrom.distance,
          }
        })
        setDataTrain1(res.data.schedule[1]);
        setDataCarriage1(res.data.schedule[1][0].train.carriage)
        setDataSeat1(res.data.schedule[1][0].train.carriage[0].seat)

        setIdTrain1(res.data.schedule[1][0].train.idShow)
        setDataCarriageDetail1({
          idShow: res.data.schedule[1][0].train.carriage[0].idShow,
          name: res.data.schedule[1][0].train.carriage[0].name
        })
        setDataHandle1({
          ...dataHandle1,
          idTrain: res.data.schedule[1][0].train._id
        })

      } else {
        message.error(res.data.message)
      }
    }).catch(function (error) {
      console.log(error)
    })
  }


  async function handleTrain(id) {
    await axios.get(`/carriage?id=${id}`
    ).then(function (res) {
      setChangeCarriage(0)

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
  async function handleTrain1(id) {
    await axios.get(`/carriage?id=${id}`
    ).then(function (res) {
      setChangeCarriage1(0)

      setDataCarriage1(res.data.data.carriage)
      setDataSeat1(res.data.data.carriage[0].seat)

      setIdTrain1(res.data.data.idShow)
      setDataCarriageDetail1({
        idShow: res.data.data.carriage[0].idShow,
        name: res.data.data.carriage[0].name
      })

      setDataHandle1({
        ...dataHandle1,
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
  async function handleCarriage1(id) {
    await axios.get(`/seat?idtrain=${dataHandle1.idTrain}&&idcarriage=${id}`
    ).then(function (res) {
      setDataSeat1(res.data.data.seat)

      setDataCarriageDetail1({
        idShow: res.data.data.idShow,
        name: res.data.data.name
      })
      setDataHandle1({
        ...dataHandle1,
        idCarriage: id
      })
    }).catch(function (error) {
      console.log(error)
    })
  }

  useEffect(() => {
    getDataDefault()
  }, [])

  useEffect(() => {
    if (reloadSeat) {
      setCart(cart => [
        ...cart,
        ticket
      ])
      dispatch({ type: 'NO_RELOAD_SEAT' })
    }
  }, [reloadSeat])

  useEffect(() => {
    if (reloadSeat1) {
      setCart(cart => [
        ...cart,
        ticket1
      ])
      dispatch({ type: 'NO_RELOAD_SEAT1' })
    }
  }, [reloadSeat1])

  useEffect(() => {
    if (reloadCart) {
      dispatch({ type: 'NO_RELOAD_CART' })
    }
  }, [reloadCart])

  return (
    <div>
      {console.log(arrTickets)}
      {/* {console.log(dataTrain)} */}
      {/* {console.log(setRealTime('15:00', '37:30'))} */}
      <Banner />
      <div className="container" style={{ display: 'flex' }}>
        <div className="col-left-70">
          {dataSchedule?.map((item0, idex) => {
            return (
              <div style={{ marginBottom: '50px' }} key={idex}>
                <div className="dayrunto">{idex === 0 ? `Chiều đi: Ngày ${valueSearch.startDate} từ ${valueSearch.stationFrom.name} đến ${valueSearch.stationTo.name}` : `Chiều về: Ngày ${valueSearch.returnDate} từ ${valueSearch.stationTo.name} đến ${valueSearch.stationFrom.name}`}</div>
                {/* danh sach  tau */}
                <div className="margin10 backgroud-white">
                  {
                    idex === 0 ?
                      dataTrain?.map((item, index) => {
                        return (
                          <div key={index} className="col-xs-4 col-sm-3 et-col-md-2 et-train-block"
                            onClick={() => {
                              setChangeTrain0(index)
                              handleTrain(item.train._id)
                              setTicket({
                                ...ticket,
                                idSchedule: item._id,
                                timeStart: setRealTime(item.time, valueSearch.stationFrom.minutes)
                              })
                            }}
                          >
                            <div className={(idex === 0 ? changeTrain0 : changeTrain1) === index ? 'et-train-head backgroud-train-toa' : 'et-train-head'}>
                              <div className="row center-block" style={{ width: '40%', marginBottom: '3px' }}>
                                <div className="et-train-lamp text-center" style={{ color: 'rgb(85, 85, 85)' }}>{item.train.idShow}</div>
                              </div>
                              <div className="et-train-head-info">
                                <div className="row et-no-margin"><span className="pull-left et-bold " style={{ width: '30%' }}>Hours</span> <span className="pull-right " style={{ width: '70%', textAlign: 'end' }}>{setRealTime(item.time, valueSearch.stationFrom.minutes) + ' hours'}</span></div>
                                <div className="row et-no-margin"><span className="pull-left et-bold " style={{ width: '30%' }}>Date</span><span className="pull-right" style={{ width: '70%', textAlign: 'end' }}>{valueSearch.startDate}</span></div>
                                <div className="row et-no-margin">
                                  <div className="et-col-50">
                                    <div className="et-text-sm ">SL chỗ đặt</div>
                                    <div className="et-text-large et-bold pull-left " style={{ marginLeft: '5px' }}>0</div>
                                  </div>
                                  <div className="et-col-50 text-center">
                                    <div className="et-text-sm ">SL chỗ trống</div>
                                    <div className="et-text-large et-bold pull-right " style={{ marginRight: '5px' }}>420</div>
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
                      })
                      :
                      dataTrain1?.map((item, index) => {
                        return (
                          <div key={index} className="col-xs-4 col-sm-3 et-col-md-2 et-train-block"
                            onClick={() => {
                              setChangeTrain1(index)
                              handleTrain1(item.train._id)
                              setTicket1({
                                ...ticket1,
                                idSchedule: item._id,
                                timeStart: setRealTime(item.time, valueSearch.stationTo.minutesRev)
                              })
                            }}
                          >
                            <div className={(idex === 0 ? changeTrain0 : changeTrain1) === index ? 'et-train-head backgroud-train-toa' : 'et-train-head'}>
                              <div className="row center-block" style={{ width: '40%', marginBottom: '3px' }}>
                                <div className="et-train-lamp text-center" style={{ color: 'rgb(85, 85, 85)' }}>{item.train.idShow}</div>
                              </div>
                              <div className="et-train-head-info">
                                <div className="row et-no-margin"><span className="pull-left et-bold " style={{ width: '30%' }}>Hours</span> <span className="pull-right " style={{ width: '70%', textAlign: 'end' }}>{setRealTime(item.time, valueSearch.stationTo.minutesRev) + ' hours'}</span></div>
                                <div className="row et-no-margin"><span className="pull-left et-bold " style={{ width: '30%' }}>Date</span><span className="pull-right" style={{ width: '70%', textAlign: 'end' }}>{item.dateStart}</span></div>
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
                      })
                  }
                </div>

                {/* danh sach toa */}
                <div className="col-md-12 et-no-margin text-center" style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'left' }}>
                  {/* dautoa */}
                  <div className="et-car-block ng-scope">
                    <div className="et-car-block">
                      <div className="et-car-icon">
                        <Image src="images/train2.png" alt='Hinh' />
                      </div>
                      <div className="text-center text-info et-car-label ng-binding">{idex === 0 ? idTrain : idTrain1}</div>
                    </div>
                  </div>
                  {/* toa */}
                  {idex === 0 ?
                    dataCarriage?.map((item, index) => {
                      return (
                        <div key={index} className="et-car-block ng-scope">
                          <div className="et-car-block"
                            onClick={() => {
                              let price = parseInt(item.unitPrice) * Math.abs(parseInt(ticket.stationTo.distance) - parseInt(ticket.stationFrom.distance))
                              setChangeCarriage(index)
                              setDataHandle({
                                ...dataHandle,
                                idCarriage: item.idShow
                              })
                              handleCarriage(item.idShow)
                              setTicket({
                                ...ticket,
                                nameCarriage: item.name,
                                price: price > item.minPrice ? price : item.minPrice,
                                priceDiscount: price > item.minPrice ? price : item.minPrice
                              })
                            }}
                          >
                            <div className={(idex === 0 ? changeCarriage : changeCarriage1) === index ? "et-car-icon et-car-icon-selected" : "et-car-icon et-car-icon et-car-icon-avaiable"}>
                              <Image src="images/trainCar2.png" alt='Hinh' />
                            </div>
                            <div className="text-center text-info et-car-label ng-binding">{index + 1}</div>
                          </div>
                        </div>
                      )
                    }) :
                    dataCarriage1?.map((item, index) => {
                      return (
                        <div key={index} className="et-car-block ng-scope">
                          <div className="et-car-block"
                            onClick={() => {
                              let price = parseInt(item.unitPrice) * Math.abs(parseInt(ticket.stationTo.distance) - parseInt(ticket.stationFrom.distance))

                              setChangeCarriage1(index)
                              setDataHandle1({
                                ...dataHandle1,
                                idCarriage: item.idShow
                              })
                              handleCarriage1(item.idShow)
                              setTicket1({
                                ...ticket1,
                                nameCarriage: item.name,
                                price: price > item.minPrice ? price : item.minPrice,
                                priceDiscount: price > item.minPrice ? price : item.minPrice
                              })
                            }}
                          >
                            <div className={(idex === 0 ? changeCarriage : changeCarriage1) === index ? "et-car-icon et-car-icon-selected" : "et-car-icon et-car-icon et-car-icon-avaiable"}>
                              <Image src="images/trainCar2.png" alt='Hinh' />
                            </div>
                            <div className="text-center text-info et-car-label ng-binding">{index + 1}</div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>

                {/* danh sach ghe  */}
                {idex === 0 ?
                  (dataCarriageDetail?.idShow.includes('NM') ?
                    //  toa ngoi mem *
                    <div>
                      <div style={{ textAlign: 'center', fontSize: '20px', margin: '10px' }}>{idex === 0 ? dataCarriageDetail.name : dataCarriageDetail1.name} ({idex === 0 ? dataCarriageDetail.idShow : dataCarriageDetail1.idShow}  - TG đi 21/11/2020 06:00)</div>
                      <div className="row et-car-floor">
                        <div className="et-full-width">
                          <div className="et-car-nm-64-half-block">
                            {dataSeat.map((item, index) => {
                              return (
                                index < 20 &&
                                <div key={index} className="et-car-nm-64-sit ng-isolate-scope" style={{ width: '20%' }}
                                  onClick={() => {
                                    if (_findIndex(arrTickets, { seat: item }) < 0) {
                                      setTicket({
                                        ...ticket,
                                        idShow: item + "-" + new Date().toISOString(),
                                        idSeat: item
                                      })
                                      let indexCart = _findIndex(cart, { idSeat: item })
                                      if (indexCart < 0) {
                                        dispatch({ type: 'RELOAD_SEAT' })
                                      } else {
                                        cart.splice(indexCart, 1)
                                        dispatch({ type: 'RELOAD_CART' })
                                      }
                                    }

                                  }}
                                >
                                  <div className="et-car-seat-right et-seat-h-35">
                                    <div className="et-col-16 et-sit-side" />
                                    <div className="et-col-84 et-sit-sur-outer">
                                      <div className="et-sit-sur tooltiptop text-center et-sit-avaiable"
                                        style={{
                                          background: _findIndex(cart, { idSeat: item }) > -1 ? '#a6b727' : _findIndex(arrTickets, { seat: item }) > -1 ? '#df5327' : '#fff'
                                        }}>
                                        <div className="et-sit-no ng-scope">
                                          <span className>{index + 1}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            })
                            }
                          </div>
                          <div className="et-car-seperator">
                            <div />
                            <div />
                          </div>
                          <div className="et-car-nm-64-half-block">
                            {dataSeat.map((item, index) => {
                              return (
                                index > 19 &&
                                <div key={index} className="et-car-nm-64-sit ng-isolate-scope" style={{ width: '20%' }}
                                  onClick={() => {
                                    setTicket({
                                      ...ticket,
                                      idShow: item + "-" + new Date().toISOString(),
                                      idSeat: item
                                    })
                                    let indexCart = _findIndex(cart, { idSeat: item })
                                    if (indexCart < 0) {
                                      dispatch({ type: 'RELOAD_SEAT' })
                                    } else {
                                      cart.splice(indexCart, 1)
                                      dispatch({ type: 'RELOAD_CART' })
                                    }
                                  }}
                                >
                                  <div className="et-car-seat-right et-seat-h-35">
                                    <div className="et-col-16 et-sit-side" />
                                    <div className="et-col-84 et-sit-sur-outer">
                                      <div className="et-sit-sur tooltiptop text-center et-sit-avaiable" style={{ background: _findIndex(cart, { idSeat: item }) > -1 ? '#a6b727' : '#fff' }}>
                                        <div className="et-sit-no ng-scope">
                                          <span>{index + 1}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            })
                            }
                          </div>
                        </div>
                      </div>
                    </div> :
                    dataCarriageDetail?.idShow.includes('NC') ?
                      //toa ngoi cung
                      <div>
                        <div style={{ textAlign: 'center', fontSize: '20px', margin: '10px' }}>{idex === 0 ? dataCarriageDetail.name : dataCarriageDetail1.name} ({idex === 0 ? dataCarriageDetail.idShow : dataCarriageDetail1.idShow} - TG đi 21/11/2020 06:00)</div>
                        <div className="row et-car-floor">
                          <div className="et-full-width">
                            {dataSeat.map((item, index) => {
                              return (
                                index % 2 === 0 ?
                                  <div className="et-col-1-20 et-seat-h-35 ng-isolate-scope"
                                    onClick={() => {
                                      setTicket({
                                        ...ticket,
                                        idShow: item + "-" + new Date().toISOString(),
                                        idSeat: item
                                      })
                                      let indexCart = _findIndex(cart, { idSeat: item })
                                      if (indexCart < 0) {
                                        dispatch({ type: 'RELOAD_SEAT' })
                                      } else {
                                        cart.splice(indexCart, 1)
                                        dispatch({ type: 'RELOAD_CART' })
                                      }
                                    }}
                                  >
                                    <div className="et-car-seat-left et-seat-h-35">
                                      <div className="et-col-16 et-sit-side" />
                                      <div className="et-col-84 et-sit-sur-outer">
                                        <div className="et-sit-sur tooltiptop text-center et-sit-avaiable" style={{ background: _findIndex(cart, { idSeat: item }) > -1 ? '#a6b727' : '#fff' }}>
                                          <div className="et-sit-no ng-scope">
                                            <span className>{index + 1}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div> :
                                  <div className="et-col-1-20 et-seat-h-35 ng-isolate-scope"
                                    onClick={() => {
                                      setTicket({
                                        ...ticket,
                                        idShow: item + "-" + new Date().toISOString(),
                                        idSeat: item
                                      })
                                      let indexCart = _findIndex(cart, { idSeat: item })
                                      if (indexCart < 0) {
                                        dispatch({ type: 'RELOAD_SEAT' })
                                      } else {
                                        cart.splice(indexCart, 1)
                                        dispatch({ type: 'RELOAD_CART' })
                                      }
                                    }}
                                  >
                                    <div className="et-car-seat-left et-seat-h-35">
                                      <div className="et-col-84 et-sit-sur-outer">
                                        <div className="et-sit-sur tooltiptop text-center et-sit-avaiable" style={{ background: _findIndex(cart, { idSeat: item }) > -1 ? '#a6b727' : '#fff' }}>
                                          <div className="et-sit-no ng-scope">
                                            <span className>{index + 1}</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="et-col-16 et-sit-side" />
                                    </div>
                                  </div>
                              )
                            })
                            }
                          </div>
                        </div>
                      </div> :
                      dataCarriageDetail?.idShow.includes('N4') ?
                        //toa nam loai 4
                        <div>
                          <div style={{ textAlign: 'center', fontSize: '20px', margin: '10px' }}>{idex === 0 ? dataCarriageDetail.name : dataCarriageDetail1.name} ({idex === 0 ? dataCarriageDetail.idShow : dataCarriageDetail1.idShow} - TG đi 21/11/2020 06:00)</div>
                          <div className="row et-car-floor">
                            <div className="et-col-8-9 mb-w-100">
                              <div className="et-col-1-16 et-car-floor-full-height">
                                <div className="et-bed-way et-full-width" />
                                <div className="et-bed-way et-full-width text-center small ">Tầng 2</div>
                                <div className="et-bed-way et-full-width text-center small ">Tầng 1</div>
                              </div>
                              <div className="et-bed-way et-full-width et-text-sm">
                                <div className="et-col-1-8 text-center ">Khoang 1</div>
                                <div className="et-col-1-8 text-center ">Khoang 2</div>
                                <div className="et-col-1-8 text-center ">Khoang 3</div>
                                <div className="et-col-1-8 text-center ">Khoang 4</div>
                                <div className="et-col-1-8 text-center ">Khoang 5</div>
                                <div className="et-col-1-8 text-center ">Khoang 6</div>
                                <div className="et-col-1-8 text-center ">Khoang 7</div>
                              </div>
                              {dataSeat.map((item, index) => {
                                return (
                                  index % 2 === 1 &&
                                  <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope"
                                    onClick={() => {
                                      setTicket({
                                        ...ticket,
                                        idShow: item + "-" + new Date().toISOString(),
                                        idSeat: item
                                      })
                                      let indexCart = _findIndex(cart, { idSeat: item })
                                      if (indexCart < 0) {
                                        dispatch({ type: 'RELOAD_SEAT' })
                                      } else {
                                        cart.splice(indexCart, 1)
                                        dispatch({ type: 'RELOAD_CART' })
                                      }
                                    }}
                                  >
                                    <div className="et-bed-left">
                                      <div className="et-bed-outer">
                                        <div className="et-bed tooltiptop text-center et-sit-avaiable" style={{ background: _findIndex(cart, { idSeat: item }) > -1 ? '#a6b727' : '#fff' }}>
                                          <div className="et-sit-no ng-scope" >
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
                                  <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope"
                                    onClick={() => {
                                      setTicket({
                                        ...ticket,
                                        idShow: item + "-" + new Date().toISOString(),
                                        idSeat: item
                                      })
                                      let indexCart = _findIndex(cart, { idSeat: item })
                                      if (indexCart < 0) {
                                        dispatch({ type: 'RELOAD_SEAT' })
                                      } else {
                                        cart.splice(indexCart, 1)
                                        dispatch({ type: 'RELOAD_CART' })
                                      }
                                    }}
                                  >
                                    <div className="et-bed-left">
                                      <div className="et-bed-outer">
                                        <div className="et-bed tooltiptop text-center et-sit-avaiable" style={{ background: _findIndex(cart, { idSeat: item }) > -1 ? '#a6b727' : '#fff' }}>
                                          <div className="et-sit-no ng-scope" >
                                            <span className>{index + 1}</span>
                                          </div>
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
                          <div style={{ textAlign: 'center', fontSize: '20px', margin: '10px' }}>{idex === 0 ? dataCarriageDetail.name : dataCarriageDetail1.name} ({idex === 0 ? dataCarriageDetail.idShow : dataCarriageDetail1.idShow} - TG đi 21/11/2020 06:00)</div>
                          <div className="row et-car-floor">
                            <div className="et-col-8-9 mb-w-100">
                              <div className="et-col-1-18 et-car-floor-full-height">
                                <div className="et-bed-way et-full-width" />
                                <div className="et-bed-way et-full-width text-center small ng-binding">Tầng 3</div>
                                <div className="et-bed-way et-full-width text-center small ng-binding">Tầng 2</div>
                                <div className="et-bed-way et-full-width text-center small ng-binding">Tầng 1</div>
                              </div>
                              <div className="et-bed-way et-full-width et-text-sm">
                                <div className="et-col-1-8 text-center ng-binding">Khoang 1</div>
                                <div className="et-col-1-8 text-center ng-binding">Khoang 2</div>
                                <div className="et-col-1-8 text-center ng-binding">Khoang 3</div>
                                <div className="et-col-1-8 text-center ng-binding">Khoang 4</div>
                                <div className="et-col-1-8 text-center ng-binding">Khoang 5</div>
                                <div className="et-col-1-8 text-center ng-binding">Khoang 6</div>
                                <div className="et-col-1-8 text-center ng-binding">Khoang 7</div>
                              </div>
                              {dataSeat.map((item, index) => {
                                return (
                                  (index + 1) % 3 === 2 &&
                                  <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope"
                                    onClick={() => {
                                      setTicket({
                                        ...ticket,
                                        idShow: item + "-" + new Date().toISOString(),
                                        idSeat: item
                                      })
                                      let indexCart = _findIndex(cart, { idSeat: item })
                                      if (indexCart < 0) {
                                        dispatch({ type: 'RELOAD_SEAT' })
                                      } else {
                                        cart.splice(indexCart, 1)
                                        dispatch({ type: 'RELOAD_CART' })
                                      }
                                    }}
                                  >
                                    <div className="et-bed-left">
                                      <div className="et-bed-outer">
                                        <div className="et-bed tooltiptop text-center et-sit-avaiable" style={{ background: _findIndex(cart, { idSeat: item }) > -1 ? '#a6b727' : '#fff' }}>
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
                                  <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope"
                                    onClick={() => {
                                      setTicket({
                                        ...ticket,
                                        idShow: item + "-" + new Date().toISOString(),
                                        idSeat: item
                                      })
                                      let indexCart = _findIndex(cart, { idSeat: item })
                                      if (indexCart < 0) {
                                        dispatch({ type: 'RELOAD_SEAT' })
                                      } else {
                                        cart.splice(indexCart, 1)
                                        dispatch({ type: 'RELOAD_CART' })
                                      }
                                    }}
                                  >
                                    <div className="et-bed-left">
                                      <div className="et-bed-outer">
                                        <div className="et-bed tooltiptop text-center et-sit-avaiable" style={{ background: _findIndex(cart, { idSeat: item }) > -1 ? '#a6b727' : '#fff' }}>
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
                                  (index + 1) % 3 === 0 &&
                                  <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope"
                                    onClick={() => {
                                      setTicket({
                                        ...ticket,
                                        idShow: item + "-" + new Date().toISOString(),
                                        idSeat: item
                                      })
                                      let indexCart = _findIndex(cart, { idSeat: item })
                                      if (indexCart < 0) {
                                        dispatch({ type: 'RELOAD_SEAT' })
                                      } else {
                                        cart.splice(indexCart, 1)
                                        dispatch({ type: 'RELOAD_CART' })
                                      }
                                    }}
                                  >
                                    <div className="et-bed-left">
                                      <div className="et-bed-outer">
                                        <div className="et-bed tooltiptop text-center et-sit-avaiable" style={{ background: _findIndex(cart, { idSeat: item }) > -1 ? '#a6b727' : '#fff' }}>
                                          <div className="et-sit-no ng-scope" >
                                            <span className="ng-binding">{index + 1}</span>
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
                        </div>) :
                  (dataCarriageDetail1?.idShow.includes('NM') ?
                    //  toa ngoi mem *
                    <div>
                      <div style={{ textAlign: 'center', fontSize: '20px', margin: '10px' }}>{idex === 0 ? dataCarriageDetail.name : dataCarriageDetail1.name} ({idex === 0 ? dataCarriageDetail.idShow : dataCarriageDetail1.idShow}  - TG đi 21/11/2020 06:00)</div>
                      <div className="row et-car-floor">
                        <div className="et-full-width">
                          <div className="et-car-nm-64-half-block">
                            {dataSeat1.map((item, index) => {
                              return (
                                index < 20 &&
                                <div key={index} className="et-car-nm-64-sit ng-isolate-scope" style={{ width: '20%' }}
                                  onClick={() => {
                                    setTicket1({
                                      ...ticket1,
                                      idShow: item + "-" + new Date().toISOString(),
                                      idSeat: item
                                    })
                                    let indexCart = _findIndex(cart, { idSeat: item })
                                    if (indexCart < 0) {
                                      dispatch({ type: 'RELOAD_SEAT1' })
                                    } else {
                                      cart.splice(indexCart, 1)
                                      dispatch({ type: 'RELOAD_CART' })
                                    }
                                  }}
                                >
                                  <div className="et-car-seat-right et-seat-h-35">
                                    <div className="et-col-16 et-sit-side" />
                                    <div className="et-col-84 et-sit-sur-outer">
                                      <div className="et-sit-sur tooltiptop text-center et-sit-avaiable" style={{ background: _findIndex(cart, { idSeat: item }) > -1 ? '#a6b727' : '#fff' }}>
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
                            {dataSeat1.map((item, index) => {
                              return (
                                index > 19 &&
                                <div key={index} className="et-car-nm-64-sit ng-isolate-scope" style={{ width: '20%' }}
                                  onClick={() => {
                                    setTicket1({
                                      ...ticket1,
                                      idShow: item + "-" + new Date().toISOString(),
                                      idSeat: item
                                    })
                                    let indexCart = _findIndex(cart, { idSeat: item })
                                    if (indexCart < 0) {
                                      dispatch({ type: 'RELOAD_SEAT1' })
                                    } else {
                                      cart.splice(indexCart, 1)
                                      dispatch({ type: 'RELOAD_CART' })
                                    }
                                  }}
                                >
                                  <div className="et-car-seat-right et-seat-h-35">
                                    <div className="et-col-16 et-sit-side" />
                                    <div className="et-col-84 et-sit-sur-outer">
                                      <div className="et-sit-sur tooltiptop text-center et-sit-avaiable" style={{ background: _findIndex(cart, { idSeat: item }) > -1 ? '#a6b727' : '#fff' }}>
                                        <div className="et-sit-no ng-scope">
                                          <span>{index + 1}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            })
                            }
                          </div>
                        </div>
                      </div>
                    </div> :
                    dataCarriageDetail1?.idShow.includes('NC') ?
                      //toa ngoi cung
                      <div>
                        <div style={{ textAlign: 'center', fontSize: '20px', margin: '10px' }}>{idex === 0 ? dataCarriageDetail.name : dataCarriageDetail1.name} ({idex === 0 ? dataCarriageDetail.idShow : dataCarriageDetail1.idShow} - TG đi 21/11/2020 06:00)</div>
                        <div className="row et-car-floor">
                          <div className="et-full-width">
                            {dataSeat1.map((item, index) => {
                              return (
                                index % 2 === 0 ?
                                  <div className="et-col-1-20 et-seat-h-35 ng-isolate-scope"
                                    onClick={() => {
                                      setTicket1({
                                        ...ticket1,
                                        idShow: item + "-" + new Date().toISOString(),
                                        idSeat: item
                                      })
                                      let indexCart = _findIndex(cart, { idSeat: item })
                                      if (indexCart < 0) {
                                        dispatch({ type: 'RELOAD_SEAT1' })
                                      } else {
                                        cart.splice(indexCart, 1)
                                        dispatch({ type: 'RELOAD_CART' })
                                      }
                                    }}
                                  >
                                    <div className="et-car-seat-left et-seat-h-35">
                                      <div className="et-col-16 et-sit-side" />
                                      <div className="et-col-84 et-sit-sur-outer">
                                        <div className="et-sit-sur tooltiptop text-center et-sit-avaiable" style={{ background: _findIndex(cart, { idSeat: item }) > -1 ? '#a6b727' : '#fff' }}>
                                          <div className="et-sit-no ng-scope">
                                            <span className>{index + 1}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div> :
                                  <div className="et-col-1-20 et-seat-h-35 ng-isolate-scope"
                                    onClick={() => {
                                      setTicket1({
                                        ...ticket1,
                                        idShow: item + "-" + new Date().toISOString(),
                                        idSeat: item
                                      })
                                      let indexCart = _findIndex(cart, { idSeat: item })
                                      if (indexCart < 0) {
                                        dispatch({ type: 'RELOAD_SEAT1' })
                                      } else {
                                        cart.splice(indexCart, 1)
                                        dispatch({ type: 'RELOAD_CART' })
                                      }
                                    }}
                                  >
                                    <div className="et-car-seat-left et-seat-h-35">
                                      <div className="et-col-84 et-sit-sur-outer">
                                        <div className="et-sit-sur tooltiptop text-center et-sit-avaiable" style={{ background: _findIndex(cart, { idSeat: item }) > -1 ? '#a6b727' : '#fff' }}>
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
                      dataCarriageDetail1?.idShow.includes('N4') ?
                        //toa nam loai 4
                        <div>
                          <div style={{ textAlign: 'center', fontSize: '20px', margin: '10px' }}>{idex === 0 ? dataCarriageDetail.name : dataCarriageDetail1.name} ({idex === 0 ? dataCarriageDetail.idShow : dataCarriageDetail1.idShow} - TG đi 21/11/2020 06:00)</div>
                          <div className="row et-car-floor">
                            <div className="et-col-8-9 mb-w-100">
                              <div className="et-col-1-16 et-car-floor-full-height">
                                <div className="et-bed-way et-full-width" />
                                <div className="et-bed-way et-full-width text-center small ">Tầng 2</div>
                                <div className="et-bed-way et-full-width text-center small ">Tầng 1</div>
                              </div>
                              <div className="et-bed-way et-full-width et-text-sm">
                                <div className="et-col-1-8 text-center ">Khoang 1</div>
                                <div className="et-col-1-8 text-center ">Khoang 2</div>
                                <div className="et-col-1-8 text-center ">Khoang 3</div>
                                <div className="et-col-1-8 text-center ">Khoang 4</div>
                                <div className="et-col-1-8 text-center ">Khoang 5</div>
                                <div className="et-col-1-8 text-center ">Khoang 6</div>
                                <div className="et-col-1-8 text-center ">Khoang 7</div>
                              </div>
                              {dataSeat1.map((item, index) => {
                                return (
                                  index % 2 === 1 &&
                                  <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope"
                                    onClick={() => {
                                      setTicket1({
                                        ...ticket1,
                                        idShow: item + "-" + new Date().toISOString(),
                                        idSeat: item
                                      })
                                      let indexCart = _findIndex(cart, { idSeat: item })
                                      if (indexCart < 0) {
                                        dispatch({ type: 'RELOAD_SEAT1' })
                                      } else {
                                        cart.splice(indexCart, 1)
                                        dispatch({ type: 'RELOAD_CART' })
                                      }
                                    }}
                                  >
                                    <div className="et-bed-left">
                                      <div className="et-bed-outer">
                                        <div className="et-bed tooltiptop text-center et-sit-avaiable" style={{ background: _findIndex(cart, { idSeat: item }) > -1 ? '#a6b727' : '#fff' }}>
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
                              {dataSeat1.map((item, index) => {
                                return (
                                  index % 2 === 0 &&
                                  <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope"
                                    onClick={() => {
                                      setTicket1({
                                        ...ticket1,
                                        idShow: item + "-" + new Date().toISOString(),
                                        idSeat: item
                                      })
                                      let indexCart = _findIndex(cart, { idSeat: item })
                                      if (indexCart < 0) {
                                        dispatch({ type: 'RELOAD_SEAT1' })
                                      } else {
                                        cart.splice(indexCart, 1)
                                        dispatch({ type: 'RELOAD_CART' })
                                      }
                                    }}
                                  >
                                    <div className="et-bed-left">
                                      <div className="et-bed-outer">
                                        <div className="et-bed tooltiptop text-center et-sit-avaiable" style={{ background: _findIndex(cart, { idSeat: item }) > -1 ? '#a6b727' : '#fff' }}>
                                          <div className="et-sit-no ng-scope">
                                            <span className>{index + 1}</span>
                                          </div>
                                          <div className="popover top fade in tooltip_description">
                                            <div className="arrow" />
                                          </div>
                                        </div>
                                        <div className="et-bed-illu" />
                                      </div>
                                    </div>
                                  </div>
                                )
                              })
                              }
                            </div>
                          </div>
                        </div> :
                        // toa nam loai 6
                        <div>
                          <div style={{ textAlign: 'center', fontSize: '20px', margin: '10px' }}>{idex === 0 ? dataCarriageDetail.name : dataCarriageDetail1.name} ({idex === 0 ? dataCarriageDetail.idShow : dataCarriageDetail1.idShow} - TG đi 21/11/2020 06:00)</div>
                          <div className="row et-car-floor">
                            <div className="et-col-8-9 mb-w-100">
                              <div className="et-col-1-18 et-car-floor-full-height">
                                <div className="et-bed-way et-full-width" />
                                <div className="et-bed-way et-full-width text-center small ng-binding">Tầng 3</div>
                                <div className="et-bed-way et-full-width text-center small ng-binding">Tầng 2</div>
                                <div className="et-bed-way et-full-width text-center small ng-binding">Tầng 1</div>
                              </div>
                              <div className="et-bed-way et-full-width et-text-sm">
                                <div className="et-col-1-8 text-center ng-binding">Khoang 1</div>
                                <div className="et-col-1-8 text-center ng-binding">Khoang 2</div>
                                <div className="et-col-1-8 text-center ng-binding">Khoang 3</div>
                                <div className="et-col-1-8 text-center ng-binding">Khoang 4</div>
                                <div className="et-col-1-8 text-center ng-binding">Khoang 5</div>
                                <div className="et-col-1-8 text-center ng-binding">Khoang 6</div>
                                <div className="et-col-1-8 text-center ng-binding">Khoang 7</div>
                              </div>
                              {dataSeat1.map((item, index) => {
                                return (
                                  (index + 1) % 3 === 2 &&
                                  <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope"
                                    onClick={() => {
                                      setTicket1({
                                        ...ticket1,
                                        idShow: item + "-" + new Date().toISOString(),
                                        idSeat: item
                                      })
                                      let indexCart = _findIndex(cart, { idSeat: item })
                                      if (indexCart < 0) {
                                        dispatch({ type: 'RELOAD_SEAT1' })
                                      } else {
                                        cart.splice(indexCart, 1)
                                        dispatch({ type: 'RELOAD_CART' })
                                      }
                                    }}
                                  >
                                    <div className="et-bed-left">
                                      <div className="et-bed-outer">
                                        <div className="et-bed tooltiptop text-center et-sit-avaiable" style={{ background: _findIndex(cart, { idSeat: item }) > -1 ? '#a6b727' : '#fff' }}>
                                          <div className="et-sit-no ng-scope">
                                            <span className="ng-binding">{index + 1}</span>
                                          </div>
                                        </div>
                                        <div className="et-bed-illu" />
                                      </div>
                                    </div>
                                  </div>

                                )
                              })
                              }
                              <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope" />
                              {dataSeat1.map((item, index) => {
                                return (
                                  (index + 1) % 3 === 1 &&
                                  <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope"
                                    onClick={() => {
                                      setTicket1({
                                        ...ticket1,
                                        idSeat: item
                                      })
                                      dispatch({ type: 'RELOAD_SEAT1' })
                                    }}
                                  >
                                    <div className="et-bed-left">
                                      <div className="et-bed-outer">
                                        <div className="et-bed tooltiptop text-center et-sit-avaiable" style={{ background: _findIndex(cart, { idSeat: item }) > -1 ? '#a6b727' : '#fff' }}>
                                          <div className="et-sit-no ng-scope">
                                            <span className="ng-binding">{index + 1}</span>
                                          </div>
                                        </div>
                                        <div className="et-bed-illu" />
                                      </div>
                                    </div>
                                  </div>
                                )
                              })
                              }
                              <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope" />
                              {dataSeat1.map((item, index) => {
                                return (
                                  (index + 1) % 3 === 0 &&
                                  <div className="et-col-1-16 et-seat-h-35 ng-isolate-scope"
                                    onClick={() => {
                                      setTicket1({
                                        ...ticket1,
                                        idSeat: item
                                      })
                                      dispatch({ type: 'RELOAD_SEAT1' })
                                    }}
                                  >
                                    <div className="et-bed-left">
                                      <div className="et-bed-outer">
                                        <div className="et-bed tooltiptop text-center et-sit-avaiable" style={{ background: _findIndex(cart, { idSeat: item }) > -1 ? '#a6b727' : '#fff' }}>
                                          <div className="et-sit-no ng-scope">
                                            <span className="ng-binding">{index + 1}</span>
                                          </div>
                                        </div>
                                        <div className="et-bed-illu" />
                                      </div>
                                    </div>
                                  </div>
                                )
                              })
                              }
                            </div>
                          </div>
                        </div>)}
              </div>
            )
          })}

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
            <div style={{ color: '#2573a0', fontWeight: 600, borderBottom: '2px solid #2573a0' }}><i className="fas fa-bars" /> Giỏ vé ({cart.length})</div>
            <div style={{ maxHeight: '700px', overflow: 'auto' }}>
              {cart.map((item, index) => {
                return (
                  <div key={index} className='padding-10 d-fix'>
                    <div className="width95percent">
                      {/* <div style={{ textAlign: 'center' }}>{ticket.idSchedule}</div> */}
                      <div>{'Station: ' + item.stationFrom.name + " - " + item.stationTo.name}</div>
                      <div>{'Date: ' + item.dateStart + " - " + item.timeStart + 'p'}</div>
                      <div>{'Seat: ' + item.idSeat}</div>
                      <div>{item.nameCarriage}</div>
                      <div>{item.price}</div>
                    </div>
                    <div className="align-self-center border-0px"
                      onClick={() => {
                        cart.splice(index, 1)
                        dispatch({ type: 'RELOAD_CART' })
                      }}
                    >
                      <img className="title-quydinh" src="images/del30.png" alt="Delete" />
                    </div>
                  </div>
                )
              })}
            </div>
            <hr />
            <div style={{ backgroundColor: 'red', padding: '10px', width: '60%', margin: 'auto', textAlign: 'center', color: '#ffffff', cursor: 'pointer' }}
              onClick={() => {
                if (cart.length > 0) {
                  history.push('/payment')
                  localStorage.setItem('cart', JSON.stringify(cart))
                } else {
                  message.error('Chưa chọn ghế')
                }
              }}
            >MUA VÉ</div>
          </div>
        </div>
      </div>
    </div >
  )
}
