<script setup lang="ts">
const city = ref('');
const goToCar = () => {
  if (city.value) {
    navigateTo(`/city/${city.value}/cars`);
  }
};
</script>
<template>
  <div
    class="font-serif w-full text-2xl rounded-full bg-white flex justify-between overflow-hidden drop-shadow-2xl mx-auto">
    <input type="text" class="py-3 px-5 w-full text-2xl rounded-full focus:outline-none" placeholder="Search by city..."
      v-model="city" @keypress.enter="goToCar" />
    <button class="bg-sky-500 px-10 text-white" @click="goToCar">Search</button>
  </div>
</template>