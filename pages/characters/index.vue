
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
      <template v-if="isLoading">
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
      </template>
    </div>
  </UCard>
</template>
