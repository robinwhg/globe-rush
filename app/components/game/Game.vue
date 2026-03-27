<script setup lang="ts">
type GameMode = 'countries' | 'territories' | 'both'

interface GameMeta {
  regionSlug: string
  regionName: string
  gameMode: GameMode
}

interface FlagQuizGameProps {
  questions: Country[]
  gameMeta: GameMeta
}

const props = defineProps<FlagQuizGameProps>()

const emit = defineEmits<{
  back: []
}>()

const gameSession = reactive(useGameSession(props))

function handleExit(): void {
  gameSession.resetForExit()
  emit('back')
}

// FIXME: Hint for territories that have the same flag as country
// FIXME: Alt text of images shouldn't have the name of the country in it
// TODO: Stop timer at 60m & after 5m of inactivity pause
</script>

<template>
  <section class="space-y-4">
    <GameHeader
      v-if="!gameSession.isCompleted"
      v-model:paused="gameSession.isPaused"
      :state="{
        currentQuestionNumber: gameSession.currentQuestionNumber,
        totalQuestions: gameSession.totalQuestions,
        elapsedSeconds: gameSession.elapsedSeconds,
      }"
    />

    <Transition name="fade" mode="out-in">
      <GamePause
        v-if="gameSession.isPaused"
        key="paused"
        @resume="gameSession.resume"
        @exit="handleExit"
      />

      <GameEndCard
        v-else-if="gameSession.runResult"
        key="completed"
        :result="gameSession.runResult"
        @retry="gameSession.retry"
        @back="handleExit"
      />

      <div
        v-else-if="gameSession.currentQuestion"
        key="playing"
        class="space-y-12"
      >
        <Transition name="fade" mode="out-in" appear>
          <div :key="gameSession.currentQuestion.cca2" class="grid grid-cols-2 items-stretch gap-4 max-w-2xl mx-auto">
            <GameImage
              class="col-span-2"
              :src="gameSession.currentQuestion.flag.svg"
              :alt="gameSession.currentQuestion.flag.alt"
              :preload-src="gameSession.nextQuestion?.flag.svg"
            />

            <div
              v-for="choice in gameSession.choices"
              :key="choice.cca2"
              class="relative"
              :class="{
                'choice-wiggle': gameSession.showErrorOverlay(choice),
                'choice-pop': gameSession.showSuccessOverlay(choice),
              }"
            >
              <BaseCardButton
                :label="choice.name.common"
                :disabled="gameSession.isRevealed"
                @click="gameSession.selectChoice(choice)"
              />

              <Transition name="fade">
                <div
                  v-if="gameSession.showSuccessOverlay(choice)"
                  class="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-success text-inverted pointer-events-none"
                >
                  <UIcon name="i-tabler-check" class="size-10" />
                </div>

                <div
                  v-else-if="gameSession.showErrorOverlay(choice)"
                  class="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-error text-inverted pointer-events-none"
                >
                  <UIcon name="i-tabler-x" class="size-10" />
                </div>
              </Transition>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
@keyframes choice-wiggle {
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  60% {
    transform: translateX(-6px);
  }
  40%,
  80% {
    transform: translateX(6px);
  }
}

.choice-wiggle {
  animation: choice-wiggle 400ms ease-in-out 1;
}

@keyframes choice-pop {
  0% {
    transform: translateY(0);
  }
  35% {
    transform: translateY(-10px);
  }
  65% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-3px);
  }
}

.choice-pop {
  animation: choice-pop 400ms ease-out 1;
}

@media (prefers-reduced-motion: reduce) {
  .choice-pop {
    animation: none;
  }

  .choice-wiggle {
    animation: none;
  }
}
</style>
