<script setup lang="ts">
const emit = defineEmits<{
  resume: []
  exit: []
}>()
</script>

<template>
  <div class="grid grid-cols-2 items-stretch gap-4 max-w-2xl mx-auto">
    <UCard
      variant="soft" :ui="{ root: 'col-span-2 dark:bg-default', body: 'p-4 sm:p-4 relative h-64 lg:h-80 flex items-center justify-center' }"
    >
      <UIcon name="i-tabler-player-pause-filled" class="size-20 lg:size-32 text-dimmed" />
    </UCard>

    <BaseCardButton
      icon="i-tabler-player-stop-filled"
      label="Stop"
      @click="emit('exit')"
    />

    <BaseCardButton
      color="primary"
      icon="i-tabler-player-play-filled"
      label="Resume"
      @click="emit('resume')"
    />
  </div>
</template>
