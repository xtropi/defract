import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Button, CssBaseline } from '@mui/material'
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
      default: '#222222',
    },
    text: {
      primary: '#ffffff',
    },
  },
})

export const App = () => {
  const [light, setLight] = useState(true)
  return (
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <CssBaseline />
      <BrowserRouter>
        <Link to="/">Authentication</Link>
        <Link to="/wallets">Wallets</Link>
        <Button onClick={() => setLight((prev) => !prev)}>Toggle Theme</Button>
        <Routes>
          <Route path="/wallets" element={<Wallets />} />
          <Route path="/" element={<Authentication />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
