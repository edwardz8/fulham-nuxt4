<template>
  <UContainer class="py-8">
    <div class="mb-10 text-center">
      <h1 class="text-4xl font-bold tracking-tight">Fulham FC</h1>
      <p class="mt-2 text-lg text-gray-500">Squad · 2025/26</p>
    </div>

    <div v-if="pending" class="flex justify-center py-20">
      <UIcon name="i-lucide-loader-2" class="size-8 animate-spin" />
    </div>

    <div v-else-if="error" class="text-center text-red-500 py-10">
      Failed to load squad.
    </div>

    <div v-else class="masonry">
  <NuxtLink
    v-for="player in players"
    :key="player.id || player.playerId || player.name"
    :to="`/players/${getPlayerId(player)}`"
    class="block mb-4"
  >
    <div class="group rounded-2xl overflow-hidden border border-gray-200/80 bg-white hover:border-slate-950 hover:shadow-xl transition-all duration-200">
      <!-- Clean top accent instead of big colored square -->
      <div class="h-1.5 bg-gradient-to-r from-slate-900 to-red-700" />

      <div class="p-5">
        <div class="flex items-start justify-between gap-3">
          <div>
            <h3 class="font-semibold text-lg leading-tight text-gray-900 group-hover:text-slate-800 transition-colors">
              {{ player.name }}
            </h3>
            <p class="text-sm text-gray-500 mt-1 capitalize">
              {{ player.position || '—' }}
            </p>
          </div>

          <UBadge
            v-if="player.jerseyNumber || player.number"
            color="neutral"
            variant="subtle"
            size="sm"
            class="shrink-0"
          >
            #{{ player.jerseyNumber || player.number }}
          </UBadge>
        </div>

        <div class="mt-4 flex items-center gap-4 text-sm text-gray-600">
          <span v-if="player.age" class="flex items-center gap-1">
            <UIcon name="i-lucide-user" class="size-4" />
            {{ player.age }}
          </span>
          <span v-if="player.nationality" class="flex items-center gap-1">
            <UIcon name="i-lucide-flag" class="size-4" />
            {{ player.nationality }}
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</div>

    <!-- <div v-else class="masonry">
      <NuxtLink
        v-for="player in players"
        :key="player.id || player.playerId || player.name"
        :to="`/players/${getPlayerId(player)}`"
        class="block"
      >
        <UCard class="break-inside-avoid mb-4 overflow-hidden hover:shadow-lg transition-shadow">
          <div class="aspect-[3/4] bg-gradient-to-br from-emerald-600 to-black flex items-center justify-center">
            <span class="text-6xl font-bold text-white/90">
              {{ getInitials(player.name) }}
            </span>
          </div>

          <template #header>
            <div class="flex items-center justify-between">
              <span class="font-semibold">{{ player.name }}</span>
              <UBadge v-if="player.jerseyNumber || player.number" color="neutral" variant="subtle">
                #{{ player.jerseyNumber || player.number }}
              </UBadge>
            </div>
          </template>

          <div class="text-sm text-gray-600 space-y-1">
            <p>{{ player.position || '—' }}</p>
            <p v-if="player.age">Age {{ player.age }}</p>
            <p v-if="player.nationality">{{ player.nationality }}</p>
          </div>
        </UCard>
      </NuxtLink>
    </div> -->
  </UContainer>
</template>

<script setup lang="ts">
const { data, pending, error } = await useFetch('/api/fulham')

const players = computed(() => {
  const squad = data.value?.squad
  if (!Array.isArray(squad)) return []

  return squad.filter((p: any) => {
    if (!p?.name) return false
    const role = (p.role || p.position || '').toLowerCase()
    return !role.includes('coach') && !role.includes('manager')
  })
})

function getPlayerId(player: any) {
  // Prefer real IDs; fall back to name
  return player.id || player.playerId || encodeURIComponent(player.name)
}

function getInitials(name: string) {
  return name
    ?.split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || '?'
}

// Temporary debug — remove later
watch(players, (list) => {
  if (list.length) {
    console.log('First player object:', list[0])
  }
}, { immediate: true })
</script>

<style scoped>
.masonry {
  columns: 1;
  column-gap: 1rem;
}
@media (min-width: 640px) { .masonry { columns: 2; } }
@media (min-width: 768px) { .masonry { columns: 3; } }
@media (min-width: 1024px) { .masonry { columns: 4; } }
@media (min-width: 1280px) { .masonry { columns: 5; } }
</style>