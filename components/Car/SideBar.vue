<script lang="ts" setup>
import makes from '~/data/makes.json';
const modal = ref({
  location: false,
  make: false,
  price: false
});
const route = useRoute();
const city = ref(route.params.city as string || '');
const selectedMake = ref(route.query.make as string || '');
const selectedMinPrice = ref(route.query.minPrice as string || '');
const selectedMaxPrice = ref(route.query.maxPrice as string || '');
const makeSearchQuery = ref('');

const updateModal = (type: 'location' | 'make' | 'price') => {
  modal.value[type] = !modal.value[type];
};
const resetModal = (type: 'location' | 'make' | 'price') => {
  if (type === 'make') {
    selectedMake.value = '';
    makeSearchQuery.value = '';
    // Remove make from query params 
    const newQuery = { ...route.query };
    delete newQuery.make;
    const queryParams = Object.fromEntries(
      Object.entries(newQuery).map(([key, value]) => [key, String(value)])
    );
    navigateTo(`/city/${city.value}/cars${Object.keys(queryParams).length ? '?' + new URLSearchParams(queryParams).toString() : ''}`);
  } else if (type === 'location') {
    city.value = '';
    // Reset to base path without city
    navigateTo('/');
  } else if (type === 'price') {
    // Remove price params from query
    const newQuery = { ...route.query };
    delete newQuery.minPrice;
    delete newQuery.maxPrice;
    const queryParams = Object.fromEntries(
      Object.entries(newQuery).map(([key, value]) => [key, String(value)])
    );
    navigateTo(`/city/${city.value}/cars${Object.keys(queryParams).length ? '?' + new URLSearchParams(queryParams).toString() : ''}`);
    delete newQuery.minPrice;
    delete newQuery.maxPrice;
    const convertedQuery = Object.fromEntries(
      Object.entries(newQuery).map(([key, value]) => [key, String(value)])
    );
    navigateTo(`/city/${city.value}/cars${Object.keys(convertedQuery).length ? '?' + new URLSearchParams(convertedQuery).toString() : ''}`);
  }
};

const filteredMakes = computed(() => {
  if (!makeSearchQuery.value) return makes;
  return makes.filter(make =>
    make.toLowerCase().includes(makeSearchQuery.value.toLowerCase())
  );
});
const selectedPrice = computed(() => {
  if (!selectedMinPrice.value && !selectedMaxPrice.value) return 'Set Price';
  if (selectedMinPrice.value && selectedMaxPrice.value) return `${(+selectedMinPrice.value).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} - ${(+selectedMaxPrice.value).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;
  if (selectedMinPrice.value) return `Min: ${(+selectedMinPrice.value).toLocaleString()}`;
  if (selectedMaxPrice.value) return `Max: ${(+selectedMaxPrice.value).toLocaleString()}`;
});
const updateRoute = () => {
  if (!city.value) return;
  if (!isNaN(parseInt(city.value))) {
    throw createError({
      statusCode: 410,
      statusMessage: 'City should be a string',
    });
  }
  const routeQuery = Object.fromEntries(
    Object.entries(route.query).map(([key, value]) => [key, String(value)])
  );
  updateModal('location');
  navigateTo(`/city/${city.value}/cars?${new URLSearchParams(routeQuery).toString()}`)
}
const applyMakeFilter = (make: string) => {
  selectedMake.value = make;
  if (!selectedMake.value) return;
  updateModal('make');
  const routeQuery = {
    ...route.query,
    make: selectedMake.value,
  };

  navigateTo(`/city/${city.value}/cars?${new URLSearchParams(routeQuery).toString()}`);
};
const applyPriceFilter = () => {
  if (!selectedMinPrice.value || !selectedMaxPrice.value) return;
  updateModal('price');
  const routeQuery = {
    ...route.query,
    minPrice: selectedMinPrice.value,
    maxPrice: selectedMaxPrice.value,
  };
  navigateTo(`/city/${city.value}/cars?${new URLSearchParams(routeQuery).toString()}`);
  // navigateTo(`/city/${city.value}/cars/?minPrice=${selectedMinPrice.value}&maxPrice=${selectedMaxPrice.value}`);
};
</script>
<template>
  <div class="shadow border w-1/4 mr-10 z-30 h-[190px]">
    <div class="p-2 flex justify-between relative cursor-pointer border-b">
      <h3>Location</h3>
      <a v-if="route.params.city" class="text-red-400 text-sm underline" @click.prevent="resetModal('location')"
        title="Reset location">
        reset
      </a>
      <h3 class="text-blue-400 capitalize" @click="updateModal('location')">{{ route.params.city }}</h3>
      <div v-if="modal.location" class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white z-40">
        <input type="text" class="border p-1 rounded" v-model="city" />
        <div class="flex space-x-2 mt-2">
          <button class="bg-blue-400 rounded text-white p-2 flex-1 flex items-center justify-center"
            @click="updateRoute" title="Apply">
            Apply
          </button>
          <button class="bg-gray-400 rounded text-white p-2 flex-1 flex items-center justify-center"
            @click="updateModal('location')" title="Close">
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Make Filter -->
    <div class="p-2 flex justify-between relative cursor-pointer border-b">
      <h3>Make</h3>
      <a v-if="selectedMake" class="text-red-400 text-sm underline" @click.prevent="resetModal('make')"
        title="Reset make">
        reset
      </a>
      <h3 class="text-blue-400 capitalize" @click="updateModal('make')">{{ selectedMake || 'Select Make' }}</h3>
      <div v-if="modal.make"
        class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white w-[600px] grid grid-cols-3 gap-4 z-40">
        <div class="col-span-3 flex items-center gap-2">
          <input type="text" class="border p-1 rounded mb-2 flex-1" placeholder="Search Make"
            v-model="makeSearchQuery" />
          <button class="bg-gray-400 rounded text-white p-1 mb-2 flex items-center justify-center px-3"
            @click="updateModal('make')" title="Close">
            &times;
          </button>
          <button class="bg-red-400 rounded text-white p-1 mb-2 flex items-center justify-center px-3"
            @click="resetModal('make')" title="Close">
            &reg;
          </button>
        </div>
        <ul class="col-span-3 grid grid-cols-3 gap-4">
          <li v-for="make in filteredMakes" :key="make"
            class="cursor-pointer hover:bg-gray-200 p-1 text-center border rounded"
            @click="() => applyMakeFilter(make)">
            {{ make }}
          </li>
        </ul>
        <!-- <button class="bg-blue-400 w-full mt-2 rounded text-white p-1 col-span-3" @click="applyMakeFilter">
          Apply
        </button> -->
      </div>
    </div>
    <!-- Price Filter -->
    <div class="p-2 flex justify-between relative cursor-pointer border-b">
      <h3 class="mr-2">Price</h3>
      <a v-if="selectedMinPrice || selectedMaxPrice" class="text-red-400 text-sm underline mr-2"
        @click.prevent="resetModal('price')" title="Reset price">
        reset
      </a>
      <h3 class="text-blue-400 capitalize" @click="updateModal('price')">{{ selectedPrice }}</h3>
      <div v-if="modal.price" class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white w-[300px]">
        <input type="number" class="border p-1 rounded w-full mb-2" placeholder="Min Price"
          v-model="selectedMinPrice" />
        <input type="number" class="border p-1 rounded w-full mb-2" placeholder="Max Price"
          v-model="selectedMaxPrice" />
        <div class="flex space-x-2 mt-2">
          <button class="bg-blue-400 rounded text-white p-2 flex-1 flex items-center justify-center"
            @click="applyPriceFilter" title="Apply">
            Apply
          </button>
          <button class="bg-gray-400 rounded text-white p-2 flex-1 flex items-center justify-center"
            @click="updateModal('price')" title="Close">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>