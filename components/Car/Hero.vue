<script setup lang="ts">
const error = useError();
// console.log(error.value?.statusCode);
// console.log(error.value?.message);
</script>
<template>
  <div
    class="relative h-screen w-100 bg-no-repeat bg-cover bg-bottom bg-[url('https://carconfigurator.ferrari.com/assets/cars/portofinom/packages/default/car-ferrari-portofino-m_splash.jpg')]">
    <div class="z-10 absolute w-full h-full flex justify-center items-center">
      <div class="text-center w-1/2">
        <h1 class="text-8xl font-serif mb-10 text-white">Find your drive {{ error?.message }}</h1>
        <!-- HOME SEARCH BAR -->
        <CarSearch />
        <!-- HOME SEARCH BAR -->
      </div>
    </div>
    <div class="z-1 absolute w-full h-full bg-black opacity-50"></div>
  </div>
</template>