import * as React from 'react'
import { useSelector } from 'react-redux'
import AprList from '../components/AprList'
import { AllState } from '../redux/All'
import { AppState } from '../redux/App'
import { DexState } from '../redux/Dex'

export default function SushiswapMatic(): JSX.Element {
  const state = useSelector<AllState, DexState>((state) => state.sushiswap_matic)
  useSelector<AllState, AppState>((state) => state.app)

  return (
    <div style={{ maxWidth: '1000px', margin: 'auto' }}>
      <AprList
        name="Sushiswap(matic)"
        url="https://analytics-polygon.sushi.com/pairs/"
        state={state}
      />
    </div>
  )
}
