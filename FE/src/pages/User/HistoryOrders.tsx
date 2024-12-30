import { getOrdersByUserId } from '@/apis/order.ai'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export default function HistoryOrders() {
  const [orders, setOrders] = useState<any[]>([])

  const { mutate: fetchOrders } = useMutation({
    mutationFn: (userId: string) => getOrdersByUserId(userId),
    onSuccess(response) {
      setOrders(response.data)
    },
    onError(error) {
      console.error('Error fetching orders:', error)
    }
  })

  useEffect(() => {
    const getUserInfo = localStorage.getItem('user')
    if (getUserInfo) {
      const user = JSON.parse(getUserInfo)
      const id = user.id
      if (id) {
        fetchOrders(id)
      }
    }
  }, [fetchOrders])

  return (
    <div className='w-[80%] h-[32rem] mx-auto'>
      <h2 className='flex justify-center items-center my-10 font-bold'>HISTORY ORDERS</h2>
      <div className='w-full'>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Invoice</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Order At</TableHead>
              <TableHead>Movie</TableHead>
              <TableHead>Showtime</TableHead>
              <TableHead>Cinema</TableHead>
              <TableHead>Seats</TableHead>
              <TableHead>Foods</TableHead>
              <TableHead className='text-right'>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className='font-medium'>INV{order.id}</TableCell>
                  <TableCell>{order.user.fullName}</TableCell>
                  <TableCell>{new Date(order.reserved_at).toLocaleString()}</TableCell>
                  <TableCell>{order.showtime.movie.title}</TableCell>
                  <TableCell>{new Date(order.showtime.showtime_start).toLocaleString()}</TableCell>
                  <TableCell>{order.theater.theater_complex.name}</TableCell>
                  <TableCell>{order.seats.join(', ')}</TableCell>
                  <TableCell>
                    {order.foods.length > 0 ? order.foods.map((food: any) => food).join(', ') : 'None'}
                  </TableCell>
                  <TableCell className='text-right'>
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(parseFloat(order.total_price))}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className='text-center'>
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
