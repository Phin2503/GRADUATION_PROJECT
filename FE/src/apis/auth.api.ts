import { AuthResponse } from '@/types/auth.type'
import RegisterRequest from '@/types/registerRequest.type'
import http from '@/utils/http'

export const loginRequest = (body: { email: string; password: string }) => http.post<AuthResponse>('/user/login', body)
export const registerRequest = (body: RegisterRequest) => http.post<AuthResponse>('user/register', body)
