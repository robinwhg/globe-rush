<script setup lang="ts">
const { country, hasNextQuestion } = defineProps<{
  country: Country
  hasNextQuestion: boolean
}>()

const emit = defineEmits<{
  (e: 'proceed'): void
}>()

// const numberFormatter = new Intl.NumberFormat()
//
// const populationLabel = computed(() => {
//   return numberFormatter.format(country.population)
// })
//
// const areaLabel = computed(() => {
//   return `${numberFormatter.format(Math.round(country.area))} km²`
// })

// TODO: Show more info
</script>

<template>
  <GameStateLayout :content-key="`${country.cca3}-review`" fixed-card>
    <template #header>
      <UPageFeature :title="country.name.common" :description="country.name.official" />
    </template>

    <template #content>
      <GameImage :src="country.flag.svg" :alt="country.flag.alt" class="h-8" />
      <!-- <GameImage :src="country.flag.svg" :alt="country.flag.alt" /> -->
      <!---->
      <!-- <UPageFeature -->
      <!--   icon="i-tabler-world" -->
      <!--   title="Region" -->
      <!--   :description="country.region" -->
      <!-- /> -->
      <!---->
      <!-- <UPageFeature -->
      <!--   icon="i-tabler-map" -->
      <!--   title="Subregion" -->
      <!--   :description="country.subregion" -->
      <!-- /> -->
      <!---->
      <!-- <UPageFeature -->
      <!--   icon="i-tabler-users" -->
      <!--   title="Population" -->
      <!--   :description="populationLabel" -->
      <!-- /> -->
      <!---->
      <!-- <UPageFeature -->
      <!--   icon="i-tabler-ruler-measure" -->
      <!--   title="Area" -->
      <!--   :description="areaLabel" -->
      <!-- /> -->
    </template>

    <template #actions>
      <div class="grid grid-cols-2 gap-4">
        <div />

        <BaseCardButton
          color="primary"
          icon="i-tabler-player-track-next-filled"
          :label="hasNextQuestion ? 'Next' : 'Finish'"
          @click="emit('proceed')"
        />
      </div>
    </template>
  </GameStateLayout>
</template>
