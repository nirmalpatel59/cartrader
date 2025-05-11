<script setup lang="ts">
interface IProps {
  car: {
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
}
const props = defineProps<IProps>()
const name = computed(() => {
  return props.car.make + " " + props.car.model + " " + props.car.year;
});
</script>
<template>
  <div class="shadow border w-full overflow-hidden mb-5 cursor-pointer h-[200px]" @click="navigateTo(`/car/${car.id}`)">
    <div class="flex h-full">
      <img :src="`https://jmkskegtuhgpubyncnca.supabase.co/storage/v1/object/public/${car.image}`" :alt="name"
        class="w-[300px] h-full" />
      <div class="p-4 flex flex-col">
        <div>
          <h1 class="text-2xl text-blue-700">{{ name }}</h1>
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