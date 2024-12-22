import { NavLink } from 'react-router-dom'

interface MenuItem {
  name: string
  redirect: string
}

interface Props {
  ListMenuItem: MenuItem[]
  positionRight: number
  index?: string
}

export default function MenuItemDropDownUser({ ListMenuItem, positionRight, index }: Props) {
  return (
    <ul
      style={{ right: `${positionRight}rem` }}
      className={`absolute w-[10rem] h-auto hidden bg-slate-950 text-center top-[40px] rounded-[5px] group-hover:block transition-opacity duration-200 ${index || ''}`}
    >
      {ListMenuItem.length > 0 ? (
        ListMenuItem.map((item, idx) => (
          <li
            key={idx}
            className='py-2 hover:border-r-[3px] transition-all duration-100 hover:border-r-[#FF8000] hover:bg-white hover:text-black text-white'
          >
            <NavLink to={`/user/${item.redirect}`}>{item.name}</NavLink>
          </li>
        ))
      ) : (
        <li className='py-2 text-gray-500'>No items available</li>
      )}
    </ul>
  )
}
