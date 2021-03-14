import { IHistory } from "../commons/history.types";

export type DexState = {
  isLoaded: boolean,
  data: IHistory[]
}

export type DexAction = {
  type: string,
  payload: DexState
}

export const dexAction = (dexName: string, payload: DexState) => {
  return {
    type: dexName,
    payload: payload
  }
}

const initialState = {
  isLoaded: false,
  data: [] as IHistory[]
}

export const uniswapReducer = (state: DexState = initialState, action: DexAction): DexState => {
  switch (action.type) {
    case "UniswapV2":
      return {
        isLoaded: true,
        data: action.payload.data
      }
    default:
      return state
  }
}

export const sushiswapReducer = (state: DexState = initialState, action: DexAction): DexState => {
  switch (action.type) {
    case "Sushiswap":
      return {
        isLoaded: true,
        data: action.payload.data
      }
    default:
      return state
  }
}
