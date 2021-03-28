import {
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  Select,
  Theme,
} from '@material-ui/core'
import * as React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    priceChange: {
      display: 'flex',
      marginBottom: theme.spacing(1),
    },
    formControl: {
      minWidth: 160,
      marginLeft: 'auto',
    },
    select: {
      height: 35,
      direction: 'rtl',
    },
  })
)

interface PriceRateProps {
  onChanged?: (rate: number) => void
  rate: number
}

export const PriceRate = (props: PriceRateProps): JSX.Element => {
  const classes = useStyles()

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.onChanged?.(Number(event.target.value))
  }

  return (
    <div className={classes.priceChange}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">
          The price change rate
        </InputLabel>
        <Select
          className={classes.select}
          value={props.rate}
          native
          onChange={handleChange}
          label="The price change rate"
          inputProps={{
            name: 'The price change rate',
            id: 'outlined-age-native-simple',
          }}>
          <option value={1}>1x</option>
          <option value={2}>2x</option>
          <option value={3}>3x</option>
          <option value={4}>4x</option>
          <option value={5}>5x</option>
          <option value={6}>6x</option>
          <option value={7}>7x</option>
          <option value={8}>8x</option>
          <option value={9}>9x</option>
          <option value={10}>10x</option>
        </Select>
      </FormControl>
    </div>
  )
}
