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
      class="space-y-3"
    >
      <h1>
        Birth Year: {{ data.birthYear }}
      </h1>

      <h1>
        Gender: {{ data.gender }}
      </h1>
      
      <h1>
        Mass: {{ data.mass }} kg
      </h1>

      <h1>
        Height: {{ data.height }} cm
      </h1>

      <h1>
        Skin: {{ data.skinColor }}
      </h1>

      <h1>
        Hair: {{ data.hairColor }}
      </h1>

      <h1>
        Eye: {{ data.eyeColor }}
      </h1>

      <h1>
        Films
      </h1>

      <div class="max-w-full flex overflow-auto gap-2 text-sm pb-4">
        <NuxtLink
          v-for="film in data.filmConnection?.films"
          :key="film.id"
          :to="`/films/${film.id}`"
          class="min-w-[calc(100vw/3)] sm:min-w-[calc(100vw/10)] text-end space-y-1 border rounded p-2 shadow"
        >
          <h1>
            {{ film.title }}
          </h1>
        </NuxtLink>
      </div>
    </div>
  </UCard>
</template>
