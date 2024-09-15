import type { UseFetchOptions } from 'nuxt/app'

export function useAPI<T>(options?: UseFetchOptions<T>) {
  return useFetch(useRuntimeConfig().public.apiUrl, {
    ...options
  })
}
