import { getAllMovie } from '@/apis/movie.api'
import CardMovieHome from '@/components/Card/CardMovieHome'
import Carousel from '@/components/Carousel/Carousel'
import SpanMain from '@/components/Span/SpanMain'
import SubSpan from '@/components/Span/SubSpan'
import { Movie } from '@/types/movie.type'
import { MdOutlineNavigateNext } from 'react-icons/md'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { FaEye } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import ChatBox from '@/components/Chatbox/Chatbox'

interface Event {
  id: number
  title: string
  description: string
  main_img_url: string
  sub_img_url: string
  content: string
}

export default function HomeContent() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [showingMovies, setShowingMovies] = useState<Movie[]>([])
  const [noneShowingMovies, setNoneShowingMovies] = useState<Movie[]>([])
  const [events, setEvents] = useState<Event[]>([])

  const { mutate } = useMutation({
    mutationFn: getAllMovie,
    onSuccess(response) {
      const moviesData = response.data
      setMovies(moviesData)
      setShowingMovies(moviesData.filter((movie) => movie.showing == 1))
      setNoneShowingMovies(moviesData.filter((movie) => movie.showing == 0))
    }
  })

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/event/`)
        const data: Event[] = await response.json()
        setEvents(data)
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    }
    fetchEvents()
  }, [])

  useEffect(() => {
    localStorage.removeItem('bookingInfo')
    localStorage.removeItem('orderId')
    mutate()
  }, [mutate])

  const filterMovies = (showing: boolean) => {
    if (showing) {
      setMovies(showingMovies)
    } else {
      setMovies(noneShowingMovies)
    }
  }

  return (
    <>
      <div className='bg-[#FAF7F0]'>
        <Carousel />
        <div className='w-[80%] m-auto mt-9 flex-col items-center justify-center text-center'>
          <div className='flex py-10 items-center'>
            <SpanMain name='phim' />
            <SubSpan name='Đang Chiếu' onClick={() => filterMovies(true)} />
            <SubSpan name='Sắp Chiếu' onClick={() => filterMovies(false)} />
          </div>
          <div className='grid grid-cols-1 gap-1 w-[100%] px-5 text-center md:grid-cols-2  xl:grid-cols-4 2xl:grid-cols-4 xs:grid-cols-1 sm:grid-cols-1'>
            {movies.slice(0, 8).map((movie) => (
              <CardMovieHome key={movie.id} movie={movie} />
            ))}
          </div>

          <NavLink
            className='w-[8rem] h-[2.5rem] border-[1px] border-[#f37f1d] text-[#f37f1d] rounded-[0.2rem] mx-auto flex justify-center items-center hover:text-white hover:bg-[#f37f1d]'
            to={'/movie'}
          >
            Xem Thêm
            <MdOutlineNavigateNext className='ml-[0.2rem]' />
          </NavLink>
        </div>
        <div className='w-[100%] h-2 bg-gray-300 my-6'></div>
        <div className='w-[80%] mx-auto my-9'>
          <div className='flex py-10 items-center'>
            <SpanMain name='Góc điện ảnh' />
            <SubSpan name='Blog Điện Ảnh' />
          </div>
          <div className='grid w-[90%] sm:grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2'>
            <div className='w-full overflow-hidden'>
              <NavLink to='review'>
                <img
                  src='https://www.galaxycine.vn/media/2024/11/20/rv-linh-mieu-750_1732095988042.jpg'
                  alt=''
                  className='w-full h-auto mb-2 rounded-[0.3rem] transition-transform duration-500 hover:scale-105'
                />
              </NavLink>
              <h3 className='text-xl break-words font-medium hover:text-gray-600 w-[80%] mb-2'>
                <NavLink to=''>[Review] Linh Miêu Quỷ Nhập Tràng: Khi Sự Mê Tín Hủy Hoại Một Gia Tộc</NavLink>
              </h3>
              <div className='flex'>
                <button className='px-2 bg-[#1677F2] flex justify-center items-center rounded-[5px] mr-2 text-xs'>
                  <AiOutlineLike />
                  <span>Like</span>
                </button>
                <button className='px-2 bg-gray-300 flex justify-center items-center rounded-[5px] text-xs'>
                  <span>42</span>
                  <FaEye />
                </button>
              </div>
            </div>

            <div className='grid grid-cols-1 gap-1 h-[90%]'>
              <div className='flex mb-2'>
                <NavLink className='w-1/3 h-auto mr-2 ' to='review'>
                  <img
                    src='https://www.galaxycine.vn/media/2024/11/20/750_1732088886220.jpg'
                    className='rounded-[0.3rem] transition-transform duration-700 hover:scale-105'
                    alt=''
                  />
                </NavLink>

                <div className='flex w-2/3'>
                  <div>
                    <h3 className='text-lg '>
                      <NavLink to=''>[Review] Gladiator II: Khúc Ca Khải Hoàn Của Võ Sĩ Giác Đấu</NavLink>
                    </h3>
                    <div className='flex'>
                      <button className='px-2 bg-[#1677F2] flex justify-center items-center rounded-[5px] mr-2 text-xs'>
                        <AiOutlineLike />
                        <span>Like</span>
                      </button>
                      <button className='px-2 bg-gray-300 flex justify-center items-center rounded-[5px] text-xs'>
                        <span>42</span>
                        <FaEye />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex mb-2'>
                <NavLink className='w-1/3 h-auto mr-2 ' to='review'>
                  <img
                    src='https://www.galaxycine.vn/media/2024/12/6/moana-2-khong-phai-la-cong-chua--moana-tro-lai-voi-vai-tro-moi-3_1733473270430.jpg'
                    className='rounded-[0.3rem] transition-transform duration-700 hover:scale-105'
                    alt=''
                  />
                </NavLink>

                <div className='flex w-2/3'>
                  <div>
                    <h3 className='text-lg '>
                      <NavLink to=''>[Review] Moana 2: Không Phải Là Công Chúa, Moana Trở Lại Với Vai Trò Mới?</NavLink>
                    </h3>
                    <div className='flex'>
                      <button className='px-2 bg-[#1677F2] flex justify-center items-center rounded-[5px] mr-2 text-xs'>
                        <AiOutlineLike />
                        <span>Like</span>
                      </button>
                      <button className='px-2 bg-gray-300 flex justify-center items-center rounded-[5px] text-xs'>
                        <span>42</span>
                        <FaEye />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex mb-2'>
                <NavLink className='w-1/3 h-auto mr-2 ' to='review'>
                  <img
                    src='https://www.galaxycine.vn/media/2024/12/22/1135-2_1734859811267.jpg'
                    className='rounded-[0.3rem] transition-transform duration-700 hover:scale-105'
                    alt=''
                  />
                </NavLink>

                <div className='flex w-2/3'>
                  <div>
                    <h3 className='text-lg '>
                      <NavLink to=''>[Review] Chị Dâu: Đại Tiệc Diễn Xuất Giữa Chị Dâu - Em Chồng</NavLink>
                    </h3>
                    <div className='flex'>
                      <button className='px-2 bg-[#1677F2] flex justify-center items-center rounded-[5px] mr-2 text-xs'>
                        <AiOutlineLike />
                        <span>Like</span>
                      </button>
                      <button className='px-2 bg-gray-300 flex justify-center items-center rounded-[5px] text-xs'>
                        <span>42</span>
                        <FaEye />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='w-[100%] h-2 bg-gray-300 my-6'></div>
        <div className='w-[80%] mx-auto my-9'>
          <div className='flex py-10 items-center'>
            <span className='border-l-[5px] border-[#FF5400] px-4 text-2xl uppercase'>Tin Khuyến mãi</span>
          </div>
          <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4'>
            {events.slice(0, 4).map((event) => (
              <div key={event.id} className='w-[90%]'>
                <img
                  src={event.main_img_url}
                  alt={event.title}
                  className='transition-transform duration-500 hover:scale-105 mb-2'
                />
                <NavLink to={`event/${event.id}`}>{event.title}</NavLink>
              </div>
            ))}
          </div>
        </div>
        <ChatBox />
      </div>
    </>
  )
}
