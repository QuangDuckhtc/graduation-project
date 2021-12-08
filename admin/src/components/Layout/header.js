import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Header() {
  const dispatch = useDispatch();
  const display = useSelector(state => state.isActive)
  const [logout, setLogout] = useState(false)
  return (
    <div className="name-backgr">
      <i className="fas fa-bars icon-menu-sty" style={{ float: 'left', display: display ? "none" : "" }}
        onClick={() => { dispatch({ type: "SHOW_NAV" }) }}
      ></i>
      <div className="header-title">Trang chủ</div>
      <div className="icon-profile" onClick={() => {
        setLogout(logout ? false : true)
      }}>
        <i className="fas fa-user-circle icon-user"></i>
        <div className="none-select-text">{localStorage.getItem('name')}</div>
      </div>
      <div className={logout ? 'sub-menu-user' : 'sub-menu-user class-hide'}>
        <div className="text-menu" onClick={() => {
          window.location.pathname = '/'
          localStorage.setItem('user-id', '')
        }} >
          Thoát
        </div>
      </div>
    </div>
  )
}
