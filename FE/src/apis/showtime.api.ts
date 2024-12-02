import Showtime from '@/types/showtime.type'
import http from '@/utils/http'

const API_URL_GET_SHOWTIME_BY_ID = `${import.meta.env.VITE_BASE_URL}/showtime/movie`

export const getShowtimeByMovieId = (id: string) => http.get<Showtime[]>(`${API_URL_GET_SHOWTIME_BY_ID}/${id}`)
