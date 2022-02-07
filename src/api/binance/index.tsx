const BINANCE_BASE_URL = 'https://api.binance.com/api/v3'

export function getRecentPrice(ticker: string) {
  return fetch(`${BINANCE_BASE_URL}/avgPrice?symbol=${ticker}`).then(
    function (response: { json: () => any }) {
      return response.json()
    }
  )
}
