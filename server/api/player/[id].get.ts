export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const key = config.openFootApiKey
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing player id' })
  }

  const headers = { Authorization: `Bearer ${key}` }

  // Re-use the Fulham data so we stay consistent
  const fulhamData = await $fetch('/api/fulham') as any

  const player = (fulhamData.squad || []).find((p: any) =>
    p.id === id || p.playerId === id || String(p.id) === id || String(p.playerId) === id
  )

  if (!player) {
    throw createError({ statusCode: 404, statusMessage: 'Player not found in Fulham squad' })
  }

  // Try to find this player in the scorers list
  const scorer = (fulhamData.scorers || []).find((s: any) =>
    s.playerId === id ||
    s.id === id ||
    s.name?.toLowerCase() === player.name?.toLowerCase() ||
    s.playerName?.toLowerCase() === player.name?.toLowerCase()
  )

  return {
    player,
    stats: scorer || null,
    team: fulhamData.team
  }
})