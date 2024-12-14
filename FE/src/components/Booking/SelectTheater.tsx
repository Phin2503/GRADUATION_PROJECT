import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface Props {
  Theater_Complexs?: string[]
}

export default function SelectTheater({ Theater_Complexs }: Props) {
  return (
    <Select>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Chọn rạp' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value='All'>Tất cả các rạp</SelectItem>
          <SelectItem value='Đà Nẵng'>Đà Nẵng</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
