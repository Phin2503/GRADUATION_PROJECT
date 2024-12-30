import { Button } from '@/components/ui/button'
import TheaterComplex from '@/types/TheaterComplex.type'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { Coupon } from '@/types/coupon.type'
import Showtime from '@/types/showtime.type'
import Theater from '@/types/Theater.type'

interface Props {
  movieTitle: string
  theaterComplex?: TheaterComplex | null
  showtime: string
  Showtime2?: Showtime
  Theater2?: Theater
  date: string
  seats?: string[]
  totalAmount?: string
  theater?: string
  onContinue?: () => void
  linkNavigate?: string
  foods?: any[] | null
  onBack?: () => void
  backPickTheater?: () => void
  coupon?: Coupon
  countdown?: number | null
}

export default function InfoBooking({
  movieTitle,
  theaterComplex,
  showtime,
  date,
  theater,
  seats = [],
  foods = [],
  onContinue,
  onBack,
  linkNavigate,
  backPickTheater,
  coupon,
  Showtime2,
  countdown
}: Props) {
  const navigate = useNavigate()
  const [_, setDataBooking] = useState<any>(null)
  const [seatsSelected, setSeatsSelected] = useState<string[]>(seats)
  const [timeRemaining, setTimeRemaining] = useState<number | null>(countdown || null)

  useEffect(() => {
    const getDataBooking = localStorage.getItem('bookingInfo')
    if (getDataBooking) {
      const parsedData = JSON.parse(getDataBooking)
      setDataBooking(parsedData)
      setSeatsSelected(parsedData.seats || [])
    }
  }, [])

  useEffect(() => {
    if (JSON.stringify(seats) !== JSON.stringify(seatsSelected)) {
      setSeatsSelected(seats)
    }
  }, [seats])

  useEffect(() => {
    if (countdown) {
      setTimeRemaining(countdown)
    }
  }, [countdown])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev && prev > 0) {
          return prev - 1
        } else {
          clearInterval(intervalId)
          if (prev === 1) {
            toast.error('Thời gian giữ ghế đã hết!')
            localStorage.removeItem('bookingInfo')
            navigate('/booking')
          }
          return 0
        }
      })
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  const totalSeats = seatsSelected.length
  const ticketPrice = 70000 // Giá vé cơ bản
  const theaterType = Showtime2?.theater?.typeTheater?.id

  // console.log(theaterType)
  // Điều chỉnh giá vé theo loại rạp
  let adjustedTicketPrice = ticketPrice
  if (theaterType == 2) {
    adjustedTicketPrice = 90000 // Giá cho loại rạp 2
  }

  // Tính toán giá vé cho hàng E, F, G
  const priceIncreaseRows = ['E', 'F', 'G']
  const hasIncreasedPrice = seatsSelected.some((seat) => priceIncreaseRows.includes(seat.charAt(0)))

  const totalSeatPrice = (totalSeats * adjustedTicketPrice * (hasIncreasedPrice ? 1.1 : 1)).toFixed(2)
  const totalFoodPrice = foods?.reduce((total, food) => total + food.total, 0) || 0
  const totalAmountCalculated = parseFloat(totalSeatPrice) + totalFoodPrice

  const handleClickBack = () => {
    if (backPickTheater) backPickTheater()
    if (onBack) onBack()
  }

  const handleClickContinue = () => {
    if (!theaterComplex || !showtime || !movieTitle || !date || !theater) {
      toast.error('Vui lòng chọn đầy đủ thông tin: Tỉnh, Phim, Suất Chiếu, Cụm Rạp, và Ngày.')
      return
    }

    const discountAmount = coupon ? (parseFloat(totalAmountCalculated) * coupon.discount) / 100 : 0
    const finalAmount = parseFloat(totalAmountCalculated) - discountAmount

    const bookingInfo = {
      titleMovie: movieTitle,
      theaterComplex,
      showtime,
      date,
      totalPrice: finalAmount || 0,
      theater: theater || null,
      foods: foods || [],
      seats: seatsSelected,
      Showtime2
    }

    localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo))

    if (linkNavigate) {
      const accessToken = localStorage.getItem('access_token')
      if (!accessToken) {
        toast.error('Vui lòng đăng nhập !!')
        return
      }
      navigate(linkNavigate)
    }

    if (onContinue) {
      onContinue()
    }
  }

  const discountAmount = coupon ? (totalAmountCalculated * coupon.discount) / 100 : 0
  const finalAmount = totalAmountCalculated - discountAmount
  // console.log(dataBooking)
  return (
    <div>
      <div className='col-span-1 xl:pl-4 xl:order-none order-first'>
        <div className='md:mb-4'>
          <div className='h-[6px] bg-[#f70] rounded'></div>
          <div className='bg-[#FFE3CA] p-4 grid grid-cols-3 xl:gap-2 items-center mb-3'>
            <div className='flex-1 col-span-2 md:col-span-1 row-span-1 xl:col-span-2'>
              <h3 className='text-sm xl:text-base font-bold xl:mb-2'>{movieTitle || 'Movie Title'}</h3>
              <p className='text-sm inline-block'>{'2D Phụ Đề'}</p>
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
                  <strong>{theaterComplex ? theaterComplex.name : 'Cinema Name'}</strong>
                  <span> - </span>
                  <span className='text-sm xl:text-base'>{theater}</span>
                </div>
                <div className='xl:mt-2 text-sm xl:text-base'>
                  <span>Suất: {showtime}</span>
                  <span> - </span>
                  <span className='capitalize text-sm'>
                    <strong>{date}</strong>
                  </span>
                </div>
                <div className='xl:mt-2 text-sm xl:text-base'>
                  <span>{totalSeats} ghế đơn</span>
                  <span> - </span>
                  <span>{Number(totalSeatPrice).toLocaleString('vi-VN')} VNĐ</span>
                </div>
                <div className='xl:mt-2 text-sm xl:text-base'>
                  <span>Ghế: {seatsSelected.join(', ')}</span>
                </div>
              </div>
              <div className='xl:mt-2 text-sm xl:text-base'>
                <div className='col-span-3 my-4 border-t border-[#ccc] border-dashed xl:block hidden'></div>
                {foods && foods.length > 0 ? (
                  foods.map((food, index) => (
                    <div key={index} className='flex justify-between'>
                      <p>
                        x{food.quantity} {food.name}
                      </p>
                      <p>{food.total?.toLocaleString('vi-VN') || '0 VNĐ'}</p>
                    </div>
                  ))
                ) : (
                  <p>Không có món ăn nào được chọn.</p>
                )}
              </div>

              {coupon && (
                <div className='xl:mt-2 text-sm xl:text-base'>
                  <div className='col-span-3 my-4 border-t border-[#ccc] border-dashed xl:block hidden'></div>
                  Giảm giá : {discountAmount.toLocaleString(
                    'vi-VN'
                  )} VNĐ
                </div>
              )}
            </div>

            <div className='col-span-3 my-4 border-t border-[#ccc] border-dashed xl:block hidden'></div>

            <div className='xl:flex justify-between col-span-3'>
              <strong>Tổng cộng</strong>
              <span className='inline-block font-bold text-[#f70]'>{finalAmount.toLocaleString('vi-VN')} VNĐ</span>
            </div>
          </div>

          {timeRemaining != null && timeRemaining > 0 && (
            <div className='text-center mb-4'>
              <h4 className='font-bold'>
                Thời gian giữ ghế: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              </h4>
            </div>
          )}

          <div className='text-center'>
            <Button className='mr-2 px-8 hover:bg-white hover:text-black' onClick={handleClickBack}>
              Quay lại
            </Button>
            <Button
              className='px-8 bg-white border-orange-300 border-[1px] text-black hover:bg-orange-400'
              onClick={handleClickContinue}
            >
              Tiếp tục
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
