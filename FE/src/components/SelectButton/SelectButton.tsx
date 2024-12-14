import { useState } from 'react'
import Showtime from '@/types/showtime.type'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'

interface Props {
  showtimes: Showtime[]
  onSelectProvince: (province: string | null) => void
  onSelectTheater: (theaterId: string | null) => void
}

export default function SelectButton({ showtimes, onSelectProvince, onSelectTheater }: Props) {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)

  const isAllProvincesSelected = selectedProvince === 'all'

  const filteredShowtimes = isAllProvincesSelected
    ? showtimes
    : showtimes.filter((showtime) => showtime.theater.theater_complex.province === selectedProvince)

  const handleProvinceChange = (province: string | null) => {
    setSelectedProvince(province)
    onSelectProvince(province)
  }

  const handleTheaterChange = (theaterId: string | null) => {
    onSelectTheater(theaterId)
  }

  const uniqueProvinces = Array.from(new Set(showtimes.map((showtime) => showtime.theater.theater_complex.province)))

  return (
    <div className='flex justify-around w-full mr-2'>
      <Select onValueChange={handleProvinceChange}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Chọn tỉnh' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Toàn Quốc</SelectLabel>
            <SelectItem value={'all'}>Toàn Quốc</SelectItem>
            {uniqueProvinces.map((province) => (
              <SelectItem key={province} value={province}>
                {province}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* {selectedProvince && (
        <Select onValueChange={handleTheaterChange}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Chọn rạp chiếu phim' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Rạp chiếu phim</SelectLabel>
              <SelectItem value={'all'}> Tất cả rạp </SelectItem>
              {Array.from(new Set(filteredShowtimes.map((showtime) => showtime.theater.id))).map((theaterId) => {
                const theater = filteredShowtimes.find((showtime) => showtime.theater.id === theaterId)
                return (
                  <SelectItem key={theaterId.toString()} value={theaterId.toString()}>
                    {theater?.theater.name}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      )} */}
    </div>
  )
}
