<script setup lang="ts">
const route = useRoute();
const { cars } = useCars();
const car = cars.find((car) => car.id === +route.params.id)
definePageMeta({
  layout: 'custom'
})
if (!car) {
  throw createError({
    statusCode: 424,
    message: `Car with id ${route.params.id} not found`
  })
}
</script>
<template>
  <div>
    <CarDetailHero :car="car" />
    <CarDetailAttribute :car="car" />
    <CarDetailDescription :car="car" />
    <CarDetailContact />
  </div>
  <!-- <div v-else>
    <NuxtError />
  </div> -->
</template>