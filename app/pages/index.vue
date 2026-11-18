<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="border-b bg-white">
      <UContainer class="py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold tracking-tight text-gray-900">Premier League Squads</h1>
            <p class="text-sm text-gray-500 mt-0.5">Explore player galleries</p>
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
            <NuxtLink
              to="/fulham"
              class="group block rounded-2xl border border-gray-200 bg-white p-8 hover:border-gray-900 hover:shadow-lg transition-all duration-200"
            >
              <div class="h-1.5 w-16 rounded-full bg-gradient-to-r from-slate-900 to-red-700 mb-6" />
              <h3 class="text-2xl font-semibold text-gray-900 group-hover:text-slate-800">
                Fulham FC
              </h3>
              <p class="mt-2 text-gray-500">
                View Cottagers
              </p>
              <div class="mt-6 flex items-center text-sm font-medium text-gray-900 group-hover:text-slate-800">
                Explore squad
                <UIcon name="i-lucide-arrow-right" class="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </NuxtLink>

            <!-- Leeds -->
            <NuxtLink
              to="/leeds"
              class="group block rounded-2xl border border-gray-200 bg-white p-8 hover:border-yellow-500 hover:shadow-lg transition-all duration-200"
            >
              <div class="h-1.5 w-16 rounded-full bg-gradient-to-r from-yellow-400 to-blue-900 mb-6" />
              <h3 class="text-2xl font-semibold text-gray-900 group-hover:text-blue-900">
                Leeds United
              </h3>
              <p class="mt-2 text-gray-500">
                View Leeds
              </p>
              <div class="mt-6 flex items-center text-sm font-medium text-gray-900 group-hover:text-blue-900">
                Explore squad
                <UIcon name="i-lucide-arrow-right" class="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </NuxtLink>
          </div>
        </div>
      </UContainer>
    </main>
  </div>
</template>