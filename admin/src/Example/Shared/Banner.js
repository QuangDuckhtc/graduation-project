import Carousel from 'react-bootstrap/Carousel'
import DatePicker from "react-datepicker";
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stationstart: '',
            stationend: '',
            typesticket: '',
            datafrom: [],
            dateto: false,
            thestation: [],
            oneway: 'true',
            sdateFrom: '',
            sdateTo: '',
            sAway: '',
            isSearch: 'false'
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
    // const history = useHistory();

    onChangeStart = (event) => {
        var target = event.target;
        var value = target.value;
        this.setState({
            stationstart: value
        });

    }

    onChangeEnd = (event) => {
        var target = event.target;
        var value = target.value;
        this.setState({
            stationend: value
        });

    }

    onChangeAWay = (event) => {
        var target = event.target;
        var value = target.value;
        var isaway = 'true';
        if (value === '2') {
            isaway = 'false'
        }
        this.setState({
            oneway: isaway,
            sAway: value
        });
    }

    handleChangedateF = date => {
        const yourDate = new Date(date)
        var cdate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(yourDate);
        this.setState({
            sdateFrom: cdate
        });
    }

    handleChangedateT = date => {
        const yourDate = new Date(date)
        var cdate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(yourDate);
        this.setState({
            sdateTo: cdate
        });
    }

    onClickSearch() {
        if (this.state.stationstart === 0 || this.state.stationstart === '') {
            alert("Vui lòng chọn ga đi.")
            return;
        }
        if (this.state.stationend === 0 || this.state.stationend === '') {
            alert("Vui lòng chọn ga đến.")
            return;
        }
        if (this.state.stationstart === this.state.stationend) {
            alert("Nơi đi không được trùng với nơi đến.")
            return;
        }
        if (this.state.sdateFrom === '') {
            alert("Vui lòng chọn ngày đi.")
            return;
        }
        axios.post('http://localhost:9999/SetValueSearch',
            {
                gaForm: this.state.stationstart,
                gaTo: this.state.stationend,
                dateFrom: this.state.sdateFrom,
                dateTo: this.state.sdateTo,
                away: this.state.sAway === '' ? "1" : this.state.sAway
            })
            .then(res => {
                this.setState({
                    isSearch: 'true'
                });
            })
    }

    render() {
        if (this.state.isSearch === 'true') {
            return (<Redirect to="/chi-tiet" />)
        }
        var elmstationstatrt = this.state.thestation.map((xvalue, index) => {
            return (<option key={index} value={xvalue.maGa} >{xvalue.tenGa}</option>)
        });
        return (
            <div>
                <Carousel>
                    <Carousel.Item interval={1000}>
                        <img
                            className="d-block w-100"
                            src="images/toalanha.png"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={500}>
                        <img
                            className="d-block w-100"
                            src="images/TauQua2020.png"
                            alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="images/DuLichBangTauHoa.png"
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
                <div className="backgroud-search-banner">
                    <div className="cover-contain-search-banner">
                        <div className="cover-pannel-search">
                            <div className="txt-caption-search">VÉ TÀU</div>
                            <div className="color-white">Hotline: 099999999</div>
                        </div>
                        <div className="form-group align-self-center with15percent">
                            <select className="form-control select-style-sarch width95percent" onChange={this.onChangeStart} value={this.state.stationstart}>
                                <option value="0">Ga đi</option>
                                {elmstationstatrt}
                            </select>
                        </div>
                        <div className="form-group align-self-center with15percent" onChange={this.onChangeEnd} value={this.state.stationend}>
                            <select className="form-control select-style-sarch width95percent">
                                <option value="0">Ga đến</option>
                                {elmstationstatrt}
                            </select>
                        </div>
                        <div className="form-group align-self-center with15percent">
                            <select className="form-control select-style-sarch width95percent" onChange={this.onChangeAWay} >
                                {/* <option value='0'>Loại vé</option> */}
                                <option value='1'>Vé 1 chiều</option>
                                <option value='2'>Vé khứ hồi</option>
                            </select>
                        </div>
                        <div className="form-group align-self-center with15percent">
                            <DatePicker className="form-control select-style-sarch"
                                placeholderText="Ngày đi"
                                // onChange={this.handleChangedateF}
                                value={this.state.sdateFrom}
                            />
                        </div>
                        <div className="form-group align-self-center with15percent" >
                            <div className={this.state.oneway === 'true' ? '' : 'class-hide'}>
                                <DatePicker className="form-control select-style-sarch" disabled
                                    placeholderText="Ngày về"
                                />
                            </div>
                            <div className={this.state.oneway === 'true' ? 'class-hide' : ''}>
                                <DatePicker className="form-control select-style-sarch"
                                    onChange={this.handleChangedateT}
                                    placeholderText="Ngày về"
                                    value={this.state.sdateFrom} value={this.state.sdateTo}
                                />
                            </div>
                        </div>
                        <div className="form-group align-self-center with15percent">
                            <button id="search" className="form-control btn btn-submit btn-search-style" onClick={() => this.onClickSearch()}>Tìm kiếm</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Banner;
