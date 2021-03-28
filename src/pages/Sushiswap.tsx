import * as React from 'react'
import { useSelector } from 'react-redux'
import AprList from '../components/AprList'
import { AllState } from '../redux/All'
import { AppState } from '../redux/App'
import { DexState } from '../redux/Dex'

export default function Sushiswap(): JSX.Element {
  const state = useSelector<AllState, DexState>((state) => state.sushiswap)
  useSelector<AllState, AppState>((state) => state.app)

  return (
    <div style={{ maxWidth: '1000px', margin: 'auto' }}>
      <AprList
        name="Sushiswap"
        url="https://sushiswap.vision/pair/"
        state={state}
      />
    </div>
  )
}
