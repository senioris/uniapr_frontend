import { AgreementState } from './Agreement'
import { AppState } from './App'
import { DexState } from './Dex'

export type AllState = {
  uniswap: DexState
  sushiswap: DexState
  quickswap: DexState
  sushiswap_matic: DexState
  app: AppState
  agreement: AgreementState
}
