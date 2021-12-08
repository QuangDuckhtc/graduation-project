import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Homes from './Home';
import Bookings from './Bookinng';
import Handbooks from './Handbook';
import Introduces from './Introduce';
import UpdateBookings from './UpdateBooking';
import Details from './Detail';
import Login from './Admin/Login';
import Admin from './Admin/Admin';
import Revenue from './Admin/RevenueStatistics';
import Schedule from './Admin/ScheduleManagement';
import Ticket from './Admin/Tickets';
import Paymenth from './paymenth';

function Layout() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route exact path='/' component={Homes} />
          <Route path='/thong-tin-lich-trinh' component={Bookings} />
          <Route path='/cam-nang' component={Handbooks} />
          <Route path='/quy-dinh' component={Introduces} />
          <Route path='/quan-ly-dat-cho' component={UpdateBookings} />
          <Route path='/chi-tiet' component={Details} />
          <Route path='/dang-nhap' component={Login} />
          <Route path='/admin' component={Admin} />
          <Route path='/quan-ly-lich-trinh' component={Schedule} />
          <Route path='/thong-ke-doanh-thu' component={Revenue} />
          <Route path='/thong-tin-dat-ve' component={Ticket} />
          <Route path='/thanh-toan' component={Paymenth} />
        </div>
      </Router>
    </div>
  );
}

export default Layout;
