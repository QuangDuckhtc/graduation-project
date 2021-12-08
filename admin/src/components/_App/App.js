import './App.css';
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header, Login, Schedule, Navigation, Home, Ticket, DetailTicket, Revenue } from './Index';
import { useSelector } from 'react-redux';

export default function App() {
  const [islogin, setIsLogin] = useState(localStorage.getItem('user-id') !== '' ? true : false)
  const display = useSelector(state => state.isActive)

  useEffect(() => {
  }, [])
  return islogin ?
    <Router>
      <div className='d-fix'>
        <div className={display ? 'col-2' : 'class-hide'} style={{ padding: 0, }}>
          <Navigation />
        </div>
        <div className={display ? 'col-10' : 'col-12'} style={{ padding: 0, }}>
          <div className="menu-bodername">
            <Header />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/schedule' component={Schedule} />
              <Route path='/ticket' component={Ticket} />
              <Route path='/detail-ticket' component={DetailTicket} />
              <Route path='/revenue' component={Revenue} />
            </Switch>
          </div>
        </div>
      </div>
    </Router> : <Login />

}
