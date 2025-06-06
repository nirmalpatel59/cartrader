<template>
  <div class="max-w-4xl">
    <!-- Contact Form Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <input type="text"
        class="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Your Name" />
      <input type="email"
        class="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Your Email" />
      <input type="tel"
        class="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Phone Number" />
      <input type="number"
        class="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Offer Price" />
    </div>

    <!-- Message Textarea -->
    <div class="mb-6">
      <textarea
        class="w-full border border-gray-300 rounded-md p-3 h-32 resize-vertical focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Write your message here..."></textarea>
    </div>

    <!-- Submit Button -->
    <button
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-md transition-colors duration-200">
      Send Message
    </button>
  </div>
</template>