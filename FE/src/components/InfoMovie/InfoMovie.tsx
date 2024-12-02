import { Movie } from '@/types/movie.type'
import { FaRegCalendar, FaStar } from 'react-icons/fa'
import { IoMdTime } from 'react-icons/io'
import dayjs from 'dayjs'

interface Props {
  movie?: Movie
}

export default function InfoMovie({ movie }: Props) {
  return (
    <>
      <div className='col-span-5 w-full text-left ml-0 xs:ml-0 md:ml-0 lg:ml-2 '>
        <div className='w-full'>
          <div className='w-full flex mb-2'>
            <h2 className='text-2xl font-bold'>{movie ? movie.title : ''}</h2>
            <span className='px-2 py-1 rounded-[0.2rem] text-center bg-[#F5801F] ml-3'>T18</span>
          </div>
          <div className='flex mb-3'>
            <div className='flex items-center justify-center mr-5'>
              <IoMdTime className='text-md text-[#F5801F] mr-1' />
              <span className='text-sm'>{movie ? movie.duration : ''} munites</span>
            </div>
            <div className='flex items-center justify-center'>
              <FaRegCalendar className='text-sm text-[#F5801F] mr-1' />
              <span className='text-sm'> {movie ? dayjs(movie.release_date).format('DD-MM-YYYY') : ''}</span>
            </div>
          </div>
          <div className='flex items-center text-left mb-3'>
            <FaStar className='text-xl text-[#F5801F] mr-2' />
            <span className='text-xl hover:text-[#F5801F] mr-2'>8.3</span>
            <span className='opacity-85 text-sm'>(109 vote)</span>
          </div>
          <div className='flex mb-5'>
            <span className='text-sm mr-2'>Nhà sản suất : </span>
            <span className='hover:text-[#F5801F] text-sm mr-1'>89s Group,</span>
            <span className='hover:text-[#F5801F] text-sm mr-1'>F35 Studio,</span>
            <span className='hover:text-[#F5801F] text-sm'>Galaxy Studio</span>
          </div>
        </div>
        <div>
          <div className='flex text-sm items-center mb-3'>
            <span className='mr-3'>Thể loại : </span>
            <button className='px-2 py-1 rounded-[0.2rem] border-[1px] hover:border-[#F5801F] border-gray-400'>
              Kinh dị
            </button>
          </div>
          <div className='flex text-sm items-center mb-3'>
            <span className='mr-3'>Đạo Diễn : </span>
            <button className='px-2 py-1 rounded-[0.2rem] border-[1px] hover:border-[#F5801F] border-gray-400'>
              Lưu Thành Luân
            </button>
          </div>
          <div className='flex text-sm items-center mb-3'>
            <span className='mr-3'>Diễn viên : </span>
            <button className='px-2 py-1 rounded-[0.2rem] border-[1px] hover:border-[#F5801F] border-gray-400 mr-2'>
              Hồng Đào
            </button>
            <button className='px-2 py-1 rounded-[0.2rem] border-[1px] hover:border-[#F5801F] border-gray-400 mr-2'>
              Nguyễn Thúc Thuỳ Tiên
            </button>
            <button className='px-2 py-1 rounded-[0.2rem] border-[1px] hover:border-[#F5801F] border-gray-400 mr-2'>
              Thiên An
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
