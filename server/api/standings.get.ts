export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const headers = { Authorization: `Bearer ${config.openFootApiKey}` }

  // Try the most common Premier League IDs
  const competitionIds = [
    'comp_premier_league_eng',
    'comp_epl',
    'comp_premier_league',
    'comp_pl'
  ]

  for (const competition of competitionIds) {
    try {
      const res = await $fetch('https://openfootapi.com/v1/standings', {
        headers,
        query: { competition }
      })

      const data = (res as any)?.data
      if (Array.isArray(data) && data.length > 0) {
        console.log(`Standings found with competition: ${competition}`)
        return data.slice(0, 20)
      }
    } catch (err) {
      // try next ID
    }
  }

  // Fallback: get competitions list and find Premier League
  try {
    const comps = await $fetch('https://openfootapi.com/v1/competitions', { headers })
    const list = (comps as any)?.data || []
    const pl = list.find((c: any) =>
      c.name?.toLowerCase().includes('premier league') ||
      c.code?.toLowerCase().includes('epl')
    )

    if (pl?.id) {
      const res = await $fetch('https://openfootapi.com/v1/standings', {
        headers,
        query: { competition: pl.id }
      })
      const data = (res as any)?.data
      if (Array.isArray(data)) {
        console.log(`Standings found via search: ${pl.id}`)
        return data.slice(0, 20)
      }
    }
  } catch (err) {
    console.error('Standings fallback failed:', err)
  }

  console.error('Could not load Premier League standings')
  return []
})