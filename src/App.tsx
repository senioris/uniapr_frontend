import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'
import Home from './pages/Home'
export const App = () => {
  return(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Home/>
      </ThemeProvider>
    </BrowserRouter>
  )
}
