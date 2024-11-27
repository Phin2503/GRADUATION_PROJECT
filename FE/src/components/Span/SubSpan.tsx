import { NavLink } from 'react-router-dom'

interface Props {
  name: string
  onClick?: () => void
}

export default function SubSpan({ name, onClick }: Props) {
  return (
    <span
      className='px-4 transition-all hover:border-b-[4px] hover:border-[#FF5400] md:mr-2 md:text-md lg:mr-5 lg:text-lg'
      onClick={onClick}
    >
      <NavLink to=''>{name}</NavLink>
    </span>
  )
}
