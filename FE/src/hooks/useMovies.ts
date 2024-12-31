import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { getAllMovie } from '@/apis/movie.api'
import { Movie } from '@/types/movie.type'

const useMovies = () => {
  const [showingMovies, setShowingMovies] = useState<Movie[]>([])
  const [noneShowingMovies, setNoneShowingMovies] = useState<Movie[]>([])

  const { mutate } = useMutation({
    mutationFn: getAllMovie,
    onSuccess(response) {
      const moviesData = response.data
      setShowingMovies(moviesData.filter((movie: Movie) => movie.showing == 1))
      setNoneShowingMovies(moviesData.filter((movie: Movie) => movie.showing == 0))
    }
  })

  useEffect(() => {
    mutate()
  }, [mutate])

  return { showingMovies, noneShowingMovies }
}

export default useMovies
