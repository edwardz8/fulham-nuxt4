<template>
    <UContainer class="py-8">
        <div class="mb-10 text-center">
            <h1 class="text-4xl font-bold tracking-tight">Tottenham Hotspur F.C.</h1>
            <p class="mt-2 text-lg text-gray-500">Latest news</p>
        </div>

        <div v-if="pending" class="flex flex-col items-center justify-center py-32 gap-6">
            <UProgress v-model="progressValue" class="w-64" />
            <p class="text-sm text-gray-500">Loading news…</p>
        </div>

        <div v-else-if="error" class="text-center text-red-500 py-10">
            <p>Failed to load news.</p>
        </div>

        <div v-else-if="!data || data.length === 0" class="text-center py-10 text-gray-500">
            No Tottenham stories found.
        </div>

        <div v-else class="space-y-6">
            <UCard v-for="(story, index) in data" :key="story.link || index" class="hover:shadow-md transition-shadow">
                <div class="flex flex-col gap-2">
                    <a :href="story.link" target="_blank" rel="noopener noreferrer"
                        class="font-semibold text-lg hover:underline">
                        {{ story.title || 'No title' }}
                    </a>
                    <div class="text-sm text-gray-500 flex items-center gap-3">
                        <span>{{ story.source || 'Unknown source' }}</span>
                        <span v-if="story.pubDate">·</span>
                        <span>{{ formatDate(story.pubDate) }}</span>
                    </div>
                </div>
            </UCard>
        </div>

        <div class="mt-10 text-center">
            <UButton to="/" variant="soft" color="secondary" icon="i-lucide-arrow-left">Back to home</UButton>
        </div>
    </UContainer>
</template>

<script setup lang="ts">
const progressValue = ref(null)
const { data, pending, error } = await useFetch('/api/thfc-news')

function formatDate(dateStr: string) {
    if (!dateStr) return ''
    try {
        return new Date(dateStr).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    } catch {
        return dateStr
    }
}
</script>