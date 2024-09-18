<script lang="ts" setup>
import character from '~/utils/query/character';


useHead({
  title: 'All Characters -'
})

const toast = useToast()


const isLoading = ref(true)

const data = ref<Character[]>(Array())

const search = ref('')

const pagination = ref({
  after: '',
  first: 6
})


onMounted(async () => {
  await nextTick()
  getCharacters()
})


async function getCharacters ($state?: any) {
  isLoading.value = true
  
  const {
    data: { value },
    error,
    status
  } = await useAPI({
    params: {
      query: character.allCharacters(pagination.value)
    }
  })

  if (value) {
    const res: {
      data?: {
        allPeople: {
          people: Character[],
          pageInfo: PageInfo,
          totalCount: number
        }
      }
    } = value

    if (res.data) {
      res.data.allPeople.pageInfo.hasNextPage
        ? $state?.loaded()
        : $state?.complete()

      data.value.push(...res.data.allPeople.people)
      pagination.value.after = res.data.allPeople.pageInfo.endCursor
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
        label="All Characters"
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
          v-for="character in data.filter(el => el.name.toLowerCase().includes(search.toLowerCase()))"
          :key="character.id"
          :to="`/characters/${character.id}`"
          class="h-full"
        >
          <UCard class="h-full">
            <template #header>
              <h1 class="text-lg font-semibold">
                {{ character.name }}
              </h1>
            </template>

            <div class="flex justify-between items-end capitalize">
              <div class="w-full">
                <h1>
                  {{ birthYear(character.birthYear) }}
                </h1>

                <h1>
                  {{ character.gender }}
                </h1>
              </div>

              <div class="w-1/3 text-end">
                <h1>
                  {{ character.mass }} kg
                </h1>
  
                <h1>
                  {{ character.height }} cm
                </h1>
              </div>
            </div>
          </UCard>
        </NuxtLink>

        <InfiniteLoading @infinite="getCharacters" class="flex justify-center items-center">
          <template #spinner />
          <template #complete>
            <div />
          </template>
        </InfiniteLoading>
      </template>
    </div>
  </UCard>
</template>
