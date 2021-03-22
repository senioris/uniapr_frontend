import { createStyles, makeStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import { useSelector } from 'react-redux';
import AprList from '../components/AprList';
import AgreementNote from '../components/AgreementNote';
import { AgreementActionType } from '../redux/Agreement';
import { AllState } from '../redux/All';
import { AppState } from '../redux/App';
import { DexState } from '../redux/Dex';
import LastUpdated from '../components/LastUpdated';

const useStyles = makeStyles(() =>
  createStyles({
    titleArea: {
      display: 'flex',
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function Uniswap(): JSX.Element {
  const classes = useStyles();
  const stateUni = useSelector<AllState, DexState>((state) => state.uniswap);
  useSelector<AllState, AppState>((state) => state.app);

  return (
    <div style={{ maxWidth: '1000px', margin: 'auto' }}>
      <AgreementNote
        note="This APR does not calculate impermanent loss."
        actionType={AgreementActionType.ACTION_IMPERLOSS}
      />

      <div className={classes.titleArea}>
        <Typography className={classes.title} variant="h6">
          UniswapV2
        </Typography>
        <LastUpdated />
      </div>
      <AprList
        name="UniswapV2"
        url="https://info.uniswap.org/pair/"
        state={stateUni}
      />
    </div>
  );
}
