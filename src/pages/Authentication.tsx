import { Button, Grid } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

export function Authentication() {
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
            <TextField sx={{ m: 1 }} size="small" id="auth" label="Auth key" />
            <Button sx={{ m: 1 }} variant="contained">
              Enter
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}
