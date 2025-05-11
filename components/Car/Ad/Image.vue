<script setup>
const props = defineProps({
  required: {
    type: Boolean,
    default: false
  }
});

const image = useState("carImage", () => {
  return {
    preview: null,
    image: null,
  };
});

const error = ref("");
const emits = defineEmits(["changeInput"]);

const validate = () => {
  if (props.required && !image.value.image) {
    error.value = "Image is required";
    return false;
  } else {
    error.value = "";
    return true;
  }
};

const onImageUpload = (event) => {
  const input = event.target;
  if (input.files) {
    const reader = new FileReader();
    reader.onload = (e) => {
      image.value.preview = e.target.result;
    };
    image.value.image = input.files[0];
    reader.readAsDataURL(input.files[0]);
    error.value = "";
    emits("changeInput", input.files[0], "image", true);
  }
};
</script>

<template>
  <div class="col-md-5 offset-md-1 mt-2 w-[100%]">
    <label for="" class="text-cyan-500 mb-1 text-sm">Image*</label>
    <form class="mt-2">
      <div class="form-group">
        <div class="relative">
          <input type="file" accept="image/*" class="opacity-0 absolute cursor-pointer" @change="onImageUpload" />
          <span class="cursor-pointer">Browser File</span>
        </div>
        <div class="border p-2 mt-3 w-56" v-if="image.preview">
          <img :src="image.preview" class="img-fluid" />
        </div>
        <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
      </div>
    </form>
  </div>
</template>