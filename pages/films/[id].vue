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
      <div class="flex justify-between items-center">
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

      <div class="max-w-full flex overflow-auto gap-2 text-sm pb-4">
        <NuxtLink
          v-for="character in data.characterConnection?.characters"
          :key="character.id"
          :to="`/characters/${character.id}`"
          class="min-w-[calc(100vw/3)] sm:min-w-[calc(100vw/10)] text-end space-y-1 border rounded p-2 shadow"
        >
          <h1>
            {{ character.name }}
          </h1>

          <h1>
            {{ character.birthYear }}
          </h1>

          <h1>
            {{ character.height }} kg
          </h1>

          <h1>
            {{ character.mass }} cm
          </h1>
        </NuxtLink>
      </div>
    </div>
  </UCard>
</template>
