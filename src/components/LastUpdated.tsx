import { Typography } from '@material-ui/core';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { AllState } from '../redux/All';
import { AppState } from '../redux/App';

export default function LastUpdated(): JSX.Element {
  const stateApp = useSelector<AllState, AppState>((state) => state.app);

  if (stateApp.lastUpdate) {
    return (
      <Typography variant="subtitle2" style={{ paddingTop: '10px' }}>
        LastUpdated:{stateApp.lastUpdate}
      </Typography>
    );
  } else {
    return <div />;
  }
}
