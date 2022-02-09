import {
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Alert,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { SHA256, AES, enc } from 'crypto-js'
import { useCallback, useEffect, useRef, useState } from 'react'
import { db, getDoc, doc, setDoc } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { getAuth } from 'firebase/auth'

export function SignUp() {
  console.log('Render SignUp')
  const authContext = useAuth()
  const [input, setInput] = useState({ email: '', password: '', passwordC: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault()
    setError('')
    setLoading(true)
    authContext
      .signup(input.email, input.password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log('CREATED USER: ' + user)
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
        maxWidth: 350,
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
      <Typography variant="h5">Sign Up</Typography>
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

        <FormControl required fullWidth margin="normal">
          <InputLabel htmlFor="passwordC">Confrim password</InputLabel>
          <Input
            name="passwordC"
            autoComplete="passwordC"
            value={input.passwordC}
            onChange={handleChange}
            type="password"
          />
        </FormControl>
        <LoadingButton
          loading={loading}
          fullWidth
          variant="contained"
          type="submit"
        >
          Submit
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
