import React from 'react'
import Showtime from '@/types/showtime.type'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { toast, Toaster } from 'sonner'
import { Toast } from 'react-bootstrap'

interface Props {
  showtimes: Showtime[]
  selectedProvince?: string | null
  selectedTheaterId?: string | null
  selectedDate: Date // Nhận selectedDate từ props
}

interface GroupedShowtime {
  theater: Showtime['theater']
  showtimes: Showtime[]
}

const ShowtimeContainer: React.FC<Props> = ({ showtimes, selectedProvince, selectedTheaterId, selectedDate }) => {
  const navigate = useNavigate() // Khai báo useNavigate

  // Đặt lại thời gian của selectedDate về 00:00:00 để chỉ so sánh ngày
  const defaultDate = new Date(selectedDate)
  defaultDate.setHours(0, 0, 0, 0)

  // Lọc suất chiếu theo tỉnh
  const showtimeOfProvince = showtimes.filter((showtime) => {
    return showtime.theater.theater_complex.province === selectedProvince
  })

  // Lọc suất chiếu theo rạp nếu có
  const filteredShowtimes = selectedTheaterId
    ? showtimeOfProvince.filter((showtime) => showtime.theater.id === Number(selectedTheaterId))
    : showtimeOfProvince

  // Hàm để điều chỉnh giờ cho suất chiếu
  const adjustShowtime = (utcDate: string | Date) => {
    const date = new Date(utcDate)
    date.setHours(date.getHours() - 7) // Trừ 7 giờ để chuyển đổi về giờ Việt Nam
    return date
  }

  // Lọc suất chiếu theo ngày đã chọn
  const finalShowtimes = filteredShowtimes.filter((showtime) => {
    const adjustedShowtimeDate = adjustShowtime(showtime.showtime_start) // Điều chỉnh giờ trước khi so sánh
    adjustedShowtimeDate.setHours(0, 0, 0, 0) // Đặt lại thời gian về 00:00:00

    return (
      adjustedShowtimeDate.getFullYear() === defaultDate.getFullYear() &&
      adjustedShowtimeDate.getMonth() === defaultDate.getMonth() &&
      adjustedShowtimeDate.getDate() === defaultDate.getDate()
    )
  })

  // Nhóm suất chiếu theo theater
  const groupedShowtimes: { [key: number]: GroupedShowtime } = finalShowtimes.reduce(
    (acc, showtime) => {
      const theaterId = showtime.theater.id

      if (!acc[theaterId]) {
        acc[theaterId] = {
          theater: showtime.theater,
          showtimes: []
        }
      }
      acc[theaterId].showtimes.push(showtime)
      return acc
    },
    {} as { [key: number]: GroupedShowtime }
  )

  const formatShowtime = (showtime: string | Date) => {
    const date = new Date(showtime)
    const hours = date.getUTCHours() // Lấy giờ theo giờ UTC
    const minutes = date.getUTCMinutes() // Lấy phút theo giờ UTC

    // Định dạng giờ và phút
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
  }

  const handleBooking = (showtime: Showtime) => {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      toast.error('Vui lòng đăng nhặp !')
      return false
    }

    const bookingInfo = {
      titleMovie: showtime.movie.title,
      theaterComplex: showtime.theater.theater_complex,
      showtime: formatShowtime(showtime.showtime_start),
      date: selectedDate.toISOString().split('T')[0],
      totalPrice: 0,
      theater: showtime.theater.name,
      foods: [],
      seats: []
    }

    console.log('Booking Info:', bookingInfo) // Kiểm tra giá trị trước khi lưu
    localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo))

    // Kiểm tra xem localStorage đã được thiết lập không
    const storedInfo = localStorage.getItem('bookingInfo')
    console.log('Stored Booking Info:', storedInfo) // Kiểm tra giá trị đã lưu

    navigate(`/booking/${showtime.movie.title}`)
  }

  return (
    <div className='showtime-container'>
      {Object.values(groupedShowtimes).length > 0 ? (
        Object.values(groupedShowtimes).map(({ theater, showtimes }) => (
          <div key={theater.id} className='mb-5'>
            <h3 className='text-xl font-medium mb-2'>{theater.theater_complex.name}</h3>
            <div className='grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8'>
              {showtimes.map((showtime) => {
                const adjustedStartTime = adjustShowtime(showtime.showtime_start)
                return (
                  <div key={showtime.id} className='col-span-1'>
                    <Button
                      className='border-[1px] text-sm px-8 py-2 border-gray-400'
                      onClick={() => handleBooking(showtime)}
                    >
                      {adjustedStartTime.toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        ))
      ) : (
        <div className='text-center'>No showtimes available.</div>
      )}
    </div>
  )
}

export default ShowtimeContainer
