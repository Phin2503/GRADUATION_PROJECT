import axiosInstance from '@/axios/axiosConfig'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface Cinema {
  name: string
  address: string
  [key: string]: any
}

const CinemaInterface = () => {
  const { id } = useParams<{ id: string }>()
  const [cinema, setCinema] = useState<Cinema | null>(null)

  const fetchCinema = async (cinemaId: string) => {
    try {
      const response = await axiosInstance.get(`/theaterComplex/${cinemaId}`)
      const cinemaData = response.data || {}
      setCinema(cinemaData)
    } catch (error) {
      console.error('Error fetching cinema data:', error)
    }
  }

  useEffect(() => {
    if (id) {
      fetchCinema(id)
    }
  }, [id])

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col items-center'>
      {/* Header */}
      <header className='bg-white w-full py-4 shadow-md'>
        <div className='container mx-auto flex justify-between items-center px-6'>
          <h1 className='text-2xl font-bold text-gray-800'>{cinema?.name || 'Loading...'}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className='flex-grow container mx-auto px-6 py-8'>
        <div className='flex flex-col lg:flex-row lg:space-x-8'>
          {/* Left Image */}
          <div className='lg:w-1/3'>
            <div className='bg-white rounded-md shadow-md p-6'>
              <div
                className='h-64 bg-cover bg-center rounded-md mb-4'
                style={{ backgroundImage: "url('https://cdn.galaxycine.vn/media/2023/12/25/1_1703500551418.jpg')" }}
              ></div>
            </div>
          </div>

          {/* Center Content */}
          <div className='lg:w-1/3'>
            <div className='bg-white rounded-md shadow-md p-6'>
              <div
                className='h-64 bg-cover bg-center rounded-md mb-4'
                style={{ backgroundImage: "url('https://cdn.galaxycine.vn/media/2023/12/25/4_1703500565605.jpg')" }}
              ></div>
            </div>
          </div>

          {/* Right Image */}
          <div className='lg:w-1/3'>
            <div className='bg-white rounded-md shadow-md p-6'>
              <div
                className='h-64 bg-cover bg-center rounded-md mb-4'
                style={{ backgroundImage: "url('https://cdn.galaxycine.vn/media/2023/12/25/5_1703500570351.jpg')" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Text Information */}
        <div className='mt-8 text-center'>
          <h2 className='text-xl font-semibold text-gray-700'>{cinema?.name || 'Cinema Name'}</h2>
          <p className='text-gray-500'>Địa chỉ: {cinema?.address || 'Address not available'}</p>
          <p className='text-gray-500'>Giá vé 2D : 70,000 VNĐ</p>
          <p className='text-gray-500'>Giá vé 3D : 90,000 VNĐ</p>
          <p className='text-gray-500'>Lưu ý : Ghế Vip sẽ có giá cao hơn ghế thường là 10%</p>
          <p className='text-gray-500'>
            Hotline:{' '}
            <a href='tel:19002224' className='text-blue-500'>
              19002224
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}

export default CinemaInterface
