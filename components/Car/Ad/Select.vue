<script setup>
const props = defineProps({
  title: String,
  name: String,
  options: Array,
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
  } else {
    error.value = "";
  }
};
</script>

<template>
  <div class="flex flex-col w-[48%] mt-2">
    <label for="" class="text-cyan-500 mb-1 text-sm">{{ title }}</label>
    <select name="" id="" class="p-2 border w-100 rounded" :class="{ 'border-red-500': error }" @change="onChange"
      v-model="state" @blur="validate">
      <option value="">Select an option</option>
      <option v-for="option in options" :key="option.id" :value="option">
        {{ option }}
      </option>
    </select>
    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
  </div>
</template>