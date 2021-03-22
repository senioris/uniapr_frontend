export type AgreementState = {
  impoerLoss: boolean
}

export type AgreementAction = {
  type: AgreementActionType
  payload: AgreementState
}

export enum AgreementActionType {
  ACTION_IMPERLOSS = 'AgreementActionImperLoss',
}

export const agreementAction = (
  action: AgreementActionType,
  payload: AgreementState
): AgreementAction => {
  return {
    type: action,
    payload: payload,
  }
}

const initialState: AgreementState = {
  impoerLoss: localStorage.getItem('imperloss') == '1' ? true : false,
}

export const agreementReducer = (
  state: AgreementState = initialState,
  action: AgreementAction
): AgreementState => {
  switch (action.type) {
    case AgreementActionType.ACTION_IMPERLOSS: {
      const agreeed = action.payload.impoerLoss
      localStorage.setItem('imperloss', agreeed ? '1' : '0')
      return {
        ...state,
        impoerLoss: agreeed,
      }
    }
    default:
      return state
  }
}
