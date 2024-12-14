import { configureStore } from '@reduxjs/toolkit'
import bookingInfoReducer from './BookingInfo/bookingInfoSlice'

const store = configureStore({
  reducer: {
    bookingInfo: bookingInfoReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store }
