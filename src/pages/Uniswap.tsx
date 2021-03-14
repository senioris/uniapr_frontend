import * as React from "react";
import AprList from '../components/AprList'
import { UniswapContext, UniswapState } from "../context/UniswapContext";

export default function Uniswap() {
  const {data, setData} = React.useContext(UniswapContext)

  return (
    <UniswapContext.Provider value={{data, setData}}>
      <AprList name="UniswapV2" url="https://info.uniswap.org/pair/" />
    </UniswapContext.Provider>
  )
}