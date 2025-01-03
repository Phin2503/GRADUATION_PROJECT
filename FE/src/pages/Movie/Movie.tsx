import React, { useEffect, useState } from 'react'
import type { Movie } from '@/types/movie.type'
import { useMutation } from '@tanstack/react-query'
import { getAllMovie } from '@/apis/movie.api'
import SpanMain from '@/components/Span/SpanMain'
import SubSpan from '@/components/Span/SubSpan'
import CardMovieHome from '@/components/Card/CardMovieHome'

const Movie: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [showingMovies, setShowingMovies] = useState<Movie[]>([])
  const [noneShowingMovies, setNoneShowingMovies] = useState<Movie[]>([])
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
    mutate()
  }, [])

  const filterMovies = (showing: boolean) => {
    if (showing) {
      setMovies(showingMovies)
    } else {
      setMovies(noneShowingMovies)
    }
  }

  return (
    <div className='mx-auto w-[90%] p-10'>
      <div className='w-[80%] m-auto mt-9 flex-col items-center justify-center text-center'>
        <div className='flex py-10 items-center'>
          <SpanMain name='phim' />
          <SubSpan name='Đang Chiếu' onClick={() => filterMovies(true)} />
          <SubSpan name='Sắp Chiếu' onClick={() => filterMovies(false)} />
        </div>
        <div className='grid grid-cols-1 gap-1 w-[100%] px-5 text-center md:grid-cols-2  xl:grid-cols-4 2xl:grid-cols-4 xs:grid-cols-1 sm:grid-cols-1'>
          {movies.map((movie) => (
            <CardMovieHome key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Movie
