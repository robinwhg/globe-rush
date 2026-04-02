<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  countries: Country[]
}>()

const { title, description, countries } = toRefs(props)
</script>

<template>
  <UPageHeader
    headline="Let's guess"
    :title
    :description
  >
    <UPageGrid class="mt-10">
      <PlayHeaderCardCountries :countries :title />
      <PlayHeaderCardTerritories :countries :title />
      <PlayHeaderCardPopulation :countries :title />
    </UPageGrid>
  </UPageHeader>
</template>
