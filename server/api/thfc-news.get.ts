export default defineEventHandler(async () => {
  const rssUrl = 'https://news.google.com/rss/search?q=tottenham+hotspur+OR+thfc+OR+%22tottenham+hotspur%22&hl=en-GB&gl=GB&ceid=GB:en'

  try {
    const xml = await $fetch<string>(rssUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NuxtApp/1.0)'
      }
    })

    // Extract all <item> blocks
    const itemMatches = xml.match(/<item>[\s\S]*?<\/item>/g) || []

    const stories = itemMatches
      .map((item) => {
        const getTag = (tag: string) => {
          const match = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`))
          if (!match) return ''
          // Clean CDATA and trim
          return match[1]
            .replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')
            .replace(/<[^>]*>/g, '') // strip any remaining tags
            .trim()
        }

        const title = getTag('title')
        const link = getTag('link')
        const pubDate = getTag('pubDate')
        const source = getTag('source')
        const description = getTag('description')

        return { title, link, pubDate, source, description }
      })
      .filter((story) => {
        if (!story.title || !story.link) return false

        const text = `${story.title} ${story.description}`.toLowerCase()

        // Must be about Tottenham Hotspur
        const isTottenham =
          text.includes('tottenham') ||
          text.includes('spurs') ||
          text.includes('thfc')

        // Prefer football-related content
        const isFootball =
          text.includes('premier league') ||
          text.includes('football') ||
          text.includes('soccer') ||
          text.includes('transfer') ||
          text.includes('injury') ||
          text.includes('match') ||
          text.includes('goal') ||
          text.includes('champions') ||
          text.includes('europa') ||
          text.includes('manager')

        return isTottenham && isFootball
      })
      .slice(0, 20)

    // Return empty array with a message if nothing found (helps debugging)
    if (stories.length === 0) {
      console.log('No Tottenham stories found. Raw item count:', itemMatches.length)
    }

    return stories
  } catch (error: any) {
    console.error('THFC news error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to load news'
    })
  }
})