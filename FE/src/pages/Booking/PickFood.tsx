import { useEffect, useState } from 'react'
import InfoBooking from './InfoBooking'
import SpanMain from '@/components/Span/SpanMain'
import { Button, InputGroup } from 'react-bootstrap'
import { getAllFood } from '@/apis/food.api'
import { useMutation } from '@tanstack/react-query'
import { Food } from '@/types/Food.type'
import TheaterComplex from '@/types/TheaterComplex.type'
import { updateOrder } from '@/apis/order.ai'
import { useNavigate } from 'react-router-dom'

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
  totalPrice?: number
  Showtime2: any
}

export default function PickFood({ onContinue, onBack }: Props) {
  const [dataBooking, setDataBooking] = useState<BookingData | null>(null)
  const [quantities, setQuantities] = useState<number[]>([])
  const [foods, setFoods] = useState<Food[]>([])
  const [countdown, setCountdown] = useState<number>(420)
  const navigate = useNavigate()

  const { mutate: fetchFoods } = useMutation({
    mutationFn: getAllFood,
    onSuccess(response) {
      setFoods(response.data || [])
      setQuantities(new Array(response.data.length).fill(0))
    }
  })

  const { mutate: fetchUpdateOrder } = useMutation({
    mutationFn: (variables: { orderId: any; userId: any; total_price: any; seats?: string[]; foods?: string[] }) => {
      return updateOrder(variables.orderId, variables.userId, variables.total_price, variables.seats, variables.foods)
    },
    onSuccess(response) {
      // Xử lý sau khi cập nhật đơn hàng thành công nếu cần
    }
  })

  useEffect(() => {
    fetchFoods()
    const getDataBooking = localStorage.getItem('bookingInfo')
    if (getDataBooking) {
      const parsedData: BookingData = JSON.parse(getDataBooking)
      setDataBooking(parsedData)
      const initialQuantities = parsedData.foods?.map((food) => food.quantity) || []
      setQuantities(initialQuantities)
    }

    const storedCountdown = localStorage.getItem('countdown')
    if (storedCountdown) {
      setCountdown(Number(storedCountdown))
    }
  }, [fetchFoods])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId)
          navigate('/booking')
        }
        const newCountdown = prev - 1
        localStorage.setItem('countdown', newCountdown.toString())
        return newCountdown
      })
    }, 1000)
  }, [navigate])

  const handleQuantityChange = (index: number, increment: boolean) => {
    setQuantities((prev) => {
      const newQuantity = increment ? prev[index] + 1 : Math.max(prev[index] - 1, 0)
      const updatedQuantities = [...prev]
      updatedQuantities[index] = newQuantity
      updateLocalStorage(updatedQuantities)
      return updatedQuantities
    })
  }

  const updateLocalStorage = (quantities: number[]) => {
    if (dataBooking) {
      const updatedFoods = foods
        .map((food, index) => {
          const quantity = quantities[index]
          const total = quantity > 0 ? quantity * Number(food.price) : 0
          return {
            name: food.name,
            quantity,
            price: Number(food.price),
            total
          }
        })
        .filter((food) => food.quantity > 0)

      const updatedBooking = {
        ...dataBooking,
        foods: updatedFoods
      }

      localStorage.setItem('bookingInfo', JSON.stringify(updatedBooking))
      setDataBooking(updatedBooking)
    }
  }

  const handleContinue = () => {
    const getOrderId = localStorage.getItem('orderId')
    const getUserInfo = localStorage.getItem('user')

    if (getOrderId && getUserInfo) {
      const orderId = JSON.parse(getOrderId)
      const userInfo = JSON.parse(getUserInfo)
      const foodsToUpdate = dataBooking?.foods?.map((food) => food.name) || []

      fetchUpdateOrder({
        orderId,
        userId: userInfo.id,
        total_price: dataBooking?.totalPrice,
        seats: dataBooking?.seats,
        foods: foodsToUpdate
      })
    }

    if (onContinue) {
      onContinue()
    }
  }

  console.log(dataBooking)

  return (
    <div className='md:container w-[1390px] md:mx-auto grid xl:grid-cols-3 grid-cols-1'>
      <div className='col-span-2 xl:order-first order-last xl:h-full bg-[#D9EAFD] h-full p-2 overflow-hidden xl:overflow-auto xl:pb-10 pb-32 shadow-md'>
        <SpanMain name={'Chọn Combo'} text_size='text-lg' />
        <div className='grid grid-cols-1 gap-2 mt-3'>
          {foods.map((food, index) => (
            <div className='flex items-center justify-between' key={index}>
              <div className='flex'>
                <img src={food.img_url} width={200} alt={food.name} />
                <div className='ml-3'>
                  <h4>{food.name}</h4>
                  <p>{food.description}</p>
                  <strong>Giá : {food.price.toLocaleString()} VNĐ</strong>
                </div>
              </div>
              <div className='ml-6'>
                <InputGroup className='flex justify-around'>
                  <Button
                    className='bg-orange-500 h-5 w-5 rounded-2xl text-center'
                    onClick={() => handleQuantityChange(index, false)}
                    disabled={quantities[index] <= 0}
                  >
                    -
                  </Button>
                  <input
                    value={quantities[index] || 0}
                    className='mx-1'
                    style={{ width: '2rem', textAlign: 'center' }}
                    readOnly
                  />
                  <Button
                    className='bg-orange-500 h-5 w-5 rounded-2xl text-center'
                    onClick={() => handleQuantityChange(index, true)}
                  >
                    +
                  </Button>
                </InputGroup>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='col-span-1 xl:pl-4 xl:order-none order-first py-4'>
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
              seats={dataBooking.seats}
              foods={dataBooking.foods || []}
              onContinue={handleContinue}
              onBack={onBack}
            />
          )}
        </div>
      </div>
    </div>
  )
}
