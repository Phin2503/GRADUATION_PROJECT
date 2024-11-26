import { NavLink } from 'react-router-dom'

interface Props {
  ListMenuItem: string[]
  positionRight: number
}

export default function MenuItemDropDown({ ListMenuItem, positionRight }: Props) {
  return (
    <ul
      style={{ right: `${positionRight}rem` }}
      className={`absolute  w-[10rem] h-auto hidden bg-slate-950 text-center top-[40px] rounded-[5px] group-hover:block transition-opacity duration-200`}
    >
      {ListMenuItem.length > 0 ? (
        ListMenuItem.map((item, index) => (
          <li
            key={index}
            className='py-2 hover:border-r-[3px] transition-bg transition-all duration-100 hover:border-r-[#FF8000] hover:bg-white hover:text-black'
          >
            <NavLink to={`/destination/${item}`}>{item}</NavLink>
          </li>
        ))
      ) : (
        <li className='py-2 text-gray-500'>No items available</li> // Hiển thị thông báo nếu không có mục
      )}
    </ul>
  )
}
