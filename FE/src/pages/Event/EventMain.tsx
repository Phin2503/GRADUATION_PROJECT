import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface Event {
  id: number
  title: string
  description: string
  main_img_url: string
  sub_img_url: string
  content: string
}

export default function EventMain() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/event/`)
        const data: Event[] = await response.json()
        setEvents(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching events:', error)
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const handleNavigate = (id: number) => {
    navigate(`/event/${id}`)
  }

  return (
    <div>
      <div className='w-[80%] mx-auto p-10'>
        <div className='container mx-auto px-4 py-8'>
          <h1 className='text-center text-3xl font-bold text-gray-800 mb-8'>Sự Kiện & Ưu Đãi</h1>
          {loading ? (
            <p className='text-center'>Đang tải dữ liệu...</p>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
              {events.map((event) => (
                <div
                  key={event.id}
                  className='bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300'
                >
                  {/* Click vào ảnh để điều hướng */}
                  <img
                    src={event.main_img_url}
                    alt={event.title}
                    className='w-full h-48 object-cover cursor-pointer'
                    onClick={() => handleNavigate(event.id)}
                  />
                  <div className='p-4'>
                    {/* Click vào tiêu đề để điều hướng */}
                    <h2
                      className='text-center text-lg font-bold text-gray-800 mb-2 cursor-pointer'
                      onClick={() => handleNavigate(event.id)}
                    >
                      {event.title}
                    </h2>
                    <p className='text-center text-sm font-medium text-gray-700'>{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
