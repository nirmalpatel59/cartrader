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
  <div class="space-y-2">
    <div v-for="(feature, index) in features" :key="index" class="flex items-center text-sm">
      <span class="text-green-600 mr-3 text-lg">✓</span>
      <span class="text-gray-700">{{ feature }}</span>
    </div>
  </div>
</template>