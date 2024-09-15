<script lang="ts" setup>
import film from '~/utils/query/film';


useHead({
  title: 'Detail Film -'
})

const toast = useToast()


const route = useRoute()

const isLoading = ref(false)

const data = ref<Film>({} as Film)


onMounted(() => {
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
        label="Detail Film"
        is-detail
      />
    </template>
  </UCard>
</template>
