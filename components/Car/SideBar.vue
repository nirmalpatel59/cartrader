<script lang="ts" setup>
import makes from '~/data/makes.json';
const modal = ref({
  location: false,
  make: false,
  price: false
});
const updateModal = (type: 'location' | 'make' | 'price') => {
  modal.value[type] = !modal.value[type];
};
const route = useRoute();
const city = ref(route.params.city as string || '');
const selectedMake = ref(route.params.selectedMake as string || '');
const selectedMinPrice = ref(route.query.minPrice as string || '');
const selectedMaxPrice = ref(route.query.maxPrice as string || '');
const selectedPrice = computed(() => {
  if (!selectedMinPrice.value && !selectedMaxPrice.value) return 'Set Price';
  if (selectedMinPrice.value && selectedMaxPrice.value) return `${selectedMinPrice.value} - ${selectedMaxPrice.value}`;
  if (selectedMinPrice.value) return `Min: ${selectedMinPrice.value}`;
  if (selectedMaxPrice.value) return `Max: ${selectedMaxPrice.value}`;
});
const updateRoute = () => {
  if (!city.value) return;
  if (!isNaN(parseInt(city.value))) {
    throw createError({
      statusCode: 410,
      statusMessage: 'City should be a string',
    });
  }
  updateModal('location');
  navigateTo(`/city/${city.value}/car`);
}
const applyMakeFilter = (make: string) => {
  selectedMake.value = make;
  if (!selectedMake.value) return;
  updateModal('make');
  navigateTo(`/city/${city.value}/car/${selectedMake.value}`);
};
const applyPriceFilter = () => {
  if (!selectedMinPrice.value || !selectedMaxPrice.value) return;
  updateModal('price');
  navigateTo(`/city/${city.value}/car/${selectedMake.value}?minPrice=${selectedMinPrice.value}&maxPrice=${selectedMaxPrice.value}`);
};
</script>
<template>
  <div class="shadow border w-64 mr-10 z-30 h-[190px]">
    <div class="p-2 flex justify-between relative cursor-pointer border-b">
      <h3>Location</h3>
      <h3 class="text-blue-400 capitalize" @click="updateModal('location')">{{ route.params.city }}</h3>
      <div v-if="modal.location" class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white">
        <input type="text" class="border p-1 rounded" v-model="city" />
        <button class="bg-blue-400 w-full mt-2 rounded text-white p-1" @click="updateRoute">
          Apply
        </button>
      </div>
    </div>

    <!-- Make Filter -->
    <div class="p-2 flex justify-between relative cursor-pointer border-b">
      <h3>Make</h3>
      <h3 class="text-blue-400 capitalize" @click="updateModal('make')">{{ selectedMake || 'Select Make' }}</h3>
      <div v-if="modal.make"
        class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white w-[600px] grid grid-cols-3 gap-4">
        <ul class="col-span-3 grid grid-cols-3 gap-4">
          <li v-for="make in makes" :key="make" class="cursor-pointer hover:bg-gray-200 p-1 text-center border rounded"
            @click="() => applyMakeFilter(make)">
            {{ make }}
          </li>
        </ul>
        <!-- <button class="bg-blue-400 w-full mt-2 rounded text-white p-1 col-span-3" @click="applyMakeFilter">
          Apply
        </button> -->
      </div>
    </div>

    <div class="p-2 flex justify-between relative cursor-pointer border-b">
      <h3>Price</h3>
      <h3 class="text-blue-400 capitalize" @click="updateModal('price')">{{ selectedPrice }}</h3>
      <div v-if="modal.price" class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white w-[300px]">
        <input type="number" class="border p-1 rounded w-full mb-2" placeholder="Min Price"
          v-model="selectedMinPrice" />
        <input type="number" class="border p-1 rounded w-full mb-2" placeholder="Max Price"
          v-model="selectedMaxPrice" />
        <button class="bg-blue-400 w-full mt-2 rounded text-white p-1" @click="applyPriceFilter">
          Apply
        </button>
      </div>
    </div>
  </div>
</template>