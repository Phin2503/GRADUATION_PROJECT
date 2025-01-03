import { NavLink } from 'react-router-dom'

interface Props {
  ListMenuItem?: {
    id: number
    name: string
  }[]
  positionRight: number
  index?: string
}

export default function MenuItemDropDown2({ ListMenuItem = [], positionRight, index }: Props) {
  return (
    <ul
      style={{ right: `${positionRight}rem` }}
      className={`absolute  w-[10rem] h-auto hidden bg-slate-950 text-center top-[60px] rounded-[5px] group-hover:block transition-opacity duration-20 z-50 ${index ? index : ''}`}
    >
      {ListMenuItem.length > 0 ? (
        ListMenuItem.map((item, index) => (
          <li
            key={index}
            className='py-2 hover:border-r-[3px] transition-bg transition-all duration-100 hover:border-r-[#FF8000] hover:bg-white hover:text-black text-white'
          >
            <NavLink to={`/cinema/${item.id}`}>{item.name}</NavLink>
          </li>
        ))
      ) : (
        <li className='py-2 text-gray-500'>No items available</li>
      )}
    </ul>
  )
}
