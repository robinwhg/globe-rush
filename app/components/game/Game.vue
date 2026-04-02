<script setup lang="ts">
const props = defineProps<{
  countries: Country[]
}>()

const emit = defineEmits<{
  (e: 'back'): void
}>()

const { countries } = toRefs(props)

const { choices, retry, selectChoice, totalCorrectQuestions, totalQuestions, index, question, isFinished, isPaused } = useGame(countries.value)

// FIXME: Show hint for territories that have the same flag as country
</script>

<template>
  <div>
    <Transition name="fade" mode="out-in">
      <div v-if="!isFinished && question" class="space-y-4">
        <GameHeader
          v-model:is-paused="isPaused"
          :current-index="index"
          :total-questions
        />

        <Transition name="fade" mode="out-in" class="max-w-2xl mx-auto">
          <GamePause
            v-if="isPaused"
            @resume="isPaused = false"
            @exit="emit('back')"
          />

          <GamePlay
            v-else
            :question="question"
            :choices="choices"
            @select-choice="choice => selectChoice(choice)"
          />
        </Transition>
      </div>

      <GameEnd
        v-else
        :total-questions
        :total-correct-questions
        @retry="retry"
        @back="emit('back')"
      />
    </Transition>
  </div>
</template>
