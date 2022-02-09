import { Grid } from '@mui/material'
import { SHA256, AES, enc } from 'crypto-js'
import { useState } from 'react'
import { LogIn } from '../components/LogIn'
import { db, getDoc, doc, setDoc } from '../firebase'

export function Authentication() {
  console.log('Render')
  const [input, setInput] = useState('')

  function handleClick() {
    const encoded = SHA256(input).toString()
    console.log(encoded)
    const docRef = doc(db, 'users', encoded)
    getDoc(docRef).then((res) => {
      const data = res.data()?.data
      data ? console.log(data) : console.log('No data')
    })
  }

  function createUser() {
    const encoded = SHA256(input).toString()
    const docRef = doc(db, 'users', encoded)
    setDoc(docRef, { data: '' })
  }

  function handleChange(event: any) {
    const value = event.target.value
    setInput(value)
    // console.log(SHA256(value).toString())
    // const encrypted = AES.encrypt(value, 'Secret Passphrase').toString()
    // const decrypted = AES.decrypt(encrypted, 'Secret Passphrase').toString(
    //   enc.Utf8
    // )
    // console.log(encrypted)
    // console.log(decrypted)
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
          <LogIn />
        </Grid>
      </Grid>
    </div>
  )
}
