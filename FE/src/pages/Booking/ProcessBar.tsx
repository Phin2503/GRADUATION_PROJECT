interface ProcessBarProps {
  currentComponent?: 'PickTheater' | 'PickFood' | 'Payment' | 'ConfirmOrder'
}

export default function ProcessBar({ currentComponent }: ProcessBarProps) {
  const steps = [
    { key: 'PickSeat', label: 'Chọn Ghế' },
    { key: 'PickFood', label: 'Chọn Thức Ăn' },
    { key: 'Payment', label: 'Thanh Toán' },
    { key: 'ConfirmOrder', label: 'Xác Nhận' }
  ]

  const isActive = (stepKey: string) => {
    const order = ['PickTheater', 'PickFood', 'Payment', 'ConfirmOrder']
    const currentIndex = order.indexOf(currentComponent || '')
    const stepIndex = order.indexOf(stepKey)

    // Step is active if it is the current or earlier in the process
    return stepIndex <= currentIndex ? 'border-blue-500' : 'border-gray-500'
  }

  return (
    <div className='py-2 flex text-center w-[90%] items-center bg-[#FAF7F0] justify-center mx-auto rounded-[0.3rem] mt-1 shadow-md'>
      <div className='flex justify-center items-center text-center h-full'>
        {steps.map((step) => (
          <h3 key={step.key} className={`text-base text-black p-3 border-b-[3px] ${isActive(step.key)}`}>
            {step.label}
          </h3>
        ))}
      </div>
    </div>
  )
}
