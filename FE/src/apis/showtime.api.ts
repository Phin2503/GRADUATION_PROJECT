import Showtime from '@/types/showtime.type'
import http from '@/utils/http'

const API_URL_GET_SHOWTIME_BY_ID = `${import.meta.env.VITE_BASE_URL}/showtime/movie`
const API_URL_GET_SHOWTIMES = `${import.meta.env.VITE_BASE_URL}/showtime`

export const getShowtimeByMovieId = (id: string) => http.get<Showtime[]>(`${API_URL_GET_SHOWTIME_BY_ID}/${id}`)
export const getShowtimes = () => http.get<Showtime[]>(`${API_URL_GET_SHOWTIMES}`)
