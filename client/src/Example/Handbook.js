import Header from './Shared/Header';
import Footer from './Shared/Footer';
import Banner from './Shared/Banner';

function Handbook() {
  return (
    <div>
      <Header />
      <Banner />
      <div>
        <div className="txt-muave">CẨM NANG ĐI TÀU</div>
        <div className="container cover-dich-vu">
          <div className="width50percent">
            <img src="images/van-chuyen-hang-bang-tau-hoa.jpg" className="width100persent" alt="img" />
          </div>
          <div className="width50percent">
            <div className="padding-left-right-30">
              <div className="title-dich-vu">Thông tin về dịch vụ gửi hàng bằng tàu hỏa</div>
              <p>Kinh tế đất nước ta ngày càng phát triển, kéo theo đó cơ sở hạ tầng cũng được cải thiện và được nhà nước chú trọng đầu tư. Hiện nay, ta có thể thấy, suốt dọc chiều dài đất nước, có những con đường cao tốc nối liền các tỉnh, thành
                phố; những dải đường sắt đi dọc khắp từ Bắc vào Nam. Điều này tạo điều kiện thuận lợi cho ngành vận chuyển ngày càng phát triển, hàng hóa không ngừng được giao thương. Trong đó dịch vụ vận chuyển hàng hóa bằng tàu hỏa là được
                yêu thích nhất. Bởi sự tiện lợi, nhanh chóng, an toàn và nhất là giá cả vô cùng hợp lý. Công ty vận tải Bắc Nam luôn luôn nỗ lực không ngừng, cung cấp dịch vụ tốt nhất để đưa hàng hóa đến với khách hàng một cách nhanh chóng
                và an toàn nhất. Khi kinh doanh dịch vụ, một trong những vấn đề mà khách hàng quan tâm nhất chính là giá vận chuyển hàng hóa bằng tàu hỏa. Với nhiều năm kinh nghiệm trong lĩnh vực này <a href="#">Xem thêm...</a></p>
            </div>
          </div>
        </div>
        <div className="container cover-dich-vu">
          <div className="width50percent">
            <div className="padding-left-right-30">
              <div className="title-dich-vu">GIỜ TÀU CHẠY TRÊN TUYẾN THỐNG NHẤT TỪ NGÀY 6/9/2017</div>
              <p>Tổng công ty ĐSVN thông tin tới quý khách hàng bảng giờ tàu trên tuyến ĐS Thống Nhất kể từ ngày 6/9/2017. <a href="#">Xem thêm...</a></p>
            </div>
          </div>
          <div className="width50percent">
            <img src="images/gio-tau-hoa.jpg" className="width100persent" alt="img" />
          </div>
        </div>
      </div>
      <div className="container cover-dich-vu">
        <div className="width50percent">
          <img src="images/gia-mao.jpg" className="width100persent" alt="img" />
        </div>
        <div className="width50percent">
          <div className="padding-left-right-30">
            <div className="title-dich-vu">KHUYẾN CÁO KHÁCH HÀNG CHÚ Ý KHI MUA VÉ TRỰC TUYẾN</div>
            <p>Hiện nay, trên mạng đã xuất hiện một số trang website bán vé tàu hỏa với giá đắt gấp nhiều lần so với giá vé của ngành ĐS. Các trang này có tên miền gần giống với website của ngành ĐS nên một số hành khách đặc biệt là khách nước ngoài đã hiểu nhầm và mua vé với giá rất cao. <a href="#">Xem thêm...</a></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Handbook;
