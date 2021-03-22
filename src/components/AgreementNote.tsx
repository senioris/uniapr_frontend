import { Button } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  agreementAction,
  AgreementActionType,
  AgreementState,
} from '../redux/Agreement'
import { AllState } from '../redux/All'

type AgreementNoteProps = {
  note: string
  actionType: AgreementActionType
}

export default function AgreementNote(props: AgreementNoteProps): JSX.Element {
  const stateAgreement = useSelector<AllState, AgreementState>(
    (state) => state.agreement
  )
  const dispatch = useDispatch()

  const onClickAgreement = () => {
    switch (props.actionType) {
      case AgreementActionType.ACTION_IMPERLOSS: {
        const payload = {
          impoerLoss: true,
        } as AgreementState

        dispatch(agreementAction(AgreementActionType.ACTION_IMPERLOSS, payload))
      }
    }
  }

  if (stateAgreement.impoerLoss) {
    return <div />
  } else {
    return (
      <Alert
        action={
          <Button color="primary" size="small" onClick={onClickAgreement}>
            Understood
          </Button>
        }>
        {(() => props.note)()}
      </Alert>
    )
  }
}
