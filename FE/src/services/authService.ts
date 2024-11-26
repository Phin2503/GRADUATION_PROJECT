import axios from 'axios'

const API_URL_LOGIN = `${import.meta.env.VITE_BASE_URL}/user/login`

export const login = async (email: string, password: string) => {
  const response = await axios.post(API_URL_LOGIN, { email, password })
  return response.data
}
