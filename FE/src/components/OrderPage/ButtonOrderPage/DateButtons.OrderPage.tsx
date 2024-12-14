import React, { useState, useEffect } from 'react'

interface DateButtonsProps {
  onDateSelect: (date: Date) => void
}

const DateButtons: React.FC<DateButtonsProps> = ({ onDateSelect }) => {
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0)
  const [dates, setDates] = useState<Date[]>([])

  const generateDates = () => {
    const today = new Date()
    const generatedDates = []

    for (let i = 0; i < 4; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      generatedDates.push(date)
    }

    return generatedDates
  }

  useEffect(() => {
    setDates(generateDates())
  }, [])

  // Chỉ gọi onDateSelect khi selectedDateIndex thay đổi
  useEffect(() => {
    onDateSelect(dates[selectedDateIndex])
  }, [selectedDateIndex, dates, onDateSelect])

  const handleDateClick = (index: number) => {
    if (selectedDateIndex !== index) {
      // Kiểm tra xem có thực sự thay đổi không
      setSelectedDateIndex(index)
    }
  }

  return (
    <div className='ml-5 mb-3 col-span-1 grid grid-cols-2 md:grid-cols-2 xs:gap-2 xs:grid-cols-1 xl:grid-cols-4'>
      {dates.map((date, index) => {
        const isToday = date.toDateString() === new Date().toDateString()
        const dayName = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'][date.getDay()]
        const isSelected = selectedDateIndex === index

        return (
          <button
            key={index}
            className={`p-2 w-[5rem] text-sm rounded-[0.2rem] mr-3 ${
              isSelected ? 'bg-[#034EA1] text-white' : 'bg-white text-black'
            }`}
            onClick={() => handleDateClick(index)}
          >
            {isToday
              ? `Hôm nay ${date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}`
              : `${dayName} ${date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}`}
          </button>
        )
      })}
    </div>
  )
}

export default DateButtons
