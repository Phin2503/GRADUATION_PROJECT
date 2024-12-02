import { Movie } from './movie.type'
import Theater from './Theater.type'

export default interface Showtime {
  id: number
  showtime_start: string | Date
  showtime_end: string | Date
  create_at: string | Date
  update_at: string | Date
  theater: Theater
  movie: Movie
  times: string[]
}
