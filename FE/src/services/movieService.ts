import axios from 'axios'

const API_URL_MOVIE = `${import.meta.env.VITE_BASE_URL}/movie`

export const MovieRequest = async () => {
  const response = await axios.post(API_URL_MOVIE)
  return response.data
}
