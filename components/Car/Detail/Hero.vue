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
  <div class="w-full">
    <NuxtImg :src="`${SUPABASE_URL}/${SUPABASE_IMAGES_LOCATION}/${car.image}`"
      class="w-full h-auto rounded-lg shadow-lg object-cover" alt="Car image" />
  </div>
</template>