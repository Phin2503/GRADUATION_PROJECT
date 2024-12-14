import { Food } from '@/types/Food.type'
import http from '@/utils/http'

const API_URL_FOOD = `${import.meta.env.VITE_BASE_URL}/food`

export const getAllFood = () => http.get<Food[]>(`${API_URL_FOOD}`)
