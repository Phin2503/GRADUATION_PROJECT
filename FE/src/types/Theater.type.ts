import TheaterComplex from './TheaterComplex.type'
import TypeTheater from './TypeTheater'

export default interface Theater {
  id: number
  name: string
  capacity: number
  created_at: string | Date
  updated_at: string | Date
  theater_complex: TheaterComplex
  typeTheater: TypeTheater
}
