<script setup>
definePageMeta({
  layout: "custom",
});

definePageMeta({
  head: {
    title: "My Listings",
    meta: [
      {
        name: "description",
        content: "My Listings",
      },
    ],
  },
  layout: "custom",
  middleware: ["auth"]
});
let listings = ref([]);
const getCarListingByUser = async () => {
  const { data, error } = await useApi('/user/cars');
  if (error) {
    console.error("Failed to fetch listings:", error);
  }
  return data
}
listings = await getCarListingByUser()
</script>

<template>
  <div>
    <div class="flex justify-between mt-24 items-center">
      <h1 class="text-6xl">My Listingsewr</h1>
      <NuxtLink to="/profile/listings/create" class="
          w-9
          h-9
          bg-blue-400
          flex
          justify-center
          items-center
          rounded-full
          text-white
          font-bold
          cursor-pointer
        ">+</NuxtLink>
    </div>
    <div class="shadow rounded p-3 mt-5" v-if="listings && listings.length === 0">
      No cars added in your listing.
    </div>
    <div class="shadow rounded p-3 mt-5" v-else>
      <CarListingCard v-for="listing in listings" :key="listing.id" :listing="listing" />
    </div>
  </div>
</template>