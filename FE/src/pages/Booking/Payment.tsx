import { PaymentType } from '@/types/payment.type'
import http from '@/utils/http'
import { useEffect, useState } from 'react'
import InfoBooking from './InfoBooking'
import TheaterComplex from '../../types/TheaterComplex.type'
import SpanMain from '@/components/Span/SpanMain'
import logoVnpay from '../../assets/logonVnpay.jpg'
import { useMutation } from '@tanstack/react-query'
import { checkCoupon } from '@/apis/checkCoupon.api'
import { Coupon } from '@/types/coupon.type'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import Showtime from '@/types/showtime.type'

const API_URL_CREATE_VNPAY_PAYMENT = `${import.meta.env.VITE_BASE_URL}/vnpay/payment`

export const createPayment = (paymentData: PaymentType) => http.post<any>(API_URL_CREATE_VNPAY_PAYMENT, paymentData)

interface Props {
  onContinue?: () => void
  onBack?: () => void
}

interface BookingData {
  titleMovie?: string
  showtime?: string
  date?: string
  theater?: string
  theaterComplex?: TheaterComplex
  seats?: string[]
  foods?: Array<{
    name: string
    quantity: number
    price: number
    total: number
  }>
  totalPrice: number
  Showtime2: Showtime
}

export default function Payment({ /*onContinue */ onBack }: Props) {
  const [selectedOption, setSelectedOption] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [userId, setUserId] = useState('')
  const [coupon, setCoupon] = useState<Coupon>()
  const [dataBooking, setDataBooking] = useState<BookingData>({
    Showtime2: {} as Showtime,
    titleMovie: '',
    showtime: '',
    date: '',
    theater: '',
    theaterComplex: {} as TheaterComplex,
    seats: [],
    foods: [],
    totalPrice: 0
  })
  const [countdown, setCountdown] = useState<number>(0)
  const [, setIsCouponApplied] = useState(false) // Trạng thái theo dõi mã giảm giá

  const navigate = useNavigate()

  useEffect(() => {
    const bookingInfo = localStorage.getItem('bookingInfo')
    if (bookingInfo) {
      setDataBooking(JSON.parse(bookingInfo))
    }

    const userInfo = localStorage.getItem('user')
    if (userInfo) {
      setUserId(JSON.parse(userInfo).id)
    }

    const storedCountdown = localStorage.getItem('countdown')
    if (storedCountdown) {
      setCountdown(Number(storedCountdown))
    }
  }, [])

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value)
  }

  const { mutate: fetchCheckCoupon } = useMutation({
    mutationFn: checkCoupon,
    onSuccess(response) {
      const couponData = response.data

      if (couponData) {
        setCoupon(couponData)
        toast.success('Mã khuyến mãi có thể áp dụng!')

        // Tính toán lại totalPrice
        const discountAmount = (dataBooking.totalPrice * couponData.discount) / 100
        const newTotalPrice = Number((dataBooking.totalPrice - discountAmount).toFixed(2)) // Lưu số với 2 chữ số thập phân
        // Cập nhật dataBooking với totalPrice mới
        setDataBooking((prev) => ({
          ...prev,
          totalPrice: newTotalPrice
        }))

        // Lưu tổng giá trị mới vào localStorage
        localStorage.setItem(
          'bookingInfo',
          JSON.stringify({
            ...dataBooking,
            totalPrice: newTotalPrice
          })
        )
      }
    },
    onError() {
      toast.error('Mã khuyến mãi không hợp lệ hoặc đã hết hạn!')
    }
  })

  const { mutate: fetchPayment } = useMutation({
    mutationFn: (paymentData: PaymentType) => createPayment(paymentData),
    onSuccess(response) {
      const paymentUrl = response.data?.paymentUrl
      if (paymentUrl) {
        window.location.href = paymentUrl
      } else {
        console.error('Không có đường dẫn thanh toán trong phản hồi')
      }
    },
    onError(error) {
      console.error('Lỗi thanh toán', error)
    }
  })

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId)
          navigate('/booking')
          return 0
        }
        const newCountdown = prev - 1
        localStorage.setItem('countdown', newCountdown.toString())
        return newCountdown
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const handleCheckCoupon = async (event: React.FormEvent) => {
    event.preventDefault()
    fetchCheckCoupon(couponCode)
  }

  const handleApplyCoupon = async () => {
    if (coupon) {
      setIsCouponApplied(true) // Đánh dấu mã giảm giá đã được áp dụng
      await updateOrderWithCoupon(coupon.id) // Cập nhật order với coupon
      toast.success('Đã áp dụng mã khuyến mãi!')
    }
  }

  const updateOrderWithCoupon = async (couponId: number) => {
    const getOrderId = localStorage.getItem('orderId')
    if (getOrderId) {
      const orderId = JSON.parse(getOrderId)
      const foodNames = (dataBooking.foods || []).map((food) => food.name)

      const updatedOrder = {
        userId: userId,
        foods: foodNames,
        seats: dataBooking.seats,
        couponId: couponId,
        total_price: Number(dataBooking.totalPrice)
      }

      console.log('Updating order with data:', updatedOrder) // In ra dữ liệu

      try {
        await http.put(`${import.meta.env.VITE_BASE_URL}/order/update/${orderId}`, updatedOrder)
        toast.success('Cập nhật order thành công!')
      } catch (error: any) {
        console.error('Error updating order:', error.response?.data || error.message)
        toast.error('Lỗi khi cập nhật order!')
      }
    }
  }

  const handleContinue = () => {
    const getOrderId = localStorage.getItem('orderId')
    if (getOrderId) {
      const orderId = JSON.parse(getOrderId)
      if (selectedOption === 'vnpay') {
        const paymentData: PaymentType = {
          amount: Number(dataBooking.totalPrice),
          orderId,
          orderInfo: `Thanh toán cho ${dataBooking.titleMovie}`
        }

        fetchPayment(paymentData)
      } else {
        toast.error('Vui lòng chọn phương thức thanh toán')
      }
    }
  }

  const handleBack = () => {
    if (onBack) {
      onBack()
    }
  }

  console.log(userId)

  return (
    <div className='grid grid-cols-12 gap-1'>
      <div className='col-span-8 flex-col'>
        <div className='bg-[#FDF7F4] mb-2 shadow-md p-5 col-span-1'>
          <SpanMain name='Khuyến Mãi' text_size='text-base' />
          <p className='mt-2'>Mã Khuyến mãi</p>
          <form onSubmit={handleCheckCoupon} className='flex'>
            <input
              type='text'
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className='border-[1px] border-orange-300 pl-2'
            />
            <button className='border-[1px] rounded-[0.3rem] ml-4 p-1 bg-orange-300' type='submit'>
              Kiểm tra
            </button>
          </form>
          {coupon && (
            <div className='mt-2 text-green-600'>
              <p>Mã khuyến mãi hợp lệ: {coupon.code}</p>
              <p>Giảm giá: {coupon.discount}%</p>
              <button className='mt-2 p-1 bg-blue-500 text-white rounded' onClick={handleApplyCoupon}>
                Áp dụng
              </button>
            </div>
          )}
        </div>

        <div className='bg-[#FDF7F4] mb-2 shadow-md col-span-1 p-2'>
          <SpanMain name='Phương Thức Thanh Toán' text_size='text-base' />
          <div className='flex mt-2'>
            <div className='radio-group'>
              <h2 className='title'>Chọn một tùy chọn:</h2>
              <div className='radio-option'>
                <label className='flex justify-center items-center'>
                  <input
                    type='radio'
                    value='vnpay'
                    checked={selectedOption === 'vnpay'}
                    onChange={handleChange}
                    className='mr-2'
                  />
                  <span className='custom-radio'></span>
                  <img src={logoVnpay} alt='' width={50} className='mr-2' />
                  Vnpay
                </label>
              </div>
              <div className='selected-option'>
                <h3>Phương thức đã chọn: {selectedOption || 'Chưa có'}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-4'>
        <InfoBooking
          countdown={countdown}
          Showtime2={dataBooking.Showtime2}
          movieTitle={dataBooking.titleMovie || 'Chưa có thông tin'}
          showtime={dataBooking.showtime || 'Chưa có thông tin'}
          date={dataBooking.date || 'Chưa có thông tin'}
          theater={dataBooking.theater || 'Chưa có thông tin'}
          theaterComplex={dataBooking.theaterComplex}
          seats={dataBooking.seats || []}
          foods={dataBooking.foods || []}
          coupon={coupon}
          onContinue={handleContinue}
          onBack={handleBack}
        />
      </div>
    </div>
  )
}
