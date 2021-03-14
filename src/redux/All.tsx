import { AppState } from './App'
import { DexState } from './Dex'

export type AllState = {
  uniswap: DexState,
  sushiswap: DexState,
  app: AppState,
}