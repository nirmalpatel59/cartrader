<script lang="ts" setup>
import logger from '@milandadhaniya/tiny-logger-js'
const route = useRoute()
const title = computed(() => {
  logger.log({ title: 'Route Params: ', msg: JSON.stringify(route.params) });
  logger.info({ title: 'Route Query: ', msg: JSON.stringify(route.query) });
  if (route.params.make) return `${(route.params.make as string).toUpperCase()}`
  return `Cars in ${(route.params.city as string).toUpperCase()}`
})
useHead({
  title,
})
definePageMeta({
  layout: 'custom',
})
</script>
<template>
  <div class="mt-32 flex">
    <NuxtErrorBoundary>
      <CarSideBar />
      <NuxtPage />
      <template #error="{ error }">
        <div class="text-center mx-auto flex flex-col">
          <h1 class="text-5xl text-red-600 mb-4">Something Went wrong</h1>
          <code>{{ error }}</code>
          <button @click="error.value = null">Go Back</button>
        </div>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>