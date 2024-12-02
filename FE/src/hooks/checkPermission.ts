// hooks/useAuth.js

import { useEffect } from 'react'

const useAuth = () => {
  const checkTokenValidity = async () => {
    const userDataString = localStorage.getItem('user')
    if (!userDataString) {
      alert('You are logged out. Please log in again.')
      return
    }

    const userData = JSON.parse(userDataString)
    const { access_token, refresh_token } = userData

    const isValid = await verifyAccessToken(access_token)
    if (!isValid) {
      await refreshAccessToken(refresh_token, userDataString)
    }
  }

  // Xác thực access token
  const verifyAccessToken = async (token: string) => {
    const response = await fetch('http://localhost:3000/api/v1/user/verify-token', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ token })
    })
    return response.ok
  }

  // Làm mới access token
  const refreshAccessToken = async (refreshToken: string, userDataString: string) => {
    const response = await fetch('http://localhost:3000/api/v1/user/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken })
    })

    if (!response.ok) {
      alert('Failed to refresh token. Please log in again.')
      localStorage.removeItem('user')
      return
    }

    const { accessToken, refreshToken: newRefreshToken } = await response.json()
    localStorage.setItem(
      'user',
      JSON.stringify({
        ...JSON.parse(userDataString),
        access_token: accessToken,
        refresh_token: newRefreshToken
      })
    )
  }

  useEffect(() => {
    checkTokenValidity()
  }, [])

  return null
}

export default useAuth
