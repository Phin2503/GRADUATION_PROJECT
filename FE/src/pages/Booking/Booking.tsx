import Tabs, { Tab } from '@/components/Tabs/Tabs'
import PickFilm from './PickFilm'
import PickTheater from './PickTheater'

export default function Booking() {
  return (
    <div className='h-screen bg-gray-100 bg-opacity-100'>
      {/* Line */}
      <div className='block border-b-8 border-[rgb(191,191,191)]'></div>
      {/* End line */}

      {/* Tab */}
      <Tabs>
        <Tab label={'Pick Theater'} tabName={'Chọn phim / Rạp '}>
          <PickTheater />
        </Tab>
        {/* label should be unique for each tab */}
        <Tab label={'Pick Showtime_Seat'} tabName={' Suất / Ghế'}>
          <PickFilm />
        </Tab>
        <Tab label={'Chọn thức ăn '} tabName={'Chọn thức ăn'}>
          <h2>Chọn thức ăn</h2>
        </Tab>
        <Tab label={'Thanh toán '} tabName={'Thanh toán'}>
          <h2>Thanh toán page</h2>
        </Tab>
        <Tab label={'Xác nhận'} tabName={'Xác nhận'}>
          <h2>Xác nhận page</h2>
        </Tab>
      </Tabs>

      {/* End tab */}
    </div>
  )
}
