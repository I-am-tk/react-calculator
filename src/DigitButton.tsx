import React from 'react'
import {CalculatorAction, CalulatorActionTypes} from "./types"
type DigitButtonProp = {
  digit: string,
  dispatch: React.Dispatch<CalculatorAction>,
  className?: string
}

function DigitButton({dispatch,digit,className=''}: DigitButtonProp) {
  const clickHandler = () => {
    dispatch({type: CalulatorActionTypes.ADD_DIGIT, payload: {digit}})
  }
  return (
    <button type='button' onClick={clickHandler} className={className}>{digit}</button>
  )
}

export default DigitButton