import { PaymentType } from '@/types/payment.type'
import http from '@/utils/http'

const API_URL_CREATE_VNPAY_PAYMENT = `${import.meta.env.VITE_BASE_URL}/vnpay/payment`

export const createPayment = () => http.post<PaymentType>(`${API_URL_CREATE_VNPAY_PAYMENT}`)
