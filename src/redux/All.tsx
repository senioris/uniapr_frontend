import { AgreementState } from './Agreement'
import { AppState } from './App'
import { DexState } from './Dex'

export type AllState = {
  uniswap: DexState
  sushiswap: DexState
  quickswap: DexState
  app: AppState
  agreement: AgreementState
}
