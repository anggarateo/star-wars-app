<script lang="ts" setup>
import film from '~/utils/query/film';


useHead({
  title: 'All Films -'
})

const toast = useToast()


const isLoading = ref(true)

const data = ref<Film[]>(Array())

const search = ref('')

const pagination = ref({
  after: '',
  first: 6
})


onMounted(async () => {
  await nextTick()
  getFilms()
})


async function getFilms (
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
      query: film.allFilms(pagination.value)
    }
  })

  if (value) {
    const res: {
      data?: {
        allFilms: {
          films: Film[],
          pageInfo: PageInfo,
          totalCount: number
        }
      }
    } = value

    if (res.data) {
      res.data.allFilms.pageInfo.hasNextPage
        ? $state?.loaded()
        : $state?.complete()
      
      data.value.push(...res.data.allFilms.films)
      pagination.value.after = res.data.allFilms.pageInfo.endCursor
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
        label="All Films"
        is-filter
        placeholder-filter="title"
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
          v-for="film in data.filter(el => el.title.toLowerCase().includes(search.toLowerCase()))"
          :key="film.id"
          :to="`/films/${film.id}`"
          class="h-full"
        >
          <UCard class="h-full">
            <template #header>
              <h1 class="text-lg font-semibold">
                {{ film.title }}
              </h1>
            </template>
    
            <p class="line-clamp-3">
              {{ film.openingCrawl }}
            </p>
  
            <template #footer>
              <h1 class="text-sm">
                Director: <UBadge v-if="film.director" color="gray" variant="solid" class="m-1">{{ film.director }}</UBadge>
              </h1>
      
              <h1 class="text-sm">
                Producer: <UBadge v-for="(producer, i) in film.producers" :key="i" color="gray" variant="solid" class="m-1">{{ producer }}</UBadge>
              </h1>
            </template>
          </UCard>
        </NuxtLink>

        <InfiniteLoading @infinite="getFilms" class="flex justify-center items-center">
          <template #spinner />
          <template #complete>
            <div />
          </template>
        </InfiniteLoading>
      </template>
    </div>
  </UCard>
</template>
