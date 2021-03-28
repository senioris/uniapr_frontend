import * as React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import { ListApi } from '../api/ListApi'
import { IHistory, HistorySchemaDefine } from '../commons/history.types'
import { dexAction, DexState } from '../redux/Dex'
import { appAction, AppActionType, AppState } from '../redux/App'
import { useDispatch, useSelector } from 'react-redux'
import { AllState } from '../redux/All'
import { Hidden, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import TimelineIcon from '@material-ui/icons/Timeline'
import { Link as RouterLink } from 'react-router-dom'
import LastUpdated from './LastUpdated'
import { EnhancedTableHead, Order } from './AprListHeader'
import { PriceRate } from './PriceRate'

type AprListProps = {
  name: string
  url: string
  state: DexState
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator<Key extends keyof IHistory>(
  order: Order,
  orderBy: Key
): (a: IHistory, b: IHistory) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    titleArea: {
      display: 'flex',
    },
    title: {
      flexGrow: 1,
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(1),
    },
    table: {
      [theme.breakpoints.up('sm')]: {
        minWidth: 750,
      },
      [theme.breakpoints.down('xs')]: {
        minWidth: 320,
      },
      tableLayout: 'fixed',
    },
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
    bold: {
      fontWeight: 'bolder',
    },
    pairName: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    lastUpdated: {
      textAlign: 'right',
    },
  })
)

const effectImpermanentLoss = (apr: number, changeRate: number): number => {
  return Number(
    (apr + ((2 * Math.sqrt(changeRate)) / (1 + changeRate) - 1) * 100).toFixed(
      2
    )
  )
}

export default function AprList(props: AprListProps): JSX.Element {
  const classes = useStyles()
  const theme = useTheme()
  const isBrowser = useMediaQuery(theme.breakpoints.up('sm'))
  const [order, setOrder] = React.useState<Order>('desc')
  const [orderBy, setOrderBy] = React.useState<keyof IHistory>(
    HistorySchemaDefine.RESERVED_USD
  )
  const [page, setPage] = React.useState(0)

  const stateApp = useSelector<AllState, AppState>((state) => state.app)

  const dispatch = useDispatch()

  React.useEffect(() => {
    const abortController = new AbortController()
    if (!props.state.isLoaded) {
      const signal = abortController.signal
      ListApi.list(props.name, signal).then((data) => {
        dispatch(
          dexAction(props.name, { ...props.state, isLoaded: true, data: data })
        )

        if (data && data.length > 0 && data[0].created) {
          const date = new Date(data[0].created)
          dispatch(
            appAction(AppActionType.ACTION_LASTUPDATE, {
              lastUpdate: date.toLocaleDateString(),
              isDark: false,
              rowsPerPage: 0,
            })
          )
        }
      })
    }

    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof IHistory
  ) => {
    const isDesc = orderBy === property && order === 'desc'
    setOrder(isDesc ? 'asc' : 'desc')
    setOrderBy(property)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      appAction(AppActionType.ACTION_ROWPERPAGE, {
        lastUpdate: '',
        isDark: false,
        rowsPerPage: parseInt(event.target.value, 10),
      })
    )
    setPage(0)
  }

  const handleChangePriceRate = (rate: number) => {
    dispatch(
      dexAction(props.name + '.rate', { ...props.state, changeRate: rate })
    )
  }

  if (!props.state.isLoaded) {
    return <div />
  }

  const rowsPerPage = stateApp.rowsPerPage
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, props.state.data.length - page * rowsPerPage)

  return (
    <div className={classes.root}>
      <div className={classes.titleArea}>
        <Typography className={classes.title} variant="h6">
          {props.name}
        </Typography>
        <PriceRate
          onChanged={handleChangePriceRate}
          rate={props.state.changeRate}
        />
      </div>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={props.state.data.length}
            />
            <TableBody>
              {stableSort<IHistory>(
                props.state.data,
                getComparator(order, orderBy)
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const baseIndex = page * rowsPerPage + 1
                  return (
                    <TableRow hover tabIndex={-1} key={row.pairName}>
                      <TableCell size="small">{baseIndex + index}</TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        className={classes.pairName}>
                        <Link
                          target="_blank"
                          rel="noopener noreferrer"
                          href={props.url + row.pairId}
                          className={classes.bold}>
                          {row.pairName}
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        {'$' + row.reserveUSD.toLocaleString()}
                      </TableCell>
                      <Hidden xsDown>
                        <TableCell align="right">
                          {'$' + row.volumeUSD.toLocaleString()}
                        </TableCell>
                      </Hidden>
                      <Hidden xsDown>
                        <TableCell align="right">
                          {effectImpermanentLoss(
                            row.apr,
                            props.state.changeRate
                          ) + '%'}
                        </TableCell>
                      </Hidden>
                      <TableCell align="right">
                        {(() => {
                          if (isBrowser) {
                            return row.aprWeek >= 0
                              ? effectImpermanentLoss(
                                  row.aprWeek,
                                  props.state.changeRate
                                ) + '%'
                              : '-'
                          } else {
                            return (
                              <RouterLink
                                to={
                                  '/chart/' +
                                  row.pairId +
                                  '/' +
                                  props.state.changeRate
                                }
                                key={row.pairId}>
                                {row.aprWeek >= 0
                                  ? effectImpermanentLoss(
                                      row.aprWeek,
                                      props.state.changeRate
                                    ) + '%'
                                  : '-'}
                              </RouterLink>
                            )
                          }
                        })()}
                      </TableCell>
                      <Hidden xsDown>
                        <TableCell size="small">
                          <RouterLink
                            to={
                              '/chart/' +
                              row.pairId +
                              '/' +
                              props.state.changeRate
                            }
                            key={row.pairId}>
                            <TimelineIcon />
                          </RouterLink>
                        </TableCell>
                      </Hidden>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 25, 50, 100]}
          component="div"
          count={props.state.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelRowsPerPage="Rows"
        />
      </Paper>
      <div style={{ width: '100%' }}>
        <LastUpdated className={classes.lastUpdated} />
      </div>
    </div>
  )
}
