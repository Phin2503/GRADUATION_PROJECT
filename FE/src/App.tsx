import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import HomeContent from './layouts/HomeContent/HomeContent'

import Booking from './pages/Booking/Booking '
import Order from './pages/Order/Order'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}>
        <Route path='' element={<HomeContent />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/order/:id' element={<Order />} />
      </Route>
    </Routes>
  )
}

export default App
