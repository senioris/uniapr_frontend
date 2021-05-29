import { IHistory } from '../commons/history.types'

export type DexState = {
  isLoaded: boolean
  data: IHistory[]
  changeRate: number
}

export type DexAction = {
  type: string
  payload: DexState
}

export const dexAction = (dexName: string, payload: DexState): DexAction => {
  return {
    type: dexName,
    payload: payload,
  }
}

const initialUniState = {
  isLoaded: false,
  data: [] as IHistory[],
  changeRate:
    Number(localStorage.getItem('UniswapV2.rate')) >= 1
      ? Number(localStorage.getItem('UniswapV2.rate'))
      : 1,
}

export const uniswapReducer = (
  state: DexState = initialUniState,
  action: DexAction
): DexState => {
  switch (action.type) {
    case 'UniswapV2':
      return {
        ...state,
        isLoaded: true,
        data: action.payload.data,
      }
    case 'UniswapV2.rate':
      localStorage.setItem('UniswapV2.rate', String(action.payload.changeRate))
      return {
        ...state,
        changeRate: action.payload.changeRate,
      }
    default:
      return state
  }
}

const initialSushiState = {
  isLoaded: false,
  data: [] as IHistory[],
  changeRate:
    Number(localStorage.getItem('Sushiswap.rate')) >= 1
      ? Number(localStorage.getItem('Sushiswap.rate'))
      : 1,
}

export const sushiswapReducer = (
  state: DexState = initialSushiState,
  action: DexAction
): DexState => {
  switch (action.type) {
    case 'Sushiswap':
      return {
        ...state,
        isLoaded: true,
        data: action.payload.data,
      }
    case 'Sushiswap.rate':
      localStorage.setItem('Sushiswap.rate', String(action.payload.changeRate))
      return {
        ...state,
        changeRate: action.payload.changeRate,
      }
    default:
      return state
  }
}

const initialQuickState = {
  isLoaded: false,
  data: [] as IHistory[],
  changeRate:
    Number(localStorage.getItem('Quickswap.rate')) >= 1
      ? Number(localStorage.getItem('Quickswap.rate'))
      : 1,
}

export const quickswapReducer = (
  state: DexState = initialQuickState,
  action: DexAction
): DexState => {
  switch (action.type) {
    case 'Quickswap':
      return {
        ...state,
        isLoaded: true,
        data: action.payload.data,
      }
    case 'Quickswap.rate':
      localStorage.setItem('Quickswap.rate', String(action.payload.changeRate))
      return {
        ...state,
        changeRate: action.payload.changeRate,
      }
    default:
      return state
  }
}

const initialSushiMaticState = {
  isLoaded: false,
  data: [] as IHistory[],
  changeRate:
    Number(localStorage.getItem('Sushiswap(matic).rate')) >= 1
      ? Number(localStorage.getItem('Sushiswap(matic).rate'))
      : 1,
}

export const sushiswapMaticReducer = (
  state: DexState = initialSushiMaticState,
  action: DexAction
): DexState => {
  switch (action.type) {
    case 'Sushiswap(matic)':
      return {
        ...state,
        isLoaded: true,
        data: action.payload.data,
      }
    case 'Sushiswap(matic).rate':
      localStorage.setItem('Sushiswap(matic).rate', String(action.payload.changeRate))
      return {
        ...state,
        changeRate: action.payload.changeRate,
      }
    default:
      return state
  }
}

