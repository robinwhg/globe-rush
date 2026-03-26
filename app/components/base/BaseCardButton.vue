<script setup lang="ts">
type CardButtonColor = 'neutral' | 'primary'

interface BaseCardButtonProps {
  disabled?: boolean
  color?: CardButtonColor
  icon?: string
  label?: string
  title?: string
}

const props = withDefaults(defineProps<BaseCardButtonProps>(), {
  disabled: false,
  color: 'neutral',
  icon: undefined,
  label: undefined,
  title: undefined,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const text = computed(() => {
  return props.label ?? props.title
})

function handleClick(event: MouseEvent): void {
  emit('click', event)
}
</script>

<template>
  <button
    type="button"
    class="block h-full w-full text-left disabled:cursor-not-allowed"
    :disabled="disabled"
    @click="handleClick"
  >
    <UCard
      :ui="props.color === 'primary'
        ? { root: 'h-24 cursor-pointer flex p-1 sm:p-1 bg-primary', body: 'flex-1 flex items-center justify-center gap-2 text-inverted' }
        : { root: 'h-24 cursor-pointer flex p-1 sm:p-1', body: 'flex-1 flex items-center justify-center gap-2' }"
    >
      <template v-if="icon || text">
        <UIcon v-if="icon" :name="icon" class="size-6 shrink-0" />
        <p v-if="text" class="line-clamp-3 text-center text-base font-semibold sm:text-xl">
          {{ text }}
        </p>
      </template>

      <slot v-else />
    </UCard>
  </button>
</template>
