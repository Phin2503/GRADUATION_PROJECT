import TheaterComplex from '@/types/TheaterComplex.type'
import http from '@/utils/http'

const API_URL_GET_ALL_THEATER_COMPLEX = `${import.meta.env.VITE_BASE_URL}/theaterComplex`

export const getAllTheaters = () => http.get<TheaterComplex[]>(`${API_URL_GET_ALL_THEATER_COMPLEX}`)
