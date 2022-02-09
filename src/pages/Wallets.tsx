import { Button, Container } from '@mui/material'
import { SolanaWallet } from '../components/SolanaWallet'
import { useAuth } from '../contexts/AuthContext'
import { SHA256, AES, enc } from 'crypto-js'
import { db, doc, getDoc, setDoc } from '../firebase'
import { useEffect, useState } from 'react'
import { AddWallet } from '../components/AddWallet'

// function encrypt() {
// console.log(SHA256(value).toString())
// const encrypted = AES.encrypt(value, 'Secret Passphrase').toString()
// const decrypted = AES.decrypt(encrypted, 'Secret Passphrase').toString(
//   enc.Utf8
// )
// }

export function Wallets() {
  const [wallets, setWallets] = useState({ solana: '' })
  const auth = useAuth()
  console.log(wallets.solana)
  function handleAddWallet(wallet: string) {
    const newWallets = { ...wallets, solana: wallet }
    setWallets(newWallets)
    // const encoded = SHA256(input).toString()

    const docRef = doc(db, 'users', auth.currentUser.uid)
    setDoc(docRef, { data: newWallets }).catch((err) => {
      err.message && console.log(err.message)
    })
  }
  function handleRead() {
    // const encoded = SHA256(input).toString()
    const docRef = doc(db, 'users', auth.currentUser.uid)
    getDoc(docRef)
      .then((res) => {
        const data = res.data()?.data
        if (data) {
          console.log(data)
          setWallets(data)
        } else {
          console.log('No data')
        }
      })
      .catch((err) => {
        err.message && console.log(err.message)
      })
  }

  useEffect(() => {
    console.log('effect')
    handleRead()
  }, [])

  return (
    <Container maxWidth="sm">
      <h1>Wallets</h1>
      <Button onClick={auth.logout}>Log Out</Button>
      <AddWallet onAdd={handleAddWallet} />
      <SolanaWallet wallet={wallets.solana} />
    </Container>
  )
}
