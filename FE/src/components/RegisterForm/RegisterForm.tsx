import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { TiDelete } from 'react-icons/ti'
import { toast } from 'sonner'
import validator from 'validator'

interface Props {
  handleExitForm: () => void
  onLoginForm: () => void
}

export default function RegisterForm({ handleExitForm, onLoginForm }: Props) {
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [gender, setGender] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  const registerMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post('https://52.77.252.207.nip.io/api/v1/user/register', data, {
        timeout: 5000
      })
      return response.data
    },
    onSuccess(data) {
      toast.success('Đăng ký thành công! Vui lòng đăng nhập 🐷')
      handleExitForm()
      localStorage.setItem('accessToken', data.access_token)
      if (data.refresh_token) {
        localStorage.setItem('refreshToken', data.refresh_token)
      }
    },
    onError(error: any) {
      console.error(error)
      const errorMessage = error.response?.data?.message || 'Đăng ký không thành công. Vui lòng thử lại!'
      if (error.code === 'ECONNABORTED') {
        toast.error('Yêu cầu mất quá nhiều thời gian. Vui lòng thử lại.')
      } else {
        toast.error(errorMessage)
      }
    }
  })

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const convertedDate = new Date(dateOfBirth)
    if (convertedDate > new Date()) {
      toast.error('Ngày sinh không hợp lệ! Vui lòng thử lại.')
      return
    }

    const phoneNumberPattern = /^\d{10,15}$/
    const fullNamePattern = /^[\p{L}\s'-]+$/u

    const safeFullName = validator.escape(validator.trim(fullName))
    const safePhoneNumber = validator.trim(phoneNumber)

    if (!phoneNumberPattern.test(safePhoneNumber)) {
      toast.error('Định dạng số điện thoại không hợp lệ! Vui lòng nhập lại.')
      return
    }

    if (!fullNamePattern.test(safeFullName)) {
      toast.error('Định dạng tên đầy đủ không hợp lệ! Vui lòng nhập lại.')
      return
    }

    if (password !== rePassword) {
      toast.error('Mật khẩu không khớp!')
      return
    }

    registerMutation.mutate({
      fullName: safeFullName,
      phoneNumber: safePhoneNumber,
      dateOfBirth: convertedDate.toISOString(),
      email,
      password,
      reTypePassword: rePassword
    })
  }

  const handleAction = () => {
    handleExitForm()
    onLoginForm()
  }

  return (
    <div className='RegisterForm shadow-lg shadow-black m-auto w-full max-w-[400px] bg-[#f5f5f5] text-center rounded-xl h-[90%] flex items-center justify-center'>
      <div className='relative w-[90%] p-3'>
        <form onSubmit={handleRegister}>
          <TiDelete className='absolute right-3 top-3 text-gray-700 cursor-pointer text-2xl' onClick={handleExitForm} />
          <div className='flex justify-center'>
            <img src='../src/assets/loginLogo.png' alt='Logo Đăng Ký' className='w-[5rem] h-[5rem]' />
          </div>
          <h5 className='font-medium mb-5 text-xl text-gray-600'>Đăng Ký</h5>

          <label htmlFor='fullname' className='block mb-1 text-left font-light'>
            Tên Đầy Đủ
          </label>
          <input
            type='text'
            className='border-gray-600 border rounded-md mb-2 p-2 w-full'
            id='fullname'
            placeholder='Nhập tên đầy đủ'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <label htmlFor='phonenumber' className='block mb-1 text-left font-light'>
            Số Điện Thoại
          </label>
          <input
            type='text'
            className='border-gray-600 border rounded-md mb-3 p-2 w-full'
            id='phoneNumber'
            placeholder='Nhập số điện thoại'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />

          <label className='block mb-1 text-left font-light'>Giới Tính</label>
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
            <label htmlFor='male' className='ml-1 font-light'>
              Nam
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
            <label htmlFor='female' className='ml-1 font-light'>
              Nữ
            </label>
          </div>

          <label htmlFor='dob' className='block mb-1 text-left font-light'>
            Ngày Sinh
          </label>
          <input
            type='date'
            className='border-gray-600 border rounded-md mb-3 p-2 w-full'
            id='dateOfBirth'
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />

          <label htmlFor='email' className='block mb-1 text-left font-light'>
            Email
          </label>
          <input
            type='email'
            className='border-gray-600 border rounded-md mb-3 p-2 w-full'
            id='email'
            placeholder='Nhập email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='username'
          />

          <label htmlFor='password' className='block mb-1 text-left font-light'>
            Mật Khẩu
          </label>
          <input
            type='password'
            className='border-gray-600 border rounded-md mb-3 p-2 w-full'
            id='password'
            placeholder='Nhập mật khẩu'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='new-password'
          />

          <label htmlFor='re-password' className='block mb-1 text-left font-light'>
            Xác Nhận Mật Khẩu
          </label>
          <input
            type='password'
            className='border-gray-600 border rounded-md mb-3 p-2 w-full'
            id='re-password'
            placeholder='Xác nhận mật khẩu'
            required
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            autoComplete='new-password'
          />

          <button type='submit' className='bg-orange-400 w-full h-10 rounded-md mb-3'>
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
