import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/Home/Home'
import HomeContent from './layouts/HomeContent/HomeContent'
import Booking from './pages/Booking/Booking'
import Order from './pages/Order/Order'
import UserDetail from './pages/User/UserDetail'

const ProtectedRoute = () => {
  const navigate = useNavigate()
  const userData = localStorage.getItem('user')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (userData) {
      const userInfo = JSON.parse(userData)
      if (!userInfo) {
        setMessage('Bạn chưa đăng nhập, đang chuyển hướng về trang chủ...')
        setTimeout(() => {
          navigate('/')
        }, 3000)
      }
    } else {
      setMessage('Bạn chưa đăng nhập, đang chuyển hướng về trang chủ...')
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [userData, navigate])

  return (
    <>
      {message && <div>{message}</div>}
      <Outlet />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}>
        <Route path='/' element={<HomeContent />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/order/:id' element={<Order />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/user' element={<UserDetail />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
