import http from '@/utils/http'

const API_URL_ORDER = `${import.meta.env.VITE_BASE_URL}/order` // Đảm bảo rằng đường dẫn đúng

export const createOrder = (
  theaterId: any,
  showtimeId: any,
  userId: any,
  total_price: any,
  seats?: any[],
  foods?: any[]
) => {
  return http.post<any>(`${API_URL_ORDER}/${theaterId}/${showtimeId}`, {
    userId,
    seats: seats || [],
    foods: foods || [],
    total_price
  })
}

export const updateOrder = (orderId: any, userId: any, total_price: any, seats?: any[], foods?: any[]) => {
  return http.put<any>(`${API_URL_ORDER}/update/${orderId}`, {
    userId,
    seats: seats || [],
    foods: foods || [],
    total_price
  })
}

export const getOrderById = (orderId: any) => http.get<any>(`${API_URL_ORDER}/${orderId}`)

export const getSeatsOrdered = (theaterId: number, showtimeId: number) =>
  http.get<string[]>(`${API_URL_ORDER}/${theaterId}/${showtimeId}`)
