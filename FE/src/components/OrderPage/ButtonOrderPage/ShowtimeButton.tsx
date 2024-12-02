import { NavLink } from 'react-router-dom'

export default function ShowtimeButton() {
  return (
    <div className='col-span-1 '>
      <NavLink className='border-[1px] text-sm px-8 py-2 border-gray-400  ' to={''}>
        10:15
      </NavLink>
    </div>
  )
}
