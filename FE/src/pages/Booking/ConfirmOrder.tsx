import { Button } from '@/components/ui/button'
import ticketsLogo from '../../assets/ticketsLogo.png'
import { useMutation } from '@tanstack/react-query'
import { getOrderById } from '@/apis/order.ai'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PacmanLoader from 'react-spinners/PacmanLoader'

export default function ConfirmOrder() {
  const { orderId } = useParams<{ orderId: string }>()
  const [orderRes, setOrderRes] = useState<any>()
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { mutate: fetchOrder } = useMutation({
    mutationFn: getOrderById,
    onSuccess(response) {
      setOrderRes(response.data)
      console.log(response.data)
    }
  })

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1500)

    if (orderId) {
      fetchOrder(orderId)
    }
  }, [fetchOrder, orderId])

  if (!orderRes) {
    return <div>Loading...</div>
  }

  const handleConfirm = () => {
    navigate('/')
  }

  console.log(orderRes)

  return (
    <>
      {loading ? (
        <div className='h-[30vh] w-[100wh]'>
          <PacmanLoader color='#36bbe5' className='h-full w-full mx-auto my-36' size={80} />
        </div>
      ) : (
        <div className='w-[80%] mx-auto flex justify-center'>
          <div className='bg-[#F4A261] w-[50%] p-10 my-10 flex-col justify-center items-center rounded-[0.3rem] shadow-2xl'>
            <div className='grid grid-cols-1 gap-1'>
              <div className='flex items-center justify-center mb-2'>
                <img src={ticketsLogo} alt='' width={100} />
              </div>
              <h2 className='flex items-center justify-center text-lg font-semibold mb-5 border-b-[3px] border-dashed'>
                CONFIRM INFORMATION BOOKED
              </h2>
              <div className='col-span-1 grid grid-cols-1 gap-2'>
                <div className='col-span-1'>
                  <label htmlFor='' className='mr-2'>
                    Name :
                  </label>
                  <strong>{orderRes.existingOrder.user.fullName}</strong>
                </div>
                <div className='col-span-1'>
                  <label htmlFor='' className='mr-2'>
                    Cinema :
                  </label>
                  <strong>{orderRes.showtimeOfOrder.theater_complex.name}</strong>
                </div>
                <div className='col-span-1'>
                  <label htmlFor='' className='mr-2'>
                    Address :
                  </label>
                  <strong>{orderRes.showtimeOfOrder.theater_complex.address}</strong>
                </div>
                <div className='col-span-1'>
                  <label htmlFor='' className='mr-2'>
                    Theater :
                  </label>
                  <strong>{orderRes.existingOrder.theater.name}</strong>
                </div>
                <div className='col-span-1'>
                  <label htmlFor='' className='mr-2'>
                    Showtime :
                  </label>
                  <strong>{new Date(orderRes.existingOrder.showtime.showtime_start).toLocaleString()}</strong>
                </div>
                <div className='col-span-1'>
                  <label htmlFor='' className='mr-2'>
                    Name Movie :
                  </label>
                  <strong>{orderRes.showtimeOfOrder.movie.title}</strong> {/* Thay đổi theo cách bạn lưu tên phim */}
                </div>
                <div className='col-span-1'>
                  <label htmlFor='' className='mr-2'>
                    Foods :
                  </label>
                  <strong>{orderRes.existingOrder.foods.join(', ')}</strong>
                </div>
                <div className='col-span-1'>
                  <label htmlFor='' className='mr-2'>
                    Total Price :
                  </label>
                  <strong>{orderRes.existingOrder.total_price} VNĐ</strong>
                </div>
                <div className='col-span-1 mb-2'>
                  <label htmlFor='' className='mr-2'>
                    Status :
                  </label>
                  <strong className='text-green-800'>{orderRes.existingOrder.status} and PAID</strong>
                </div>
              </div>

              <Button className='hover:bg-green-600' onClick={handleConfirm}>
                CONFIRMED
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
