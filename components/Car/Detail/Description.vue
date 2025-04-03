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
  <div class="mt-5">
    <p class="mb-10">
      {{ car.description }}
    </p>
  </div>
</template>