import TheaterComplex from './TheaterComplex.type'

export default interface Theater {
  id: number
  name: string
  capacity: number
  created_at: string | Date
  updated_at: string | Date
  theater_complex: TheaterComplex
}
