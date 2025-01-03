import { IoTicket } from 'react-icons/io5'
import Logo from '../../assets/2.png'
import avaUser from '../../assets/124599.jpeg'
import { FaChevronDown, FaBars } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import MenuItemDropDown from '../MenuItemDropDown/MenuItemDropDown'
import LoginForm from '../LoginForm/LoginForm'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import ButtonHeader from '../ButtonHeader/ButtonHeader'
import RegisterForm from '../RegisterForm/RegisterForm'
import ListCardMenu from '../Card/ListCardMenu'
import MenuItemDropDownUser from '../MenuItemDropDown/MenuItemDropDownUser'
import useMovies from '../../hooks/useMovies'
import axiosInstance from '@/axios/axiosConfig'
import TheaterComplex from '@/types/TheaterComplex.type'
import MenuItemDropDown2 from '../MenuItemDropDown/MenuItemDropDownCinema'

export default function Header() {
  const navigate = useNavigate()
  const { showingMovies, noneShowingMovies } = useMovies()
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const [userName, setUserName] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [theaterComplex, setTheaterComplex] = useState<{ id: number; name: string }[] | undefined>(undefined)

  console.log(showingMovies, noneShowingMovies)
  console.log(theaterComplex)
  const fetchCinema = async () => {
    try {
      const response = await axiosInstance.get('/theaterComplex')
      const cinemasData = response.data || []
      setTheaterComplex(cinemasData.map((cinema: TheaterComplex) => ({ id: cinema.id, name: cinema.name })))
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setUserName(user.fullName)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowLoginForm(false)
      }
    }

    fetchCinema()
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleLoginClick = () => setShowLoginForm((prev) => !prev)
  const handleRegisterClick = () => setShowRegisterForm((prev) => !prev)
  const handleOverlayClick = () => setShowLoginForm(false)
  const handleLogout = () => {
    setUserName('')
    ;['user', 'access_token', 'refresh_token', 'bookingInfo', 'orderId'].forEach((key) => localStorage.removeItem(key))
    navigate('/')
  }

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev)

  return (
    <div className='w-full px-4 md:px-44 h-auto md:h-24 bg-[#10172B] flex flex-col md:flex-row justify-between items-center nunito-sans'>
      {/* Logo và nút toggle */}
      <div className='flex justify-between items-center w-full md:w-auto'>
        <NavLink to=''>
          <img src={Logo} alt='Ticket Logo' className='w-28 md:w-48' />
        </NavLink>
        <button className='text-white md:hidden' onClick={toggleMobileMenu}>
          <FaBars className='text-xl' />
        </button>
      </div>

      {/* Menu */}
      <div
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } md:flex flex-col md:flex-row items-center justify-center text-sm md:text-base w-full md:w-auto bg-[#10172B] md:bg-transparent`}
      >
        <ul className='flex flex-col md:flex-row justify-center md:justify-center text-white w-full md:w-auto '>
          <li className='flex items-center mb-2 md:mb-0 hover:text-blue-400 mx-4'>
            <button className='h-10 px-4 py-2 bg-[#FF5400] flex items-center rounded-xl hover:text-black'>
              <NavLink className='mr-2' to='/booking'>
                Buy ticket
              </NavLink>
              <IoTicket />
            </button>
          </li>
          <li className='flex items-center relative group py-2 md:py-4 mx-4'>
            <span className='hover:text-[#FF5400]'>Movie</span>
            <FaChevronDown className='ml-1 hidden md:block' />
            <div className='absolute hidden w-[50rem] h-auto bg-[#E5E1DA] top-14 left-[-20rem] md:right-[-24rem] group-hover:block rounded-xl text-black z-50  md:hidden'>
              <ListCardMenu movies={showingMovies} name='Phim Đang Chiếu' />
              <ListCardMenu movies={noneShowingMovies} name='Phim Sắp Chiếu' />
            </div>
          </li>

          <li className='flex relative items-center group py-2 md:py-4 mx-4'>
            <span className='group-hover:text-[#FF5400]'>Event</span>
            <FaChevronDown className='ml-1 hidden md:block' />
            <MenuItemDropDown ListMenuItem={['Endow']} positionRight={-3} />
          </li>

          <li className='flex relative items-center group py-2 md:py-4 mx-4'>
            <span className='group-hover:text-[#FF5400]'>Theater / Price</span>
            <FaChevronDown className='ml-1 hidden md:block' />
            <MenuItemDropDown2 ListMenuItem={theaterComplex || undefined} positionRight={-1.5} />
          </li>

          {/* Auth */}
          <li className='flex items-center py-2 md:py-4 md:ml-[15rem]'>
            {!userName ? (
              <>
                <ButtonHeader name={'Login'} handleClick={handleLoginClick} />
                <ButtonHeader name={'Register'} handleClick={handleRegisterClick} />
              </>
            ) : (
              <div className='flex items-center'>
                <Avatar className='relative group'>
                  <AvatarImage src={avaUser} className='rounded-full w-10 h-10' />
                  <AvatarFallback>{userName}</AvatarFallback>
                  <MenuItemDropDownUser
                    ListMenuItem={[
                      { name: 'Information User', redirect: '' },
                      { name: 'History Orders', redirect: 'historyOrders' }
                    ]}
                    positionRight={-3}
                    index='z-50'
                  />
                </Avatar>
                <span className='text-white ml-2 mr-2'>{userName}</span>
                <button
                  onClick={handleLogout}
                  className='group h-10 px-4 py-1 bg-slate-900 text-white transition-all text-center font-light border-[2px] border-[#FF8000] rounded-[10px] hover:bg-[#FF8000]'
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>

      {/* Login Form */}
      {showLoginForm && (
        <>
          <div className='fixed inset-0 bg-black opacity-50 z-40' onClick={handleOverlayClick} />
          <div className='fixed inset-0 flex justify-center items-center z-50 w-full'>
            <div className='rounded w-[90%] md:w-[30%]'>
              <LoginForm onLoginSuccess={(name) => setUserName(name)} handleExitForm={handleLoginClick} />
            </div>
          </div>
        </>
      )}

      {/* Register Form */}
      {showRegisterForm && (
        <>
          <div className='fixed inset-0 bg-black opacity-50 z-40' onClick={handleOverlayClick} />
          <div className='fixed inset-0 flex justify-center items-center z-50 w-full h-[100%]'>
            <div className='rounded w-[90%] md:w-[30%]'>
              <RegisterForm handleExitForm={handleRegisterClick} onLoginForm={handleLoginClick} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
