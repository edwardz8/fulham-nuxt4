<template>
    <UContainer class="py-8">

        <div class="mb-10 text-center">
            <div class="flex items-center gap-3 mb-3">
            <h1 class="text-4xl font-bold tracking-tight">Tottenham Hotspur</h1>
                <img src="https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg" alt="Tottenham" class="h-8 w-8 object-contain" />
                <p class="mt-2 text-lg text-gray-500">Squad · 2026/27</p>
            </div>
        </div>

        <!-- Upcoming fixtures -->
        <div class="mb-10">
            <h3 class="text-xl font-semibold mb-4">Upcoming Fixtures</h3>
            <div v-if="fixturesPending" class="flex justify-center py-8">
                <UProgress v-model="progressValue" class="w-48" />
            </div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <UCard v-for="fix in fixtures" :key="fix.id" class="text-center">
                    <p class="text-xs text-gray-500">{{ formatDate(fix.kickoff) }}</p>
                    <p class="font-semibold mt-1">{{ fix.home }}</p>
                    <p class="text-sm text-gray-400 my-1">vs</p>
                    <p class="font-semibold">{{ fix.away }}</p>
                </UCard>
            </div>
        </div>

        <!-- squad masonry code goes here -->
        <div>
            <h3 class="text-xl font-semibold mb-4">Squad Members</h3>
        </div>

        <div class="masonry">
            <NuxtLink v-for="player in players" :key="player.id || player.playerId || player.name"
                :to="`/players/${getPlayerId(player)}`" class="block mb-4">
                <div
                    class="group rounded-2xl overflow-hidden border border-gray-200/80 bg-white hover:border-slate-300 hover:shadow-xl transition-all duration-200">
                    <!-- Leeds accent -->
                    <div class="h-1.5 bg-gradient-to-r from-white to-slate-900" />

                    <div class="p-5">
                        <div class="flex items-start justify-between gap-3">
                            <div>
                                <h3
                                    class="font-semibold text-lg leading-tight text-gray-900 group-hover:text-blue-900 transition-colors">
                                    {{ player.name }}
                                </h3>
                                <p class="text-sm text-gray-500 mt-1 capitalize">
                                    {{ player.position || '—' }}
                                </p>
                            </div>

                            <UBadge v-if="player.jerseyNumber || player.number" color="neutral" variant="subtle"
                                size="sm" class="shrink-0">
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

        <div class="mt-10 text-center">
            <UButton to="/" variant="soft" color="neutral" icon="i-lucide-arrow-left">
                Back to home
            </UButton>
        </div>

    </UContainer>
</template>

<script setup lang="ts">
const progressValue = ref(null)
const { data: fixtures, pending: fixturesPending } = await useFetch('/api/fixtures/tottenham')
const { data, pending, error } = await useFetch('/api/tottenham')

function formatDate(iso: string) {
    if (!iso) return ''
    return new Date(iso).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
}

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
    // Prefer real IDs; fall back to name (same as Fulham)
    return player.id || player.playerId || encodeURIComponent(player.name)
}
</script>

<style scoped>
.masonry {
    columns: 1;
    column-gap: 1rem;
}

@media (min-width: 640px) {
    .masonry {
        columns: 2;
    }
}

@media (min-width: 768px) {
    .masonry {
        columns: 3;
    }
}

@media (min-width: 1024px) {
    .masonry {
        columns: 4;
    }
}

@media (min-width: 1280px) {
    .masonry {
        columns: 5;
    }
}
</style>