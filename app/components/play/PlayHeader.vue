<script setup lang="ts">
interface PlayRegionHeaderProps {
  region: string
  countries: Country[]
}

const props = defineProps<PlayRegionHeaderProps>()

const regionTitle = computed(() => {
  if (props.region === 'world')
    return 'the World'

  if (props.region === 'americas')
    return 'the Americas'

  return props.region.charAt(0).toUpperCase() + props.region.slice(1)
})

const countryCount = computed(() => {
  return props.countries.filter(country => country.independent).length
})

const territoryCount = computed(() => {
  return props.countries.filter(country => !country.independent).length
})

const totalPopulation = computed(() => {
  return props.countries.reduce((sum, country) => sum + country.population, 0)
})

const integerFormatter = new Intl.NumberFormat('en-US')
const compactFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

const infoCards = computed(() => {
  return [
    {
      title: 'Countries',
      value: integerFormatter.format(countryCount.value),
      icon: 'i-tabler-flag',
    },
    {
      title: 'Territories',
      value: integerFormatter.format(territoryCount.value),
      icon: 'i-tabler-flag-3',
    },
    {
      title: 'Population',
      value: compactFormatter.format(totalPopulation.value),
      icon: 'i-tabler-users',
    },
  ]
})

// TODO: Clicking on the info card will open a modal on desktop and a drawer on mobile that shows a list with the info split out into the countries
</script>

<template>
  <UPageHeader
    headline="Let's guess"
    :title="`Flags of ${regionTitle}`"
    :description="`Tune your challenge, press Start, and race through the flags of ${regionTitle}.`"
  >
    <UPageGrid class="mt-10">
      <UPageCard
        v-for="card in infoCards"
        :key="card.title"
        :icon="card.icon"
        :title="card.value"
        :description="card.title"
      />
    </UPageGrid>
  </UPageHeader>
</template>
