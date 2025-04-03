<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded shadow">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
      {{ user }}
      <form>
        <div class="mb-4">
          <!-- <label for="email" class="block text-sm font-medium text-gray-700">Email</label> -->
          <!-- <input type="email" id="email" v-model="email"
            class="mt-1 block w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your email" required /> -->
        </div>
        <!-- <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label> -->
        <!-- <input type="password" id="password" v-model="password"
            class="mt-1 block w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your password" required /> -->
        <!-- </div> -->
        <button
          class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          @click="handleLogin">
          Login
        </button>
      </form>
    </div>
    <!-- <div>
      <div id="g_id_onload" data-client_id="33196876770-3kt8b00a16kt340d73g38r7vk124mk0f.apps.googleusercontent.com"
        data-context="signin" data-ux_mode="popup" data-callback="handleSignInWithGoogle" data-auto_prompt="false">
      </div>

      <div class="g_id_signin" data-type="standard" data-shape="pill" data-theme="filled_black" data-text="signin_with"
        data-size="large" data-logo_alignment="left">
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
// const config = useRuntimeConfig();
// useHead({
//   script: [
//     {
//       src: 'https://accounts.google.com/gsi/client',
//       async: true,
//     },
//   ],
// });
// import { ref } from 'vue';

// const email = ref('');
// const password = ref('');
const supabase = useSupabaseClient()
const handleLogin = async () => {
  console.log('Login button clicked');
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/',
    }
  });
  if (error) {
    console.error('Error signing in:', error);
  } else {
    console.log('Successfully signed in:', data);
    // Redirect or perform any other actions after successful login
  }
};
// console.log('supabaseUrl', config.public.supabaseUrl);
// console.log('supabasekey', config.supabaseKey);
// const supabase = createClient(config.public.supabaseUrl as string, config.public.supabaseKey as string)

// async function handleSignInWithGoogle(response: any) {
//   console.log('!!!!!!!!!!!')
//   const { data, error } = await supabase.auth.signInWithIdToken({
//     provider: 'google',
//     token: response.credential,
//   });
//   console.log('$$$$$$$$');
//   console.log('Google Sign-In Response:', response);
//   console.log('Supabase Data:', data);
//   console.log('Supabase Error:', error);
//   if (error) {
//     console.error('Error signing in with Google:', error);
//   } else {
//     console.log('Successfully signed in with Google:', data);
//     // Redirect or perform any other actions after successful login
//   }
// }
const user = useSupabaseUser()
</script>

<style scoped>
/* Add any additional styles here */
</style>