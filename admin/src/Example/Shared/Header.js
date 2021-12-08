
function Header() {
    return (
      <div className="style-header">
              <div className="container">
                  <nav className="navbar navbar-expand-sm navbar-dark">
                      <div className="width280">
                          <a className="navbar-brand" href="/" ><img className="width130" alt="logo" src="images/Logo.png" /></a>
                      </div>
                      <div className="width100persent">
                          <ul className="navbar-nav ul-cover-nav" >
                              <li className="nav-item">
                                  <a className="nav-link" href="/">TRANG CHỦ</a>
                              </li>
                              <li className="nav-item">
                                  <a className="nav-link" href="/quy-dinh">CÁC QUY ĐỊNH</a>
                              </li> 
                              <li className="nav-item">
                                  <a className="nav-link" href="/thong-tin-lich-trinh">THÔNG TIN LỊCH TRÌNH</a>
                              </li>
                              <li className="nav-item">
                                  <a className="nav-link" href="/quan-ly-dat-cho">QUẢN LÝ ĐẶT CHỖ</a>
                              </li>
                              <li className="nav-item">
                                  <a className="nav-link" href="/cam-nang">CẨN NANG ĐI TÀU</a>
                              </li>
                          </ul>
                      </div>
                  </nav>
              </div>
          </div>
    );
  }
  
  export default Header;
  