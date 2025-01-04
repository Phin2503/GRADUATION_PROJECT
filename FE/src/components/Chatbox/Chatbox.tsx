import { useState, useEffect, useRef } from 'react'
import { Groq } from 'groq-sdk' // Thay thế bằng thư viện hoặc module thực tế cung cấp Groq
import http from '@/utils/http'

interface ChatMessage {
  type: 'user' | 'bot'
  content: string
}

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
})

export default function ChatBox() {
  const [isChatboxVisible, setChatboxVisible] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [showtimeData, setShowtimeData] = useState<any>(null)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const chatEndRef = useRef<HTMLDivElement | null>(null)

  // Chỉ fetch showtime data một lần khi component mount
  useEffect(() => {
    const fetchShowtimeData = async () => {
      try {
        const response = await http.get(`${import.meta.env.VITE_BASE_URL}/showtime`)
        const today = new Date().toISOString().split('T')[0]

        const todaysShowtimes = response.data.filter((showtime: any) => {
          const showtimeDate = showtime.showtime_start.split('T')[0]
          return showtimeDate === today
        })

        setShowtimeData(todaysShowtimes)
      } catch (error) {
        console.error('Error fetching showtime data:', error)
      }
    }

    fetchShowtimeData()
  }, [])

  // Hàm toggle hiển thị chatbox
  const toggleChatbox = () => {
    setChatboxVisible((prev) => !prev)
  }

  // Hàm gửi tin nhắn

  console.log(showtimeData)
  const handleSendMessage = async () => {
    if (!message.trim()) return

    const userMessage: ChatMessage = { type: 'user', content: message }
    setChatHistory((prev) => [...prev, userMessage])

    const dateCurrent = new Date().toLocaleString() // Định dạng ngày giờ
    const prompt = `Bạn là một người hỗ trợ khách hàng biết thông tin suất chiếu và đặt vé.Sử dụng tiếng việt Tôi cung cấp thông tin như này ${JSON.stringify(showtimeData)}.
     Hãy nhớ ngày và giờ hôm nay là ${dateCurrent} và khi nào tôi hỏi thời gian bạn mới trả lời thôi. Hãy lắng nghe câu hỏi của tôi: ${message.trim()}.
    `

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama-3.2-11b-vision-preview',
        temperature: 1,
        max_tokens: 8192
      })
      let responseContent = 'No response' // Default message nếu API không trả về nội dung
      if (chatCompletion && chatCompletion.choices && chatCompletion.choices.length > 0) {
        responseContent = chatCompletion.choices[0].message?.content || 'No response'
      }

      // Tạo tin nhắn bot mới
      const newChatMessage: ChatMessage = {
        type: 'bot',
        content: responseContent
      }

      setChatHistory((prev) => [...prev, newChatMessage])
    } catch (error) {
      console.error('Error fetching chat completion:', error)
      const errorMessage: ChatMessage = {
        type: 'bot',
        content: 'Error fetching chat completion'
      }
      setChatHistory((prev) => [...prev, errorMessage])
    } finally {
      setMessage('') // Reset input message
    }
  }

  // Xử lý sự kiện nhấn phím
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSendMessage()
  }

  // Cuộn đến cuối khi có tin nhắn mới
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatHistory])

  return (
    <div>
      {/* Icon chat */}
      <div className='fixed bottom-6 right-6'>
        <button
          onClick={toggleChatbox}
          className='bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition'
          aria-label='Toggle chatbox'
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' fill='currentColor' className='w-6 h-6'>
            <path d='M256 32C114.6 32 0 125.1 0 240c0 49.6 22.1 95.2 60.16 131.1c-13.45 52.4-54.56 95.1-55.02 95.56C2.162 470.2 0 475.1 0 480c0 8.625 6.953 16 16 16c66.69 0 116.7-31.58 141.7-51.86C185.1 455.9 220.7 464 256 464c141.4 0 256-93.12 256-208S397.4 32 256 32zM380.1 285.2l-112 64C264.1 350.5 260 352 256 352s-8.125-1.469-12.12-2.844l-112-64C122.1 282.6 118.7 272.4 123.2 264.1s16.28-10.09 24.03-5.562L256 311.8l108.8-61.29c7.75-4.531 17.97-2.219 22.5 5.562S387.9 280.7 380.1 285.2z' />
          </svg>
        </button>
      </div>

      {/* Chatbox */}
      {isChatboxVisible && (
        <div className='fixed bottom-24 right-6 bg-gray-800 w-96 h-96 border border-gray-600 shadow-lg rounded-lg p-4 z-40 flex flex-col transition-transform transform hover:scale-105'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-lg font-semibold text-gray-200'>Chat với chúng tôi</h3>
            <button onClick={toggleChatbox} className='text-gray-400 hover:text-gray-200' aria-label='Close chatbox'>
              X
            </button>
          </div>
          <div className='flex-1 overflow-y-auto mb-4'>
            {/* Hiển thị lịch sử chat */}
            {chatHistory.map((chat, index) => (
              <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                <div
                  className={`p-3 rounded-lg max-w-xs ${chat.type === 'user' ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}
                >
                  {chat.content}
                </div>
              </div>
            ))}
            {/* Ref để cuộn đến cuối tin nhắn */}
            <div ref={chatEndRef}></div>
          </div>

          {/* Input gửi tin nhắn trong khung chat */}
          <div className='flex items-center'>
            <input
              type='text'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Nhập tin nhắn...'
              className='flex-1 border border-gray-600 rounded-md p-2 bg-gray-700 text-gray-200 focus:outline-none focus:ring focus:border-blue-500 transition'
              aria-label='Message input'
            />
            <button
              onClick={handleSendMessage}
              className='bg-gradient-to-r from-blue-500 to-blue-700 text-white p-2 ml-2 rounded-md hover:bg-blue-600 transition'
              aria-label='Send message'
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
