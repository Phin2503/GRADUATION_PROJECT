import TheaterComplex from '@/types/TheaterComplex.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface bookingInfo {
  titleMovie: string | null
  theaterComplex: TheaterComplex | null
  theater: string | null
  showtime: string | null
  date: string | null
  seats?: string[] | null
  foods?: string[] | null
  totalPrice: number | null,
  activeTab?:string | null
}

const initialState: bookingInfo = {
  titleMovie: null,
  theaterComplex: null,
  theater: null,
  showtime: null,
  date: null,
  seats: null,
  foods: null,
  totalPrice: null,
  activeTab:null
}

const bookingInfoSlice = createSlice({
  name: 'bookingInfo',
  initialState,
  reducers: {
    setBookingInfo: (state, action: PayloadAction<bookingInfo>) => {
      const { titleMovie, theaterComplex, theater, showtime, date, seats, foods, totalPrice } = action.payload

      state.titleMovie = titleMovie
      state.theaterComplex = theaterComplex
      state.theater = theater
      state.showtime = showtime
      state.date = date
      state.seats = seats
      state.foods = foods
      state.totalPrice = totalPrice
    },

    setIsActive:(state,action)=>{
      state.activeTab = action.payload
    }
  }
})

export const { setBookingInfo ,setIsActive} = bookingInfoSlice.actions
export default bookingInfoSlice.reducer
