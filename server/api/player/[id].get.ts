export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing player id' })
  }

  // Fetch both squads
  const [fulhamData, leedsData] = await Promise.all([
    $fetch('/api/fulham').catch(() => ({ squad: [], scorers: [], team: null })),
    $fetch('/api/leeds').catch(() => ({ squad: [], scorers: [], team: null }))
  ]) as any[]

  const allPlayers = [
    ...(fulhamData.squad || []),
    ...(leedsData.squad || [])
  ]

  const player = allPlayers.find((p: any) =>
    p.id === id || p.playerId === id || String(p.id) === id || String(p.playerId) === id
  )

  if (!player) {
    throw createError({ statusCode: 404, statusMessage: 'Player not found' })
  }

  const allScorers = [
    ...(fulhamData.scorers || []),
    ...(leedsData.scorers || [])
  ]

  const scorer = allScorers.find((s: any) =>
    s.playerId === id ||
    s.id === id ||
    s.name?.toLowerCase() === player.name?.toLowerCase() ||
    s.playerName?.toLowerCase() === player.name?.toLowerCase()
  )

  // Figure out which team they belong to
  const isLeeds = (leedsData.squad || []).some((p: any) =>
    p.id === id || p.playerId === id || String(p.id) === id
  )

  return {
    player,
    stats: scorer || null,
    team: isLeeds ? leedsData.team : fulhamData.team
  }
})