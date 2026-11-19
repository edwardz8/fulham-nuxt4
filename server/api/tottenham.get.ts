export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const key = config.openFootApiKey
  const headers = { Authorization: `Bearer ${key}` }

  try {
    const search = await $fetch('https://openfootapi.com/v1/search', {
      headers,
      query: { q: 'Tottenham' }
    })

    const results = (search as any)?.data || []
    const tottenham = results.find((item: any) =>
      item.name?.toLowerCase().includes('tottenham') &&
      (item.type === 'team' || item.id?.startsWith('team_'))
    )

    if (!tottenham?.id) {
      throw createError({ statusCode: 404, statusMessage: 'tottenham United team ID not found' })
    }

    const squadRes = await $fetch(`https://openfootapi.com/v1/teams/${tottenham.id}/squad`, { headers })

    let squad = (squadRes as any)?.data
    if (!Array.isArray(squad)) {
      squad = squad?.players || squad?.squad || []
    }
    if (!Array.isArray(squad)) squad = []

    let scorers: any[] = []
    try {
      const scorersRes = await $fetch('https://openfootapi.com/v1/scorers', {
        headers,
        query: { competition: 'comp_premier_league_eng' }
      })
      scorers = Array.isArray((scorersRes as any)?.data) ? (scorersRes as any).data : []
    } catch {
      // ignore
    }

    return {
      team: tottenham,
      squad,
      scorers
    }
  } catch (err: any) {
    console.error('OpenFootAPI error (tottenham):', err)
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.message || 'Failed to fetch tottenham data'
    })
  }
})