import Header from './Shared/Header';
import Footer from './Shared/Footer';
import Banner from './Shared/Banner';
import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import * as moment from 'moment';
import axios from 'axios';


class Booking extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stationstart: {
				maga: '',
				tenga: ''
			},
			stationend: {
				maga: '',
				tenga: ''
			},
			dateto: '',
			station: '',
			thestation: [],
			choosevalue: 'stationstart',
			stationrun: [
				// {
				//   toa: 'SE1',
				//   ngay: '1 ngày 9 giờ 54 phút',
				//   start: 'Sài Gòn',
				//   timestart: '(03/12/2020 06:00)',
				//   end: 'Hà Nội',
				//   timeend: '(04/12/2020 15: 54)'
				// },
				// {
				//   toa: 'SE2',
				//   ngay: '1 ngày 10 giờ 32 phút',
				//   start: 'Sài Gòn',
				//   timestart: '(03/12/2020 08:40)',
				//   end: 'Hà Nội',
				//   timeend: '(04/12/2020 17: 12)'
				// },
				// {
				//   toa: 'SE4',
				//   ngay: '1 ngày 7 giờ 35 phút',
				//   start: 'Sài Gòn',
				//   timestart: '(03/12/2020 21:55)',
				//   end: 'Hà Nội',
				//   timeend: '(04/12/2020 05: 30)'
				// }
			]
			, searchnull: 'false'
		}
	}

	componentDidMount() {
		axios({
			method: 'GET',
			url: 'http://localhost:9999/ListTheStation',
			data: null
		}).then(res => {
			this.setState({
				thestation: res.data
			})
		}).catch(err => {
			console.log(err);
		});
	}

	onChange = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.value;
		this.setState({
			[name]: value
		});
	}

	handleChange = date => {
		var sdate = date[0];
		const yourDate = new Date(sdate)
		var cdate = new Intl.DateTimeFormat('vn', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(yourDate);
		this.setState({
			dateto: cdate,
			choosevalue: 'station'
		})
		this.setState({
			searchnull: 'false'
		});
		axios.post('http://localhost:9999/SrearchTheStation', { dateTo: cdate })
			.then(res => {

				if (res.data.length > 0) {
					this.setState({
						stationrun: res.data
					});
				} else {
					this.setState({
						searchnull: 'true'
					});
				}
				console.log(res.data.length);
			})
	}


	onClickStation = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.value;
		var ma = target.id;
		this.setState({
			[name]: {
				maGa: ma,
				tenga: value
			}
		});
		if (name === 'stationstart') {
			this.setState({
				choosevalue: 'stationend'
			});
		} else if (name === 'stationend') {
			this.setState({
				choosevalue: 'dateto'
			});
		} else if (name === 'dateto') {
			this.setState({
				choosevalue: 'station'
			});
		} else if (name = 'station') {
			this.setState({
				choosevalue: 'lststation'
			});
		}
	}

	onClickInforStation = (text) => {
		console.log(text);
		this.setState({
			choosevalue: 'lststation'
		});
	}

	render() {

		var elmstationstatrt = this.state.thestation.map((xvalue, index) => {
			return (<input key={index} className="class-btn-station" name="stationstart" id={xvalue.maGa} value={xvalue.tenGa} onClick={this.onClickStation} readOnly />)
		});
		var elmstationend = this.state.thestation.map((xvalue, index) => {
			return (<input key={index} className="class-btn-station" name="stationend" id={xvalue.maGa} value={xvalue.tenGa} onClick={this.onClickStation} readOnly />)
		});

		var rstation = this.state.stationrun.map((value, index) => {
			return (
				<div key={index} className="class-train-booking" onClick={this.onClickInforStation}>
					<div className="font-size20"><i className="fas fa-train"></i> {value.tenTau}</div>
					<div className="class-time-train-booking">{value.ngayKhoiHanh}</div>
					<div>Ga đi: {this.state.stationstart.tenga}</div>
					<div> {this.state.stationend.tenga}</div>
					<div>Ga đến: {this.state.stationend.tenga}</div>
					<div>{value.timeend}</div>
				</div>
			)
		});
		return (
			<div>
				<Header />
				<Banner />
				<div>
					<div className="container backgroud-white">
						<div className="title-h1">THÔNG TIN HÀNH TRÌNH</div>
						<div className="padding-20-50">
							<div className="d-fix form-group">
								<div className="label-form">Ga đi</div>
								<input className="form-control" type="text" placeholder="Vui lòng chọn ga đi bên dưới" name="stationstart" value={this.state.stationstart.tenga} onChange={this.onChange} disabled />
							</div>
							<div className="d-fix form-group">
								<div className="label-form">Ga đến</div>
								<input className="form-control" type="text" placeholder="Vui lòng chọn ga đến bên dưới" name="stationend" value={this.state.stationend.tenga} onChange={this.onChange} disabled />
							</div>
							<div className="d-fix form-group">
								<div className="label-form">Ngày đi</div>
								<input className="form-control" type="text" placeholder="Chọn ngày bên dưới" name="dateto" value={this.state.dateto} onChange={this.onChange} disabled />
							</div>
							<div className="d-fix form-group">
								<div className="label-form">Tàu</div>
								<input className="form-control" type="text" placeholder="Vui lòng chọn tàu đi" name="station" value={this.state.station} onChange={this.onChange} disabled />
							</div>
						</div>
					</div>
					<div className="container padding-20-50 display-flow-root">
						<div className={this.state.choosevalue === 'stationstart' ? '' : 'class-hide'}>
							{elmstationstatrt}
						</div>
						<div className={this.state.choosevalue === 'stationend' ? '' : 'class-hide'}>
							{elmstationend}
						</div>
						<div className={this.state.choosevalue === 'dateto' ? '' : 'class-hide'} >
							<div className="date-time-booking auto-w90">
								<DatePicker
									onChange={this.handleChange}
									selectsRange
									inline
									name="dateto"
								/>
							</div>
						</div>
						<div className={this.state.choosevalue === 'station' ? '' : 'class-hide'}>
							{rstation}
						</div>
						<div className={this.state.searchnull === 'true' ? '' : 'class-hide'}>
							<div className='txt-null-return '>Không có ga từ {this.state.stationstart.tenga} đến ga {this.state.stationend.tenga} trong ngày {this.state.dateto}</div>
						</div>
						<div className={this.state.choosevalue === 'lststation' ? '' : 'class-hide'}>
							<div className="class-train-booking">
								<div className="title-es-booking">
									<i className="fas fa-train"></i> Tàu ES8
								</div>
								<div className="d-fix">
									<div className="w40percent-right">
										<div>Ga đi: {this.state.stationstart.tenga}</div>
										<div>Ngày đi: {this.state.dateto}</div>
									</div>
									<div className="width20percent text-center">
										<i className="fas fa-arrow-right font-size60"></i>
									</div>
									<div className="w40percent-left">
										<div>Ga đế: {this.state.stationend.tenga}</div>
										<div>Ngày đi: {this.state.dateto}</div>
									</div>
								</div>
								<div className="time-end-es-booking">Thời gian hàng trình: 1 ngày 9 giờ 54 phút</div>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default Booking;
