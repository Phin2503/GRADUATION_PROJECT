import { Coupon } from '@/types/coupon.type'
import http from '@/utils/http'

const API_URL_CHECK_COUPON = `${import.meta.env.VITE_BASE_URL}/coupon/check`
export const checkCoupon = (coupon: string) => http.get<Coupon>(`${API_URL_CHECK_COUPON}/${coupon}`)
