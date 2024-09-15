<script lang="ts" setup>
import film from '~/utils/query/film';


useHead({
  title: 'List Films -'
})

const toast = useToast()


const isLoading = ref(false)

const data = ref<Film[]>(Array())

const search = ref('')


onMounted(() => {
  getFilms()
})


async function getFilms () {
  isLoading.value = true
  
  const {
    data: { value },
    error,
    status
  } = await useAPI({
    params: {
      query: film.allFilms()
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

    if (res.data) data.value = res.data.allFilms.films
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
        label="List Films"
        is-filter
        placeholder-filter="title"
        @search="search = $event"
      />
    </template>

    <USkeleton v-if="isLoading" class="h-24" />

    <div
      v-else
      class="grid sm:grid-cols-3 gap-4"
    >
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
    </div>
  </UCard>
</template>
