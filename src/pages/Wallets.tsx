import { Container } from '@mui/material'
import { SolanaWallet } from '../components/SolanaWallet'

export function Wallets() {
  return (
    <Container maxWidth="sm">
      <h1>WalletsView</h1>
      <SolanaWallet />
    </Container>
  )
}
