<script lang="ts" setup>
import character from '~/utils/query/character';


useHead({
  title: 'Detail Character -'
})

const toast = useToast()


const route = useRoute()

const isLoading = ref(true)

const data = ref<Character>({} as Character)


onMounted(async () => {
  await nextTick()
  getDetailCharacter()
})


async function getDetailCharacter () {
  isLoading.value = true

  const {
    data: { value },
    error,
    status
  } = await useAPI({
    params: {
      query: character.character(route.params.id)
    }
  })
  
  if (value) {
    const res: {
      data?: {
        person: Character
      }
    } = value

    if (res.data) data.value = res.data?.person
  }

  if (error.value) {
    toast.add({
      title: error.value.data?.message || error.value.message,
      color: 'red'
    })
  }

  if (status.value === 'pending') isLoading.value = true

  isLoading.value = false
}
</script>

<template>
  <UCard>
    <template #header>
      <ReuseTitle
        :label="data?.name"
        is-detail
      />
    </template>
    
    <USkeleton v-if="isLoading" class="h-24" />

    <div
      v-else
      class="space-y-3 capitalize"
    >
      <div class="space-y-1">
        <div class="flex">
          <h1 class="w-1/3 sm:w-1/6">
            Birth Year
          </h1>

          <h1 class="w-full font-semibold">
            {{ birthYear(data.birthYear) }}
          </h1>
        </div>

        <div class="flex">
          <h1 class="w-1/3 sm:w-1/6">
            Gender
          </h1>

          <h1 class="w-full font-semibold">
            {{ data.gender }}
          </h1>
        </div>

        <div class="flex">
          <h1 class="w-1/3 sm:w-1/6">
            Mass
          </h1>

          <h1 class="w-full font-semibold">
            {{ data.mass ? `${data.mass} kg` : '' }}
          </h1>
        </div>

        <div class="flex">
          <h1 class="w-1/3 sm:w-1/6">
            Height
          </h1>

          <h1 class="w-full font-semibold">
            {{ data.height ? `${data.height} cm` : '' }}
          </h1>
        </div>

        <div class="flex">
          <h1 class="w-1/3 sm:w-1/6">
            Skin
          </h1>

          <h1 class="w-full font-semibold">
            {{ data.skinColor }}
          </h1>
        </div>

        <div class="flex">
          <h1 class="w-1/3 sm:w-1/6">
            Hair
          </h1>

          <h1 class="w-full font-semibold">
            {{ data.hairColor }}
          </h1>
        </div>

        <div class="flex">
          <h1 class="w-1/3 sm:w-1/6">
            Eye
          </h1>

          <h1 class="w-full font-semibold">
            {{ data.eyeColor }}
          </h1>
        </div>

        <div class="flex">
          <h1 class="w-1/3 sm:w-1/6">
            Species
          </h1>

          <div class="w-full">
            <NuxtLink
              class="font-semibold underline hover:text-orange-400"
              :to="`/species/${data.species?.id}`"
            >
              {{ data.species?.name }}
            </NuxtLink>
          </div>
        </div>

        <div class="flex">
          <h1 class="w-1/3 sm:w-1/6">
            Planet
          </h1>

          <div class="w-full">
            <NuxtLink
              class="font-semibold underline hover:text-orange-400"
              :to="`/planets/${data.homeworld?.id}`"
            >
              {{ data.homeworld?.name }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <h1>
        Films
      </h1>

      <div class="max-w-full flex overflow-auto gap-2 text-sm pb-4">
        <NuxtLink
          v-for="film in data.filmConnection?.films"
          :key="film.id"
          :to="`/films/${film.id}`"
          class="min-w-[calc(100vw/2)] sm:min-w-[calc(100vw/10)] w-[calc(100vw/2)] sm:w-[calc(100vw/4)] space-y-1 border rounded p-2 shadow"
        >
          <h1 class="text-end font-semibold">
            {{ film.title }}
          </h1>

          <h1 class="text-xs">
            Director: <UBadge v-if="film.director" color="gray" variant="solid" class="m-1">{{ film.director }}</UBadge>
          </h1>
      
          <h1 class="text-xs">
            Producer: <UBadge v-for="(producer, i) in film.producers" :key="i" color="gray" variant="solid" class="m-1">{{ producer }}</UBadge>
          </h1>
        </NuxtLink>
      </div>
    </div>
  </UCard>
</template>
