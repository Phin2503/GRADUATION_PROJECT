import { useState } from 'react'

import PickFood from './PickFood'
import Payment from './Payment'
import PickSeat from './PickSeat'
import ProcessBar from './ProcessBar'

export default function PickAfterLogin() {
  const [currentComponent, setCurrentComponent] = useState<'PickTheater' | 'PickFood' | 'Payment' | 'ConfirmOrder'>(
    'PickTheater'
  )

  const handlePickFood = () => {
    setCurrentComponent('PickFood')
  }

  const handlePickSeat = () => {
    setCurrentComponent('PickTheater')
  }

  const handlePickPayment = () => {
    setCurrentComponent('Payment')
  }

  const handleConfirmOrder = () => {
    setCurrentComponent('ConfirmOrder')
  }

  return (
    <div>
      {/* Pass currentComponent to ProcessBar */}
      <ProcessBar currentComponent={currentComponent} />
      {currentComponent === 'PickTheater' && <PickSeat onContinue={handlePickFood} />}
      {currentComponent === 'PickFood' && <PickFood onContinue={handlePickPayment} onBack={handlePickSeat} />}
      {currentComponent === 'Payment' && <Payment onContinue={handleConfirmOrder} onBack={handlePickFood} />}
      {/* {currentComponent === 'ConfirmOrder' && <ConfirmOrder />} */}
    </div>
  )
}
