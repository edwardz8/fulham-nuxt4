<template>
  <UContainer class="py-8 max-w-3xl">
    <UButton to="/" variant="ghost" icon="i-lucide-arrow-left" class="mb-6">
      Back to squad
    </UButton>

    <div v-if="pending" class="flex justify-center py-20">
      <UIcon name="i-lucide-loader-2" class="size-8 animate-spin" />
    </div>

    <div v-else-if="error" class="text-center text-red-500">
      Could not load player.
    </div>

    <div v-else-if="player" class="space-y-8">
      <!-- Header -->
      <div class="flex items-start gap-6">
        <div class="size-32 shrink-0 rounded-2xl bg-gradient-to-br from-red-700 to-slate-800 flex items-center justify-center text-4xl font-bold text-white">
          {{ getInitials(player.name) }}
        </div>

        <div>
          <h1 class="text-3xl font-bold">{{ player.name }}</h1>
          <div class="mt-3 flex flex-wrap gap-2">
            <UBadge v-if="player.jerseyNumber || player.number" size="lg">
              #{{ player.jerseyNumber || player.number }}
            </UBadge>
            <UBadge color="neutral" variant="subtle" size="lg">
              {{ player.position || '—' }}
            </UBadge>
            <UBadge v-if="player.nationality" color="neutral" variant="outline" size="lg">
              {{ player.nationality }}
            </UBadge>
          </div>
          <p v-if="player.age" class="mt-4 text-gray-600">Age {{ player.age }}</p>
        </div>
      </div>

      <!-- Stats -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="font-semibold">Premier League Stats</h2>
            <span class="text-xs text-gray-400">Current season</span>
          </div>
        </template>

        <div v-if="stats" class="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <p class="text-sm text-gray-500">Goals</p>
            <p class="text-3xl font-bold">{{ stats.goals ?? stats.goal ?? '—' }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Assists</p>
            <p class="text-3xl font-bold">{{ stats.assists ?? stats.assist ?? '—' }}</p>
          </div>
          <div v-if="stats.yellowCards !== undefined || stats.yellow !== undefined">
            <p class="text-sm text-gray-500">Yellow Cards</p>
            <p class="text-3xl font-bold">{{ stats.yellowCards ?? stats.yellow ?? 0 }}</p>
          </div>
          <div v-if="stats.appearances || stats.matches">
            <p class="text-sm text-gray-500">Appearances</p>
            <p class="text-3xl font-bold">{{ stats.appearances ?? stats.matches ?? '—' }}</p>
          </div>
        </div>

        <div v-else class="text-gray-500 text-sm leading-relaxed">
          No detailed season stats available for this player on the free tier.
          <br />
          Goals & assists appear here when the player is listed in the top scorers.
        </div>
      </UCard>

      <!-- Raw squad data (useful for debugging / extra fields) -->
      <UCard>
        <template #header>
          <h2 class="font-semibold">Player Info</h2>
        </template>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <div v-for="(value, key) in extraFields" :key="key" class="flex justify-between border-b border-gray-100 py-1">
            <dt class="text-gray-500 capitalize">{{ key }}</dt>
            <dd class="font-medium">{{ value }}</dd>
          </div>
        </dl>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const route = useRoute()
const { data, pending, error } = await useFetch(`/api/player/${route.params.id}`)

const player = computed(() => data.value?.player)
const stats = computed(() => data.value?.stats)

const extraFields = computed(() => {
  if (!player.value) return {}
  const { name, id, playerId, ...rest } = player.value
  // Only show simple values
  return Object.fromEntries(
    Object.entries(rest).filter(([_, v]) => v && typeof v !== 'object')
  )
})

function getInitials(name: string) {
  return name
    ?.split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || '?'
}
</script>