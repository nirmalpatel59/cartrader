<script setup>
const props = defineProps({
  listing: Object,
});
const name = computed(() => {
  return props.listing.make + " " + props.listing.model + " " + props.listing.year;
});
const SUPABASE_URL = useRuntimeConfig().public.supabaseUrl;
const SUPABASE_IMAGES_LOCATION = useRuntimeConfig().public.supabaseImagesLocation;
// console.log("listing", props.listing);
const archiveListing = async () => {
  const { data, error } = await api(`/user/car`, {
    method: "DELETE",
    query: {
      listingId: props.listing.id,
    }
  });
  if (error) {
    console.error("Failed to delete listing:", error);
  } else {
    // Optionally, you can emit an event or update the state to reflect the deletion
    console.log("Listing deleted successfully");
    console.log(data);
  }
};
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
      <p class="text-red-400 cursor-pointer" @click="archiveListing">Delete</p>
    </div>
  </div>
</template>