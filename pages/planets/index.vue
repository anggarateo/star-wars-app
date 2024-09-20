<script lang="ts" setup>
import planet from '~/utils/query/planet';


useHead({
  title: 'All Planets -'
})

const toast = useToast()


const isLoading = ref(true)

const data = ref<Planet[]>(Array())

const search = ref('')

const pagination = ref({
  after: '',
  first: 6
})


onMounted(async () => {
  await nextTick()
  getPlanets()
})


async function getPlanets (
  $state?: {
    loaded: () => void,
    complete: () => void,
    error: () => void
  }
) {
  isLoading.value = true
  
  const {
    data: { value },
    error,
    status
  } = await useAPI({
    params: {
      query: planet.allPlanets(pagination.value)
    }
  })

  if (value) {
    const res: {
      data?: {
        allPlanets: {
          planets: Planet[],
          pageInfo: PageInfo,
          totalCount: number
        }
      }
    } = value

    if (res.data) {
      res.data.allPlanets.pageInfo.hasNextPage
        ? $state?.loaded()
        : $state?.complete()
      
      data.value.push(...res.data.allPlanets.planets)
      pagination.value.after = res.data.allPlanets.pageInfo.endCursor
    }
  }
  
  if (error.value) {
    $state?.error()
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
        label="All Planets"
        is-filter
        placeholder-filter="name"
        @search="search = $event"
      />
    </template>

    
    <div class="grid sm:grid-cols-3 gap-4">
      <template v-if="isLoading && !pagination.after">
        <USkeleton
          v-for="i in 3"
          :key="i"
          class="h-24"
        />
      </template>

      <template v-else>
        <NuxtLink
          v-for="planet in data.filter(el => el.name.toLowerCase().includes(search.toLowerCase()))"
          :key="planet.id"
          :to="`/planets/${planet.id}`"
          class="h-full"
        >
          <UCard class="h-full">
            <template #header>
              <h1 class="text-lg font-semibold">
                {{ planet.name }}
              </h1>
            </template>

            <div class="capitalize space-y-1">
              <div class="flex">
                <h1 class="w-3/4 sm:w-2/3">
                  Diameter
                </h1>

                <h1 class="w-full font-semibold">
                  {{ planet.diameter ? `${planet.diameter} km` : '' }}
                </h1>
              </div>

              <div class="flex">
                <h1 class="w-3/4 sm:w-2/3">
                  Rotation Period
                </h1>

                <h1 class="w-full font-semibold">
                  {{ planet.rotationPeriod ? `${planet.rotationPeriod} hours` : '' }}
                </h1>
              </div>

              <div class="flex">
                <h1 class="w-3/4 sm:w-2/3">
                  Orbital Period
                </h1>

                <h1 class="w-full font-semibold">
                  {{ planet.orbitalPeriod ? `${planet.orbitalPeriod} days` : '' }}
                </h1>
              </div>

              <div class="flex">
                <h1 class="w-3/4 sm:w-2/3">
                  Population
                </h1>

                <h1 class="w-full font-semibold">
                  {{ planet.population }}
                </h1>
              </div>
            </div>
          </UCard>
        </NuxtLink>

        <InfiniteLoading @infinite="getPlanets" class="flex justify-center items-center">
          <template #spinner />
          <template #complete>
            <div />
          </template>
        </InfiniteLoading>
      </template>
    </div>
  </UCard>
</template>
