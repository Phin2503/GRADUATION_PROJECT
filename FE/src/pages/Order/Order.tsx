import { useEffect, useState } from 'react'
import SelectButton from '@/components/SelectButton/SelectButton'
import { useParams } from 'react-router-dom'
import CardMovieOrderPage from '@/components/Card/CardMovieOrderPage'
import SpanMain from '@/components/Span/SpanMain'
import { Movie } from '@/types/movie.type'
import axiosInstance from '../../axios/axiosConfig' // Import Axios instance
import Showtime from '@/types/showtime.type'
import InfoMovie from '@/components/InfoMovie/InfoMovie'
import DateButtons from '@/components/OrderPage/ButtonOrderPage/DateButtons.OrderPage'
import ShowtimeContainer from '@/components/OrderPage/ShowtimeContainer'

export default function Order() {
  const [showingMovies, setShowingMovies] = useState<Movie[]>([])
  const [movie, setMovie] = useState<Movie | null>(null)
  const [showtimes, setShowtimes] = useState<Showtime[]>([])
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)
  const [selectedTheaterId, setSelectedTheaterId] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const { id } = useParams()

  const fetchMovies = async () => {
    try {
      const response = await axiosInstance.get('/movie')
      const moviesData = response.data || []
      setShowingMovies(moviesData.filter((movie: { showing: number }) => movie.showing == 1))
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }

  const fetchMovie = async (movieId: string) => {
    try {
      const response = await axiosInstance.get(`/movie/${movieId}`)
      setMovie(response.data || null)
    } catch (error) {
      console.error('Error fetching movie:', error)
    }
  }

  const fetchShowtime = async (movieId: string) => {
    try {
      const response = await axiosInstance.get(`/showtime/movie/${movieId}`)
      setShowtimes(response.data || [])
    } catch (error) {
      console.error('Error fetching showtimes:', error)
    }
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  useEffect(() => {
    if (id) {
      fetchShowtime(id)
      fetchMovie(id)
    }
  }, [id])

  return (
    <div className='w-full bg-[#FAF7F0] h-full text-center'>
      <div className='relative bg-black flex justify-center w-full h-full'>
        <iframe
          width='1200'
          height='430'
          src='https://www.youtube.com/embed/8l4crgVt36Y?si=K24hGqwKVGJ9yoeM&amp;controls=0'
          title='YouTube video player'
          allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerPolicy='strict-origin-when-cross-origin'
        ></iframe>
      </div>
      <div className='grid gap-4 h-full w-[80%] mx-auto my-5 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-12'>
        <div className='col-span-8 p-4'>
          <div className='grid gap-0 grid-cols-10 w-full xs:grid-cols-1 md:grid-cols-1 lg:grid-cols-10'>
            {movie && (
              <>
                <img
                  src={movie.background_image_url}
                  className='col-span-5 w-full border-[4px] border-white lg:-translate-y-36 xs:col-span-1 md:col-span-1 lg:col-span-4 md:w-[65%] xs:w-[50%] lg:w-[92%]'
                  alt={movie.title}
                />
                <InfoMovie movie={movie} />
              </>
            )}
          </div>
          <div className='content-movie text-left mb-10'>
            <h3 className='border-l-[5px] border-[#0A3981] pl-3 text-xl mb-4 font-bold'>Nội Dung Phim</h3>
            <p className='text-gray-600'>{movie?.description}</p>
          </div>
          <div className='schedule-showing text-left'>
            <h3 className='border-l-[5px] border-[#0A3981] pl-3 text-xl mb-4 font-bold'>Lịch Chiếu</h3>
            <div className='select-date-and-theater mb-10 p-3 gap-6 grid grid-cols-1 md:grid-cols-2 justify-around items-center border-b-[3px] border-[#034EA1]'>
              <DateButtons onDateSelect={handleDateSelect} />
              <SelectButton
                showtimes={showtimes}
                onSelectProvince={setSelectedProvince}
                onSelectTheater={setSelectedTheaterId}
              />
            </div>
            <ShowtimeContainer
              showtimes={showtimes}
              selectedProvince={selectedProvince}
              selectedTheaterId={selectedTheaterId}
              selectedDate={selectedDate}
            />
          </div>
        </div>
        <div className='col-span-4 grid grid-cols-1 w-[80%] ml-10 gap-0'>
          <div className='col-span-1 text-left mb-2'>
            <SpanMain name={'Phim Đang Chiếu'} mb='mb-5' text_size='2xl' mt='mb-3' />
          </div>
          {showingMovies.slice(0, 4).map((movie) => (
            <CardMovieOrderPage key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  )
}
