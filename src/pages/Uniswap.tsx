import * as React from 'react'
import { useSelector } from 'react-redux'
import AprList from '../components/AprList'
import { AllState } from '../redux/All'
import { AppState } from '../redux/App'
import { DexState } from '../redux/Dex'

export default function Uniswap(): JSX.Element {
  const stateUni = useSelector<AllState, DexState>((state) => state.uniswap)
  useSelector<AllState, AppState>((state) => state.app)

  return (
    <div style={{ maxWidth: '1000px', margin: 'auto' }}>
      <AprList
        name="UniswapV2"
        url="https://info.uniswap.org/pair/"
        state={stateUni}
      />
    </div>
  )
}
