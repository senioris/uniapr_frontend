import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import * as React from "react";
import { useSelector } from "react-redux";
import AprList from "../components/AprList";
import AgreementNote from "../components/AgreementNote";
import { AllState } from '../redux/All'
import { AppState } from "../redux/App";
import { DexState } from "../redux/Dex";
import { AgreementActionType } from "../redux/Agreement";
import LastUpdated from "../components/LastUpdated";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleArea: {
      display: 'flex',
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default function Sushiswap() {
  const classes = useStyles()
  const state = useSelector<AllState, DexState>(state => state.sushiswap)
  const stateApp = useSelector<AllState, AppState>(state => state.app)

  return (
    <div>
      <AgreementNote note="This APR does not calculate impermanent loss." actionType={AgreementActionType.ACTION_IMPERLOSS} />

      <div className={classes.titleArea}>
        <Typography className={classes.title} variant="h6">Sushiswap</Typography>
        <LastUpdated />
      </div>
      <AprList name="Sushiswap" url="https://sushiswap.vision/pair/" state={state}/>
    </div>
  )
}