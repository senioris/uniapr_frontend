import * as React from 'react'
import { render } from 'react-dom'
import { App } from './App'
import * as Redux from 'redux'
import * as DexRedux from './redux/Dex'
import * as AppRedux from './redux/App'
import * as AgreementRedux from './redux/Agreement'
import { Provider } from 'react-redux'
import { firebaseSetup } from './firebase/firebase'

const store = Redux.createStore(
  Redux.combineReducers({
    uniswap: DexRedux.uniswapReducer,
    sushiswap: DexRedux.sushiswapReducer,
    quickswap: DexRedux.quickswapReducer,
    app: AppRedux.appReducer,
    agreement: AgreementRedux.agreementReducer,
  })
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

firebaseSetup()
