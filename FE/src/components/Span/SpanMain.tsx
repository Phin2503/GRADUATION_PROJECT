interface Props {
  name: string
}
export default function SpanMain({ name }: Props) {
  return <span className='border-l-[5px] border-[#FF5400] px-4 text-2xl uppercase'>{name}</span>
}
