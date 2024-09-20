<script lang="ts" setup>
useHead({
  titleTemplate: '%s Star Wars App'
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage class="p-4 pb-20 sm:pb-0 min-h-[calc(100vh-64px)]" />

    <UNotifications />
  </NuxtLayout>
</template>
