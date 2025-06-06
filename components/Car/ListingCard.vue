<script setup>
const props = defineProps({
  listing: Object,
});
const name = computed(() => {
  return props.listing.make + " " + props.listing.model + " " + props.listing.year;
});
const SUPABASE_URL = useRuntimeConfig().public.supabaseUrl
const SUPABASE_IMAGES_LOCATION = useRuntimeConfig().public.supabaseImagesLocation
</script>

<template>
  <div class="shadow rounded overflow-hidden flex justify-between mb-4">
    <div class="flex">
      <NuxtImg :src="`${SUPABASE_URL}/${SUPABASE_IMAGES_LOCATION}/${listing.image}`" alt="listing image"
        class="w-80 mr-3 h-44" />
      <div class="p-3">
        <h1 class="text-2xl">{{ name }}</h1>
        <p class="text-blue-400">${{ listing.price }}</p>
      </div>
    </div>
    <div class="p-3 flex">
      <NuxtLink class="text-blue-400 mr-4" :to="`/profile/listings/view/${listing.id}`">View</NuxtLink>
      <p class="text-red-400 cursor-pointer">Delete</p>
    </div>
  </div>
</template>