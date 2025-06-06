<script setup lang="ts">
interface IProps {
  car: {
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
}
const props = defineProps<IProps>();
const features = computed(() => {
  return props.car.features.split(",").map(feature => feature.trim());
});
</script>
<template>
  <div class="mr-10 mt-5 border-b pb-5">
    <div v-for="(feature, index) in features" :key="index" class="flex text-lg mt-2">
      <p class="rounded text-lime-800 mr-3">✔</p>
      <p>{{ feature }}</p>
    </div>
  </div>
</template>