export default function Footer() {
  return (
    <footer className='bg-gray-800 text-gray-400 py-8'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6'>
        {/* Column 1 */}
        <div>
          <h3 className='text-lg font-semibold text-white mb-4'>GIỚI THIỆU</h3>
          <ul className='space-y-2'>
            <li>Về Chúng Tôi</li>
            <li>Thoả Thuận Sử Dụng</li>
            <li>Quy Chế Hoạt Động</li>
            <li>Chính Sách Bảo Mật</li>
          </ul>
        </div>
        {/* Column 2 */}
        <div>
          <h3 className='text-lg font-semibold text-white mb-4'>GÓC ĐIỆN ẢNH</h3>
          <ul className='space-y-2'>
            <li>Thể Loại Phim</li>
            <li>Bình Luận Phim</li>
            <li>Blog Điện Ảnh</li>
            <li>Phim Hay Tháng</li>
            <li>Phim IMAX</li>
          </ul>
        </div>
        {/* Column 3 */}
        <div>
          <h3 className='text-lg font-semibold text-white mb-4'>HỖ TRỢ</h3>
          <ul className='space-y-2'>
            <li>Góp Ý</li>
            <li>Sale & Services</li>
            <li>Rạp / Giá Vé</li>
            <li>Tuyển Dụng</li>
            <li>FAQ</li>
          </ul>
        </div>
      </div>
      <div className='mt-8 text-center text-sm'>
        <p>CÔNG TY CỔ PHẦN PHIM PHIN CINEMA</p>
        <p>34 Đa Mặn 15, Phường Khuê Mỹ, Quận Ngũ Hành Sơn, TP. Đà Nẵng, Việt Nam</p>
        <p>📞: 0918717205 - 19002224 (9:00 - 22:00) ✉️: hotro@phincinema.vn</p>
      </div>
    </footer>
  )
}
