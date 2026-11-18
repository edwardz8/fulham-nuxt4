<template>
    <UContainer class="py-12 max-w-md">
        <h1 class="text-3xl font-bold mb-8 text-center">Simple Calculator</h1>

        <UCard>
            <div class="space-y-4">
                <UInput v-model.number="a" type="number" placeholder="First number" />
                <UInput v-model.number="b" type="number" placeholder="Second number" />

                <div class="flex gap-3">
                    <UButton @click="result = add(a, b)" block>Add</UButton>
                    <UButton @click="result = subtract(a, b)" color="neutral" block>Subtract</UButton>
                </div>

                <div class="text-center text-2xl font-semibold pt-4">
                    Result: {{ result ?? '—' }}
                </div>
            </div>
        </UCard>

        <div class="mt-6 text-center">
            <UButton to="/" variant="ghost" icon="i-lucide-arrow-left">
                Back to squad
            </UButton>
        </div>
    </UContainer>
</template>

<script setup lang="ts">
const a = ref(0)
const b = ref(0)
const result = ref<number | null>(null)

const { add, subtract } = await import('~/utils/calculator')
</script>