<script setup lang="ts">
interface IInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  price: number;
  message: string;
  createdAt: string;
  updatedAt: string;
}

const props = defineProps<{
  carId: string;
}>();

// Reactive data
const inquiries = ref<any[]>([]);
const isLoading = ref(true);
const isLoadingMore = ref(false);
const hasMore = ref(true);
const currentPage = ref(1);

// Fetch inquiries on component mount

// onMounted(async () => {
// });

// Fetch inquiries from API
const fetchInquiries = async (page: number = 1) => {
  try {
    isLoading.value = true;
    // if (page === 1) {
    //   isLoading.value = true;
    // } else {
    //   isLoadingMore.value = true;
    // }

    // Use the new API endpoint
    const { data, error } = await useApi<any>(`/car/${props.carId}/inquiries`);

    // if (page === 1) {
    inquiries.value = data.value;
    isLoading.value = false;
    // } else {
    //   inquiries.value.push(...data.value);
    // }

    // Update pagination info
    // hasMore.value = response.pagination?.hasMore || false;

  } catch (error) {
    console.error('Error fetching inquiries:', error);
    // Fallback to empty state on error
    if (page === 1) {
      inquiries.value = [];
    }
    hasMore.value = false;
  } finally {
    isLoading.value = false;
    isLoadingMore.value = false;
  }
};
await fetchInquiries();
// Load more inquiries
const loadMore = async () => {
  currentPage.value++;
  await fetchInquiries(currentPage.value);
};

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Get status color classes
const getStatusColor = (status: string) => {
  switch (status) {
    case 'sent':
      return 'bg-yellow-100 text-yellow-800';
    case 'responded':
      return 'bg-green-100 text-green-800';
    case 'closed':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Get status text
const getStatusText = (status: string) => {
  switch (status) {
    case 'sent':
      return 'Pending Response';
    case 'responded':
      return 'Responded';
    case 'closed':
      return 'Closed';
    default:
      return 'Unknown';
  }
};

// Follow up on inquiry
const followUpInquiry = (inquiryId: string) => {
  // TODO: Implement follow-up functionality
  console.log('Following up on inquiry:', inquiryId);
  alert('Follow-up feature coming soon!');
};

// View inquiry details
const viewInquiryDetails = (inquiryId: string) => {
  // TODO: Implement view details functionality
  console.log('Viewing inquiry details:', inquiryId);
  alert('View details feature coming soon!');
};
</script>
<template>
  <div class="max-w-6xl">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <span class="ml-3 text-gray-600">Loading your inquiries...</span>
    </div>

    <!-- No Inquiries State -->
    <div v-else-if="inquiries && inquiries.length === 0" class="text-center py-8">
      <div class="bg-gray-50 rounded-lg p-8">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.471c-.885-.295-1.739-.653-2.556-1.09a5.018 5.018 0 01-1.051-.855A8.002 8.002 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
        </svg>
        <h3 class="text-xl font-medium text-gray-700 mb-2">No inquiries yet</h3>
        <p class="text-gray-500">You haven't sent any inquiries for this car yet. Use the contact form above to get in
          touch with the seller.</p>
      </div>
    </div>

    <!-- Inquiries List -->
    <div v-else class="space-y-6">
      <div v-for="inquiry in inquiries" :key="inquiry.id"
        class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
        <!-- Inquiry Header -->
        <div class="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-lg">
          <div class="flex justify-between items-start">
            <div>
              <h4 class="text-lg font-semibold text-gray-800">Inquiry #{{ inquiry.id }}</h4>
              <div class="flex items-center gap-4 mt-1 text-sm text-gray-600">
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ formatDate(inquiry.createdAt) }}
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  Offer: {{ formatCurrency(inquiry.price) }}
                </span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span :class="getStatusColor(inquiry.status)"
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium">
                {{ getStatusText(inquiry.status) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Inquiry Content -->
        <div class="p-6">
          <!-- Original Message -->
          <div class="mb-4">
            <h5 class="text-sm font-medium text-gray-700 mb-2">Your Message:</h5>
            <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <p class="text-gray-700">{{ inquiry.message }}</p>
            </div>
          </div>

          <!-- Contact Details -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
            <div class="flex items-center gap-2 text-gray-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{{ inquiry.name }}</span>
            </div>
            <div class="flex items-center gap-2 text-gray-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{{ inquiry.email }}</span>
            </div>
            <div class="flex items-center gap-2 text-gray-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{{ inquiry.phone }}</span>
            </div>
          </div>

          <!-- Seller Response -->
          <div v-if="inquiry.sellerResponse" class="mt-6">
            <h5 class="text-sm font-medium text-gray-700 mb-2">Seller's Response:</h5>
            <div class="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
              <div class="flex justify-between items-start mb-2">
                <p class="text-gray-700">{{ inquiry.sellerResponse.message }}</p>
              </div>
              <div class="text-xs text-gray-500 mt-2">
                Responded on {{ formatDate(inquiry.sellerResponse.createdAt) }}
              </div>
            </div>
          </div>

          <!-- No Response Yet -->
          <div v-else-if="inquiry.status === 'sent'" class="mt-6">
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-sm text-yellow-800 font-medium">Waiting for seller's response</p>
              </div>
              <p class="text-xs text-yellow-700 mt-1">The seller will be notified about your inquiry and will respond
                soon.</p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="bg-gray-50 px-6 py-3 border-t border-gray-200 rounded-b-lg">
          <div class="flex justify-between items-center">
            <div class="text-xs text-gray-500">
              Last updated: {{ formatDate(inquiry.updatedAt) }}
            </div>
            <div class="flex gap-2">
              <button v-if="inquiry.status === 'sent'" @click="followUpInquiry(inquiry.id)"
                class="text-xs text-blue-600 hover:text-blue-800 font-medium px-3 py-1 border border-blue-200 rounded hover:bg-blue-50 transition-colors">
                Send Follow-up
              </button>
              <button @click="viewInquiryDetails(inquiry.id)"
                class="text-xs text-gray-600 hover:text-gray-800 font-medium px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Load More Button -->
    <!-- <div v-if="hasMore && inquiries.length > 0" class="text-center mt-6">
      <button @click="loadMore" :disabled="isLoadingMore"
        class="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto">
        <div v-if="isLoadingMore" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin">
        </div>
        <span>{{ isLoadingMore ? 'Loading...' : 'Load More' }}</span>
      </button>
    </div> -->
  </div>
</template>
