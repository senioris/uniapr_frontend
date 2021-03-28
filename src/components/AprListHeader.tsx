import {
  createStyles,
  makeStyles,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import * as React from 'react'
import { HistorySchemaDefine, IHistory } from '../commons/history.types'

interface HeadCell {
  id: keyof IHistory | string
  label: string
  numeric: boolean
  padding: boolean
  width: number | string
  mobileDisplay: boolean
  tip?: string
}

export type Order = 'asc' | 'desc'

const headCells: HeadCell[] = [
  {
    id: 'empty',
    numeric: false,
    label: '',
    padding: true,
    width: '10%',
    mobileDisplay: true,
  },
  {
    id: HistorySchemaDefine.PAIR_NAME,
    numeric: false,
    label: 'Name',
    padding: false,
    width: '20%',
    mobileDisplay: true,
  },
  {
    id: HistorySchemaDefine.RESERVED_USD,
    numeric: true,
    label: 'Liquidity',
    padding: true,
    width: '20%',
    mobileDisplay: true,
  },
  {
    id: HistorySchemaDefine.VOLUME_USD,
    numeric: true,
    label: 'Volume(24hrs)',
    padding: true,
    width: '20%',
    mobileDisplay: false,
  },
  {
    id: HistorySchemaDefine.APR,
    numeric: true,
    label: 'APR(24hrs)',
    padding: true,
    width: '20%',
    mobileDisplay: false,
    tip: 'Calculated using 24hours volume.',
  },
  {
    id: HistorySchemaDefine.APR_WEEK,
    numeric: true,
    label: 'APR(7d)',
    padding: true,
    width: '20%',
    mobileDisplay: true,
    tip: 'Calculated using week volume.',
  },
  {
    id: 'chart',
    numeric: false,
    label: '',
    padding: false,
    width: '10%',
    mobileDisplay: false,
  },
]

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IHistory
  ) => void
  order: Order
  orderBy: string
  rowCount: number
}

const useStyles = makeStyles(() =>
  createStyles({
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  })
)

export function EnhancedTableHead(props: EnhancedTableProps): JSX.Element {
  const classes = useStyles()
  const { order, orderBy, onRequestSort } = props
  const createSortHandler = (property: keyof IHistory) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property)
  }

  const createLabel = (headCell: HeadCell) => {
    if (headCell.numeric) {
      return (
        <Tooltip disableFocusListener title={headCell.tip ? headCell.tip : ''}>
          <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : 'desc'}
            onClick={createSortHandler(headCell.id as keyof IHistory)}>
            {headCell.label}
            {orderBy === headCell.id ? (
              <span className={classes.visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </span>
            ) : null}
          </TableSortLabel>
        </Tooltip>
      )
    } else {
      return headCell.label
    }
  }

  const theme = useTheme()
  const isBrowser = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            padding={headCell.padding ? 'default' : 'none'}
            key={headCell.id as React.Key}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{
              width: headCell.width,
              display: displayProperty(isBrowser, headCell.mobileDisplay),
            }}>
            {createLabel(headCell)}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const displayProperty = (isBrowser: boolean, isMobile: boolean): string => {
  if (isBrowser || isMobile) {
    return 'table-cell'
  } else {
    return 'none'
  }
}
