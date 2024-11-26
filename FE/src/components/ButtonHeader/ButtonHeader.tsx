interface Props {
  name: string
  handleClick: () => void
}

export default function ButtonHeader({ name, handleClick }: Props) {
  return (
    <>
      <button
        onClick={handleClick}
        className='group h-10 px-4 py-1 bg-slate-900 text-white transition-all text-center font-light border-[2px] border-[#FF8000] rounded-[10px] hover:bg-[#FF8000] hover:text-neutral-900 hover:border-black hover:border-[2px] mr-2'
      >
        {name}
      </button>
    </>
  )
}
