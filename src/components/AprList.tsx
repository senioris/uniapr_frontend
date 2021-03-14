import * as React from 'react';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper';
import { ListApi } from '../api/ListApi';
import { IHistory, HistorySchemaDefine } from '../commons/history.types';
import { dexAction, DexState } from '../redux/Dex';
import { appAction, AppActionType } from '../redux/App'
import { useDispatch } from 'react-redux';

type AprListProps = {
  name: string,
  url: string,
  state: DexState
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof IHistory>(
  order: Order,
  orderBy: Key,
): (a: IHistory, b: IHistory) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  id: keyof IHistory | String;
  label: string;
  numeric: boolean;
  padding: boolean;
}

const headCells: HeadCell[] = [
  { id: "empty", numeric: false, label: '', padding: true },
  { id: HistorySchemaDefine.PAIR_NAME, numeric: false, label: 'Name', padding: false },
  { id: HistorySchemaDefine.RESERVED_USD, numeric: true, label: 'Liquidity', padding: true },
  { id: HistorySchemaDefine.VOLUME_USD, numeric: true, label: 'Volume(24hrs)', padding: true },
  { id: HistorySchemaDefine.APR, numeric: true, label: 'APR(24hrs volume)', padding: true },
  { id: HistorySchemaDefine.APR_WEEK, numeric: true, label: 'APR(7d volume)', padding: true },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IHistory) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof IHistory) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  const createLabel = (headCell: HeadCell) => {
    if (headCell.numeric) {
      return (
        <TableSortLabel
          active={orderBy === headCell.id}
          direction={orderBy === headCell.id ? order : 'desc'}
          onClick={createSortHandler(headCell.id as keyof IHistory)}
        >
          {headCell.label}
          {orderBy === headCell.id ? (
            <span className={classes.visuallyHidden}>
              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
            </span>
          ) : null}
        </TableSortLabel>
      )
    } else {
      return headCell.label
    }

  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            padding={headCell.padding ? "default" : "none"}
            key={headCell.id as React.Key}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {createLabel(headCell)}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
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
      fontWeight: 'bolder'
    }
  }),
);

export default function AprList(props: AprListProps) {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<keyof IHistory>(HistorySchemaDefine.RESERVED_USD);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const dispatch = useDispatch()

  React.useEffect(() => {
    const abortController = new AbortController()
    if (!props.state.isLoaded) {
      const signal = abortController.signal
      ListApi.list(props.name, signal).then((data) => {
        dispatch(dexAction(props.name, { isLoaded: true, data: data }))

        if (data[0].created) {
          let date = new Date(data[0].created)
          dispatch(appAction(AppActionType.ACTION_LASTUPDATE, {
            lastUpdate: date.toLocaleDateString(),
            isDark: false
          }))
        }
      })
    }

    return () => {
      abortController.abort()
    }
  }, [])

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof IHistory) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!props.state.isLoaded) {
    return (
      <div/>
    )
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.state.data.length - page * rowsPerPage);


  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={props.state.data.length}
            />
            <TableBody>
              {stableSort<IHistory>(props.state.data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  let baseIndex = page * rowsPerPage + 1
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.pairName}
                    >
                      <TableCell size="small">{baseIndex + index}</TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Link
                          target="_blank"
                          rel="noopener noreferrer"
                          href={props.url + row.pairId}
                          className={classes.bold}>{row.pairName}
                        </Link>
                      </TableCell>
                      <TableCell align="right">{'$' + row.reserveUSD.toLocaleString()}</TableCell>
                      <TableCell align="right">{'$' + row.volumeUSD.toLocaleString()}</TableCell>
                      <TableCell align="right">{row.apr + '%'}</TableCell>
                      <TableCell align="right">{row.aprWeek + '%'}</TableCell>
                    </TableRow>
                  );
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
          rowsPerPageOptions={[25, 50, 100]}
          component="div"
          count={props.state.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
