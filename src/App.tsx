import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { Button, CssBaseline, Switch, Link as UiLink } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Authentication, Wallets } from './pages'
import { useState } from 'react'

const themeLight = createTheme({
  palette: {
    background: {
      default: 'lightgrey',
    },
  },
})

const themeDark = createTheme({
  palette: {
    background: {
      default: 'rgb(030, 030, 030)',
      paper: 'rgb(100, 100, 100)',
    },
    primary: {
      main: '#add6a4',
    },
    text: {
      primary: '#cfd6e4',
    },
  },
})

export const App = () => {
  const [light, setLight] = useState(true)
  return (
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <CssBaseline />
      <BrowserRouter>
        <UiLink sx={{ m: 1 }} component={Link} to="/">
          Authentication
        </UiLink>
        <UiLink sx={{ m: 1 }} component={Link} to="/wallets">
          Wallets
        </UiLink>
        <Switch
          checked={light}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setLight(event.target.checked)
          }
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <Routes>
          <Route path="/wallets" element={<Wallets />} />
          <Route path="/" element={<Authentication />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
