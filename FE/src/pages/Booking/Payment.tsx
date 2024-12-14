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
}

export default function Payment({ onContinue, onBack }: Props) {
  const [selectedOption, setSelectedOption] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [coupon, setCoupon] = useState<Coupon>()
  const [dataBooking, setDataBooking] = useState<BookingData>({
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

  const navigate = useNavigate()

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value)
  }

  const { mutate: fetchCheckCoupon } = useMutation({
    mutationFn: checkCoupon,
    onSuccess(response) {
      setCoupon(response.data)
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
    const bookingInfo = localStorage.getItem('bookingInfo')
    if (bookingInfo) {
      setDataBooking(JSON.parse(bookingInfo))
    }

    const storedCountdown = localStorage.getItem('countdown')
    if (storedCountdown) {
      setCountdown(Number(storedCountdown))
    }
  }, [])

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

  const handleCheckCoupon = (event: React.FormEvent) => {
    event.preventDefault()
    fetchCheckCoupon(couponCode)
  }

  const handleContinue = () => {
    const getOrderId = localStorage.getItem('orderId')
    if (getOrderId) {
      const orderId = JSON.parse(getOrderId)
      if (selectedOption === 'vnpay') {
        const paymentData: PaymentType = {
          amount: dataBooking.totalPrice,
          orderId,
          orderInfo: `Thanh toán cho ${dataBooking.titleMovie}`
        }

        fetchPayment(paymentData)
      }

      if (selectedOption !== 'vnpay') {
        toast.error('Vui lòng chọn phương thức thanh toán')
      }
    }
  }

  const handleBack = () => {
    if (onBack) {
      onBack()
    }
  }

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
              Check
            </button>
          </form>
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
