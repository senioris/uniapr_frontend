import { createStyles, makeStyles, Paper, Theme } from '@material-ui/core'
import * as React from 'react'
import ReactApexChart, { Props as ApexChartProps } from 'react-apexcharts'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { ListApi } from '../api/ListApi'
import { IHistory } from '../commons/history.types'
import { AllState } from '../redux/All'
import { AppState } from '../redux/App'

type Params = {
  id: string
  rate: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
    },
  })
)

const chartData = (
  props: ApexChartProps,
  histories: IHistory[],
  stateApp: AppState,
  rate: string
): ApexChartProps => {
  return {
    series: [
      {
        name: 'APR',
        data: histories.map((data) =>
          effectImpermanentLoss(data.apr, Number(rate))
        ),
      },
    ],
    options: {
      ...props.options,
      title: {
        text: histories[0].pairName + ' APR (' + rate + 'x price change)',
        align: 'center',
        style: {
          fontSize: '20px',
          fontFamily: "'Roboto', sans-serif",
          fontWeight: undefined,
        },
      },
      theme: {
        mode: stateApp.isDark ? 'dark' : 'light',
      },
      xaxis: {
        categories: histories.map((data) => {
          if (data && data.created) {
            const date = new Date(data.created)
            return date.getMonth() + 1 + '/' + date.getDate()
          }

          return '-'
        }),
        labels: {
          style: {
            fontFamily: "'Roboto', sans-serif",
          },
        },
      },
    },
  }
}

const effectImpermanentLoss = (apr: number, changeRate: number): number => {
  return Number(
    (apr + ((2 * Math.sqrt(changeRate)) / (1 + changeRate) - 1) * 100).toFixed(
      2
    )
  )
}

const themeData = (props: ApexChartProps, isDark: boolean): ApexChartProps => {
  return {
    series: props.series?.concat(),
    options: {
      ...props.options,
      theme: {
        mode: isDark ? 'dark' : 'light',
        palette: 'palette2',
      },
    },
  }
}

export default function AprChart(): JSX.Element {
  const classes = useStyles()
  const stateApp = useSelector<AllState, AppState>((state) => state.app)

  const [data, setData] = React.useState<IHistory[]>([])
  const params = useParams() as Params

  const [chart, setChart] = React.useState<ApexChartProps>({
    series: [],
    options: {
      chart: {
        height: 500,
        type: 'line',
        background: 'transparent',
        zoom: {
          enabled: false,
        },
        animations: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: '',
        align: 'center',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      theme: {
        mode: 'light',
      },
      yaxis: {
        labels: {
          style: {
            fontFamily: "'Roboto', sans-serif",
          },
        },
      },
    },
  })

  React.useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    ListApi.history(params.id, signal).then((histories) => {
      setData(histories)

      setChart(chartData(chart, histories, stateApp, params.rate))
    })

    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    setChart((chart) => themeData(chart, stateApp.isDark))
  }, [stateApp.isDark])

  if (data.length <= 0) {
    return <div />
  }

  return (
    <div>
      <Paper className={classes.paper}>
        <ReactApexChart
          options={chart.options}
          series={chart.series}
          type="line"
          height={350}
        />
      </Paper>
    </div>
  )
}
