import ProcessBar from './ProcessBar'
import { Outlet } from 'react-router-dom'

export default function Booking() {
  return (
    <>
      <div className='w-[90%] grid grid-cols-12 mx-auto  my-2'>
        <div className='col-span-12'>
          <Outlet />
        </div>
      </div>
    </>
  )
}
