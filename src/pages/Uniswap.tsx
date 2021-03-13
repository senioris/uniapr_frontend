import { Card, Typography } from "@material-ui/core";
import * as React from "react";
import AprList from '../components/AprList'

export default function Uniswap() {
  return (
    <Card>
      <AprList name="uniswap" />
    </Card>
  )
}