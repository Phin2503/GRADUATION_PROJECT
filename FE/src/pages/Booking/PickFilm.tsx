import { useEffect, useState } from 'react'
import ListSeat from './ListSeat'

const PickFilm = () => {
  const [reservedSeats, setReservedSeats] = useState<string[]>([])
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  console.log('🚀 ~ PickFilm ~ selectedSeats:', selectedSeats)

  useEffect(() => {
    // fake data from Deways
    const reservationData = {
      userId: 'a94a4c72-6bd8-412c-a862-e889ebff9ab5',
      seats: ['A2', 'B1', 'C1', 'D1', 'E1'],
      foods: ['ICombo 1 Big Extra STD'],
      total_price: 149000
    }

    setReservedSeats(reservationData.seats)
  }, [])

  const buttons1: number[] = [6, 5, 4, 3, 2, 1]
  const buttons2: number[] = [6, 5, 4, 3, 2, 1]

  const toggleSeatSelection = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((item) => item !== seat))
    } else {
      setSelectedSeats([...selectedSeats, seat])
    }
  }
  return (
    <div className='md:container w-[1390px] md:mx-auto grid xl:grid-cols-3 grid-cols-1'>
      <div className='col-span-2 xl:order-first order-last xl:h-full h-full overflow-hidden xl:overflow-auto xl:pb-10 pb-32'>
        <div className='bg-white px-6 py-4  rounded md:mb-8 mb-4 w-[100%]'>
          <div className='grid md:grid-cols-10 grid-cols-2'>
            <div className='md:col-span-2'>
              <label htmlFor='' className='md:text-base text-sm font-semibold inline-block mt-2'>
                Đổi suất chiếu
              </label>
            </div>
            <div className='col-span-8 flex-row gap-4 flex-wrap items-center md:flex hidden'>
              <button className='py-2 px-4 border rounded text-sm font-normal text-black-10 transition-all duration-500 ease-in-out hover:bg-blue-10 active:bg-blue-10 hover:text-white bg-blue-700 text-white'>
                20:00
              </button>

              <button className='py-2 px-4 border rounded text-sm font-normal text-black transition-all duration-500 ease-in-out hover:bg-blue-700 active:bg-blue-10 hover:text-white'>
                22:00
              </button>
            </div>
          </div>
        </div>

        <div className='bg-white py-4 px-2 rounded md:mb-8 w-full'>
          <div className='md:block flex flex-wrap justify-center w-full h-full overflow-auto'>
            <ul className='w-full max-w-4xl grid gap-3'>
              <ListSeat
                label='I'
                buttons={buttons1}
                reservedSeats={reservedSeats}
                selectedSeats={selectedSeats}
                onSelectSeat={toggleSeatSelection}
              />
              <ListSeat
                label='H'
                buttons={buttons2}
                reservedSeats={reservedSeats}
                selectedSeats={selectedSeats}
                onSelectSeat={toggleSeatSelection}
              />
              <ListSeat
                label='G'
                buttons={buttons2}
                reservedSeats={reservedSeats}
                selectedSeats={selectedSeats}
                onSelectSeat={toggleSeatSelection}
              />
              <ListSeat
                label='F'
                buttons={buttons2}
                reservedSeats={reservedSeats}
                selectedSeats={selectedSeats}
                onSelectSeat={toggleSeatSelection}
              />
              <ListSeat
                label='E'
                buttons={buttons2}
                reservedSeats={reservedSeats}
                selectedSeats={selectedSeats}
                onSelectSeat={toggleSeatSelection}
              />
              <ListSeat
                label='D'
                buttons={buttons2}
                reservedSeats={reservedSeats}
                selectedSeats={selectedSeats}
                onSelectSeat={toggleSeatSelection}
              />
              <ListSeat
                label='C'
                buttons={buttons2}
                reservedSeats={reservedSeats}
                selectedSeats={selectedSeats}
                onSelectSeat={toggleSeatSelection}
              />
              <ListSeat
                label='B'
                buttons={buttons2}
                reservedSeats={reservedSeats}
                selectedSeats={selectedSeats}
                onSelectSeat={toggleSeatSelection}
              />
              <ListSeat
                label='A'
                buttons={buttons2}
                reservedSeats={reservedSeats}
                selectedSeats={selectedSeats}
                onSelectSeat={toggleSeatSelection}
              />
            </ul>
          </div>

          {/* Seat layout */}
          <div className='mt-4 md:mt-8'>
            <p className='text-base text-center text-gray-500'>Màn hình</p>
            <div className='border-2 border-orange-500 mt-3'></div>
            <div className='text-sm flex md:flex-row flex-col-reverse justify-between items-center py-9 gap-2'>
              <div className='flex gap-2'>
                <div className='flex items-center'>
                  <span className='w-5 h-5 rounded bg-gray-500 inline-block align-middle'></span>
                  <span className='ml-2'>Ghế đã bán</span>
                </div>
                <div className='flex items-center'>
                  <span className='w-5 h-5 rounded bg-orange-500 inline-block align-middle'></span>
                  <span className='ml-2'>Ghế đang chọn</span>
                </div>
              </div>

              <div className='flex gap-2 flex-wrap md:justify-end justify-center'>
                <div className='flex items-center'>
                  <span className='w-5 h-5 rounded border border-yellow-400 inline-block align-middle'></span>
                  <span className='ml-2'>Ghế VIP</span>
                </div>
                <div className='flex items-center'>
                  <span className='w-5 h-5 rounded border border-gray-500 inline-block align-middle'></span>
                  <span className='ml-2'>Ghế đơn</span>
                </div>
                <div className='flex items-center'>
                  <span className='w-[44px] md:w-[48px] h-5 rounded border border-blue-500 inline-block align-middle'></span>
                  <span className='ml-2'>Ghế đôi</span>
                </div>
                <div className='flex items-center'>
                  <span className='w-[44px] md:w-[48px] h-5 rounded border border-orange-500 inline-block align-middle'></span>
                  <span className='ml-2'>Ghế ba</span>
                </div>
              </div>
            </div>
          </div>

          {/*End Seat layout */}
        </div>
      </div>

      <div className='col-span-1 xl:pl-4 xl:order-none order-first py-4'>
        <div className='md:mb-4'>
          <div className='h-[6px] bg-[#f70] rounded-t'></div>
          <div className='bg-white p-4 grid grid-cols-3 xl:gap-2 items-center'>
            <div className='row-span-2 md:row-span-1 xl:row-span-2 block md:hidden xl:block'>
              <img
                src='https://cdn.galaxycine.vn/media/2024/11/14/linh-mieu-2_1731569950588.jpg'
                alt='img'
                loading='lazy'
                className='xl:w-full xl:h-full md:w-[80px] md:h-[120px] w-[90px] h-[110px] rounded object-cover duration-500 ease-in-out group-hover:opacity-100"
      scale-100 blur-0 grayscale-0)'
              />
            </div>

            <div className='flex-1 col-span-2 md:col-span-1 row-span-1 xl:col-span-2'>
              <h3 className='text-sm xl:text-base font-bold xl:mb-2 '>Linh Miêu: Quỷ Nhập Tràng</h3>
              <p className='text-sm inline-block'>2D Phụ Đề</p>

              <span>-</span>

              <div className='xl:mt-2 ml-2 xl:ml-0 inline-block'>
                <span className='inline-flex items-center justify-center w-[38px] h-7 bg-[#f70] rounded text-sm text-center text-white font-bold not-italic'>
                  T18
                </span>
              </div>
            </div>

            <div className='col-span-2 md:col-span-1 xl:col-span-3'>
              <div>
                <div className='xl:mt-4 text-sm xl:text-base'>
                  <strong>Galaxy Sala</strong>
                  <span> - </span>
                  <span className='text-sm xl:text-base'>HAATOPIA 2</span>
                </div>

                <div className='xl:mt-2 text-sm xl:text-base'>
                  <span>Suất:</span>
                  <strong>20</strong>
                  <span> - </span>
                  <span className='capitalize text-sm'>
                    thứ bảy, <strong>30/11/2024</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className='col-span-3 my-4 border-t border-[#ccc] border-dashed xl:block hidden'></div>

            <div className='xl:flex hidden justify-between col-span-3'>
              <strong>Tổng cộng</strong>
              <span className='inline-block font-bold text-[#f70] '>0đ</span>
            </div>
          </div>

          <div className='mt-8 xl:flex hidden'>
            <button className='w-1/2 mr-2 py-2 text-[#f70]'>
              <span>Quay lại</span>
            </button>

            <button className='w-1/2 ml-2 py-2  bg-[#f70] text-white border rounded-[8px] hover:bg-orange-500'>
              <span>Tiếp tục</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PickFilm
