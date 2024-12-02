import { Movie } from '@/types/movie.type'
import CardMovieMenu from './CardMovieMenu'

interface Props {
  movies: Movie[]
  name: string
}

export default function ListCardMenu({ movies, name }: Props) {
  return (
    <>
      <div className='grid grid-cols-4 gap-4 text-center w-[95%] p-3'>
        <span className='row-span-1 col-span-4 text-left pl-1 border-l-4 border-[#FF5400]'>{name}</span>
        {movies.slice(0, 4).map((movie) => (
          <CardMovieMenu key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  )
}
