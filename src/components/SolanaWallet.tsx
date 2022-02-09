import { useEffect, useState } from 'react'
import { getStakeAccounts, getAccount } from '../api/solana'
import { getRecentPrice } from '../api/binance'
import { Box, Button, Input, Paper, Typography, useTheme } from '@mui/material'

interface IWalletProps {
  wallet: string
}

export const SolanaWallet: React.FC<IWalletProps> = (props) => {
  const theme = useTheme()
  const [account, setAccount] = useState('')
  const [walletData, setWalletData] = useState<any>()
  const [stakesData, setStakesData] = useState<any>()
  const [stakedTotal, setStakedTotalData] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [prices, setPrices] = useState<any>()
  const LAMPORTS_IN_SOL = 1000000000

  useEffect(() => {
    if (!props.wallet) {
      return
    }

    setLoading(true)

    Promise.all([
      getAccount(props.wallet),
      getStakeAccounts(props.wallet),
      getRecentPrice('SOLUSDT'),
    ])
      .then(([accountData, stakes, priceData]) => {
        setWalletData(accountData)
        setStakesData(stakes)
        setStakedTotalData(
          Object.keys(stakes).reduce((acc, key) => {
            return acc + Number(stakes[key].amount)
          }, 0)
        )
        setPrices((...pState: any) => ({
          ...pState,
          SOLUSDT: priceData.price,
        }))
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [props.wallet])

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
      {props.wallet && <div>Account: {props.wallet}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : walletData ? (
        <>
          <div>
            Wallet: {(walletData.lamports / LAMPORTS_IN_SOL).toFixed(2)} SOL
          </div>
          <div>Staked: {(stakedTotal / LAMPORTS_IN_SOL).toFixed(2)} SOL</div>
          <div>
            Balance:{' '}
            {((walletData.lamports + stakedTotal) / LAMPORTS_IN_SOL).toFixed(2)}{' '}
            SOL ~{' '}
            {Math.floor(
              ((walletData.lamports + stakedTotal) / LAMPORTS_IN_SOL) *
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
