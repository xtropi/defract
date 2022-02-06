import { useState } from 'react'
import { gql, useLazyQuery, useQuery } from '@apollo/client'

const FLOW = gql`
  query (
    $address: String!
    $from: ISO8601DateTime!
    $till: ISO8601DateTime!
    $limit: Int!
    $offset: Int!
  ) {
    solana {
      transfers(
        date: { since: $from, till: $till }
        options: {
          limit: $limit
          offset: $offset
          desc: ["count_in", "count_out"]
          asc: "currency.symbol"
        }
      ) {
        sum_in: amount(calculate: sum, receiverAddress: { is: $address })
        sum_out: amount(calculate: sum, senderAddress: { is: $address })
        count_in: countBigInt(receiverAddress: { is: $address })
        count_out: countBigInt(senderAddress: { is: $address })
        currency {
          symbol
        }
      }
    }
  }
`

export const SolanaWallet: React.FC = () => {
  const [account, setAccount] = useState(
    'FcfZ67yZzdMCdbZKMkqWtMdm4uFSfRzJbkTZh2QrfnTV'
  )
  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.currentTarget.value
    setAccount(value)
  }
  function handleClick() {
    getAccount()
  }
  const [getAccount, { loading, error, data }] = useLazyQuery(FLOW, {
    variables: {
      limit: 10,
      offset: 0,
      address: account,
      from: '2022-01-07',
      till: '2022-02-05T23:59:59',
      dateFormat: '%Y-%m-%d',
    },
  })
  const transfers = data?.solana?.transfers

  return (
    <>
      <input type="text" value={account} onChange={handleInput} />
      <button onClick={handleClick}>Get data</button>

      {error && <pre>{JSON.stringify(error, null, ' ')}</pre>}

      {loading ? (
        <div>Loading...</div>
      ) : transfers ? (
        <>
          <pre>{JSON.stringify(transfers, null, ' ')}</pre>
          <div>Balance: {transfers[0].sum_in - transfers[0].sum_out} SOL</div>
        </>
      ) : (
        <div>No data</div>
      )}
    </>
  )
}
