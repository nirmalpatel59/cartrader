<script setup>
const props = defineProps({
  title: String,
  name: String,
  placeholder: String,
  type: {
    type: String,
    default: "text"
  },
  required: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(["changeInput"]);
const state = ref("");
const error = ref("");

const onChange = () => {
  validate();
  emits("changeInput", state.value, props.name, !error.value);
};

const validate = () => {
  if (props.required && !state.value) {
    error.value = "This field is required";
    return;
  }

  if (props.type === "number" && state.value) {
    if (!/^\d+$/.test(state.value)) {
      error.value = "Must be a valid number";
      return;
    }

    // Specific validations
    if (props.name === "year") {
      const yearNum = parseInt(state.value);
      if (yearNum < 1900 || yearNum > new Date().getFullYear() + 1) {
        error.value = "Please enter a valid year";
        return;
      }
    }

    if (props.name === "miles" || props.name === "price") {
      const value = parseInt(state.value);
      if (value < 0) {
        error.value = "Value cannot be negative";
        return;
      }
    }

    if (props.name === "seats") {
      const seats = parseInt(state.value);
      if (seats <= 0 || seats > 10) {
        error.value = "Please enter a valid number of seats (1-10)";
        return;
      }
    }
  }

  error.value = "";
};
</script>

<template>
  <div class="flex flex-col w-[48%] mt-2">
    <label for="" class="text-cyan-500 mb-1 text-sm">{{ title }}</label>
    <input :type="type ? type : 'text'" class="p-2 border w-100 rounded"
      :class="{ 'border-red-500': error }" :placeholder="placeholder" v-model="state" :name="name" @input="onChange"
      @blur="validate" />
    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
  </div>
</template>