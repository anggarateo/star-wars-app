<script lang="ts" setup>
import species from '~/utils/query/species';


useHead({
  title: 'All Species -'
})

const toast = useToast()


const isLoading = ref(true)

const data = ref<Species[]>(Array())

const search = ref('')

const pagination = ref({
  after: '',
  first: 6
})


onMounted(async () => {
  await nextTick()
  getSpecies()
})


async function getSpecies (
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
      query: species.allSpecies(pagination.value)
    }
  })

  if (value) {
    const res: {
      data?: {
        allSpecies: {
          species: Species[],
          pageInfo: PageInfo,
          totalCount: number
        }
      }
    } = value

    if (res.data) {
      res.data.allSpecies.pageInfo.hasNextPage
        ? $state?.loaded()
        : $state?.complete()
      
      data.value.push(...res.data.allSpecies.species)
      pagination.value.after = res.data.allSpecies.pageInfo.endCursor
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
        label="All Species"
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
          v-for="species in data.filter(el => el.name.toLowerCase().includes(search.toLowerCase()))"
          :key="species.id"
          :to="`/species/${species.id}`"
          class="h-full"
        >
          <UCard class="h-full">
            <template #header>
              <h1 class="text-lg font-semibold">
                {{ species.name }}
              </h1>
            </template>

            <div class="capitalize space-y-1">
              <div class="flex">
                <h1 class="w-3/4">
                  Classification
                </h1>

                <h1 class="w-full font-semibold">
                  {{ species.classification }}
                </h1>
              </div>

              <div class="flex">
                <h1 class="w-3/4">
                  Designation
                </h1>

                <h1 class="w-full font-semibold">
                  {{ species.designation }}
                </h1>
              </div>

              <div class="flex">
                <h1 class="w-3/4">
                  Average Height
                </h1>

                <h1 class="w-full font-semibold">
                  {{ species.averageHeight ? `${species.averageHeight} cm` : '' }}
                </h1>
              </div>

              <div class="flex">
                <h1 class="w-3/4">
                  Average Lifespan
                </h1>

                <h1 class="w-full font-semibold">
                  {{ species.averageLifespan ? `${species.averageLifespan} years` : '' }}
                </h1>
              </div>

              <div class="flex">
                <h1 class="w-3/4">
                  Language
                </h1>

                <h1 class="w-full font-semibold">
                  {{ species.language }}
                </h1>
              </div>
            </div>
          </UCard>
        </NuxtLink>

        <InfiniteLoading @infinite="getSpecies" class="flex justify-center items-center">
          <template #spinner />
          <template #complete>
            <div />
          </template>
        </InfiniteLoading>
      </template>
    </div>
  </UCard>
</template>
