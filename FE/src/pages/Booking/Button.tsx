interface ButtonInterface {
  label: number
  disabled: boolean
  isSelected: boolean
  onClick: () => void
}

const Button = ({ label, disabled, isSelected, onClick }: ButtonInterface) => {
  return (
    <button
      className={`text-xs md:text-sm w-5 border rounded transition duration-200 ease-in-out flex items-center justify-center gap-1 border-gray-400 ${
        disabled
          ? 'bg-gray-300 cursor-not-allowed'
          : isSelected
            ? 'bg-orange-500'
            : 'hover:bg-orange-500 hover:border-orange-500'
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      <span className='inline-block text-center text-[12px] text-black w-full leading-5'>{label}</span>
    </button>
  )
}

export default Button
