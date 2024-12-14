interface Props {
  time?: string | Date
  onClick?: () => void
  className: string // Thêm prop để xử lý sự kiện click
}

export default function ButtonShowtime({ time, onClick, className }: Props) {
  const displayTime = time instanceof Date ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : time

  return (
    <div>
      <button
        className={`w-3rem px-4 py-2 border-[1px] border-gray-200 ${className ? className : ''}`}
        onClick={onClick}
      >
        {displayTime ? displayTime : ''}
      </button>
    </div>
  )
}
