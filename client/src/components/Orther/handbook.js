import React, { useState } from 'react'
import { Banner } from '../_App/Index'

export default function Handbook() {
  const [more, setMore] = useState(false);
  return (
    <div>
      <Banner />
      <div className="txt-muave" style={{ textAlign: 'center' }}>CẨM NANG ĐI TÀU</div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <img src="images/icon-accmod.png" alt="img" />
      </div>
      <div className="container cover-dich-vu">
        <div className="width50percent">
          <img src="images/van-chuyen-hang-bang-tau-hoa.jpg" className="width100persent" alt="img" />
        </div>
        <div className="width50percent">
          <div className="padding-left-right-30">
            <div className="title-dich-vu">Thông tin về dịch vụ gửi hàng bằng tàu hỏa</div>
            <span className={more ? '' : 'description'}>
              Kinh tế đất nước ta ngày càng phát triển, kéo theo đó cơ sở hạ tầng cũng được cải thiện và được nhà nước chú trọng đầu tư. Hiện nay, ta có thể thấy, suốt dọc chiều dài đất nước, có những con đường cao tốc nối liền các tỉnh, thành
              phố; những dải đường sắt đi dọc khắp từ Bắc vào Nam. Điều này tạo điều kiện thuận lợi cho ngành vận chuyển ngày càng phát triển, hàng hóa không ngừng được giao thương. Trong đó dịch vụ vận chuyển hàng hóa bằng tàu hỏa là được
              yêu thích nhất. Bởi sự tiện lợi, nhanh chóng, an toàn và nhất là giá cả vô cùng hợp lý. Công ty vận tải Bắc Nam luôn luôn nỗ lực không ngừng, cung cấp dịch vụ tốt nhất để đưa hàng hóa đến với khách hàng một cách nhanh chóng
              và an toàn nhất. Khi kinh doanh dịch vụ, một trong những vấn đề mà khách hàng quan tâm nhất chính là giá vận chuyển hàng hóa bằng tàu hỏa.
            </span>

            <span className='more' onClick={() => { setMore(more ? false : true) }}>{!more ? 'Xem thêm...' : 'Ẩn'}</span>
          </div>
        </div>
      </div>
      <div className="container cover-dich-vu">
        <div className="width50percent">
          <div className="padding-left-right-30">
            <div className="title-dich-vu">GIỜ TÀU CHẠY TRÊN TUYẾN THỐNG NHẤT</div>
            <p>Tổng công ty ĐSVN thông tin tới quý khách hàng bảng giờ tàu trên tuyến đường sắt thống nhất và cố định. Thời gian cố định chạy xuyên suốt với lịch trình phù hợp cho mọi người.
            </p>
          </div>
        </div>
        <div className="width50percent">
          <img src="images/gio-tau-hoa.jpg" className="width100persent" alt="img" />
        </div>
      </div>

      <div className="container cover-dich-vu">
        <div className="width50percent">
          <img src="images/gia-mao.jpg" className="width100persent" alt="img" />
        </div>
        <div className="width50percent">
          <div className="padding-left-right-30">
            <div className="title-dich-vu">KHUYẾN CÁO KHÁCH HÀNG CHÚ Ý KHI MUA VÉ TRỰC TUYẾN</div>
            <span className={more ? '' : 'description'}>
              Hiện nay, trên mạng đã xuất hiện một số trang website bán vé tàu hỏa với giá đắt gấp nhiều lần so với giá vé của ngành ĐS. Các trang này có tên miền gần giống với website của ngành ĐS nên một số hành khách đặc biệt là khách nước ngoài đã hiểu nhầm và mua vé với giá rất cao.
              Theo đó, các hãng kính đề nghị hành khách nên mua vé trên website, đại lý, phòng vé chính thức của các hãng và yêu cầu xuất hóa đơn theo quy định,... Đối với khách mua vé trên website, cần đặc biệt lưu ý truy cập đúng địa chỉ chính thức của Vé Tàu online là: www.vetauonline.com.
              Không chỉ vậy, các trang web này còn được tính toán để có thể hiển thị ngay ở trang nhất bộ máy tìm kiếm khi khách hàng tìm kiếm từ khóa về mua vé trên Vé Tàu online. Do các website này không phải kênh bán hay đối tác chính thức của Vé Tàu online, hành khách mua vé từ đây sẽ không được bảo đảm quyền lợi, có thể mua phải vé giả, vé bị nâng giá...
            </span>
            <span className='more' onClick={() => { setMore(more ? false : true) }}>{!more ? 'Xem thêm...' : 'Ẩn'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
