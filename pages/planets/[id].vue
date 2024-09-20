<script lang="ts" setup>
import planet from '~/utils/query/planet';


useHead({
  title: 'Detail Planet -'
})

const toast = useToast()

const route = useRoute()

const isLoading = ref(true)

const data = ref<Planet>({} as Planet)


onMounted(async () => {
  await nextTick()
  getDetailPlanet()
})


async function getDetailPlanet () {
  isLoading.value = true

  const {
    data: { value },
    error,
    status
  } = await useAPI({
    params: {
      query: planet.planet(route.params.id?.toString())
    }
  })
  
  if (value) {
    const res: {
      data?: {
        planet: Planet
      }
    } = value

    if (res.data) data.value = res.data?.planet
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
            Diameter
          </h1>

          <h1 class="w-full font-semibold">
            {{ data.diameter ? `${data.diameter} km` : '' }}
          </h1>
        </div>

        <div class="flex">
          <h1 class="w-3/4 sm:w-1/6">
            Rotation Period
          </h1>

          <h1 class="w-full font-semibold">
            {{ data.rotationPeriod ? `${data.rotationPeriod} hours` : '' }}
          </h1>
        </div>

        <div class="flex">
          <h1 class="w-3/4 sm:w-1/6">
            Orbital Period
          </h1>

          <h1 class="w-full font-semibold">
            {{ data.orbitalPeriod ? `${data.orbitalPeriod} days` : '' }}
          </h1>
        </div>

        <div class="flex">
          <h1 class="w-3/4 sm:w-1/6">
            Gravity
          </h1>

          <h1 class="w-full font-semibold">
            {{ data.gravity ? `${data.gravity} G` : '' }}
          </h1>
        </div>

        <div class="flex">
          <h1 class="w-3/4 sm:w-1/6">
            Population
          </h1>

          <h1 class="w-full font-semibold">
            {{ data.population }}
          </h1>
        </div>

        <div class="flex">
          <h1 class="w-3/4 sm:w-1/6">
            Climates
          </h1>

          <h1 class="w-full font-semibold">
            {{ data.climates?.join(', ') }}
          </h1>
        </div>

        <div class="flex">
          <h1 class="w-3/4 sm:w-1/6">
            Terrains
          </h1>

          <h1 class="w-full font-semibold">
            {{ data.terrains?.join(', ') }}
          </h1>
        </div>

        <div class="flex">
          <h1 class="w-3/4 sm:w-1/6">
            Surface Water
          </h1>

          <h1 class="w-full font-semibold">
            {{ data.surfaceWater ? `${data.surfaceWater} %` : '' }}
          </h1>
        </div>
      </div>

      <h1>
        Characters
      </h1>

      <h1
        v-if="!data.residentConnection.residents.length"
        class="text-sm px-2"
      >
        None
      </h1>

      <div v-else class="max-w-full flex overflow-auto gap-2 text-sm pb-4">
        <NuxtLink
          v-for="character in data.residentConnection?.residents"
          :key="character.id"
          :to="`/characters/${character.id}`"
          class="min-w-[calc(100vw/1.3)] sm:min-w-[calc(100vw/3.5)] space-y-1 border rounded p-2 shadow capitalize"
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
              Species
            </h1>

            <h1 class="font-semibold">
              {{ character.species?.name }}
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
