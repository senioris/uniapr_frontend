import * as React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Uniswap from './Uniswap'
import Sushiswap from './Sushiswap'

const HomeRouter = (): JSX.Element => {
  return (
    <div>
      <Route path="/uniswap" component={Uniswap} />
      <Route path="/sushiswap" component={Sushiswap} />
      <Route>
        <Redirect to="/uniswap" />
      </Route>
    </div>
  )
}

export default HomeRouter
