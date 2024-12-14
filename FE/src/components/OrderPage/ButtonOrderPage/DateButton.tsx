interface DateButtonProps {
  date: string
  onClick?: () => void
  className: string
}

export default function DateButton({ date, onClick, className }: DateButtonProps) {
  return (
    <button
      className={`bg-black p-2 w-[5rem] text-sm rounded-[0.2rem] mr-3 text-white border-white border-[1px] ${className}`}
      onClick={onClick}
    >
      {date}
    </button>
  )
}
