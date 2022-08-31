import React from 'react'

import {CalculatorAction, CalulatorActionTypes, CalulatorOperationTypes} from "./types"
type OperationButtonProp = {
  operation: CalulatorOperationTypes,
  dispatch: React.Dispatch<CalculatorAction>,
  className?: string
}
function OperationButton({dispatch, operation,className=''}:OperationButtonProp ) {
  const clickHandler = () => {
    dispatch({type: CalulatorActionTypes.CHOOSE_OPERATION,payload: {operation}})
  }
  return (
    <button type='button' onClick={clickHandler} className={className}>{operation}</button>
  )
}

export default OperationButton