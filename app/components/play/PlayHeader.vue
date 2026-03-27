<script setup lang="ts">
interface PlayRegionHeaderProps {
  region: string
  countries: Country[]
}

const props = defineProps<PlayRegionHeaderProps>()

const regionTitle = computed(() => {
  if (props.region === 'world') {
    return 'the World'
  }

  if (props.region === 'americas') {
    return 'the Americas'
  }

  return props.region.charAt(0).toUpperCase() + props.region.slice(1)
})
</script>

<template>
  <UPageHeader
    headline="Let's guess"
    :title="`Flags of ${regionTitle}`"
    :description="`Tune your challenge, press Start, and race through the flags of ${regionTitle}.`"
  >
    <UPageGrid class="mt-10">
      <PlayHeaderCountries :countries="props.countries" :region-title="regionTitle" />
      <PlayHeaderTerritories :countries="props.countries" :region-title="regionTitle" />
      <PlayHeaderPopulation :countries="props.countries" :region-title="regionTitle" />
    </UPageGrid>
  </UPageHeader>
</template>
