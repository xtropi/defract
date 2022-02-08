import { Button, Grid } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { SHA256, AES, enc } from 'crypto-js'
import { useState } from 'react'

export function Authentication() {
  const [input, setInput] = useState()

  function handleClick() {
    console.log('button pressed')
  }

  function handleChange(event: any) {
    const value = event.target.value
    setInput(value)
    console.log(SHA256(value).toString())
    const encrypted = AES.encrypt(value, 'Secret Passphrase').toString()
    const decrypted = AES.decrypt(encrypted, 'Secret Passphrase').toString(
      enc.Utf8
    )
    console.log(encrypted)
    console.log(decrypted)
  }

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              bgcolor: 'background.paper',
              overflow: 'hidden',
              borderRadius: '10px',
              p: 1,
              boxShadow: 1,
              fontWeight: 'bold',
            }}
          >
            <TextField
              onChange={handleChange}
              sx={{ m: 1 }}
              size="small"
              id="auth"
              label="Auth key"
            />
            <Button onClick={handleClick} sx={{ m: 1 }} variant="contained">
              Enter
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}
