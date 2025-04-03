<script setup lang="ts">
interface IProps {
  car: {
    id: number;
    name: string;
    price: string;
    url: string;
    seats: number;
    miles: string;
    features: string[];
    description: string;
  }
}
defineProps<IProps>()
</script>
<template>
  <div class="mr-10 mt-5 border-b pb-5">
    <div v-for="(feature, index) in car.features" :key="index" class="flex text-lg mt-2">
      <p class="rounded text-lime-800 mr-3">✔</p>
      <p>{{ feature }}</p>
    </div>
  </div>
</template>