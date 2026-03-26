<script setup lang="ts">
const emit = defineEmits<{
  resume: []
  exit: []
}>()
</script>

<template>
  <div class="space-y-12">
    <div class="h-56 lg:h-72 flex items-center justify-center">
      <UCard
        :ui="{ root: 'mx-auto h-full aspect-3/2 flex', body: 'flex-1 flex flex-col items-center justify-center text-dimmed' }"
      >
        <UIcon name="i-tabler-player-pause-filled" class="size-20 lg:size-32" />
      </UCard>
    </div>

    <div class="mx-auto grid max-w-2xl grid-cols-2 items-stretch gap-4">
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
  </div>
</template>
