<script lang="ts" setup>
defineProps<{
  label?: string,
  isFilter?: boolean,
  placeholderFilter?: string,
  isDetail?: boolean
}>()

const emits = defineEmits(['search'])


const search = ref('')

watch(() => search.value, (val: string) => {
  emits('search', val)
})
</script>

<template>
  <div class="space-y-2 sm:flex justify-between">
    <div class="flex items-center gap-2">
      <UButton
        v-if="isDetail"
        title="Back"
        icon="material-symbols:arrow-back-ios"
        color="gray"
        variant="ghost"
        @click="$router.back()"
      />

      <h1 class="text-xl font-semibold">
        {{ label }}
      </h1>
    </div>

    <UInput
      v-if="isFilter"
      v-model="search"
      icon="i-heroicons-magnifying-glass-20-solid"
      size="lg"
      color="white"
      :trailing="false"
      :placeholder="`Search ${placeholderFilter}...`"
    />
  </div>
</template>
