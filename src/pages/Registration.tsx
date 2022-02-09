import { Grid } from '@mui/material'
import { SignUp } from '../components/SignUp'

export function Registration() {
  console.log('Render Reg')

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
          <SignUp />
        </Grid>
      </Grid>
    </div>
  )
}
