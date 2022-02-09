import { Button, Container } from '@mui/material'
import { SolanaWallet } from '../components/SolanaWallet'
import { useAuth } from '../contexts/AuthContext'

export function Wallets() {
  const auth = useAuth()
  console.log(auth)
  return (
    <Container maxWidth="sm">
      <h1>WalletsView</h1>
      <h4>Profile:</h4>
      <pre>{JSON.stringify(auth.currentUser, undefined, 2)}</pre>
      <Button onClick={auth.logout}>Log Out</Button>
      <SolanaWallet />
    </Container>
  )
}
