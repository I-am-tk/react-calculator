export interface CalculatorState {
  currentOperand: string | null,
  previousOperand: string | null,
  operation: CalulatorOperationTypes | null,
  overwrite: boolean
}
export enum CalulatorOperationTypes {
  ADD = "+",
  SUBTRACT = "-",
  MULTIPLY = "*",
  DIVIDE = "÷",
  EVALUATE='='
}

export enum CalulatorActionTypes {
  ADD_DIGIT = "ADD_DIGIT",
  CLEAR = "CLEAR",
  DELETE_DIGIT = "DELETE_DIGIT",
  CHOOSE_OPERATION = "CHOOSE_OPERATION",
  EVALUATE = 'EVALUATE'
}


export interface AddDigitAction {
  type: CalulatorActionTypes.ADD_DIGIT,
  payload: {
    digit: string
  }
}
export interface ClearAction {
  type: CalulatorActionTypes.CLEAR,
}
export interface DeleteDigitAction {
  type: CalulatorActionTypes.DELETE_DIGIT,
}

export interface ChooseOperationAction {
  type: CalulatorActionTypes.CHOOSE_OPERATION,
  payload: {
    operation: CalulatorOperationTypes
  }
}

export interface EvaluateAction {
  type: CalulatorActionTypes.EVALUATE

}

export type CalculatorAction = EvaluateAction | ChooseOperationAction | DeleteDigitAction | ClearAction | AddDigitAction
