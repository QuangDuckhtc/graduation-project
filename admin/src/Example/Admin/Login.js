import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            username: '',
            password: ''
        }
    }

    onChangeAWay = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    onClickLogin() {
        axios.post('http://localhost:9999/Login',
            {
                userName: this.state.username,
                passwordUser: this.state.password
            })
            .then(res => {
                if (res.data.status === "true") {
                    this.setState({
                        login: 'true'
                    });
                } else {
                    this.setState({
                        login: 'false'
                    });
                }
            })
    }
    render() {
        if (this.state.login === 'true') {
            return (<Redirect to="/admin" />)
        }
        return (
            <div className="container">
                <div className="cover-login">
                    <div className="img-logo-circle">
                        <img src="images/Logo.png" className="img-login" alt="Hinh" />
                    </div>
                    <div className="cover-input-login">
                        <input className="form-control input-form-control" type="text" name="username" placeholder="Username" maxLength="50" onChange={this.onChangeAWay} />
                        <input className="form-control input-form-control" type="password" name="password" placeholder="Password" maxLength="50" onChange={this.onChangeAWay} />
                        <button className="form-control mt-5 btn-login-admin" id="login" onClick={() => this.onClickLogin()}>ĐĂNG NHẬP</button>
                        <div className={this.state.login === 'false' ? 'text-error mt-3' : 'class-hide'}>* Sai thông tin đăng nhập</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Detail;
