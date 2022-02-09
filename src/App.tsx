import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom'
import { Button, CssBaseline, Switch, Link as UiLink } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Authentication, Registration, Wallets } from './pages'
import { useState } from 'react'

import { PrivateRoute } from './components/PrivateRoute'
import { useAuth } from './contexts/AuthContext'

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
      main: 'rgb(220, 100, 10)',
    },
    text: {
      primary: 'rgb(220, 100, 10)',
      secondary: 'rgb(220, 100, 10)',
    },
  },
})

export const App = () => {
  const auth = useAuth()
  const [light, setLight] = useState(true)
  return (
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <CssBaseline />
      <BrowserRouter>
        <UiLink sx={{ m: 1 }} component={Link} to="/">
          Authentication
        </UiLink>
        <UiLink sx={{ m: 1 }} component={Link} to="/registration">
          Registration
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
          <Route
            path="/wallets"
            element={
              <PrivateRoute>
                <Wallets />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              auth?.currentUser ? (
                <Navigate to="/wallets" />
              ) : (
                <Authentication />
              )
            }
          />
          <Route
            path="/registration"
            element={
              auth?.currentUser ? <Navigate to="/wallets" /> : <Registration />
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
