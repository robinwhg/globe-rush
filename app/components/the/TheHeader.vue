<script setup lang="ts">
const items = computed(() => {
  return playableRegions.map(region => ({
    label: region.title,
    to: `/${region.slug}`,
  }))
})
</script>

<template>
  <UHeader toggle-side="right">
    <template #title>
      <Logo aria-hidden="true" class="size-8 shrink-0 text-primary" />
      <span>Globe Rush</span>
    </template>

    <UNavigationMenu :items />

    <template #right>
      <UColorModeButton />

      <UButton
        icon="i-tabler-brand-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/robinwhg/globe-rush"
        target="_blank"
        aria-label="GitHub"
      />
    </template>

    <template #body>
      <UNavigationMenu orientation="vertical" :items />
    </template>
  </UHeader>
</template>
