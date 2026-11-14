<script setup lang="ts">
const route = useRoute()
const { data, pending, error } = await useFetch(`/api/person/${route.params.id}`)

const player = computed(() => data.value?.person)
</script>

<template>
    <div class="min-h-screen bg-gray-50">
        <div class="max-w-3xl mx-auto px-4 py-8">
            <UButton to="/" variant="ghost" icon="i-lucide-arrow-left" class="mb-6">
                Back to squad
            </UButton>

            <div v-if="pending">Loading…</div>
            <div v-else-if="error || !player" class="text-red-500">Player not found</div>

            <UCard v-else>
                <template #header>
                    <div class="flex items-start justify-between">
                        <div>
                            <h1 class="text-3xl font-bold">{{ player.name }}</h1>
                            <p class="text-gray-500">{{ player.position }} · {{ player.nationality }}</p>
                        </div>
                        <span class="text-5xl font-black text-primary">{{ player.shirtNumber || '—' }}</span>
                    </div>
                </template>

                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div><strong>Date of Birth</strong><br>{{ formatDate(player.dateOfBirth) }}</div>
                    <div><strong>Nationality</strong><br>{{ player.nationality }}</div>
                    <div v-if="player.marketValue">
                        <strong>Market Value</strong><br>€{{ (player.marketValue / 1_000_000).toFixed(1) }}M
                    </div>
                    <div v-if="player.contract?.until">
                        <strong>Contract until</strong><br>{{ player.contract.until }}
                    </div>
                </div>

                <!-- Optional recent matches (if the free tier returns them) -->
                <div v-if="data?.recentMatches?.matches?.length" class="mt-8">
                    <h3 class="font-semibold mb-3">Recent Matches</h3>
                    <ul class="space-y-2 text-sm">
                        <li v-for="m in data.recentMatches.matches.slice(0, 5)" :key="m.id">
                            {{ m.utcDate?.slice(0, 10) }} – {{ m.homeTeam?.shortName }} vs {{ m.awayTeam?.shortName }}
                            ({{ m.score?.fullTime?.home }}-{{ m.score?.fullTime?.away }})
                        </li>
                    </ul>
                </div>
            </UCard>
        </div>
    </div>
</template>

<script lang="ts">
function formatDate(date: string) {
    if (!date) return '—'
    return new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>