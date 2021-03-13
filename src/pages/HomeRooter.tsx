import { Typography } from '@material-ui/core'
import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Uniswap from './Uniswap'
import Sushiswap from './Sushiswap'

const HomeRouter = () => {
  return (
    <div>
      <Route path="/uniswap" component={Uniswap}/>
      <Route path="/sushiswap" component={Sushiswap} />
      <Route>
        <Redirect to="/uniswap" />
      </Route>
    </div>
  )
}

export default HomeRouter