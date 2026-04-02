const CHOICE_COUNT = 4
const ADVANCE_DELAY = 600

export interface Choice {
  country: Country
  isCorrect: boolean
  showOverlay: Ref<boolean>
}

// TODO: Add timer (stop at 60m & after 5m of inactivity pause)
// TODO: Setup choices pool to be closely related to question

export function useGame(countries: Country[]) {
  const isPaused = ref(false)
  const questions = ref(shuffle(countries))
  const index = ref(0)
  const wrongQuestions = ref<Country[]>([])
  const elapsedSeconds = ref(0)

  const isFinished = computed(() => index.value >= questions.value.length)
  const question = computed(() => questions.value[index.value])
  const totalQuestions = computed(() => questions.value.length)
  const totalCorrectQuestions = computed(() => questions.value.length - wrongQuestions.value.length)
  const timerLabel = computed(() => {
    const minutes = Math.floor(elapsedSeconds.value / 60)
      .toString()
      .padStart(2, '0')

    const seconds = (elapsedSeconds.value % 60)
      .toString()
      .padStart(2, '0')

    return `${minutes}:${seconds}`
  })
  const choices = computed(() => {
    if (!question.value)
      return []

    const distractors = shuffle(countries.filter(country => country.cca3 !== question.value?.cca3)).slice(0, CHOICE_COUNT - 1)
    const choicePool = shuffle([question.value, ...distractors])

    return choicePool.map((choice) => {
      return {
        country: choice,
        isCorrect: choice.cca3 === question.value?.cca3,
        showOverlay: ref(false),
      }
    })
  })

  function selectChoice(choice: Choice) {
    if (!question.value)
      return

    if (!choice.isCorrect)
      wrongQuestions.value.push(question.value)

    choice.showOverlay.value = true

    setTimeout(() => {
      index.value += 1
      choice.showOverlay.value = false
    }, ADVANCE_DELAY)
  }
  function retry() {
    questions.value = shuffle(countries)
    index.value = 0
    wrongQuestions.value = []
    elapsedSeconds.value = 0
    isPaused.value = false
  }

  const timer = setInterval(() => {
    if (isPaused.value || isFinished.value)
      return

    elapsedSeconds.value += 1
  }, 1000)

  onScopeDispose(() => {
    clearInterval(timer)
  })

  return {
    isPaused,
    questions,
    index,
    wrongQuestions,
    elapsedSeconds,
    timerLabel,
    isFinished,
    question,
    totalQuestions,
    totalCorrectQuestions,
    choices,
    selectChoice,
    retry,
  }
}

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array]

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const current = shuffled[i]!
    shuffled[i] = shuffled[j]!
    shuffled[j] = current
  }

  return shuffled
}
