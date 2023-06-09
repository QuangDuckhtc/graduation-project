import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className="style-header">
      <div className="container">
        <nav className="navbar navbar-expand-sm navbar-dark">
          <div className="width280">
            <Link to='/' className="navbar-brand"><img className="width130" alt="logo" src="images/Logo.png" /></Link>
          </div>
          <div className="width100persent">
            <ul className="navbar-nav ul-cover-nav" >
              <li className="nav-item">
                <Link to='/' className="nav-link" >TRANG CHỦ</Link>
              </li>
              <li className="nav-item">
                <Link to='/regulation' className="nav-link" >CÁC QUY ĐỊNH</Link>
              </li>
              <li className="nav-item">
                <Link to='/schedule' className="nav-link" >THÔNG TIN LỊCH TRÌNH</Link>
              </li>
              <li className="nav-item">
                <Link to='/order' className="nav-link" >QUẢN LÝ ĐẶT CHỖ</Link>
              </li>
              <li className="nav-item">
                <Link to='/handbook' className="nav-link" >CẨM NANG ĐI TÀU</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}
