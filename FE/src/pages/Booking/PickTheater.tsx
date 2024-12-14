import ButtonProvince from '@/components/Booking/ButtonProvince'
import ButtonShowtime from '@/components/Booking/ButtonShowtime'
import DateButton from '@/components/OrderPage/ButtonOrderPage/DateButton'
import SpanMain from '@/components/Span/SpanMain'
import { useMutation } from '@tanstack/react-query'
import { getShowtimes } from '@/apis/showtime.api'
import { useEffect, useState } from 'react'
import Showtime from '@/types/showtime.type'
import { getAllMovie } from '@/apis/movie.api'
import { Movie } from '@/types/movie.type'
import { TiTick } from 'react-icons/ti'
import { getAllTheaters } from '@/apis/theater_complex.api'
import TheaterComplex from '@/types/TheaterComplex.type'
import InfoBooking from './InfoBooking'
import { toast } from 'sonner'

interface ShowtimesByTheaterComplex {
  [theaterComplexName: string]: Showtime[]
}

interface Props {
  onContinue?: () => void
}

interface GroupedShowtime {
  movie: Movie
  showtimes: Showtime[]
}

type GroupedShowtimes = {
  [movieId: number]: GroupedShowtime
}

export default function PickTheater({ onContinue }: Props) {
  const [showtimes, setShowtimes] = useState<Showtime[]>([])
  const [provinces, setProvinces] = useState<Set<string>>(new Set())
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([])
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [availableShowtimes, setAvailableShowtimes] = useState<Showtime[]>([])
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<number | null>(null)
  const [theaterComplexs, setTheaterComplexs] = useState<TheaterComplex[]>([])
  const [filteredTheaterComplexs, setFilteredTheaterComplexs] = useState<TheaterComplex[]>([])

  const { mutate: fetchTheaterComplex } = useMutation({
    mutationFn: getAllTheaters,
    onSuccess(response) {
      setTheaterComplexs(response.data)
    }
  })

  const { mutate: fetchShowtime } = useMutation({
    mutationFn: getShowtimes,
    onSuccess(response) {
      const adjustedShowtimes = response.data.map((showtime) => {
        const start = new Date(showtime.showtime_start)
        const end = new Date(showtime.showtime_end)
        start.setHours(start.getHours() - 7)
        end.setHours(end.getHours() - 7)

        return {
          ...showtime,
          showtime_start: start.toISOString(),
          showtime_end: end.toISOString()
        }
      })

      setShowtimes(adjustedShowtimes)
      const newProvinces = new Set(provinces)
      adjustedShowtimes.forEach((showtime) => {
        const province = showtime?.theater_complex?.province
        if (province) {
          newProvinces.add(province)
        }
      })
      setProvinces(newProvinces)
    }
  })

  const { mutate: fetchMovies } = useMutation({
    mutationFn: getAllMovie,
    onSuccess(response) {
      setMovies(response.data || [])
    }
  })

  useEffect(() => {
    localStorage.removeItem('bookingInfo')
    localStorage.removeItem('orderId')
    localStorage.removeItem('countdown')
    fetchTheaterComplex()
    fetchShowtime()
    fetchMovies()
  }, [fetchShowtime, fetchMovies, fetchTheaterComplex])

  useEffect(() => {
    if (selectedProvince) {
      const filtered = theaterComplexs.filter((theater) => theater.province === selectedProvince)
      setFilteredTheaterComplexs(filtered)

      const filteredMovies = movies.filter((movie) =>
        showtimes.some(
          (showtime) => showtime.theater_complex?.province === selectedProvince && showtime.movie?.id === movie.id
        )
      )
      setFilteredMovies(filteredMovies)
    } else {
      setFilteredTheaterComplexs(theaterComplexs)
      setFilteredMovies(movies)
    }
  }, [selectedProvince, theaterComplexs, movies, showtimes])

  useEffect(() => {
    if (selectedMovie && selectedDate) {
      const currentTime = new Date()
      const filteredShowtimes = showtimes.filter((showtime) => {
        const showtimeStart = new Date(showtime.showtime_start)
        return (
          showtime.movie?.id === selectedMovie.id &&
          new Date(showtime.showtime_start).toLocaleDateString() === new Date(selectedDate).toLocaleDateString() &&
          showtimeStart > currentTime
        )
      })
      setAvailableShowtimes(filteredShowtimes)
    } else {
      setAvailableShowtimes([])
    }
  }, [selectedMovie, selectedDate, showtimes])

  const handleProvinceSelect = (province: string) => {
    setSelectedProvince(province)
    setSelectedMovie(null)
    setAvailableShowtimes([])
  }

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie)
  }

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
  }

  const handleShowtimeSelect = (showtimeId: number) => {
    setSelectedShowtimeId(showtimeId)
  }

  const handleContinue = () => {
    // Kiểm tra thông tin đã chọn
    if (!selectedProvince || !selectedMovie || !selectedShowtimeId) {
      toast.error('Vui lòng chọn đầy đủ thông tin: Tỉnh, Phim và Suất Chiếu!')
      return
    }
    if (onContinue) {
      onContinue()
    }
  }

  const groupedShowtimes: GroupedShowtimes = availableShowtimes.reduce((acc, showtime) => {
    const movieId = showtime.movie?.id
    if (!acc[movieId]) {
      acc[movieId] = {
        movie: showtime.movie,
        showtimes: []
      }
    }
    acc[movieId].showtimes.push(showtime)
    return acc
  }, {} as GroupedShowtimes)

  const selectedShowtime = availableShowtimes.find((showtime) => showtime.id === selectedShowtimeId)
  const showtime = selectedShowtime
    ? new Date(selectedShowtime.showtime_start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'Chưa chọn suất chiếu'
  const dateFormatted = selectedDate
    ? new Date(selectedDate).toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      })
    : 'Chưa chọn ngày'

  return (
    <div className='grid grid-cols-12 h-auto gap-2 w-[100%] m-auto'>
      <div className='col-span-9 grid grid-cols-1'>
        {/* Select Province */}
        <div className='col-span-1 bg-[#FDF7F4] grid grid-cols-1 p-10 rounded-[0.3rem] mb-2 shadow-md'>
          <div className='col-span-1 mb-3'>
            <SpanMain name={'Chọn Vị Trí'} text_size='text-lg' mb='mb-1' text_color='text-black' />
          </div>
          <div className='col-span-1 grid grid-cols-8 gap-2'>
            {[...provinces].map((province) => (
              <div key={province} className='col-span-1'>
                <ButtonProvince
                  name={province}
                  onClick={() => handleProvinceSelect(province)}
                  className={`${selectedProvince === province ? 'bg-black text-white' : 'bg-white text-black'}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Select Movie */}
        <div className='col-span-1 bg-[#FDF7F4] grid grid-cols-1 p-10 rounded-[0.3rem] mb-2 shadow-md'>
          <div className='col-span-1 mb-3'>
            <SpanMain name={'Chọn Phim'} text_size='text-lg' mb='mb-1' text_color='text-black' />
          </div>
          <div className='col-span-1 grid grid-cols-4 gap-4'>
            {filteredMovies.map((movie) => (
              <div key={movie.id} className='col-span-1 relative flex-col justify-center'>
                <img
                  src={movie.background_image_url}
                  alt={movie.title}
                  className='w-full h-auto cursor-pointer'
                  onClick={() => handleMovieSelect(movie)}
                />
                {selectedMovie?.id === movie.id && (
                  <>
                    <div className='absolute inset-0 h-[90%] bg-black opacity-50 flex justify-center items-center' />
                    <TiTick className='absolute inset-0 flex justify-center items-center text-blue-600 text-3xl' />
                  </>
                )}
                <h4 className='font-medium text-center mt-2'>{movie.title}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Select Date and Showtimes */}
        <div className='col-span-1 bg-[#FDF7F4] grid grid-cols-1 p-10 rounded-[0.3rem] shadow-md'>
          <div className='col-span-1 mb-3'>
            <SpanMain name={'Chọn Ngày'} text_size='text-lg' mb='mb-3' text_color='text-black' />
          </div>
          <div className='col-span-1 grid grid-cols-8 gap-1 mb-10'>
            {Array.from({ length: 4 }).map((_, index) => {
              const date = new Date()
              date.setDate(date.getDate() + index)
              const formattedDate = date.toISOString().split('T')[0]
              const displayDate =
                index === 0 ? 'Hôm nay' : date.toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric' })

              return (
                <DateButton
                  key={index}
                  date={displayDate}
                  onClick={() => handleDateSelect(formattedDate)}
                  className={`${selectedDate === formattedDate ? 'bg-orange-400 text-black' : 'bg-black '}`}
                />
              )
            })}
          </div>

          {/* Hiển thị cụm rạp và suất chiếu */}
          <div className='col-span-1 grid grid-cols-1'>
            {selectedMovie && selectedProvince && filteredTheaterComplexs.length > 0 ? (
              filteredTheaterComplexs.map((theater) => (
                <div key={theater.id} className='mb-5'>
                  <h3 className='font-medium text-lg mb-2 text-black'>{theater.name}</h3>
                  <div className='grid grid-cols-4'>
                    {Object.values(groupedShowtimes).length > 0 ? (
                      Object.values(groupedShowtimes).map(({ movie, showtimes }) => (
                        <div key={movie.id} className='col-span-4 mb-2'>
                          <h4 className='font-medium text-black'>{movie.title}</h4>
                          <div className='grid grid-cols-8 gap-1'>
                            {showtimes.map((showtime) => (
                              <ButtonShowtime
                                key={showtime.id}
                                time={`${new Date(showtime.showtime_start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                                onClick={() => handleShowtimeSelect(showtime.id)}
                                className={`border ${selectedShowtimeId === showtime.id ? 'border-orange-400' : 'border-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className='text-black'>Không có suất chiếu nào cho cụm rạp này vào ngày đã chọn.</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className='text-black'>Không có suất chiếu nào cho phim đã chọn trong cụm rạp.</p>
            )}
          </div>
        </div>
      </div>
      <div className='col-span-3 flex-col justify-center items-center'>
        <InfoBooking
          movieTitle={selectedMovie?.title || 'Chưa chọn phim'}
          theaterComplex={selectedShowtime?.theater_complex}
          showtime={showtime}
          Showtime2={selectedShowtime}
          date={dateFormatted}
          theater={selectedShowtime?.theater?.name || 'Chưa chọn cụm rạp'}
          totalAmount={'0đ'}
          onContinue={handleContinue} // Sử dụng handleContinue
          linkNavigate={selectedShowtime?.movie?.title}
        />
      </div>
      {/* <Toaster position='top-right' /> Thêm Toaster */}
    </div>
  )
}
