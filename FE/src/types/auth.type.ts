import { User } from './user.type'

export interface AuthResponse {
  msg: string
  payload: User
  access_token: string
  refresh_token: string
}
