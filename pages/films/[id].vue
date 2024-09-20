<script lang="ts" setup>
import film from '~/utils/query/film';


useHead({
  title: 'Detail Film -'
})

const toast = useToast()


const route = useRoute()

const isLoading = ref(true)

const data = ref<Film>({} as Film)


onMounted(async () => {
  await nextTick()
  getDetailFilm()
})


async function getDetailFilm () {
  isLoading.value = true

  const {
    data: { value },
    error,
    status
  } = await useAPI({
    params: {
      query: film.film(route.params.id)
    }
  })
  
  if (value) {
    const res: {
      data?: {
        film: Film
      }
    } = value

    if (res.data) data.value = res.data?.film
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
        :label="data?.title"
        is-detail
      />
    </template>

    <USkeleton v-if="isLoading" class="h-24" />

    <div
      v-else
      class="space-y-3"
    >
      <div class="flex justify-between">
        <div>
          <h1>
            Director: <UBadge v-if="data.director" color="gray" variant="solid" class="m-1">{{ data.director }}</UBadge>
          </h1>
    
          <h1>
            Producer: <UBadge v-for="(producer, i) in data.producers" :key="i" color="gray" variant="solid" class="m-1">{{ producer }}</UBadge>
          </h1>
        </div>

        <h1>
          <span class="text-2xl">{{ data.episodeID }}</span> Episode
        </h1>
      </div>

      <p>
        {{ data.openingCrawl }}
      </p>

      <h1>
        Characters
      </h1>

      <h1
        v-if="!data.characterConnection.characters.length"
        class="text-sm px-2"
      >
        None
      </h1>

      <div v-else class="max-w-full flex overflow-auto gap-2 text-sm pb-4">
        <NuxtLink
          v-for="character in data.characterConnection?.characters"
          :key="character.id"
          :to="`/characters/${character.id}`"
          class="min-w-[calc(100vw/1.3)] sm:min-w-[calc(100vw/3.5)] space-y-1 border rounded p-2 shadow capitalize"
        >
          <h1 class="font-semibold text-end">
            {{ character.name }}
          </h1>

          <div class="flex">
            <h1 class="w-1/3">
              Birth Year
            </h1>

            <h1 class="font-semibold">
              {{ birthYear(character.birthYear) }}
            </h1>
          </div>

          <div class="flex">
            <h1 class="w-1/3">
              Gender
            </h1>

            <h1 class="font-semibold">
              {{ character.gender }}
            </h1>
          </div>

          <div class="flex">
            <h1 class="w-1/3">
              Mass
            </h1>

            <h1 class="font-semibold">
              {{ character.mass ? `${character.mass} kg` : '' }}
            </h1>
          </div>

          <div class="flex">
            <h1 class="w-1/3">
              Height
            </h1>

            <h1 class="font-semibold">
              {{ character.height ? `${character.height} cm` : '' }}
            </h1>
          </div>

          <div class="flex">
            <h1 class="w-1/3">
              Species
            </h1>

            <h1 class="font-semibold">
              {{ character.species?.name }}
            </h1>
          </div>

          <div class="flex">
            <h1 class="w-1/3">
              Planet
            </h1>

            <h1 class="font-semibold">
              {{ character.homeworld?.name }}
            </h1>
          </div>
        </NuxtLink>
      </div>
    </div>
  </UCard>
</template>
