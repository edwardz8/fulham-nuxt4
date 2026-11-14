export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const data = await $fetch('https://api.football-data.org/v4/teams/63', {
    headers: {
      'X-Auth-Token': config.footballDataApiKey
    }
  })
  return data
})