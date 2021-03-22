import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'
import Home from './pages/Home'
import { useSelector } from 'react-redux'
import { AppState } from './redux/App'
import { AllState } from './redux/All'

export const App = (): JSX.Element => {
  const stateApp = useSelector<AllState, AppState>((state) => state.app)

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme(stateApp)}>
        <Home />
      </ThemeProvider>
    </BrowserRouter>
  )
}
