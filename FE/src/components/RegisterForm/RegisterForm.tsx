import { registerRequest } from '@/apis/auth.api'
import RegisterRequest from '@/types/registerRequest.type'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { TiDelete } from 'react-icons/ti'
import { toast } from 'sonner'
import validator from 'validator'
import logoRegister from '../../assets/loginLogo.png'

interface Props {
  handleExitForm: () => void
  onLoginForm: () => void
}

export default function RegisterForm({ handleExitForm, onLoginForm }: Props) {
  const [fullName, setFullname] = useState('')
  const [phoneNumber, setPhonenumber] = useState('')
  const [gender, setGender] = useState('')
  const [dateOfBirth, setDob] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  const registerMutation = useMutation({
    mutationFn: (body: RegisterRequest) => registerRequest(body),
    onSuccess(data) {
      toast.success('Registration successful! Please log in 🐷')
      setTimeout(() => {
        handleExitForm()
        localStorage.setItem('accessToken', data.data.access_token)
        if (data.data.refresh_token) {
          localStorage.setItem('refreshToken', data.data.refresh_token)
        }
      }, 1000)
    },
    onError(error: any) {
      console.log(error)
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again!'
      toast.error(errorMessage)
    }
  })

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const convertedDate = new Date(dateOfBirth)
    if (convertedDate > new Date()) {
      toast.error('Date of birth invalid! Try again')
      return
    }

    const phoneNumberPattern = /^\d{10,15}$/
    const fullNamePattern = /^[\p{L}\s'-]+$/u

    const safeFullName = validator.escape(validator.trim(fullName))
    const safePhoneNumber = validator.trim(phoneNumber)
    const safePassword = password

    if (!phoneNumberPattern.test(safePhoneNumber)) {
      toast.error('Invalid phone number format! Please enter a valid phone number.')
      return
    }

    if (!fullNamePattern.test(safeFullName)) {
      toast.error('Invalid full name format! Please enter a valid name.')
      return
    }

    if (safePassword !== rePassword) {
      toast.error('Passwords do not match!')
      return
    }

    registerMutation.mutate({
      fullName: safeFullName,
      phoneNumber: safePhoneNumber,
      dateOfBirth: convertedDate,
      email,
      password: safePassword,
      reTypePassword: rePassword
    })
  }

  const handleAction = () => {
    handleExitForm()
    onLoginForm()
  }

  return (
    <div className='RegisterForm  shadow-lg shadow-black m-auto w-[100%] max-w-[300px] bg-[#f5f5f5] text-center rounded-xl h-[100%] flex items-center justify-center'>
      <div className='relative w-[100%] h-[100%] p-4'>
        <form onSubmit={handleRegister}>
          <TiDelete className='absolute right-3 top-8 text-gray-700 cursor-pointer text-xl' onClick={handleExitForm} />
          <div className='flex justify-center'>
            <img src={logoRegister} alt='Register Logo' className='w-[5rem] h-[5rem]' />
          </div>
          <h5 className='font-medium mb-1 text-lg xs:text-md text-gray-600'>Đăng Ký</h5>
          <label htmlFor='fullname' className='block mb-1 text-left xs:text-sm font-light'>
            Full Name
          </label>
          <input
            type='text'
            className='border-gray-600 border rounded-md mb-2 p-1 w-full'
            id='fullname'
            placeholder='Enter your full name'
            value={fullName}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
          <label htmlFor='phonenumber' className='block xs:text-sm mb-1 text-left font-light'>
            Phone Number
          </label>
          <input
            type='text'
            className='border-gray-600 border rounded-md mb-2 p-1 w-full'
            id='phoneNumber'
            placeholder='Enter phone number'
            value={phoneNumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            required
          />
          <label className='block mb-1 text-left xs:text-sm font-light'>Giới Tính</label>
          <div className='flex items-center mb-3'>
            <input
              type='radio'
              id='male'
              name='gender'
              value='Male'
              checked={gender === 'Male'}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            <label htmlFor='male' className=' xs:text-sm ml-1 font-light'>
              Male
            </label>
            <input
              type='radio'
              id='female'
              name='gender'
              value='Female'
              checked={gender === 'Female'}
              onChange={(e) => setGender(e.target.value)}
              className='ml-4'
              required
            />
            <label htmlFor='female' className='ml-1 xs:text-sm font-light'>
              Female
            </label>
          </div>
          <label htmlFor='dob' className='block mb-1 xs:text-sm text-left font-light'>
            Date of Birth
          </label>
          <input
            type='date'
            className='border-gray-600 border rounded-md mb-3 p-1 w-full'
            id='dateOfBirth'
            value={dateOfBirth}
            onChange={(e) => setDob(e.target.value)}
            required
          />
          <label htmlFor='email' className='block xs:text-sm mb-1 text-left font-light'>
            Email
          </label>
          <input
            type='email'
            className='border-gray-600 border rounded-md mb-3 p-1 w-full'
            id='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor='password' className='block xs:text-sm mb-1 text-left font-light'>
            Password
          </label>
          <input
            type='password'
            className='border-gray-600 border rounded-md mb-3 p-1 w-full'
            id='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor='re-password' className='block xs:text-sm mb-1 text-left font-light'>
            Confirm Password
          </label>
          <input
            type='password'
            className='border-gray-600 border rounded-md mb-2 p-1 w-full'
            id='re-password'
            placeholder='Confirm password'
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            required
          />
          <button type='submit' className='bg-orange-400 w-full h-8 rounded-md mb-3'>
            Đăng Ký
          </button>
        </form>
        <a href='#' className='block mb-1 hover:text-orange-300'>
          Quên mật khẩu?
        </a>
        <hr className='bg-slate-500 h-[2px] mb-1' />
        <p className='mb-1'>Bạn đã có tài khoản?</p>
        <button
          type='button'
          className='bg-white w-full h-7 rounded-md border border-orange-400 hover:bg-orange-400 md:h-10'
          onClick={handleAction}
        >
          Đăng Nhập
        </button>
      </div>
    </div>
  )
}
