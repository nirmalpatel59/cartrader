<script lang="ts" setup>
const props = defineProps({
  id: {
    type: String,
    default: false
  }
});
const enquiryData = ref({
  email: '',
  name: '',
  phone: '',
  offerPrice: 0,
  message: ''
});

// Validation errors
const errors = ref({
  name: '',
  email: '',
  phone: '',
  offerPrice: '',
  message: ''
});

// Loading state
const isSubmitting = ref(false);

// Validation functions
const validateName = () => {
  const name = enquiryData.value.name.trim();
  if (!name) {
    errors.value.name = 'Name is required';
    return false;
  }
  if (name.length < 2) {
    errors.value.name = 'Name must be at least 2 characters long';
    return false;
  }
  if (name.length > 50) {
    errors.value.name = 'Name must be less than 50 characters';
    return false;
  }
  if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    errors.value.name = 'Name can only contain letters, spaces, hyphens, and apostrophes';
    return false;
  }
  errors.value.name = '';
  return true;
};

const validateEmail = () => {
  const email = enquiryData.value.email.trim();
  if (!email) {
    errors.value.email = 'Email is required';
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.value.email = 'Please enter a valid email address';
    return false;
  }
  if (email.length > 254) {
    errors.value.email = 'Email address is too long';
    return false;
  }
  errors.value.email = '';
  return true;
};

const validatePhone = () => {
  const phone = enquiryData.value.phone.trim();
  if (!phone) {
    errors.value.phone = 'Contact number is required';
    return false;
  }
  // Remove all non-digit characters for validation
  const cleanedNumber = phone.replace(/\D/g, '');
  if (cleanedNumber.length < 10) {
    errors.value.phone = 'Contact number must be at least 10 digits';
    return false;
  }
  if (cleanedNumber.length > 15) {
    errors.value.phone = 'Contact number must be less than 15 digits';
    return false;
  }
  errors.value.phone = '';
  return true;
};

const validateOfferPrice = () => {
  const offerPrice = enquiryData.value.offerPrice;
  if (!offerPrice || offerPrice <= 0) {
    errors.value.offerPrice = 'Please enter a valid offer price';
    return false;
  }
  if (offerPrice < 100) {
    errors.value.offerPrice = 'Offer price must be at least $100';
    return false;
  }
  if (offerPrice > 10000000) {
    errors.value.offerPrice = 'Offer price cannot exceed $10,000,000';
    return false;
  }
  errors.value.offerPrice = '';
  return true;
};

const validateMessage = () => {
  const message = enquiryData.value.message.trim();
  if (!message) {
    errors.value.message = 'Message is required';
    return false;
  }
  if (message.length < 10) {
    errors.value.message = 'Message must be at least 10 characters long';
    return false;
  }
  if (message.length > 1000) {
    errors.value.message = 'Message must be less than 1000 characters';
    return false;
  }
  errors.value.message = '';
  return true;
};

// Validate all fields
const validateForm = () => {
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isContactValid = validatePhone();
  const isOfferPriceValid = validateOfferPrice();
  const isMessageValid = validateMessage();

  return isNameValid && isEmailValid && isContactValid && isOfferPriceValid && isMessageValid;
};

// Handle form submission
const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;

  try {
    // TODO: Add API call to submit enquiry
    console.log('Submitting enquiry:', enquiryData.value);

    // Simulate API call
    await createCarSaleInquiry(enquiryData.value);

    // Reset form on success
    enquiryData.value = {
      email: '',
      name: '',
      phone: '',
      offerPrice: 0,
      message: ''
    };

    // Clear errors
    Object.keys(errors.value).forEach(key => {
      errors.value[key as keyof typeof errors.value] = '';
    });

    // alert('Your enquiry has been sent successfully!');

  } catch (error) {
    console.error('Error submitting enquiry:', error);
    // alert('Failed to send enquiry. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
};
const createCarSaleInquiry = async (enquiryRequest: any) => {
  const { data, error } = await api("/car/inquiry", {
    method: "POST",
    body: {
      ...enquiryRequest,
      id: props.id, // Assuming the car ID is passed as a prop
    },
  });

  if (error) {
    console.error("Error creating car listing:", error);
  } else {
    console.log("Car listing created successfully:", data);
    // Optionally redirect or show a success message
  }
};
// Real-time validation on blur
const handleBlur = (field: string) => {
  switch (field) {
    case 'name':
      validateName();
      break;
    case 'email':
      validateEmail();
      break;
    case 'phone':
      validatePhone();
      break;
    case 'offerPrice':
      validateOfferPrice();
      break;
    case 'message':
      validateMessage();
      break;
  }
};
</script>
<template>
  <div class="max-w-4xl">
    <!-- Contact Form Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <!-- Name Field -->
      <div>
        <input type="text" v-model="enquiryData.name" @blur="handleBlur('name')" :class="{
          'border-red-500 focus:ring-red-500': errors.name,
          'border-gray-300 focus:ring-blue-500': !errors.name
        }" class="w-full border rounded-md p-3 focus:ring-2 focus:border-transparent transition-colors"
          placeholder="Your Name*" />
        <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
      </div>

      <!-- Email Field -->
      <div>
        <input type="email" v-model="enquiryData.email" @blur="handleBlur('email')" :class="{
          'border-red-500 focus:ring-red-500': errors.email,
          'border-gray-300 focus:ring-blue-500': !errors.email
        }" class="w-full border rounded-md p-3 focus:ring-2 focus:border-transparent transition-colors"
          placeholder="Your Email*" />
        <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
      </div>

      <!-- Contact Number Field -->
      <div>
        <input type="tel" v-model="enquiryData.phone" @blur="handleBlur('phone')" :class="{
          'border-red-500 focus:ring-red-500': errors.phone,
          'border-gray-300 focus:ring-blue-500': !errors.phone
        }" class="w-full border rounded-md p-3 focus:ring-2 focus:border-transparent transition-colors"
          placeholder="Contact Number*" />
        <p v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</p>
      </div>

      <!-- Offer Price Field -->
      <div>
        <input type="number" v-model.number="enquiryData.offerPrice" @blur="handleBlur('offerPrice')" :class="{
          'border-red-500 focus:ring-red-500': errors.offerPrice,
          'border-gray-300 focus:ring-blue-500': !errors.offerPrice
        }" class="w-full border rounded-md p-3 focus:ring-2 focus:border-transparent transition-colors"
          placeholder="Offer Price*" min="0" step="100" />
        <p v-if="errors.offerPrice" class="text-red-500 text-xs mt-1">{{ errors.offerPrice }}</p>
      </div>
    </div>

    <!-- Message Textarea -->
    <div class="mb-6">
      <textarea v-model="enquiryData.message" @blur="handleBlur('message')" :class="{
        'border-red-500 focus:ring-red-500': errors.message,
        'border-gray-300 focus:ring-blue-500': !errors.message
      }"
        class="w-full border rounded-md p-3 h-32 resize-vertical focus:ring-2 focus:border-transparent transition-colors"
        placeholder="Write your message here... (minimum 10 characters)*" maxlength="1000"></textarea>
      <div class="flex justify-between mt-1">
        <p v-if="errors.message" class="text-red-500 text-xs">{{ errors.message }}</p>
        <p class="text-gray-500 text-xs ml-auto">{{ enquiryData.message.length }}/1000</p>
      </div>
    </div>

    <!-- Required Fields Notice -->
    <p class="text-gray-600 text-sm mb-4">* Required fields</p>

    <!-- Submit Button -->
    <button @click="handleSubmit" :disabled="isSubmitting" :class="{
      'bg-gray-400 cursor-not-allowed': isSubmitting,
      'bg-blue-500 hover:bg-blue-600': !isSubmitting
    }" class="text-white font-semibold px-8 py-3 rounded-md transition-colors duration-200 flex items-center gap-2">
      <div v-if="isSubmitting" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin">
      </div>
      <span>{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
    </button>
  </div>
</template>