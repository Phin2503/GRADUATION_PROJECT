import { Movie } from '@/types/movie.type'

import { NavLink } from 'react-router-dom'

interface Props {
  movie: Movie
}

export default function CardMovieHome({ movie }: Props) {
  return (
    <div className='mb-3 flex flex-col h-[95%] items-center group'>
      <div className='relative w-[80%] mb-1'>
        <img src={movie.background_image_url} className='rounded-[1rem] w-full' alt={movie.title} />
        <div className='bg-black w-full h-full absolute rounded-[1rem] top-0 left-0 opacity-0 group-hover:opacity-60 transition-opacity duration-300'></div>

        <NavLink
          className='text-center flex items-center justify-center h-[2.5rem] py-auto w-[7rem] text-md rounded-[0.2rem] bg-[#FF5400] opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-40 left-1/2 transform -translate-x-1/2 hover:text-white hover:bg-[#FF8225]'
          to={`/order/${movie.id}`}
        >
          Mua vé
        </NavLink>

        <button className='h-10 w-30 text-md rounded-[0.2rem] opacity-10 border-[1px] border-white text-white group-hover:opacity-100 transition-opacity duration-300 absolute bottom-28 left-1/2 transform -translate-x-1/2 md:px-8 hover:text-white hover:bg-[#FF8225]'>
          <NavLink to=''>Trailer</NavLink>
        </button>
      </div>
      <span className='font-medium'>{movie.title}</span>
    </div>
  )
}
