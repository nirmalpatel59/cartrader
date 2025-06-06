<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser();
const route = useRoute();

// Computed property for login text that's reactive to user state
const userLoginText = computed(() => {
  return user.value ? 'Logout' : 'Login';
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
  const currentPath = route.fullPath;
  console.log('route path final :', currentPath);
  if (user.value) {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      console.log('Successfully signed out');
      // navigateTo(currentPath, { replace: true });
      window.location.reload();
    }
  } else {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `http://localhost:3000${currentPath}`,
      },
    });
    if (error) {
      console.error('Error signing in:', error);
    } else {
      console.log('Successfully signed in:', data);
    }
  }
};
</script>
<template>
  <header class="sticky top-0 z-50 flex justify-between items-center space-x-1 border-b bg-white p-4 shadow-md">
    <NuxtLink class="text-3xl font-mono" href="/">CarTrader</NuxtLink>
    <nav class="flex space-x-4">
      <ClientOnly>
        <NuxtLink v-if="user" class="text-lg font-mono" href="/profile/listings">My Profile</NuxtLink>
        <NuxtLink class="text-lg font-mono cursor-pointer" @click="handleLogin">{{ userLoginText }}</NuxtLink>
        <template #fallback>
          <NuxtLink class="text-lg font-mono cursor-pointer">Login</NuxtLink>
        </template>
      </ClientOnly>
    </nav>
  </header>
</template>