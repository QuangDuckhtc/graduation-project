import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Menuview from './menu'
import UserView from './User'

class RevenueView extends Component {
    constructor(props) {
        super(props);
        this.state={
            stageUrrl: 'Quản lý lịch trình',
            nameUser: 'Nguyễn Trung Thái'
        }
    }

    
    render() {
        return (
            <div className="d-fix">
            <Menuview/>
            <div className="menu-bodername">
                <UserView stagUrl ={ this.state.stageUrrl }/>
                <div className="cover-table-rev">
                <div>
                    <div className="scroll-table">
                        <table>
                            <thead>
                                <tr>
                                    <th className="width100persent">
                                        Ga Bán
                                    </th>
                                    <th>01/2020</th>
                                    <th>02/2020</th>
                                    <th>03/2020</th>
                                    <th>04/2020</th>
                                    <th>05/2020</th>
                                    <th>06/2020</th>
                                    <th>07/2020</th>
                                    <th>07/2020</th>
                                    <th>08/2020</th>
                                    <th>10/2020</th>
                                    <th>11/2020</th>
                                    <th>12/2020</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Sài Gòn</th>
                                    <th>100,000</th>
                                    <th>150,000</th>
                                    <th>120,000</th>
                                    <th>130,000</th>
                                    <th>150,000</th>
                                    <th>160,000</th>
                                    <th>170,000</th>
                                    <th>110,000</th>
                                    <th>99,000</th>
                                    <th>120,000</th>
                                    <th>110,000</th>
                                    <th>140,000</th>
                                </tr>
                                <tr>
                                    <th>Dĩ An</th>
                                    <th>100,000</th>
                                    <th>150,000</th>
                                    <th>120,000</th>
                                    <th>130,000</th>
                                    <th>150,000</th>
                                    <th>160,000</th>
                                    <th>170,000</th>
                                    <th>110,000</th>
                                    <th>99,000</th>
                                    <th>120,000</th>
                                    <th>110,000</th>
                                    <th>140,000</th>
                                </tr>
                                <tr>
                                    <th>Biên Hòa</th>
                                    <th>100,000</th>
                                    <th>150,000</th>
                                    <th>120,000</th>
                                    <th>130,000</th>
                                    <th>150,000</th>
                                    <th>160,000</th>
                                    <th>170,000</th>
                                    <th>110,000</th>
                                    <th>99,000</th>
                                    <th>120,000</th>
                                    <th>110,000</th>
                                    <th>140,000</th>
                                </tr>
                                <tr>
                                    <th>Huế</th>
                                    <th>100,000</th>
                                    <th>150,000</th>
                                    <th>120,000</th>
                                    <th>130,000</th>
                                    <th>150,000</th>
                                    <th>160,000</th>
                                    <th>170,000</th>
                                    <th>110,000</th>
                                    <th>99,000</th>
                                    <th>120,000</th>
                                    <th>110,000</th>
                                    <th>140,000</th>
                                </tr>
                                <tr>
                                    <th>Vinh</th>
                                    <th>100,000</th>
                                    <th>150,000</th>
                                    <th>120,000</th>
                                    <th>130,000</th>
                                    <th>150,000</th>
                                    <th>160,000</th>
                                    <th>170,000</th>
                                    <th>110,000</th>
                                    <th>99,000</th>
                                    <th>120,000</th>
                                    <th>110,000</th>
                                    <th>140,000</th>
                                </tr>
                                <tr>
                                    <th>Hà Nội</th>
                                    <th>100,000</th>
                                    <th>150,000</th>
                                    <th>120,000</th>
                                    <th>130,000</th>
                                    <th>150,000</th>
                                    <th>160,000</th>
                                    <th>170,000</th>
                                    <th>110,000</th>
                                    <th>99,000</th>
                                    <th>120,000</th>
                                    <th>110,000</th>
                                    <th>140,000</th>
                                </tr>
                                <tr>
                                    <th>TỔNG</th>
                                    <th>500,000,000</th>
                                    <th>550,000,000</th>
                                    <th>620,000,000</th>
                                    <th>230,000,000</th>
                                    <th>350,000,000</th>
                                    <th>660,000</th>
                                    <th>570,000</th>
                                    <th>710,000</th>
                                    <th>169,000</th>
                                    <th>220,000</th>
                                    <th>610,000</th>
                                    <th>840,000</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>    
            </div>
        </div>

    );
    }
  }
export default RevenueView;
