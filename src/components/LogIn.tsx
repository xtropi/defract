import {
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Alert,
} from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { SHA256, AES, enc } from 'crypto-js'
import { useCallback, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { useAuth } from '../contexts/AuthContext'
import { db, getDoc, doc, setDoc } from '../firebase'
import { LoadingButton } from '@mui/lab'

export function LogIn() {
  console.log('Render LogIn')
  const authContext = useAuth()
  const [input, setInput] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault()
    setError('')
    setLoading(true)
    authContext
      .login(input.email, input.password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log('LOGIN USER: ' + user)
        setLoading(false)
      })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
      })
    //   history.push("/")
  }

  const handleChange = useCallback((event: any) => {
    const value = event.target.value
    const name = event.target.name
    setInput((prev) => ({ ...prev, [name]: value }))
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        minWidth: 350,
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'background.paper',
        overflow: 'hidden',
        borderRadius: '10px',
        p: 2,
        boxShadow: 1,
        fontWeight: 'bold',
      }}
    >
      <Typography variant="h5">Log In</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl required fullWidth margin="normal">
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            name="email"
            type="email"
            autoComplete="email"
            onChange={handleChange}
            value={input.email}
          />
        </FormControl>

        <FormControl required fullWidth margin="normal">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            name="password"
            autoComplete="password"
            value={input.password}
            onChange={handleChange}
            type="password"
          />
        </FormControl>
        <LoadingButton
          type="submit"
          loading={loading}
          fullWidth
          variant="contained"
        >
          Enter
        </LoadingButton>
      </form>
      {error && (
        <Alert sx={{ m: 2 }} severity="error">
          {error}
        </Alert>
      )}
    </Box>
  )
}
