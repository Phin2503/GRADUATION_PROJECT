import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import loginImg from '../../assets/loginLogo.png'
import { loginRequest } from '@/apis/auth.api'
import { toast, Toaster } from 'sonner'
import { TiDelete } from 'react-icons/ti'

interface Props {
  onLoginSuccess: (name: string) => void
  handleExitForm: () => void
}

export default function LoginForm({ onLoginSuccess, handleExitForm }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginMutation = useMutation({
    mutationFn: (body: { email: string; password: string }) => loginRequest(body),
    onSuccess(data) {
      toast.success('Login successful!')
      setTimeout(() => {
        localStorage.setItem('user', JSON.stringify(data.data))

        // Lấy thông tin người dùng từ localStorage
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          const nameUser = JSON.parse(storedUser).payload.fullName // Chắc chắn thuộc tính tồn tại
          onLoginSuccess(nameUser || 'Guest') // Nếu nameUser không tồn tại, trả về 'Guest'
        } else {
          onLoginSuccess('Guest')
        }
      }, 1000)
    },
    onError(error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.'
      toast.error(errorMessage)
    }
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    loginMutation.mutate({ email, password })
  }

  return (
    <div className='LoginForm m-auto w-[90%] max-w-[400px] bg-[#f5f5f5] shadow-xl shadow-black rounded-2xl flex items-center justify-center'>
      <div className='relative text-center w-[95%] h-auto py-5 px-2'>
        <TiDelete className='absolute right-0 top-1 text-2xl cursor-pointer' onClick={handleExitForm} />
        <div className='flex justify-center'>
          <img src={loginImg} alt='Login Logo' className='w-[150px] h-[150px]' />
        </div>
        <h5 className='font-medium mb-5 text-xl text-gray-600'>Login</h5>
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
          <button type='submit' className='bg-orange-400 w-full h-10 rounded-md mb-3 hover:bg-[#293855 '>
            Login
          </button>
        </form>
        <a href='#' className='block mb-4 hover:text-orange-300'>
          Forgot password?
        </a>
        <hr className='bg-slate-500 h-[2px] mb-3' />
        <p className='mb-2'>You don't have an account?</p>
        <button type='button' className='bg-white w-full h-10 rounded-md border border-orange-400 hover:bg-orange-400'>
          Register
        </button>
        <Toaster richColors position='top-right' />
      </div>
    </div>
  )
}
