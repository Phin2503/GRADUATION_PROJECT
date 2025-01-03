import { useEffect } from 'react'

export default function Review() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const dateString = 'Thu Jan 02 2025 09:00:00 GMT+0700 (Indochina Time)'

  // Chuyển đổi chuỗi thành đối tượng Date
  const dateObject = new Date(dateString)

  // Thêm 7 giờ
  dateObject.setHours(dateObject.getHours() + 7)

  console.log(dateObject) // In ra đối tượng Date sau khi thêm 7 giờ

  return (
    <>
      <title>Review Linh Miêu: Quỷ Nhập Tràng - Galaxy Cine</title>
      <meta
        name='description'
        content='Bài review phim Linh Miêu: Quỷ Nhập Tràng - Tác phẩm kinh dị đầy hấp dẫn từ truyền thuyết dân gian Việt Nam.'
      />

      <div>
        <div className='font-sans text-gray-800 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-5'>
          <h1 className='text-2xl font-bold text-gray-900'>
            [Review] Linh Miêu Quỷ Nhập Tràng: Khi Sự Mê Tín Hủy Hoại Một Gia Tộc
          </h1>
          <div className='flex justify-between items-center my-5'>
            <span className='text-gray-500'>581 lượt xem</span>
          </div>

          <p className='mb-5 leading-relaxed'>
            Truyền thuyết dân gian Việt Nam vẫn luôn là nguồn ý tưởng bất tận.Câu chuyện diễn ra khi Gia Cường, cháu
            đích tôn của gia tộc Dương Phúc, không may chết đuối dưới sông trong buổi lễ mừng thọ của mệ Bích – trưởng
            gia tộc. Khi đang thực hiện lễ tang, một con mèo đen thần bí đã nhảy qua quan tài của Gia Cường khiến cậu
            đột ngột sống lại. Tưởng chừng như cháu đích tôn của gia tộc quyền quý tại Huế phúc lớn mạng lớn, nhưng từ
            đó hàng loạt hiện tượng bí ẩn bắt đầu xảy ra xoay quanh gia đình. Chuyện gì đang diễn ra tại gia tộc Dương
            Phúc? Liệu có âm mưu thâm độc nào phía sau? Hãy ra rạp để tìm câu trả lời nha. Nếu xét về tổng thể Linh
            Miêu: Quỷ Nhập Tràng là một bộ phim chỉn chu và có đầu tư rõ ràng, dù có một cốt truyện tương đối dễ đoán ở
            nhiều phương diện, nhưng tác phẩm vẫn gây tò mò bởi những vấn đề nhức nhối trong các gia đình Việt Nam. Khắc
            phục được một số mặt hạn chế từ Quỷ Cẩu, phim mới đã đưa khán giả đến một trải nghiệm phim trọn vẹn hơn.
          </p>

          <img
            src='https://www.galaxycine.vn/media/2024/11/20/rv-linh-mieu-3_1732095799412.jpg'
            alt='Poster chính của phim Linh Miêu: Quỷ Nhập Tràng'
            className='w-full rounded-lg mb-5'
          />

          <p className='mb-5 leading-relaxed'>
            Câu chuyện diễn ra khi Gia Cường, cháu đích tôn của gia tộc Dương Phúc. Không chỉ vậy, trên teaser poster,
            nếu quan sát kỹ có thể thấy rõ phần sàn nhà được phủ đầy máu đen. Việc sàn nhà phủ đầy máu báo hiệu cho
            những tai hoạ sẽ ập xuống với những thành viên họ phải hứng chịu quả báo hắc ám từ linh miêu và quỷ nhập
            tràng. “Hiện tại vẫn chưa thể chia sẻ nhiều về chi tiết của câu chuyện hay nói rõ vai trò của từng nhân vật,
            nhưng các chi tiết và các nhân vật trong teaser poster đều là những mắt xích để tạo ra bi kịch trong gia
            đình này và đều là thứ bắt đầu cho những tai ương xảy ra” – đạo diễn Lưu Thành Luân nói thêm. Cùng với việc
            bật mí phần nào vai trò của từng người, đoàn phim Linh Miêu: Quỷ Nhập Tràng cho khán giả thấy được sự ngột
            ngạt, rợn người thông qua từng cảnh phim mang đến trong đoạn teaser trailer. Không chỉ có âm thanh tựa như
            tiếng niệm chú, các đoạn cắt cảnh liên hồi cùng hình ảnh mèo đen cũng mang đến lời cảnh báo về mức độ nặng
            đô của phim mới đánh dấu sự trở lại của đạo diễn Lưu Thành Luân. “Phim Quỷ Cẩu là một câu chuyện dễ tiếp cận
            với nhiều người, mức độ kinh dị của nó ở mức vừa phải vì nội dung tập trung khai thác câu chuyện về nghiệp
            báo. Đối với Linh Miêu: Quỷ Nhập Tràng, chúng sẽ được đào sâu hơn, có nhiều tầng lớp hơn và mức độ rùng rợn
            cũng sẽ tăng nhiều hơn để từ đó có thể làm rõ hơn về vấn đề trọng nam khinh nữ thời xưa”– đạo diễn chia sẻ.
            Là sản phẩm tiếp theo trong chuỗi phim linh dị dân gian, cũng là bộ phim nối tiếp thành công của Quỷ Cẩu,
            Linh Miêu: Quỷ Nhập Tràng rõ ràng đối mặt với không ít áp lực, thậm chí hoài nghi liệu có áp dụng cùng công
            thức thành công của “đàn anh” hay không?
          </p>

          <img
            src='https://www.galaxycine.vn/media/2024/11/20/rv-linh-mieu-5_1732095959068.jpg'
            alt='Cảnh trong phim Linh Miêu Quỷ Nhập Tràng'
            className='w-full rounded-lg mb-5'
          />

          <footer className='border-t border-gray-300 pt-5 mt-5 text-center text-gray-600'>
            <p>Bộ phim còn có 2 after credit để mở ra một vũ trụ linh dị vô cùng thú vị.</p>
          </footer>
        </div>
      </div>
    </>
  )
}
