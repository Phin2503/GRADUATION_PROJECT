interface Props {
  name: string
  mt?: string
  mb?: string
  text_size?: string
  text_left?: boolean
  border_color?: string
  text_color?: string
}
export default function SpanMain({ name, mt, mb, text_size, border_color, text_color }: Props) {
  return (
    <span
      className={`border-l-[5px] border-[${border_color ? border_color : `#FF5400`}] px-4 text-left ${text_size ? text_size : 'text-2xl'} ${mt ? mt : ''} ${mb ? mb : ''}  uppercase ${text_color ? text_color : ''}`}
    >
      {name}
    </span>
  )
}
