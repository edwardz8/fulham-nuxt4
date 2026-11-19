<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="border-b bg-white">
      <UContainer class="py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold tracking-tight text-gray-900">Premier League Clubs</h1>
            <p class="text-sm text-gray-500 mt-0.5">Explore English Football Clubs</p>
          </div>
          <!--  <UButton to="/calculator" variant="ghost" size="sm" icon="i-lucide-calculator">
            Calculator
          </UButton> -->
        </div>
      </UContainer>
    </header>

    <!-- Main -->
    <main class="py-16">
      <UContainer>
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Choose a team
            </h2>
            <p class="mt-3 text-lg text-gray-500">
              View the current squad and player details
            </p>
          </div>

          <div class="grid sm:grid-cols-2 gap-6">
            <!-- Fulham -->
            <!-- Fulham -->
            <NuxtLink to="/fulham"
              class="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-8 hover:border-gray-900 hover:shadow-lg transition-all duration-200">
              <div>
                <div class="h-1.5 w-16 rounded-full bg-gradient-to-r from-slate-900 to-red-700 mb-6" />
                <h3 class="text-2xl font-semibold text-gray-900 group-hover:text-slate-800">
                  Fulham FC
                </h3>
                <p class="mt-2 text-gray-500">
                  View Cottagers
                </p>
                <div class="mt-6 flex items-center text-sm font-medium text-gray-900 group-hover:text-slate-800">
                  Explore squad
                  <UIcon name="i-lucide-arrow-right"
                    class="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
              <img src="https://upload.wikimedia.org/wikipedia/en/e/eb/Fulham_FC_%28shield%29.svg" alt="Fulham FC"
                class="h-16 w-16 object-contain shrink-0" />
            </NuxtLink>

            <!-- Leeds -->
            <NuxtLink to="/leeds"
              class="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-8 hover:border-yellow-500 hover:shadow-lg transition-all duration-200">
              <div>
                <div class="h-1.5 w-16 rounded-full bg-gradient-to-r from-yellow-400 to-blue-900 mb-6" />
                <h3 class="text-2xl font-semibold text-gray-900 group-hover:text-blue-900">
                  Leeds United
                </h3>
                <p class="mt-2 text-gray-500">
                  View Leeds
                </p>
                <div class="mt-6 flex items-center text-sm font-medium text-gray-900 group-hover:text-blue-900">
                  Explore squad
                  <UIcon name="i-lucide-arrow-right"
                    class="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
              <img src="https://upload.wikimedia.org/wikipedia/en/5/54/Leeds_United_F.C._logo.svg" alt="Leeds United"
                class="h-16 w-16 object-contain shrink-0" />
            </NuxtLink>

            <!-- Tottenham -->
            <div class="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-8">
              <div>
                <div class="h-1.5 w-16 rounded-full bg-gradient-to-r from-white to-slate-900 mb-6" />
                <h3 class="text-2xl font-semibold text-gray-900">
                  Tottenham Hotspur
                </h3>
                <p class="mt-2 text-gray-500">
                  View news and club info
                </p>
                <div class="mt-6 flex flex-col sm:flex-row gap-3">
                  <UButton to="/thfc" color="neutral" variant="solid" class="justify-center">
                    News
                  </UButton>
                  <UButton to="/tottenham" color="neutral" variant="outline" class="justify-center">
                    Club
                  </UButton>
                </div>
              </div>
              <img src="https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg" alt="Tottenham Hotspur"
                class="h-16 w-16 object-contain shrink-0" />
            </div>
          </div>

          <!-- Standings -->
          <!--  <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-semibold mb-6 text-center">Premier League Standings</h2>

            <div class="overflow-x-auto rounded-2xl border bg-white">
              <table class="w-full text-sm">
                <thead class="bg-gray-50 text-left">
                  <tr>
                    <th class="px-4 py-3 font-medium">#</th>
                    <th class="px-4 py-3 font-medium">Team</th>
                    <th class="px-4 py-3 font-medium text-center">P</th>
                    <th class="px-4 py-3 font-medium text-center">W</th>
                    <th class="px-4 py-3 font-medium text-center">D</th>
                    <th class="px-4 py-3 font-medium text-center">L</th>
                    <th class="px-4 py-3 font-medium text-center">GD</th>
                    <th class="px-4 py-3 font-medium text-center">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in standings" :key="row.team?.id || i" class="border-t hover:bg-gray-50">
                    <td class="px-4 py-3">{{ i + 1 }}</td>
                    <td class="px-4 py-3 font-medium">{{ row.team?.name }}</td>
                    <td class="px-4 py-3 text-center">{{ row.played }}</td>
                    <td class="px-4 py-3 text-center">{{ row.won }}</td>
                    <td class="px-4 py-3 text-center">{{ row.drawn }}</td>
                    <td class="px-4 py-3 text-center">{{ row.lost }}</td>
                    <td class="px-4 py-3 text-center">{{ row.goalDifference }}</td>
                    <td class="px-4 py-3 text-center font-semibold">{{ row.points }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> -->

        </div>
      </UContainer>
    </main>
  </div>
</template>

<script setup lang="ts">
const { data: standings, pending: standingsPending } = await useFetch('/api/standings')
</script>