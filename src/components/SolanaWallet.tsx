import { useState } from 'react'
import { getStakeAccounts, getAccount } from '../api/solana'
import { getRecentPrice } from '../api/binance'
import { Box, Button, Input, Paper, Typography, useTheme } from '@mui/material'

export const SolanaWallet: React.FC = () => {
  const theme = useTheme()
  const [account, setAccount] = useState('')
  const [accountData, setAccountData] = useState<any>()
  const [stakesData, setStakesData] = useState<any>()
  const [stakedTotal, setStakedTotalData] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [prices, setPrices] = useState<any>()
  const LAMPORTS_IN_SOL = 1000000000

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.currentTarget.value
    setAccount(value)
  }

  function handleClick() {
    setLoading(true)
    Promise.all([
      getAccount(account),
      getStakeAccounts(account),
      getRecentPrice('SOLUSDT'),
    ])
      .then(([accountData, stakes, priceData]) => {
        setAccountData(accountData)
        setStakesData(stakes)
        setStakedTotalData(
          Object.keys(stakes).reduce((acc, key) => {
            return acc + Number(stakes[key].amount)
          }, 0)
        )
        setPrices((...pState: any) => ({ ...pState, SOLUSDT: priceData.price }))
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  return (
    <Paper
      elevation={3}
      sx={{
        width: 500,
        borderRadius: '10px',
        p: 1,
        m: 1,
      }}
    >
      <Typography variant="h5" gutterBottom component="div">
        SOLANA Wallet
      </Typography>
      <Input sx={{ width: 350, m: 1 }} value={account} onChange={handleInput} />
      <Button color="primary" variant="contained" onClick={handleClick}>
        Get data
      </Button>

      {loading ? (
        <div>Loading...</div>
      ) : accountData ? (
        <>
          <div>
            Wallet: {(accountData.lamports / LAMPORTS_IN_SOL).toFixed(2)} SOL
          </div>
          <div>Staked: {(stakedTotal / LAMPORTS_IN_SOL).toFixed(2)} SOL</div>
          <div>
            Balance:{' '}
            {((accountData.lamports + stakedTotal) / LAMPORTS_IN_SOL).toFixed(
              2
            )}{' '}
            SOL ~{' '}
            {Math.floor(
              ((accountData.lamports + stakedTotal) / LAMPORTS_IN_SOL) *
                prices?.SOLUSDT
            ).toFixed(2)}{' '}
            USD
          </div>
        </>
      ) : (
        <div>No data</div>
      )}
    </Paper>
  )
}
