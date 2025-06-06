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
const props = defineProps<IProps>()
const carName = computed(() => {
  return `${props.car.make} ${props.car.model} ${props.car.year}`;
});
const SUPABASE_URL = useRuntimeConfig().public.supabaseUrl
const SUPABASE_IMAGES_LOCATION = useRuntimeConfig().public.supabaseImagesLocation

</script>
<template>
  <div>
    <div class="mt-10">
      <NuxtImg :src="`${SUPABASE_URL}/${SUPABASE_IMAGES_LOCATION}/${car.image}`" class="w-1/2 mx-auto block h-1/2"
        alt="" />
      <h1 class="mt-10 text-4xl">{{ carName }}</h1>
      <div class="text-slate-500 flex text-lg mt-3 border-b pb-5 justify-between">
        <div class="flex">
          <p class="mr-2"> {{ car.seats }} seats</p>
          <p class="mr-2">|</p>
          <p class="mr-2">{{ car.miles }} miles</p>
        </div>
        <div>
          <p class="font-bold text-2xl">{{ car.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>