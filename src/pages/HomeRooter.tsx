import * as React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Uniswap from './Uniswap'
import Sushiswap from './Sushiswap'
import AprChart from './AprChart'
import Quickswap from './Quickswap'

const HomeRouter = (): JSX.Element => {
  return (
    <div>
      <Route path="/uniswap" component={Uniswap} />
      <Route path="/sushiswap" component={Sushiswap} />
      <Route path="/quickswap" component={Quickswap} />
      <Route path="/chart/:id/:rate" component={AprChart} />
      <Route>
        <Redirect to="/uniswap" />
      </Route>
    </div>
  )
}

export default HomeRouter
