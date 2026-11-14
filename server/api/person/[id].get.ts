export default defineEventHandler(async (event) => {
  // const id = getRouterParam(event, 'id')
  // const config = useRuntimeConfig()
  const config = useRuntimeConfig()
  const key = config.openFootApiKey
  const id = getRouterParam(event, 'id')

   if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing player id' })
  }

  // Re-use the Fulham endpoint data (or call squad again)
  const fulhamData = await $fetch('/api/fulham')
  const player = (fulhamData as any).squad?.find((p: any) => p.id === id || p.playerId === id)

  if (!player) {
    throw createError({ statusCode: 404, statusMessage: 'Player not found' })
  }

  // Find this player in scorers
  const scorer = (fulhamData as any).scorers?.find((s: any) =>
    s.playerId === id || s.id === id || s.name === player.name
  )

  return {
    player,
    stats: scorer || null
  }

/*   const [person, matches] = await Promise.allSettled([
    $fetch(`https://api.football-data.org/v4/persons/${id}`, {
      headers: { 'X-Auth-Token': config.footballDataApiKey }
    }),
    $fetch(`https://api.football-data.org/v4/persons/${id}/matches?limit=10&status=FINISHED`, {
      headers: { 'X-Auth-Token': config.footballDataApiKey }
    }).catch(() => null) // free tier may limit this
  ])

  return {
    person: person.status === 'fulfilled' ? person.value : null,
    recentMatches: matches.status === 'fulfilled' ? matches.value : null
  } */
})