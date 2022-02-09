import { useState } from 'react'
import { Button, MenuItem, Paper, Select, TextField } from '@mui/material'

interface IAddWalletProps {
  onAdd: (wallet: string) => void
}

export const AddWallet: React.FC<IAddWalletProps> = (props) => {
  const [account, setAccount] = useState('')

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.currentTarget.value
    setAccount(value)
  }

  function handleClick() {
    props.onAdd(account)
  }

  return (
    <Paper
      elevation={3}
      sx={{
        width: 500,
        maxWidth: 500,
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        p: 2,
        m: 1,
      }}
    >
      <Select defaultValue="Solana" fullWidth size="small">
        <MenuItem value="Solana">Solana</MenuItem>
        <MenuItem disabled value="Ethereum">
          Ethereum
        </MenuItem>
        <MenuItem disabled value="Bitcoin">
          Bitcoin
        </MenuItem>
      </Select>
      <TextField
        fullWidth
        label="Account №"
        size="small"
        value={account}
        onChange={handleInput}
      />
      <Button
        fullWidth
        color="primary"
        variant="contained"
        onClick={handleClick}
      >
        Add new wallet
      </Button>
    </Paper>
  )
}
