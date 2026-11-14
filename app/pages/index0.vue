<script setup lang="ts">
const { data: team, pending, error } = await useFetch('/api/team')

const players = computed(() => team.value?.squad ?? [])
</script>

<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
        <!-- Header -->
        <header class="border-b bg-white/80 backdrop-blur sticky top-0 z-10">
            <div class="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
                <img v-if="team?.crest" :src="team.crest" :alt="team.name" class="w-12 h-12 object-contain" />
                <div>
                    <h1 class="text-2xl font-bold tracking-tight">Fulham FC</h1>
                    <p class="text-sm text-gray-500">Squad Gallery</p>
                </div>
            </div>
        </header>

        <main class="max-w-7xl mx-auto px-4 py-8">
            <div v-if="pending" class="text-center py-20">Loading squad…</div>
            <div v-else-if="error" class="text-center text-red-500">Failed to load squad</div>

            <div v-else class="masonry">
                <NuxtLink v-for="player in players" :key="player.id" :to="`/players/${player.id}`"
                    class="masonry-item block">
                    <UCard class="overflow-hidden hover:shadow-xl transition-all">
                        <template #header>
                            <div class="flex items-center justify-between">
                                <span class="text-3xl font-black text-primary">{{ player.shirtNumber || '—' }}</span>
                                <UBadge :color="positionColor(player.position)" variant="subtle">
                                    {{ player.position }}
                                </UBadge>
                            </div>
                        </template>

                        <div class="space-y-2">
                            <h3 class="font-semibold text-lg leading-tight">{{ player.name }}</h3>
                            <p class="text-sm text-gray-500">{{ player.nationality }}</p>
                            <p v-if="player.marketValue" class="text-xs text-gray-400">
                                €{{ (player.marketValue / 1_000_000).toFixed(1) }}M
                            </p>
                        </div>
                    </UCard>
                </NuxtLink>
            </div>
        </main>
    </div>
</template>

<script lang="ts">
function positionColor(pos: string) {
    if (!pos) return 'neutral'
    if (pos.toLowerCase().includes('goal')) return 'blue'
    if (pos.toLowerCase().includes('def')) return 'green'
    if (pos.toLowerCase().includes('mid')) return 'yellow'
    return 'red'
}
</script>