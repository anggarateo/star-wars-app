<script lang="ts" setup>
import species from '~/utils/query/species';


useHead({
  title: 'Detail Species -'
})

const toast = useToast()

const route = useRoute()

const isLoading = ref(true)

const data = ref<Species>({} as Species)


onMounted(async () => {
  await nextTick()
  getDetailSpecies()
})


async function getDetailSpecies () {
  isLoading.value = true

  const {
    data: { value },
    error,
    status
  } = await useAPI({
    params: {
      query: species.species(route.params.id?.toString())
    }
  })
  
  if (value) {
    const res: {
      data?: {
        species: Species
      }
    } = value

    if (res.data) data.value = res.data?.species
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
          <h1 class="w-3/4 sm:w-1/6">
            Classification
          </h1>
  
          <h1 class="w-full font-semibold">
            {{ data.classification }}
          </h1>
        </div>
  
        <div class="flex">
          <h1 class="w-3/4 sm:w-1/6">
            Designation
          </h1>
  
          <h1 class="w-full font-semibold">
            {{ data.designation }}
          </h1>
        </div>
  
        <div class="flex">
          <h1 class="w-3/4 sm:w-1/6">
            Average Height
          </h1>
  
          <h1 class="w-full font-semibold">
            {{ data.averageHeight ? `${data.averageHeight} cm` : '' }}
          </h1>
        </div>
  
        <div class="flex">
          <h1 class="w-3/4 sm:w-1/6">
            Average Lifespan
          </h1>
  
          <h1 class="w-full font-semibold">
            {{ data.averageLifespan ? `${data.averageLifespan} years` : '' }}
          </h1>
        </div>
  
        <div class="flex">
          <h1 class="w-3/4 sm:w-1/6">
            Skin Colors
          </h1>
  
          <h1 class="w-full font-semibold">
            {{ data.skinColors?.join(', ') }}
          </h1>
        </div>
  
        <div class="flex">
          <h1 class="w-3/4 sm:w-1/6">
            Hair Colors
          </h1>
  
          <h1 class="w-full font-semibold">
            {{ data.hairColors?.join(', ') }}
          </h1>
        </div>
  
        <div class="flex">
          <h1 class="w-3/4 sm:w-1/6">
            Eye Colors
          </h1>
  
          <h1 class="w-full font-semibold">
            {{ data.eyeColors?.join(', ') }}
          </h1>
        </div>
  
        <div class="flex">
          <h1 class="w-3/4 sm:w-1/6">
            Language
          </h1>
  
          <h1 class="w-full font-semibold">
            {{ data.language }}
          </h1>
        </div>
  
        <div class="flex">
          <h1 class="w-3/4 sm:w-1/6">
            Origin Planet
          </h1>
  
          <h1 class="w-full font-semibold">
            {{ data.homeworld?.name }}
          </h1>
        </div>
      </div>

      <h1>
        Characters
      </h1>

      <h1
        v-if="!data.personConnection.people.length"
        class="text-sm px-2"
      >
        None
      </h1>

      <div v-else class="max-w-full flex overflow-auto gap-2 text-sm pb-4">
        <NuxtLink
          v-for="character in data.personConnection.people"
          :key="character.id"
          :to="`/characters/${character.id}`"
          class="min-w-[calc(100vw/1.3)] sm:min-w-[calc(100vw/3.5)] space-y-1 border rounded p-2 shadow"
        >
          <h1 class="font-semibold text-end">
            {{ character.name }}
          </h1>

          <div class="flex">
            <h1 class="w-1/4">
              Birth Year
            </h1>

            <h1 class="font-semibold">
              {{ birthYear(character.birthYear) }}
            </h1>
          </div>

          <div class="flex">
            <h1 class="w-1/4">
              Gender
            </h1>

            <h1 class="font-semibold">
              {{ character.gender }}
            </h1>
          </div>

          <div class="flex">
            <h1 class="w-1/4">
              Mass
            </h1>

            <h1 class="font-semibold">
              {{ character.mass ? `${character.mass} kg` : '' }}
            </h1>
          </div>

          <div class="flex">
            <h1 class="w-1/4">
              Height
            </h1>

            <h1 class="font-semibold">
              {{ character.height ? `${character.height} cm` : '' }}
            </h1>
          </div>

          <div class="flex">
            <h1 class="w-1/4">
              Planet
            </h1>

            <h1 class="font-semibold">
              {{ character.homeworld?.name }}
            </h1>
          </div>
        </NuxtLink>
      </div>

      <h1>
        Films
      </h1>

      <h1
        v-if="!data.filmConnection.films.length"
        class="text-sm px-2"
      >
        None
      </h1>

      <div v-else class="max-w-full flex overflow-auto gap-2 text-sm pb-4">
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
