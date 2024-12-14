import { AuthResponse } from '@/types/auth.type'
import RegisterRequest from '@/types/registerRequest.type'
import http from '@/utils/http'

export const loginRequest = (body: { email: string; password: string }) => http.post<AuthResponse>('/user/login', body)
export const registerRequest = (body: RegisterRequest) => http.post<AuthResponse>('user/register', body)

// Hàm kiểm tra access token
export const checkAccessToken = async (accessToken: string): Promise<boolean> => {
  try {
    const response = await http.get('/user/verify-token', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return response.status === 200
  } catch (error) {
    return false
  }
}

// Hàm làm mới access token
export const refreshAccessToken = async (refreshToken: string): Promise<string | null> => {
  try {
    const response = await http.post('/user/refresh-token', {
      body: refreshToken
    })
    console.log(response.data)
    return response.data.access_token
  } catch (error) {
    console.error('Refresh token failed', error)
    return null
  }
}
