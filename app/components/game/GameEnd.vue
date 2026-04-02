<script setup lang="ts">
const props = defineProps<{
  totalQuestions: number
  totalCorrectQuestions: number
}>()

const emit = defineEmits<{
  retry: []
  back: []
}>()

const { totalQuestions, totalCorrectQuestions } = toRefs(props)

const accuracyPct = computed(() => {
  if (totalQuestions.value === 0)
    return 0

  return Math.round((totalCorrectQuestions.value / totalQuestions.value) * 100)
})

// TODO: Show more info
</script>

<template>
  <div class="space-y-8">
    <p class="text-xl font-semibold col-span-2">
      Run complete!
    </p>

    <div class="max-w-2xl mx-auto grid grid-cols-2 gap-4">
      <UCard :ui="{ root: 'col-span-2 dark:bg-default divide-none', header: 'min-h-10' }">
        <template #header>
          <p class="text-xl font-semibold">
            Your score
          </p>
        </template>

        <div class="flex flex-col gap-2">
          <p class="text-base text-pretty font-semibold text-highlighted">
            Accuracy
          </p>
          <UProgress
            :model-value="totalCorrectQuestions"
            :max="totalQuestions"
            color="success"
            :ui="{ base: 'bg-error' }"
          />
          <div class="inline-flex items-center justify-between text-sm">
            <span class="font-semibold">
              {{ totalCorrectQuestions }} out of {{ totalQuestions }} Flags
            </span>
            <span class="text-muted">
              {{ accuracyPct }} %
            </span>
          </div>
        </div>
      </UCard>

      <BaseCardButton
        icon="i-tabler-reload"
        label="Retry"
        @click="emit('retry')"
      />

      <BaseCardButton
        color="primary"
        icon="i-tabler-arrow-forward"
        label="Continue"
        @click="emit('back')"
      />
    </div>
  </div>
</template>
