<script setup lang="ts">
interface IProps {
  car: {
    id: number;
    name: string;
    price: number;
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
  <div class="shadow border w-full overflow-hidden mb-5 cursor-pointer h-[200px]" @click="navigateTo(`/car/${car.id}`)">
    <div class="flex h-full">
      <img :src="car.url" alt="" class="w-[300px] h-full" />
      <div class="p-4 flex flex-col">
        <div>
          <h1 class="text-2xl text-blue-700">{{ car.name }}</h1>
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