import { Movie } from '@/types/movie.type'
import http from '@/utils/http'

const API_URL_MOVIE = `${import.meta.env.VITE_BASE_URL}/movie`

export const getMovieById = (id: string) => http.get<Movie>(`${API_URL_MOVIE}/${id}`)
export const getAllMovie = () => http.get<Movie[]>(`${API_URL_MOVIE}`)
