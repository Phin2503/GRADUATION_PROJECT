import { NavLink } from 'react-router-dom'
import { Movie } from '@/types/movie.type'

interface Props {
  movie: Movie
}

export default function CardMovieOrderPage({ movie }: Props) {
  return (
    <div className='col-span-1 w-[50%] '>
      <div className='relative group h-[80%]'>
        <img src={`${movie.background_image_url}`} className='rounded-[0.4rem] w-[100%] h-[100%] object-fill' />
        <div className='bg-black w-[100%] h-[100%] absolute rounded-[1rem] top-0 left-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300'></div>
        <NavLink
          className='text-center flex items-center justify-center h-[2.5rem] w-[7rem] text-md rounded-[0.2rem] bg-[#FF5400] opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:text-white hover:bg-[#FF8225]'
          to={`${movie.id}`}
        >
          Mua vé
        </NavLink>
        <span className='text-md col-span-1 text-left'>{movie.title}</span>
      </div>
    </div>
  )
}
