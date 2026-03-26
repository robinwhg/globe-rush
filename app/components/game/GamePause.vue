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
      <UCard
        :ui="{ root: 'h-full min-h-24 cursor-pointer flex p-2 sm:p-2', body: 'flex-1 flex items-center justify-center gap-2' }"
        @click="emit('exit')"
      >
        <UIcon name="i-tabler-player-stop-filled" class="size-6" />
        <p class="text-base font-semibold sm:text-xl">
          Stop
        </p>
      </UCard>

      <UCard
        :ui="{ root: 'bg-primary h-full min-h-24 cursor-pointer flex p-2 sm:p-2', body: 'flex-1 flex items-center justify-center gap-2 text-inverted' }"
        @click="emit('resume')"
      >
        <UIcon name="i-tabler-player-play-filled" class="size-6" />
        <p class="text-base font-semibold sm:text-xl">
          Resume
        </p>
      </UCard>
    </div>
  </div>
</template>
