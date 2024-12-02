import { Movie } from '@/types/movie.type'
import { NavLink } from 'react-router-dom'

interface Props {
  movie: Movie
}

export default function CardMovieMenu({ movie }: Props) {
  return (
    <div>
      <div className='w-[100%] rounded break-words'>
        <div className='relative w-[100%] rounded-xl bg-black group/items'>
          <img src={movie.background_image_url} className='w-[100%] rounded-xl mb-2' />
          <div className='absolute inset-0 rounded-xl bg-black opacity-0 transition-opacity duration-300 group-hover/items:opacity-50 ' />
          <div className='absolute hidden right-8 top-24 bg-[#FF5400] w-[7rem] rounded-xl p-2 group-hover/items:block hover:text-white'>
            <NavLink to={`/order/${movie.id}`}>Buy Ticket</NavLink>
          </div>
        </div>
        <span>Cáo và Thỏ</span>
      </div>
    </div>
  )
}
