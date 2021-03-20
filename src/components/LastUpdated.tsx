import { Typography } from "@material-ui/core";
import * as React from "react";
import { useSelector } from "react-redux";
import { AllState } from "../redux/All";
import { AppState } from "../redux/App";

export default function LastUpdated() {
  const stateApp = useSelector<AllState, AppState>(state => state.app)

  if (stateApp.lastUpdate) {
    return <Typography variant="h6">LastUpdated:{stateApp.lastUpdate}</Typography>
  } else {
    return <div />
  }
}