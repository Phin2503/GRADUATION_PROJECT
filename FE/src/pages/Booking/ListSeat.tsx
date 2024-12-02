import Button from './Button'

type ListItemProps = {
  label: string
  buttons: number[]
  reservedSeats: string[]
  selectedSeats: string[]
  onSelectSeat: (seat: string) => void
}

const ListSeat = ({ label, buttons, reservedSeats, selectedSeats, onSelectSeat }: ListItemProps) => {
  return (
    <li className='flex items-center justify-between'>
      <div className='text-sm text-gray-400 font-semibold w-5 flex-shrink-0 text-center'>{label}</div>
      <div className='flex flex-1 justify-center gap-1 md:gap-2'>
        {buttons.map((btn, index) => {
          const seat = `${label}${btn}`
          return (
            <Button
              key={index}
              label={btn}
              disabled={reservedSeats.includes(seat)}
              isSelected={selectedSeats.includes(seat)}
              onClick={() => onSelectSeat(seat)}
            />
          )
        })}
      </div>
      <div className='text-sm text-gray-400 font-semibold w-5 flex-shrink-0 text-center'>{label}</div>
    </li>
  )
}

export default ListSeat
