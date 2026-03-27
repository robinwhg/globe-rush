<script setup lang="ts">
import { createReusableTemplate, useMediaQuery } from '@vueuse/core'

interface PlayHeaderStatOverlayProps {
  icon: string
  value: string
  label: string
  title: string
  description: string
  items: Country[]
  descriptionResolver: (country: Country) => string
}

const props = defineProps<PlayHeaderStatOverlayProps>()

const isDesktop = useMediaQuery('(min-width: 768px)')
const open = ref(false)
const [DefineBodyTemplate, ReuseBodyTemplate] = createReusableTemplate()
</script>

<template>
  <div>
    <UPageCard
      :icon="props.icon"
      :title="props.value"
      :description="props.label"
      class="cursor-pointer transition-transform hover:scale-105"
      @click="open = true"
    />

    <ClientOnly>
      <DefineBodyTemplate>
        <UPageList class="space-y-2">
          <UPageCard
            v-for="item in props.items"
            :key="item.cca2"
            variant="soft"
            :title="item.name.common"
            :description="props.descriptionResolver(item)"
            orientation="horizontal"
            reverse
            :ui="{ container: 'grid grid-cols-3 lg:grid-cols-3 items-center', wrapper: 'col-span-2' }"
          >
            <img
              :src="item.flag.svg"
              class="h-16 w-full object-contain object-center"
            >
          </UPageCard>
        </UPageList>
      </DefineBodyTemplate>

      <UModal
        v-if="isDesktop"
        v-model:open="open"
        :title="props.title"
        :description="props.description"
        :ui="{ content: 'h-[48vh]' }"
      >
        <template #body>
          <ReuseBodyTemplate />
        </template>
      </UModal>

      <UDrawer
        v-else
        v-model:open="open"
        :title="props.title"
        :description="props.description"
        direction="bottom"
        :ui="{ container: 'h-[72vh]' }"
      >
        <template #body>
          <ReuseBodyTemplate />
        </template>
      </UDrawer>
    </ClientOnly>
  </div>
</template>
