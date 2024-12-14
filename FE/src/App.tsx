import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/Home/Home'
import HomeContent from './layouts/HomeContent/HomeContent'
import Booking from './pages/Booking/Booking'
import Order from './pages/Order/Order'
import UserDetail from './pages/User/UserDetail'
import { checkAccessToken, refreshAccessToken } from './apis/auth.api' // Giả sử bạn có những hàm này trong api/auth
import PickTheater from './pages/Booking/PickTheater'
import PickAfterLogin from './pages/Booking/PickAfterLogin'
import { Toaster, toast } from 'sonner' // Nhập Toaster và toast
import ConfirmOrder from './pages/Booking/ConfirmOrder'

const ProtectedRoute = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyToken = async () => {
      const getAccessToken = localStorage.getItem('access_token')
      const getRefreshToken = localStorage.getItem('refresh_token')

      if (!getAccessToken && !getRefreshToken) {
        toast.error('Bạn chưa đăng nhập, đang chuyển hướng về trang chủ...')
        setTimeout(() => {
          navigate('/')
        }, 3000)
        setLoading(false)
        return false
      }

      let accessToken = null
      if (getAccessToken) {
        accessToken = JSON.parse(getAccessToken)
      }

      let refreshToken = null
      if (getRefreshToken) {
        refreshToken = JSON.parse(getRefreshToken)
      }

      if (!accessToken) {
        toast.error('Bạn chưa đăng nhập, đang chuyển hướng về trang chủ...')
        setTimeout(() => {
          navigate('/')
        }, 3000)
      } else {
        const isValid = await checkAccessToken(accessToken)
        if (!isValid) {
          if (refreshToken) {
            const newAccessToken = await refreshAccessToken(refreshToken)
            if (!newAccessToken) {
              toast.error('Access token đã hết hạn. Vui lòng đăng nhập lại.')
              setTimeout(() => {
                navigate('/')
              }, 3000)
            } else {
              localStorage.setItem('access_token', JSON.stringify(newAccessToken))
            }
          } else {
            toast.error('Access token đã hết hạn. Vui lòng đăng nhập lại.')
            setTimeout(() => {
              navigate('/')
            }, 3000)
          }
        }
      }

      setLoading(false)
    }

    verifyToken()
  }, [navigate])

  if (loading) {
    return <div>Loading...</div>
  }

  return <Outlet />
}

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route index element={<HomeContent />} />
          <Route path='/booking' element={<Booking />}>
            <Route index element={<PickTheater />} />
            <Route path=':titleMovie' element={<ProtectedRoute />}>
              <Route index element={<PickAfterLogin />} />
            </Route>
          </Route>
          <Route path='/payment/confirm/order/:orderId' element={<ProtectedRoute />}>
            <Route index element={<ConfirmOrder />} />
          </Route>
          <Route path='/order/:id' element={<Order />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/user' element={<UserDetail />} />
          </Route>
        </Route>
      </Routes>
      <Toaster /> {/* Đặt Toaster bên ngoài Routes */}
    </>
  )
}

export default App
