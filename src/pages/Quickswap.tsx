import * as React from 'react'
import { useSelector } from 'react-redux'
import AprList from '../components/AprList'
import { AllState } from '../redux/All'
import { AppState } from '../redux/App'
import { DexState } from '../redux/Dex'

export default function Quickswap(): JSX.Element {
  const stateQuick = useSelector<AllState, DexState>((state) => state.quickswap)
  useSelector<AllState, AppState>((state) => state.app)

  return (
    <div style={{ maxWidth: '1000px', margin: 'auto' }}>
      <AprList
        name="Quickswap"
        url="https://info.quickswap.exchange/pair/"
        state={stateQuick}
      />
    </div>
  )
}
