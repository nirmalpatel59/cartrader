// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  supabase: {
    redirect: false,
  },
  compatibilityDate: "2025-02-10",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", "@nuxtjs/supabase", "@prisma/nuxt", "@nuxthub/core"],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL || "https://jmkskegtuhgpubyncnca.supabase.co",
      supabaseKey: process.env.SUPABASE_KEY || "your-supabase-key",
      supabaseImagesLocation: 'storage/v1/object/public'
    },
  },
});