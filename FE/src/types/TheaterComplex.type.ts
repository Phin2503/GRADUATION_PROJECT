import Theater from './Theater.type'

export default interface TheaterComplex {
  typeTheater: any
  id: number
  name: string
  location: string
  address: string
  province: string
  district: string
  theaters: Theater[]
}
