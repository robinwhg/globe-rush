<template>
  <UHeader :toggle="false">
    <template #title>
      <UIcon name="i-tabler-globe-filled" class="size-8 text-primary" />
      <span>Guess the Flag</span>
    </template>

    <template #right>
      <UColorModeButton />

      <UButton
        icon="i-tabler-brand-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/robinwhg/guess-the-flag"
        target="_blank"
        aria-label="GitHub"
      />
    </template>
  </UHeader>
</template>
