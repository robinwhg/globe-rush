<script setup lang="ts">
withDefaults(defineProps<{
  contentKey?: string
  fixedCard?: boolean
}>(), {
  contentKey: 'default',
  fixedCard: false,
})
</script>

<template>
  <div class="space-y-4">
    <div class="max-w-2xl mx-auto space-y-4">
      <Transition name="slide-side" mode="out-in" appear>
        <UCard
          :key="contentKey"
          :ui="{ root: fixedCard ? 'flex flex-col h-56 lg:h-80' : 'flex flex-col', header: 'sm:px-4', body: 'flex-1 p-4 sm:p-4', footer: 'sm:px-4' }"
        >
          <template v-if="$slots.header" #header>
            <slot name="header" />
          </template>

          <slot name="content" />

          <template v-if="$slots.footer" #footer>
            <slot name="footer" />
          </template>
        </UCard>
      </Transition>

      <Transition
        v-if="$slots.actions"
        name="slide-up"
        mode="out-in"
        appear
      >
        <slot name="actions" />
      </Transition>
    </div>
  </div>
</template>
