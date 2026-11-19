export default defineEventHandler(async (event) => {
  const team = getRouterParam(event, 'team') // fulham | leeds | tottenham
  const config = useRuntimeConfig()
  const headers = { Authorization: `Bearer ${config.openFootApiKey}` }

  const teamQueries: Record<string, string> = {
    fulham: 'Fulham',
    leeds: 'Leeds',
    tottenham: 'Tottenham'
  }

  const query = teamQueries[team || '']
  if (!query) {
    throw createError({ statusCode: 400, statusMessage: 'Unknown team' })
  }

  // Search for the team
  const search = await $fetch('https://openfootapi.com/v1/search', {
    headers,
    query: { q: query }
  })

  const results = (search as any)?.data || []
  const teamObj = results.find((item: any) =>
    item.name?.toLowerCase().includes(query.toLowerCase()) &&
    (item.type === 'team' || item.id?.startsWith('team_'))
  )

  if (!teamObj?.id) {
    throw createError({ statusCode: 404, statusMessage: 'Team not found' })
  }

  // Get upcoming matches
  const matches = await $fetch('https://openfootapi.com/v1/matches', {
    headers,
    query: {
      team: teamObj.id,
      status: 'scheduled',
      competition: 'comp_premier_league_eng' // adjust if needed
    }
  })

  const fixtures = ((matches as any)?.data || [])
    .slice(0, 5)
    .map((m: any) => ({
      id: m.id,
      kickoff: m.kickoffAt,
      home: m.homeTeam?.name || 'TBD',
      away: m.awayTeam?.name || 'TBD',
      competition: m.competition?.name || 'Premier League'
    }))

  return fixtures
})

