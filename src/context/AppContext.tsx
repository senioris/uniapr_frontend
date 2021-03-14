import * as React from 'react'
import { IHistory } from '../commons/history.types'

export enum EAction {
  UPDATE_UNI = "update_uni",
  UPDATE_SUSHI = "udpate_sushi",
  UPDATE_LASTUPDATE = "update_lastupdate",
}

interface IAppState {
  uniswap: IHistory[],
  sushiswap: IHistory[],
  lastupdate: Date
}

export const AppContext = React.createContext({} as {
  state: IAppState,
  dispatch: React.Dispatch<EAction>
})