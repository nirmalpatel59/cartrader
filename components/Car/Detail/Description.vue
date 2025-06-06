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
defineProps<IProps>()
</script>
<template>
  <div>
    <p class="text-gray-700 leading-relaxed">
      {{ car.description }}
    </p>
  </div>
</template>