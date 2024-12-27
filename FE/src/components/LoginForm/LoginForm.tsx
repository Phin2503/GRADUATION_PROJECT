import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import loginImg from '../../assets/loginLogo.png'
import { loginRequest, sendPasswordRequest } from '@/apis/auth.api'
import { toast } from 'sonner'
import { TiDelete } from 'react-icons/ti'

interface Props {
  onLoginSuccess: (name: string) => void
  handleExitForm: () => void
}

export default function LoginForm({ onLoginSuccess, handleExitForm }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)

  const loginMutation = useMutation({
    mutationFn: (body: { email: string; password: string }) => loginRequest(body),
    onMutate: () => {
      setIsLoading(true)
    },
    onSuccess(data) {
      toast.success('Login successful!')
      localStorage.setItem('user', JSON.stringify(data.data.payload))
      localStorage.setItem('access_token', JSON.stringify(data.data.access_token))
      localStorage.setItem('refresh_token', JSON.stringify(data.data.refresh_token))
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        const nameUser = JSON.parse(storedUser)
        onLoginSuccess(nameUser.fullName || 'Guest')
      } else {
        onLoginSuccess('Guest')
      }
    },
    onSettled: () => {
      setIsLoading(false)
    },
    onError(error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.'
      toast.error(errorMessage)
    }
  })

  const sendPasswordMutation = useMutation({
    mutationFn: (email: string) => sendPasswordRequest({ email: email }),
    onMutate: () => {
      setIsLoading(true)
    },
    onSuccess() {
      toast.success('Password sented to your email!')
      setIsForgotPassword(false)
    },
    onSettled: () => {
      setIsLoading(false)
    },
    onError(error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to send password. Please try again.'
      toast.error(errorMessage)
    }
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isForgotPassword) {
      sendPasswordMutation.mutate(email)
    } else {
      loginMutation.mutate({ email, password })
    }
  }

  const handleForgotPassword = () => {
    setIsForgotPassword(true)
    setPassword('') // ẩn trường password
  }

  return (
    <div className='LoginForm m-auto w-[90%] max-w-[400px] bg-[#f5f5f5] shadow-xl shadow-black rounded-2xl flex items-center justify-center'>
      <div className='relative text-center w-[95%] h-auto py-5 px-2'>
        <TiDelete className='absolute right-0 top-1 text-2xl cursor-pointer' onClick={handleExitForm} />
        <div className='flex justify-center'>
          <img src={loginImg} alt='Login Logo' className='w-[150px] h-[150px]' />
        </div>
        <h5 className='font-medium mb-5 text-xl text-gray-600'>
          {isForgotPassword ? 'Send Password to Email' : 'Login'}
        </h5>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email' className='block mb-1 text-left font-light'>
            Email
          </label>
          <input
            type='email'
            className='border-gray-600 border rounded-md mb-3 p-2 w-full'
            id='email'
            placeholder='Input email here'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {!isForgotPassword && (
            <>
              <label htmlFor='password' className='block mb-1 text-left font-light'>
                Password
              </label>
              <input
                type='password'
                className='border-gray-600 border rounded-md mb-3 p-2 w-full'
                id='password'
                placeholder='Input password here'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </>
          )}
          <button
            type='submit'
            className='bg-orange-400 w-full h-10 rounded-md mb-3 hover:bg-[#293855]'
            disabled={isLoading}
          >
            {isLoading
              ? isForgotPassword
                ? 'Sending...'
                : 'Logging in...'
              : isForgotPassword
                ? 'Send Password'
                : 'Login'}
          </button>
        </form>
        {!isForgotPassword && (
          <a href='#' className='block mb-4 hover:text-orange-300' onClick={handleForgotPassword}>
            Forgot password?
          </a>
        )}
        <hr className='bg-slate-500 h-[2px] mb-3' />
        <p className='mb-2'>You don't have an account?</p>
        <button
          type='button'
          className='bg-white w-full h-10 rounded-md border border-orange-400 hover:bg-orange-400'
          onClick={() => {}}
        >
          Register
        </button>
        {/* <Toaster richColors position='top-right' /> */}
      </div>
    </div>
  )
}
