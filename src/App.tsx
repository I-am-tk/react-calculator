import { useReducer, useState } from 'react'
import './App.css'
import DigitButton from './DigitButton'
import OperationButton from './OperationButton'
import {CalculatorAction,CalculatorState,CalulatorActionTypes, CalulatorOperationTypes} from "./types"
const initialCalculatorState: CalculatorState = {
  currentOperand: null,
  operation: null,
  previousOperand: null,
  overwrite: false
}


const evalate = ({currentOperand,operation,previousOperand}: CalculatorState):number | null => {
  const leftOperand = parseFloat(previousOperand ?? '');
  const rightOperand = parseFloat(currentOperand ?? '');

  if(isNaN(leftOperand) || !operation || isNaN(rightOperand)) return null;
  if(operation === '+') return leftOperand + rightOperand;
  if(operation === '-') return leftOperand - rightOperand;
  if(operation === '*') return leftOperand * rightOperand;
  return leftOperand / rightOperand;
}

const reducer = (state:CalculatorState,action: CalculatorAction): CalculatorState => {
  switch(action.type){
    case CalulatorActionTypes.ADD_DIGIT: {
      const {payload:{digit}} = action;
      if(!state.currentOperand || state.overwrite) return {
        ...state,
        currentOperand: digit,
        overwrite: false
      }
      if(state.currentOperand.includes('.') && digit==='.'){
        return state;
      }
      if(state.currentOperand==='0' && digit==='0')
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand}${digit}`
      }
    }
    case CalulatorActionTypes.CHOOSE_OPERATION: {
      const {payload:{operation}} = action;
      const {currentOperand,operation: prevOperation,previousOperand} = state;
      if(!previousOperand && !currentOperand) return state;
      if(!previousOperand) return {
        ...state,
        previousOperand: currentOperand,
        operation: operation,
        currentOperand: null
      }
      if(!currentOperand) return {
        ...state,
        operation
      }
      return {
        ...state,
        previousOperand: `${evalate(state)}`,
        operation,
        currentOperand: null
      }
    }
    case CalulatorActionTypes.CLEAR: {
      return initialCalculatorState;
    }
   
    case CalulatorActionTypes.DELETE_DIGIT: {
      if(!state.currentOperand) return state;
      if(state.overwrite) return{
        ...state,
        overwrite: false,
        currentOperand: null
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0,-1) || null
      }
    }
    case CalulatorActionTypes.EVALUATE : {
      if(!state.previousOperand) return state;
      return {
        ...state,
        operation: null,
        previousOperand: null,
        currentOperand: `${evalate(state)}`,
        overwrite: true
      }
    }
  }
}

const formatOperand = (operand: string) => {
  const formatter = new Intl.NumberFormat('en-us',{
    maximumFractionDigits: 0
  })
  const [integer,decimal] = operand.split('.');
  if(!decimal) return formatter.format(parseInt(integer));
  return `${formatter.format(parseInt(integer))}.${decimal}`
}

function App() {
  const [{currentOperand,operation,previousOperand},dispatch] = useReducer(reducer,initialCalculatorState);

  return (
    <div className='calculator-grid'>
      <div className='output'>
        <div className='previous-operand'>{previousOperand && formatOperand(previousOperand)} {operation}</div>
        <div className='current-operand'>{currentOperand && formatOperand(currentOperand)}</div>
      </div>
      <button type="button" onClick={() => dispatch({type: CalulatorActionTypes.CLEAR})} className='span-two'>AC</button>
      <button type="button" onClick={() => dispatch({type: CalulatorActionTypes.DELETE_DIGIT})}>DEL</button>
      <OperationButton dispatch={dispatch} operation={CalulatorOperationTypes.DIVIDE} />
      <DigitButton dispatch={dispatch} digit={"1"} />
      <DigitButton dispatch={dispatch} digit={"2"} />
      <DigitButton dispatch={dispatch} digit={"3"} />
      <OperationButton dispatch={dispatch} operation={CalulatorOperationTypes.MULTIPLY} />
      <DigitButton dispatch={dispatch} digit={"4"} />
      <DigitButton dispatch={dispatch} digit={"5"} />
      <DigitButton dispatch={dispatch} digit={"6"} />
      <OperationButton dispatch={dispatch} operation={CalulatorOperationTypes.ADD} />
      <DigitButton dispatch={dispatch} digit={"7"} />
      <DigitButton dispatch={dispatch} digit={"8"} />
      <DigitButton dispatch={dispatch} digit={"9"} />
      <OperationButton dispatch={dispatch} operation={CalulatorOperationTypes.SUBTRACT} />
      <DigitButton dispatch={dispatch} digit={"."} />
      <DigitButton dispatch={dispatch} digit={"0"} />
      <button type='button' onClick={()=>  dispatch({type: CalulatorActionTypes.EVALUATE})} className='span-two'>=</button>
    </div>
  )
}

export default App

