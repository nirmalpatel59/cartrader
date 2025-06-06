<script setup lang="ts">
const route = useRoute();
// const { cars } = useCars();
// const car = cars.find((car) => car.id === +route.params.id)
definePageMeta({
  layout: 'custom'
})
interface ICarDetails {
  id: number;
  make: string;
  model: string;
  city: string;
  year: number;
  price: string;
  image: string;
  seats: number;
  miles: string;
  features: string;
  description: string;
  userId: string;
}
const { data: car } = await useApi<ICarDetails>(`/car/${route.params.id}`);
console.log('car:', car);
if (!car.value) {
  throw createError({
    statusCode: 424,
    message: `Car with id ${route.params.id} not found`
  })
}
</script>
<template>
  <div v-if="car" class="max-w-7xl mx-auto px-4 py-8">
    <!-- Car Image and Details Side by Side -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Left Column - Car Image -->
      <div class="flex justify-center">
        <CarDetailHero :car="car" />
      </div>

      <!-- Right Column - Car Details -->
      <div class="space-y-6">
        <!-- Car Name and Price -->
        <div class="border-b pb-4">
          <h1 class="text-3xl font-bold mb-2">{{ car.make }} {{ car.model }} {{ car.year }}</h1>
          <div class="flex items-center justify-between">
            <div class="flex items-center text-slate-600 space-x-4">
              <span>{{ car.seats }} seats</span>
              <span>|</span>
              <span>{{ car.miles }} miles</span>
            </div>
            <p class="text-2xl font-bold text-green-600">{{ car.price }}</p>
          </div>
        </div>

        <!-- Description -->
        <div>
          <h3 class="text-xl font-semibold mb-3">Description</h3>
          <CarDetailDescription :car="car" />
        </div>

        <!-- Features -->
        <div>
          <h3 class="text-xl font-semibold mb-3">Features</h3>
          <CarDetailAttribute :car="car" />
        </div>
      </div>
    </div>

    <!-- Contact Form Below -->
    <div class="border-t pt-8">
      <h2 class="text-2xl font-bold mb-6">Contact Seller</h2>
      <CarDetailContact />
    </div>
  </div>
  <div v-else>
    <p>Loading car details...</p>
  </div>
</template>