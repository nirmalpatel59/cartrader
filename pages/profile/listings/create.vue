<script setup>

definePageMeta({
  layout: "custom",
  middleware: ["auth"]
});

const { makes } = useCars();

const info = useState("adInfo", () => {
  return {
    make: "",
    model: "",
    year: "",
    miles: "",
    price: "",
    city: "",
    seats: "",
    features: "",
    description: "",
    image: null,
  };
});

const formErrors = ref({});
const formValid = ref(false);

const onChangeInput = (data, name, isValid) => {
  info.value[name] = data;

  if (isValid === false) {
    formErrors.value[name] = true;
  } else {
    formErrors.value[name] = false;
  }

  validateForm();
};

const validateForm = () => {
  // Check if all required fields are filled
  formValid.value = !Object.values(formErrors.value).some(error => error) &&
    info.value.make &&
    info.value.model &&
    info.value.year &&
    info.value.miles &&
    info.value.price &&
    info.value.city &&
    info.value.seats &&
    info.value.features &&
    info.value.description &&
    info.value.image;
};

const handleSubmit = async () => {
  validateForm();
  if (formValid.value) {
    const imageDetails = await saveCarImage(info.value.image);
    if (!imageDetails) {
      console.error("Image upload failed");
      return;
    }
    createCarListing(imageDetails.fullPath);
    // Form is valid, continue with submission
    navigateTo('/profile/listings');
  } else {
    // Trigger validation on all components
    document.querySelectorAll('input, select, textarea').forEach(el => {
      el.dispatchEvent(new Event('blur'));
    });
  }
};

const createCarListing = async (imagePath) => {
  const { data, error } = await api("/car/create", {
    method: "POST",
    body: {
      ...info.value,
      image: imagePath,
    },
  });

  if (error) {
    console.error("Error creating car listing:", error);
  } else {
    console.log("Car listing created successfully:", data);
    // Optionally redirect or show a success message
    navigateTo('/profile/listings');
  }
};

const saveCarImage = async () => {
  const supabase = useSupabaseClient();
  const imageName = Date.now();
  const { data, error } = await supabase
    .storage
    .from("images")
    .upload(`${imageName}`, info.value.image, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }
  console.log("Image uploaded successfully:", data);
  return data;
}
const inputs = [
  {
    id: 1,
    title: "Model *",
    name: "model",
    placeholder: "Civic",
  },
  {
    id: 2,
    title: "Year *",
    name: "year",
    placeholder: "2019",
    type: "number",
  },
  {
    id: 3,
    title: "Miles *",
    name: "miles",
    placeholder: "10000",
    type: "number",
  },
  {
    id: 4,
    title: "City *",
    name: "city",
    placeholder: "Austin",
  },
  {
    id: 5,
    title: "Number of Seats *",
    name: "seats",
    placeholder: "5",
    type: "number",
  },
  {
    id: 6,
    title: "Features *",
    name: "features",
    placeholder: "Leather Interior, No Accidents",
  },
  {
    id: 7,
    title: "Price *",
    name: "price",
    placeholder: "10000",
    type: "number",
  },
];
</script>

<template>
  <div>
    <div class="mt-24">
      <h1 class="text-6xl">Create a New Listing</h1>
    </div>
    <div class="shadow rounded p-3 mt-5 flex flex-wrap justify-between">
      <CarAdSelect title="Make *" :options="makes" name="make" :required="true" @change-input="onChangeInput" />
      <CarAdInput v-for="input in inputs" :key="input.id" :title="input.title" :name="input.name"
        :placeholder="input.placeholder" :type="input.type || 'text'" :required="true" @change-input="onChangeInput" />
      <CarAdTextarea title="Description *" name="description" placeholder="" :required="true"
        @change-input="onChangeInput" />
      <CarAdImage :required="true" @change-input="onChangeInput" />
    </div>
    <div class="flex justify-center mt-5">
      <button class="bg-blue-700 text-white px-4 py-2 rounded"
        :class="{ 'opacity-50': !formValid, 'hover:bg-blue-800': formValid }" @click="handleSubmit">
        Create
      </button>
    </div>
    <div v-if="!formValid" class="text-center mt-3 text-red-500">
      Please fill in all required fields correctly
    </div>
  </div>
</template>