const SOLANA_BASE_URL = 'https://public-api.solscan.io'

export function getStakeAccounts(account: string) {
  return fetch(
    `${SOLANA_BASE_URL}/account/stakeAccounts?account=${account}`
  ).then(function (response: { json: () => any }) {
    return response.json()
  })
}

export function getAccount(account: string) {
  return fetch(`${SOLANA_BASE_URL}/account/${account}`).then(
    function (response: { json: () => any }) {
      return response.json()
    }
  )
}
