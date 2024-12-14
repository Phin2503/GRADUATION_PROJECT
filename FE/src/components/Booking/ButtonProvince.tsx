import { Button } from '../ui/button'

interface Props {
  name: string
  onClick?: () => void
  className: string
}

export default function ButtonProvince({ name, onClick, className }: Props) {
  return (
    <Button
      className={`bg-white border-[1px] border-gray-300 text-black hover:text-white ${className ? className : ''} `}
      onClick={onClick}
    >
      {name}
    </Button>
  )
}
