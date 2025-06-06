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
  <div v-if="car">
    <CarDetailHero :car="car" />
    <CarDetailAttribute :car="car" />
    <CarDetailDescription :car="car" />
    <CarDetailContact />
  </div>
  <div v-else>
    <p>Loading car details...</p>
  </div>
</template>