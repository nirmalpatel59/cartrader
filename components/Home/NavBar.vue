<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser();
const route = useRoute();
const showProfileDropdown = ref(false);

// Computed property for login text that's reactive to user state
const userLoginText = computed(() => {
  return user.value ? 'Logout' : 'Login';
});

// Toggle profile dropdown
const toggleProfileDropdown = () => {
  showProfileDropdown.value = !showProfileDropdown.value;
};

// Close dropdown when clicking outside
const closeDropdown = () => {
  showProfileDropdown.value = false;
};

// Close dropdown on route change
watch(() => route.fullPath, () => {
  showProfileDropdown.value = false;
});

// const handleLogin = async () => {
//   console.log('Login button clicked');
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: 'google',
//     options: {
//       redirectTo: 'http://localhost:3000/',
//     }
//   });
//   if (error) {
//     console.error('Error signing in:', error);
//   } else {
//     console.log('Successfully signed in:', data);
//     // Redirect or perform any other actions after successful login
//   }
// };


const handleLogin = async () => {
  if (user.value) {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      console.log('Successfully signed out');
      window.location.reload();
    }
  } else {
    // Navigate to sign-in page with current path as redirect parameter
    const currentPath = route.fullPath;
    await navigateTo(`/signin?redirect=${encodeURIComponent(currentPath)}`);
  }
};
</script>
<template>
  <header class="sticky top-0 z-50 flex justify-between items-center space-x-1 border-b bg-white p-4 shadow-md">
    <NuxtLink class="text-3xl font-mono" href="/">CarTrader</NuxtLink>
    <nav class="flex space-x-4 items-center">
      <ClientOnly>
        <!-- Profile Dropdown -->
        <div v-if="user" class="relative">
          <button @click="toggleProfileDropdown"
            class="text-lg font-mono flex items-center gap-1 hover:text-blue-600 transition-colors duration-200"
            :class="{ 'text-blue-600': showProfileDropdown }">
            My Profile
            <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': showProfileDropdown }"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <div v-if="showProfileDropdown"
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
            @click="closeDropdown">
            <NuxtLink to="/profile/listings"
              class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                  </path>
                </svg>
                My Listings
              </div>
            </NuxtLink>

            <NuxtLink to="/profile/favourites"
              class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                  </path>
                </svg>
                My Favourites
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Login/Logout Button -->
        <NuxtLink class="text-lg font-mono cursor-pointer hover:text-blue-600 transition-colors duration-200"
          @click="handleLogin">
          {{ userLoginText }}
        </NuxtLink>

        <template #fallback>
          <NuxtLink class="text-lg font-mono cursor-pointer">Login</NuxtLink>
        </template>
      </ClientOnly>
    </nav>

    <!-- Click outside to close dropdown -->
    <div v-if="showProfileDropdown" class="fixed inset-0 z-40" @click="closeDropdown"></div>
  </header>
</template>