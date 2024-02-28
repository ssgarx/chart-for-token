export async function fetchTokenData(): Promise<string> {
  try {
    const response = await fetch(
      `https://app.astroport.fi/api/trpc/charts.prices?input=%7B%0D%0A+++%22json%22%3A%7B%0D%0A++++++%22tokens%22%3A%5B%0D%0A+++++++++%22ibc%2FC4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9%22%2C%0D%0A+++++++++%22untrn%22%0D%0A++++++%5D%2C%0D%0A++++++%22chainId%22%3A%22neutron-1%22%2C%0D%0A++++++%22dateRange%22%3A%22D7%22%0D%0A+++%7D%0D%0A%7D`
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching data: ", error)
    alert("Error fetching data: ")
    throw error
  }
}
