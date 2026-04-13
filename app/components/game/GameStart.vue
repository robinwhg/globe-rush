<script setup lang="ts">
const props = defineProps<{
  gameTitle: string
  regionTitle: string
  countries: Country[]
}>()

const emit = defineEmits<{
  start: []
  back: []
}>()

const { gameTitle, regionTitle, countries } = toRefs(props)

const totalQuestions = computed(() => countries.value.length)
const totalCountries = computed(() => countries.value.filter(country => country.independent).length)
const totalTerritories = computed(() => countries.value.filter(country => !country.independent).length)
</script>

<template>
  <GameStateLayout>
    <template #title>
      Ready to start?
    </template>

    <template #content>
      <UCard :ui="{ root: 'dark:bg-default divide-none', header: 'min-h-10', body: 'flex flex-col gap-4' }">
        <template #header>
          <p class="text-xl font-semibold">
            {{ gameTitle }}
          </p>
        </template>

        <p class="text-sm text-muted">
          {{ regionTitle }}
        </p>

        <div class="inline-flex items-center justify-between text-sm">
          <span class="font-semibold text-highlighted">Countries</span>
          <span class="text-muted">{{ totalCountries }}</span>
        </div>

        <div class="inline-flex items-center justify-between text-sm">
          <span class="font-semibold text-highlighted">Territories</span>
          <span class="text-muted">{{ totalTerritories }}</span>
        </div>

        <div class="inline-flex items-center justify-between text-sm">
          <span class="font-semibold text-highlighted">Total flags asked</span>
          <span class="text-muted">{{ totalQuestions }}</span>
        </div>
      </UCard>
    </template>

    <template #actions>
      <div class="grid grid-cols-2 gap-4">
        <BaseCardButton
          icon="i-tabler-arrow-back"
          label="Back to Region"
          @click="emit('back')"
        />

        <BaseCardButton
          color="primary"
          icon="i-tabler-player-play-filled"
          label="Start Quiz"
          @click="emit('start')"
        />
      </div>
    </template>
  </GameStateLayout>
</template>
