<script setup lang="ts">
defineProps<{
  gameTitle: string
  regionTitle: string
  totalQuestions: number
  gameMode: GameMode
}>()

const emit = defineEmits<{
  start: []
  back: []
}>()
</script>

<template>
  <GameStateLayout>
    <template #header>
      <UPageFeature :title="regionTitle" :description="gameTitle" />
    </template>

    <template #content>
      <div class="overflow-y-auto grid grid-cols-2 gap-4">
        <UPageFeature :title="totalQuestions.toString()" description="Flags" icon="i-tabler-flag-filled" />

        <UPageFeature v-if="gameMode === 'type-answer'" title="Type Answer" description="Mode" icon="i-tabler-keyboard-filled" />
        <UPageFeature v-else title="Multiple Choice" description="Mode" icon="i-tabler-layout-grid-filled" />
      </div>
    </template>

    <template #actions>
      <div class="grid grid-cols-2 gap-4">
        <BaseCardButton
          icon="i-tabler-arrow-left"
          label="Back"
          @click="emit('back')"
        />

        <BaseCardButton
          color="primary"
          icon="i-tabler-player-play-filled"
          label="Start"
          @click="emit('start')"
        />
      </div>
    </template>
  </GameStateLayout>
</template>
