import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

interface EventData {
  id: number
  title: string
  description: string
  main_img_url: string
  sub_img_url: string
  content: string
}

export default function Event() {
  const { id } = useParams() // Lấy ID từ URL
  const [eventData, setEventData] = useState<EventData | null>(null)

  // Gửi yêu cầu lấy dữ liệu từ API khi component được mount
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/event/${id}`)
        const data = await response.json()
        setEventData(data)
      } catch (error) {
        console.error('Error fetching event data:', error)
      }
    }

    fetchEventData()
  }, [id]) // Chạy lại khi id thay đổi

  if (!eventData) {
    return <div>Loading...</div>
  }

  return (
    <div className='bg-white p-5 w-[80%] mx-auto'>
      <div className='text-center mb-6'>
        <h1 className='text-2xl font-bold text-red-600'>{eventData.title}</h1>
        <p className='text-gray-700 text-sm mt-2'>{eventData.description}</p>
      </div>

      <div className='flex justify-center'>
        <img
          src={eventData.main_img_url} // Dùng ảnh chính từ dữ liệu API
          alt={eventData.title}
          className='rounded-lg shadow-md w-full max-w-3xl'
        />
      </div>

      <div className='mt-6'>
        <h2 className='text-xl font-bold text-gray-800'>Chi tiết chương trình:</h2>
        <div className='text-gray-700 mt-4'>
          <p>{eventData.content}</p>
        </div>
      </div>
    </div>
  )
}
