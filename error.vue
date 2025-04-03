<script lang="ts" setup>
const error = useError();
const clearError = ({ redirect }: { redirect: string }) => {
  // error.value = null;
  navigateTo(redirect);
};
</script>
<template>
  <div class="d-flex w-full justify-content items-center mx-auto ">
    <div class="error">{{ error?.statusCode }}</div>
    <div class="error">{{ error?.message }}</div>
    <button @click="clearError({ redirect: '/' })">Go Back</button>
  </div>
</template>