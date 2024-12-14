import { toast, Toaster } from 'sonner'
import Button from './Button'
import { Toast } from 'react-bootstrap'

type ListItemProps = {
  label: string
  buttons: number[]
  reservedSeats: string[]
  selectedSeats: string[]
  onSelectSeat: (seat: string) => void
  dataBooking?: any
}

const ListSeat = ({ label, buttons, reservedSeats, selectedSeats, onSelectSeat }: ListItemProps) => {
  const handleSeatClick = (seat: string) => {
    const seatIndex = parseInt(seat.replace(label, '')) // Lấy số ghế

    // Ghế bên trái và bên phải
    const leftSeat = `${label}${seatIndex - 1}`
    const rightSeat = `${label}${seatIndex + 1}`

    // Kiểm tra xem ghế đã được chọn hay chưa
    const isSelected = selectedSeats.includes(seat)

    // Nếu đang bỏ chọn ghế
    if (isSelected) {
      onSelectSeat(seat) // Bỏ chọn ghế
      return
    }

    // Kiểm tra xem việc chọn ghế này có để lại ghế trống bên cạnh không
    const leftSelected = selectedSeats.includes(leftSeat)
    const rightSelected = selectedSeats.includes(rightSeat)

    const canSelect = !reservedSeats.includes(seat) && (leftSelected || rightSelected || selectedSeats.length === 0)

    // Nếu không thể chọn ghế, hiển thị thông báo lỗi
    if (!canSelect) {
      toast.error('Bạn không thể để ghế trống giữa các ghế đã chọn.')
      return
    }

    // Nếu có ghế bên cạnh đã chọn hoặc chưa có ghế nào được chọn
    onSelectSeat(seat) // Chọn ghế
  }

  return (
    <li className='flex items-center justify-between'>
      <div className='text-sm text-gray-400 font-semibold w-5 flex-shrink-0 text-center'>{label}</div>
      <div className='flex flex-1 justify-center gap-1 md:gap-2'>
        {buttons.map((btn, index) => {
          const seat = `${label}${btn}`
          return (
            <Button
              key={index}
              label={btn} // Đảm bảo label là chuỗi
              disabled={reservedSeats.includes(seat)} // Disable nếu ghế đã được đặt
              isSelected={selectedSeats.includes(seat)}
              onClick={() => handleSeatClick(seat)}
            />
          )
        })}
      </div>
      <div className='text-sm text-gray-400 font-semibold w-5 flex-shrink-0 text-center'>{label}</div>
    </li>
  )
}

export default ListSeat
