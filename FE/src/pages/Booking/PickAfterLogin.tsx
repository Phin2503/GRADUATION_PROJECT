import { useState } from 'react'

import PickFood from './PickFood'
import Payment from './Payment'
import PickSeat from './PickSeat'

export default function PickAfterLogin() {
  const [currentComponent, setCurrentComponent] = useState('PickTheater')

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
      {currentComponent === 'PickTheater' && <PickSeat onContinue={handlePickFood} />}
      {currentComponent === 'PickFood' && <PickFood onContinue={handlePickPayment} onBack={handlePickSeat} />}
      {currentComponent === 'Payment' && <Payment onContinue={handleConfirmOrder} onBack={handlePickFood} />}
      {/* {currentComponent === 'ConfirmOrder' && <ConfirmOrder />} */}
    </div>
  )
}
