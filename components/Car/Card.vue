<script setup lang="ts">
interface IProps {
  car: {
    id: number;
    make: string;
    model: string;
    year: number;
    price: number;
    image: string;
    seats: number;
    miles: string;
    features: string[];
    description: string;
  }
}
const props = defineProps<IProps>()

// Reactive state for favorite
const isFavorite = ref(false)

const name = computed(() => {
  return props.car.make + " " + props.car.model + " " + props.car.year;
});

// Toggle favorite status
const toggleFavorite = (event: Event) => {
  event.stopPropagation() // Prevent card click navigation
  isFavorite.value = !isFavorite.value

  // Here you can add API call to save/remove favorite
  console.log(`Car ${props.car.id} ${isFavorite.value ? 'added to' : 'removed from'} favorites`)

  // TODO: Add API integration
  // if (isFavorite.value) {
  //   await addToFavorites(props.car.id)
  // } else {
  //   await removeFromFavorites(props.car.id)
  // }
}
</script>
<template>
  <div class="shadow border w-full overflow-hidden mb-5 cursor-pointer h-[200px] relative"
    @click="navigateTo(`/car/${car.id}`)">
    <!-- Favorite Heart Icon -->
    <button @click="toggleFavorite"
      class="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-200 shadow-md group"
      :class="{ 'bg-red-50/90 hover:bg-red-50': isFavorite }">
      <!-- Filled Heart (when favorite) -->
      <svg v-if="isFavorite"
        class="w-5 h-5 text-red-500 transform group-hover:scale-110 transition-transform duration-200"
        fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>

      <!-- Outline Heart (when not favorite) -->
      <svg v-else
        class="w-5 h-5 text-gray-600 group-hover:text-red-500 transform group-hover:scale-110 transition-all duration-200"
        fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>

    <div class="flex h-full">
      <img :src="`https://jmkskegtuhgpubyncnca.supabase.co/storage/v1/object/public/${car.image}`" :alt="name"
        class="w-[300px] h-full object-cover" />
      <div class="p-4 flex flex-col">
        <div>
          <h1 class="text-2xl text-blue-700">{{ name }}</h1>
          <p class="text-gray-700" :title="car.description">
            {{ car.description.length > 300 ? car.description.substring(0, 300) + '...' : car.description }}
          </p>
        </div>
        <h1 class="mt-auto text-xl">{{ car.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
        </h1>
      </div>
    </div>
  </div>
</template>