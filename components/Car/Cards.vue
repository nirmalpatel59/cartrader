<script setup lang="ts">
// In your component/page
const route = useRoute();

interface Car {
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
const getCars = async () => {
  const city = route.params.city as string;
  const { make, minPrice, maxPrice } = route.query;
  const { data: cars } = await useApi<Car[]>(`/cars/${city}`, {
    query: {
      make: make ? String(make) : '',
      minPrice: minPrice ? String(minPrice) : '',
      maxPrice: maxPrice ? String(maxPrice) : '',
    }
  });
  return cars;
};
const carsData = await getCars() || [];
const cars = ref<Car[] | null>(carsData as any);
// This will only run on the client side
const getCarsClient = async () => {
  const city = route.params.city as string;
  // const make = route.params.make as string;
  const { make, minPrice, maxPrice } = route.query;
  const query: Record<string, string> = {};
  if (make) query.make = String(make);
  if (minPrice) query.minPrice = String(minPrice);
  if (maxPrice) query.maxPrice = String(maxPrice);

  const { data: cars } = await api<Car[]>(`/cars/${city}`, {
    query
  });
  return cars;
};
onMounted(() => {
  watch(
    () => route.query,
    async (newQuery, oldQuery) => {
      cars.value = await getCarsClient() || null
      // window.location.reload();
    }
  );
});

</script>
<template>
  <div class="w-3/4">
    <div class="w-full" v-if="cars && cars.length">
      <CarCard v-for="car in cars" :key="car.id" :car="car" />
    </div>
    <div v-else class="red"> No car found for selected filter.</div>
  </div>
</template>