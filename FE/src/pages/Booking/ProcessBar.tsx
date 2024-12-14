export default function ProcessBar() {
  return (
    <div className='py-2 flex text-center  w-[98%] items-center bg-[#FDF7F4] justify-center mx-auto rounded-[0.3rem] mt-1 shadow-md'>
      <div className='flex justify-center items-center text-center h-full'>
        <h3 className='text-base text-black p-3 border-b-[3px] border-gray-500'>Chọn Phim / Rạp / Suất</h3>
        <h3 className='text-base text-black p-3 border-b-[3px] border-gray-500'>Chọn Ghế</h3>
        <h3 className='text-base text-black p-3 border-b-[3px] border-gray-500'>Chọn Thức Ăn</h3>
        <h3 className='text-base text-black p-3 border-b-[3px] border-gray-500'>Thanh Toán</h3>
        <h3 className='text-base text-black p-3 border-b-[3px] border-gray-500'>Xác Nhận</h3>
      </div>
    </div>
  )
}
