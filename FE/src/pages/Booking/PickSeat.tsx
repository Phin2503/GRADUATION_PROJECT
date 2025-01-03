import { useEffect, useState } from 'react'
import ListSeat from './ListSeat'
import InfoBooking from './InfoBooking'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { createOrder, getSeatsOrdered, updateOrder } from '@/apis/order.ai'
import { User } from '@/types/user.type'
import PuffLoader from 'react-spinners/PuffLoader'

interface Props {
  onContinue?: () => void
}

const PickSeat = ({ onContinue }: Props) => {
  const [loading, setLoading] = useState(false)
  const [reservedSeats, setReservedSeats] = useState<string[]>([])
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [dataBooking, setDataBooking] = useState<any>(null)
  const [userInfo, setUserInfo] = useState<User>()
  const [countdown, setCountdown] = useState<number>(0)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    const getDataBooking = localStorage.getItem('bookingInfo')
    const getUserInfo = localStorage.getItem('user')

    if (getDataBooking) {
      const parsedData = JSON.parse(getDataBooking)

      // Cộng thêm 7 giờ vào showtime_start
      const showtimeStart = new Date(parsedData.Showtime2.showtime_start)
      showtimeStart.setHours(showtimeStart.getHours() + 7)

      if (showtimeStart < new Date()) {
        navigate('/')
        return
      }

      setDataBooking(parsedData)
      setSelectedSeats(parsedData.seats || [])
    }

    if (getUserInfo) {
      const userInfo = JSON.parse(getUserInfo)
      setUserInfo(userInfo)
    }

    const storedCountdown = localStorage.getItem('countdown')
    if (storedCountdown) {
      setCountdown(Number(storedCountdown))
    }

    return () => clearTimeout(timer) // Dọn dẹp timer
  }, [navigate])

  const { mutate: fetchUpdateOrder } = useMutation({
    mutationFn: (variables: { orderId: any; userId: any; total_price: any; seats?: string[]; foods?: string[] }) => {
      return updateOrder(variables.orderId, variables.userId, variables.total_price, variables.seats, variables.foods)
    }
  })

  const toggleSeatSelection = (seat: string) => {
    if (reservedSeats.includes(seat)) {
      toast.error('Ghế này đã được đặt bởi người khác!')
      return
    }

    if (selectedSeats.includes(seat)) {
      // Hủy chọn ghế
      setSelectedSeats(selectedSeats.filter((s) => s !== seat))
    } else {
      // Kiểm tra số ghế đã chọn
      if (selectedSeats.length < 8) {
        setSelectedSeats([...selectedSeats, seat])
      } else {
        toast.error('Bạn chỉ có thể chọn tối đa 8 ghế!')
      }
    }
  }

  const { mutate: fetchGetSeatOrdered } = useMutation({
    mutationFn: (variables: { theaterId: any; showtimeId: any }) => {
      return getSeatsOrdered(variables.theaterId, variables.showtimeId)
    },
    onSuccess(response) {
      setReservedSeats(response.data || [])
    }
  })

  useEffect(() => {
    if (dataBooking) {
      const intervalId = setInterval(() => {
        fetchGetSeatOrdered({
          theaterId: dataBooking.Showtime2.theater.id,
          showtimeId: dataBooking.Showtime2.id
        })
      }, 3000)

      return () => clearInterval(intervalId)
    }
  }, [dataBooking, fetchGetSeatOrdered])

  const { mutate: fetchCreateOrder } = useMutation({
    mutationFn: (variables: {
      theaterId: any
      showtimeId: any
      userId: any
      total_price: any
      seats?: string[]
      foods?: string[]
    }) => {
      return createOrder(
        variables.theaterId,
        variables.showtimeId,
        variables.userId,
        variables.total_price,
        variables.seats,
        variables.foods
      )
    },
    onSuccess(response) {
      localStorage.setItem('orderId', JSON.stringify(response.data.id))
    }
  })

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      toast.error('Vui lòng chọn ít nhất một ghế trước khi tiếp tục!')
      return
    }

    const getOrderId = localStorage.getItem('orderId')
    const getBookingInfo = localStorage.getItem('bookingInfo')

    if (getOrderId) {
      const orderId = JSON.parse(getOrderId)
      if (getBookingInfo) {
        const bookingInfo = JSON.parse(getBookingInfo)
        fetchUpdateOrder({
          orderId: orderId,
          userId: userInfo?.id,
          total_price: dataBooking?.totalPrice,
          seats: bookingInfo?.seats,
          foods: dataBooking.foods
        })
      }
    } else {
      const orderData = {
        theaterId: dataBooking.Showtime2.theater.id,
        showtimeId: dataBooking.Showtime2.id,
        userId: userInfo?.id,
        total_price: dataBooking.totalPrice,
        seats: selectedSeats,
        foods: dataBooking.foods
      }

      fetchCreateOrder(orderData)
    }

    if (onContinue) {
      onContinue()
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prev) => {
        if (prev !== undefined && prev > 0) {
          const newCountdown = prev - 1
          localStorage.setItem('countdown', newCountdown.toString())
          return newCountdown
        } else {
          clearInterval(intervalId)
          localStorage.removeItem('bookingInfo')
          return 0
        }
      })
    }, 2000)

    return () => clearInterval(intervalId)
  }, [navigate])

  return (
    <>
      {loading ? (
        <div className='h-[30vh] w-[90%]'>
          <PuffLoader color='#fd820f' className='h-full w-full mx-auto my-36' size={150} speedMultiplier={1.5} />
        </div>
      ) : (
        <div className='md:container w-[22rem] md:mx-auto grid xl:grid-cols-3 grid-cols-1'>
          <div className='col-span-3 lg:col-span-2 xl:order-first order-last xl:h-full h-full overflow-hidden xl:overflow-auto xl:pb-10 pb-32'>
            <div className='bg-white py-4 px-2 rounded md:mb-8 w-full'>
              <div className='md:block flex flex-wrap justify-center w-full h-full overflow-auto'>
                <ul className='w-full max-w-4xl grid gap-3'>
                  {['I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'].map((label) => (
                    <ListSeat
                      key={label}
                      label={label}
                      buttons={[1, 2, 3, 4, 5, 6]} // Cập nhật số ghế tùy theo nhu cầu
                      reservedSeats={reservedSeats}
                      selectedSeats={selectedSeats}
                      onSelectSeat={toggleSeatSelection}
                      dataBooking={dataBooking}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className='col-span-3 lg:col-span-1 xl:pl-4 xl:order-none order-first py-4'>
            <div className='md:mb-4'>
              {dataBooking && (
                <InfoBooking
                  countdown={countdown}
                  Showtime2={dataBooking.Showtime2}
                  movieTitle={dataBooking.titleMovie || 'Chưa có thông tin'}
                  showtime={dataBooking.showtime || 'Chưa có thông tin'}
                  date={dataBooking.date || 'Chưa có thông tin'}
                  theater={dataBooking.theater || 'Chưa có thông tin'}
                  theaterComplex={dataBooking.theaterComplex}
                  seats={selectedSeats}
                  onContinue={handleContinue}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PickSeat
