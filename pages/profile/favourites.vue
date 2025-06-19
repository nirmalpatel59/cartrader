<script setup>
definePageMeta({
  layout: "custom",
  middleware: ["auth"]
});

// Placeholder data - you can replace this with actual API calls
const favourites = ref([]);

// This would be replaced with actual API call to get user's favourites
const getFavouriteListings = async () => {
  // const { data, error } = await useApi('/user/favourites');
  // if (error.value) {
  //   console.error("Failed to fetch favourites:", error);
  // }
  // return data.value || []

  // For now, return empty array
  return [];
}

favourites.value = await getFavouriteListings();
</script>

<template>
  <div>
    <div class="flex justify-between mt-24 items-center">
      <h1 class="text-6xl">My Favourites</h1>
    </div>

    <div class="shadow rounded p-3 mt-5" v-if="favourites && favourites.length === 0">
      <div class="text-center py-8">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
          </path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No favourites yet</h3>
        <p class="text-gray-500 mb-4">Start browsing cars and add them to your favourites to see them here.</p>
        <NuxtLink to="/"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Browse Cars
        </NuxtLink>
      </div>
    </div>

    <div class="shadow rounded p-3 mt-5" v-else>
      <!-- This would display favourite car cards when implemented -->
      <CarListingCard v-for="favourite in favourites" :key="favourite.id" :listing="favourite" />
    </div>
  </div>
</template>
