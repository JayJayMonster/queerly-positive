// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.css',
      },
    ],
  },
  modules: ['@nuxtjs/tailwindcss'],
});
