import DatePicker from "react-datepicker";
import React, { useState } from 'react';
import { Banner } from '../_App/Index'
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Carousel, Image } from 'react-bootstrap'
import { useEffect } from "react";
import { axios } from '../../config/constant'

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [more, setMore] = useState(false);
  const [lockDate, setLockDate] = useState(true);
  const [dataStation, setDataStation] = useState([])
  const [dataSchedule, setDataSchedule] = useState({
    stationFrom: '',
    stationTo: '',
    startDate: '',
    returnDate: '',
    status: '1',
  })
  async function getDataStation() {
    await axios.get('/station'
    ).then(function (res) {
      setDataStation(res.data.data);
    }).catch(function (error) {
      console.log(error)
    })
  }
  async function getDataSchedule(arrData) {
    await axios.post('/schedule', { arrData: arrData }
    ).then(async function (res) {
      if (res.data.status === 'success') {
        console.log("data:" + res.data.schedule)
        // message.success('co lich');
        dispatch({
          type: "VALUE_SEARCH", valueSearch: {
            stationFrom: arrData.length === 2 ? res.data.stationTo : res.data.stationFrom,
            stationTo: arrData.length === 2 ? res.data.stationFrom : res.data.stationTo,
            startDate: arrData[0].date,
            returnDate: arrData.length === 2 ? arrData[1].date : ""
          }
        })
        // dispatch({ type: "DATA_SCHEDULE", dataSchedule: res.data.schedule })
        dispatch({ type: "DATA_SCHEDULE", dataSchedule: arrData })
        history.push('/detail-schedule')
      } else {
        message.error(res.data.message)
      }
    }).catch(function (error) {
      console.log(error)
    })
  }

  function searchSchedule() {
    var arrData = []
    if (dataSchedule.stationFrom === '' || dataSchedule.stationTo === '' || dataSchedule.status === '' || dataSchedule.startDate === '') {
      message.error('Chưa chọn đủ thông tin')
    } else {
      if (dataSchedule.status === '1') {
        if (new Date(dataSchedule.startDate) < new Date()) {
          message.error('Ngày đi không hợp lệ')
        } else {
          var data = {
            stationFrom: dataSchedule.stationFrom,
            stationTo: dataSchedule.stationTo,
            date: dataSchedule.startDate,
          }
          arrData.push(data);
          getDataSchedule(arrData)
        }
      } else {
        if (dataSchedule.returnDate === '') {
          message.error('Chưa chọn ngày về')
        } else {
          if (new Date(dataSchedule.returnDate) <= new Date(dataSchedule.startDate)) {
            message.error("Ngày về không hợp lệ");

          } else {
            var data1 = {
              stationFrom: dataSchedule.stationFrom,
              stationTo: dataSchedule.stationTo,
              date: dataSchedule.startDate,
            }
            var data2 = {
              stationFrom: dataSchedule.stationTo,
              stationTo: dataSchedule.stationFrom,
              date: dataSchedule.returnDate,
            }
            arrData.push(data1);
            arrData.push(data2);
            getDataSchedule(arrData)
          }
        }
      }
    }
  }
  useEffect(() => {
    getDataStation()
  }, [])
  return (
    <div>
      <Banner />
      <div className="backgroud-search-banner">
        <div className="cover-contain-search-banner">
          <div className="cover-pannel-search">
            <div className="txt-caption-search">VÉ TÀU</div>
            <div className="color-white">Hotline: 099999999</div>
          </div>
          <div className="form-group align-self-center with15percent">
            <select className="form-control select-style-sarch width95percent"
              defaultValue=""
              onChange={(e) => {
                setDataSchedule({
                  ...dataSchedule,
                  stationFrom: e.target.value
                })
              }}
            >
              <option value="" disabled>Ga đi</option>
              {dataStation.map((item, index) => {
                return (
                  <option key={index} value={item._id}>{(index + 1) + item.name}</option>
                )
              })}
            </select>
          </div>
          <div className="form-group align-self-center with15percent">
            <select
              defaultValue=""
              className="form-control select-style-sarch width95percent"
              onChange={(e) => {
                setDataSchedule({
                  ...dataSchedule,
                  stationTo: e.target.value
                })
              }}
            >
              <option value="" disabled >Ga đến</option>
              {dataStation.map((item, index) => {
                return (
                  <option key={index} value={item._id}>{(index + 1) + item.name}</option>
                )
              })}
            </select>
          </div>
          <div className="form-group align-self-center with15percent">
            <select className="form-control select-style-sarch width95percent"
              onChange={(e) => {
                setLockDate(e.target.value === '1' ? true : false)
                setDataSchedule({
                  ...dataSchedule,
                  status: e.target.value
                })
              }}
            >
              <option value='1'>Vé 1 chiều</option>
              <option value='2'>Vé khứ hồi</option>
            </select>
          </div>
          <div className="form-group align-self-center with15percent" >
            <DatePicker className="form-control select-style-sarch"
              placeholderText="Ngày đi"
              onChange={(date) => {
                var dateFormat = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(date)
                setDataSchedule({
                  ...dataSchedule,
                  startDate: dateFormat
                })
              }}
              value={dataSchedule.startDate}

            />
          </div>
          <div className="form-group align-self-center with15percent" style={{ marginRight: '10px', marginLeft: '10px' }} >
            <div className=''>
              <DatePicker className="form-control select-style-sarch"
                // onChange={this.handleChangedateT}
                placeholderText="Ngày về"
                value={dataSchedule.returnDate}
                disabled={lockDate}
                onChange={(date) => {
                  var dateFormat = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(date)
                  setDataSchedule({
                    ...dataSchedule,
                    returnDate: dateFormat
                  })
                }}
              />
            </div>
          </div>
          <div className="form-group align-self-center with15percent">
            <button
              id="search"
              className="form-control btn btn-submit btn-search-style"
              onClick={() => {
                searchSchedule()
              }}
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>
      <div className="container" style={{ textAlign: 'center', padding: '20px 0px' }}>
        <div style={{ color: '#000', fontSize: '28px', margin: '25px 0px 10px 0px' }}>MUA VÉ TẠI CÔNG TY VÉ TÀU TRỰC TUYẾN
        </div>
        <Image src="images/icon-accmod.png" />
        <p style={{ fontSize: '14px', width: '75%', margin: 'auto' }}>Công ty vé tàu trực tuyến là nơi cung cấp các loại
          phương tiện di chuyển hàng đầu trong đó có đường sắt Việt Nam. Tàu lửa hiện nay vẫn là phương tiện giá
          rẻ nhất và an toàn nhất được sự tin dùng của nhiều hành khách. Với sự cải tiến ngày càng
          tiện dụng, đường sắt Việt nam luôn tồn tại và vững mạnh trong suốt nhiều năm qua.</p>
        <Image src="images/TauSapalyExpress.png" style={{ width: '100%' }} />
        <div style={{ margin: '20px' }}>
          <div style={{ display: 'flex', textAlign: 'left' }}>
            <div style={{ width: '33.33%', margin: '10px', display: 'flex' }}>
              <i className="fas fa-check" style={{ color: '#fbab19', margin: '3px 10px', fontSize: '18px' }} />
              <div>
                Chúng tôi đảm bảo với khách hàng sẽ đặt được dịch vụ giá tốt nhất , những chương trình
                khuyến mại hấp dẫn nhất
              </div>
            </div>
            <div style={{ width: '33.33%', margin: '10px', display: 'flex' }}>
              <i className="fas fa-check" style={{ color: '#fbab19', margin: '3px 10px', fontSize: '18px' }} />
              <div>
                Đặt lợi ích khách hàng lên trên hết, chúng tôi hỗ trợ khách hàng nhanh và chính xác nhất với
                dịch vụ tin cậy, giá trị đích thực
              </div>
            </div>
            <div style={{ width: '33.33%', margin: '10px', display: 'flex' }}>
              <i className="fas fa-check" style={{ color: '#fbab19', margin: '3px 10px', fontSize: '18px' }} />
              <div>
                Chúng tôi liên kết chặt chẽ với các đối tác, khảo sát định kỳ để đảm bảo chất lượng tốt nhất
                của dịch vụ
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', textAlign: 'left' }}>
            <div style={{ width: '33.33%', margin: '10px', display: 'flex' }}>
              <i className="fas fa-check" style={{ color: '#fbab19', margin: '3px 10px', fontSize: '18px' }} />
              <div>
                Chúng tôi đảm bảo với khách hàng sẽ đặt được dịch vụ giá tốt nhất , những chương trình
                khuyến mại hấp dẫn nhất
              </div>
            </div>
            <div style={{ width: '33.33%', margin: '10px', display: 'flex' }}>
              <i className="fas fa-check" style={{ color: '#fbab19', margin: '3px 10px', fontSize: '18px' }} />
              <div>
                Đặt lợi ích khách hàng lên trên hết, chúng tôi hỗ trợ khách hàng nhanh và chính xác nhất với
                dịch vụ tin cậy, giá trị đích thực
              </div>
            </div>
            <div style={{ width: '33.33%', margin: '10px', display: 'flex' }}>
              <i className="fas fa-check" style={{ color: '#fbab19', margin: '3px 10px', fontSize: '18px' }} />
              <div>
                Chúng tôi liên kết chặt chẽ với các đối tác, khảo sát định kỳ để đảm bảo chất lượng tốt nhất
                của dịch vụ
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div style={{ backgroundColor: '#ffffff' }}>
          <div className="container" style={{ padding: '40px 0px', display: 'flex' }}>
            <div style={{ width: '50%' }}>
              <Image src="images/van-chuyen-hang-bang-tau-hoa.jpg" style={{ width: '100%' }} />
            </div>
            <div style={{ width: '50%' }}>
              <div style={{ padding: '0px 30px' }}>
                <div style={{ fontSize: '28px', color: '#4a4a4a', textAlign: 'right', textTransform: 'uppercase' }}>Thông
                  tin về dịch vụ gửi hàng bằng tàu hỏa </div>
                <span className={more ? '' : 'description'}>Kinh tế đất nước ta ngày càng phát triển, kéo theo đó cơ sở hạ tầng cũng được cải thiện và
                  được nhà nước chú trọng đầu tư. Hiện nay, ta có thể thấy, suốt dọc chiều dài đất nước, có
                  những con đường cao tốc nối liền các tỉnh, thành
                  phố; những dải đường sắt đi dọc khắp từ Bắc vào Nam. Điều này tạo điều kiện thuận lợi cho
                  ngành vận chuyển ngày càng phát triển, hàng hóa không ngừng được giao thương. Trong đó dịch
                  vụ vận chuyển hàng hóa bằng tàu hỏa là được
                  yêu thích nhất. Bởi sự tiện lợi, nhanh chóng, an toàn và nhất là giá cả vô cùng hợp lý. Công
                  ty vận tải Bắc Nam luôn luôn nỗ lực không ngừng, cung cấp dịch vụ tốt nhất để đưa hàng hóa
                  đến với khách hàng một cách nhanh chóng
                  và an toàn nhất. Khi kinh doanh dịch vụ, một trong những vấn đề mà khách hàng quan tâm nhất
                  chính là giá vận chuyển hàng hóa bằng tàu hỏa.
                </span>
                <span className='more' onClick={() => { setMore(more ? false : true) }}>{!more ? 'Xem thêm...' : 'Ẩn'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Carousel className='container' controls={false}>
        <Carousel.Item>
          <div className='row'>
            <div className="item col-6">
              <div style={{ backgroundColor: '#ffffff' }}>
                <Image src="images/Giuong.jpg" alt="image" style={{ width: '100%', height: '300px' }} />
                <div>
                  <div style={{ color: '#ae8545', fontSize: '18px', marginBottom: '10px', marginTop: '5px', textTransform: 'uppercase', fontWeight: 'bold', textAlign: 'center' }}>
                    Hệ thống giường nằm</div>
                  <div style={{ display: 'flex', margin: 'auto', width: '90%', textAlign: 'center' }}>
                    <div style={{ margin: 'auto' }}>
                      <Image src="images/decimal.png" style={{ width: '40px', margin: 'auto' }} />
                      <div>3m2</div>
                    </div>
                    <div style={{ margin: 'auto' }}>
                      <Image src="images/giuong.png" style={{ width: '40px', margin: 'auto' }} />
                      <div>4 giường ngủ</div>
                    </div>
                    <div style={{ margin: 'auto' }}>
                      <Image src="images/dooe.png" style={{ width: '40px', margin: 'auto' }} />
                      <div>View cửa sổ</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item col-6">
              <div style={{ backgroundColor: '#ffffff' }}>
                <Image src="images/ghemem.jpg" alt="image" style={{ width: '100%', height: '300px' }} />
                <div>
                  <div style={{ color: '#ae8545', fontSize: '18px', marginBottom: '10px', marginTop: '5px', textTransform: 'uppercase', fontWeight: 'bold', textAlign: 'center' }}>
                    toa tàu ghế mêm</div>
                  <div style={{ display: 'flex', margin: 'auto', width: '90%', textAlign: 'center' }}>
                    <div style={{ margin: 'auto' }}>
                      <Image src="images/decimal.png" style={{ width: '40px', margin: 'auto' }} />
                      <div>3m2</div>
                    </div>
                    <div style={{ margin: 'auto' }}>
                      <Image src="images/giuong.png" style={{ width: '40px', margin: 'auto' }} />
                      <div>2 ghế ngồi</div>
                    </div>
                    <div style={{ margin: 'auto' }}>
                      <Image src="images/dooe.png" style={{ width: '40px', margin: 'auto' }} />
                      <div>View cửa sổ</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className='row'>
            <div className="item col-6">
              <div style={{ backgroundColor: '#ffffff' }}>
                <Image src="images/Giuong.jpg" alt="image" style={{ width: '100%', height: '300px' }} />
                <div>
                  <div style={{ color: '#ae8545', fontSize: '18px', marginBottom: '10px', marginTop: '5px', textTransform: 'uppercase', fontWeight: 'bold', textAlign: 'center' }}>
                    Toa tàu giường nằm</div>
                  <div style={{ display: 'flex', margin: 'auto', width: '90%', textAlign: 'center' }}>
                    <div style={{ margin: 'auto' }}>
                      <Image src="images/decimal.png" style={{ width: '40px', margin: 'auto' }} />
                      <div>3m2</div>
                    </div>
                    <div style={{ margin: 'auto' }}>
                      <Image src="images/giuong.png" style={{ width: '40px', margin: 'auto' }} />
                      <div>4 giường ngủ</div>
                    </div>
                    <div style={{ margin: 'auto' }}>
                      <Image src="images/dooe.png" style={{ width: '40px', margin: 'auto' }} />
                      <div>View cửa sổ</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item col-6">
              <div style={{ backgroundColor: '#ffffff' }}>
                <Image src="images/ghecung.jpg" alt="image" style={{ width: '100%', height: '300px' }} />
                <div>
                  <div style={{ color: '#ae8545', fontSize: '18px', marginBottom: '10px', marginTop: '5px', textTransform: 'uppercase', fontWeight: 'bold', textAlign: 'center' }}>
                    toa tầu ghế cứng</div>
                  <div style={{ display: 'flex', margin: 'auto', width: '90%', textAlign: 'center' }}>
                    <div style={{ margin: 'auto' }}>
                      <Image src="images/decimal.png" style={{ width: '40px', margin: 'auto' }} />
                      <div>3m2</div>
                    </div>
                    <div style={{ margin: 'auto' }}>
                      <Image src="images/giuong.png" style={{ width: '40px', margin: 'auto' }} />
                      <div>1 ghế ngồi</div>
                    </div>
                    <div style={{ margin: 'auto' }}>
                      <Image src="images/dooe.png" style={{ width: '40px', margin: 'auto' }} />
                      <div>View cửa sổ</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>


    </div >
  )
}

export default Home
