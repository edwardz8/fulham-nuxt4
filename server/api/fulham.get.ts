export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const key = config.openFootApiKey

  const headers = { Authorization: `Bearer ${key}` }

  try {
    // 1. Search for Fulham
    const search = await $fetch('https://openfootapi.com/v1/search', {
      headers,
      query: { q: 'Fulham' }
    })

    const results = (search as any)?.data || []
    const fulham = results.find((item: any) =>
      item.name?.toLowerCase().includes('fulham') &&
      (item.type === 'team' || item.id?.startsWith('team_'))
    )

    if (!fulham?.id) {
      throw createError({ statusCode: 404, statusMessage: 'Fulham team ID not found' })
    }

    // 2. Get squad
    const squadRes = await $fetch(`https://openfootapi.com/v1/teams/${fulham.id}/squad`, { headers })

    // Safely extract players array
    let squad = (squadRes as any)?.data
    if (!Array.isArray(squad)) {
      // Some responses nest players under a key
      squad = squad?.players || squad?.squad || []
    }
    if (!Array.isArray(squad)) squad = []

    // 3. Scorers (optional)
    let scorers: any[] = []
    try {
      const scorersRes = await $fetch('https://openfootapi.com/v1/scorers', {
        headers,
        query: { competition: 'comp_premier_league_eng' }
      })
      scorers = Array.isArray((scorersRes as any)?.data) ? (scorersRes as any).data : []
    } catch {
      // Ignore scorers errors
    }

    return {
      team: fulham,
      squad,
      scorers
    }
  } catch (err: any) {
    console.error('OpenFootAPI error:', err)
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.message || 'Failed to fetch Fulham data'
    })
  }
})