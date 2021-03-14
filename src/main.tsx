import * as React from 'react'
import { render } from 'react-dom'
import { App } from './App'
import * as Redux from 'redux'
import * as DexRedux from './redux/Dex'
import * as AppRedux from './redux/App'
import { Provider } from 'react-redux'

const store = Redux.createStore(Redux.combineReducers({
  uniswap: DexRedux.uniswapReducer,
  sushiswap: DexRedux.sushiswapReducer,
  app: AppRedux.appReducer
}))


render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
