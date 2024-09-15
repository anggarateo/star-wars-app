<script lang="ts" setup>
const colorMode = useColorMode()
const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>

<template>
  <nav class="flex items-center gap-4 fixed bottom-0 sm:sticky sm:top-0 bg-white dark:bg-gray-800 w-full sm:w-max justify-around p-2">
    <NuxtLink
      v-for="(link, i) in routes"
      :key="i"
      :to="link.to"
      :title="link.name"
      :class="$route.path === link.to ? 'text-orange-400 font-semibold' : ''"
      class="p-2"
    >
      <h1 class="hidden sm:block">
        {{ link.name }}
      </h1>

      <UButton
        :icon="link.icon"
        :color="$route.path === link.to ? 'orange' : 'gray'"
        variant="ghost"
        class="sm:hidden"
      />
    </NuxtLink>

    <ClientOnly>
      <UButton
        title="Theme"
        :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
        color="gray"
        variant="ghost"
        aria-label="Theme"
        @click="isDark = !isDark"
      />
      <template #fallback>
        <div class="w-8 h-8" />
      </template>
    </ClientOnly>
  </nav>
</template>
