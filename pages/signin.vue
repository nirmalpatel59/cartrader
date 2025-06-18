<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Main Sign In Card -->
      <div class="bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <!-- Header -->
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p class="text-gray-600">Sign in to your CarTrader account</p>
        </div>

        <!-- Google Sign In Button -->
        <button @click="handleGoogleLogin" :disabled="isLoading"
          class="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 rounded-lg px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <span>Continue with Google</span>
        </button>

        <!-- Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        <!-- Magic Link Section -->
        <div v-if="!showEmailForm" class="space-y-4">
          <button @click="showEmailForm = true"
            class="w-full flex items-center justify-center gap-3 bg-blue-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Continue with Magic Link</span>
          </button>
        </div>

        <!-- Email Form for Magic Link -->
        <div v-else class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input id="email" v-model="email" type="email" placeholder="Enter your email address"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              :class="{ 'border-red-500': emailError }" @keyup.enter="handleMagicLinkLogin" />
            <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
          </div>

          <div class="flex gap-3">
            <button @click="showEmailForm = false"
              class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200">
              Back
            </button>
            <button @click="handleMagicLinkLogin" :disabled="isLoading || !email"
              class="flex-1 bg-blue-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
              <span v-if="!isLoading">Send Magic Link</span>
              <div v-else class="flex items-center justify-center gap-2">
                <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sending...</span>
              </div>
            </button>
          </div>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-green-800 text-sm">{{ successMessage }}</p>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-red-800 text-sm">{{ errorMessage }}</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <!-- <div class="text-center mt-6">
        <p class="text-gray-600">
          Don't have an account? 
          <span class="text-blue-600 font-medium cursor-pointer hover:underline">Sign up</span>
        </p>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'custom'
})

const supabase = useSupabaseClient()
const route = useRoute()
const user = useSupabaseUser()

// Reactive data
const email = ref('')
const showEmailForm = ref(false)
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const emailError = ref('')

// Check if user is already logged in and redirect
watch(user, (newUser) => {
  if (newUser) {
    const redirectTo = route.query.redirect as string || '/'
    navigateTo(redirectTo)
  }
}, { immediate: true })

// Google OAuth Login
const handleGoogleLogin = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const redirectTo = route.query.redirect as string || '/'
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}${redirectTo}`,
      },
    })

    if (error) {
      throw error
    }
  } catch (error: any) {
    console.error('Error signing in with Google:', error)
    errorMessage.value = error.message || 'Failed to sign in with Google'
  } finally {
    isLoading.value = false
  }
}

// Validate email
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Magic Link Login
const handleMagicLinkLogin = async () => {
  try {
    emailError.value = ''
    errorMessage.value = ''
    successMessage.value = ''

    if (!email.value) {
      emailError.value = 'Email is required'
      return
    }

    if (!validateEmail(email.value)) {
      emailError.value = 'Please enter a valid email address'
      return
    }

    isLoading.value = true

    const redirectTo = route.query.redirect as string || '/'
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: {
        emailRedirectTo: `${window.location.origin}${redirectTo}`,
      },
    })
    console.log('Magic link sent:', email.value)
    console.log(error);

    if (error) {
      throw error
    }

    successMessage.value = `Magic link sent to ${email.value}! Check your inbox and click the link to sign in.`
    showEmailForm.value = false
    email.value = ''

  } catch (error: any) {
    console.error('Error sending magic link:', error)
    errorMessage.value = error.message || 'Failed to send magic link'
  } finally {
    isLoading.value = false
  }
}

// Clear messages when switching between methods
watch(showEmailForm, () => {
  errorMessage.value = ''
  successMessage.value = ''
  emailError.value = ''
})
</script>
