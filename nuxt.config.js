// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader';
export default defineNuxtConfig({
  alias: {
    pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
  },
  buildModules: ['@nuxtjs/svg'],
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.css',
      },
    ],
  },
  imports: {
    dirs: [
      'stores',
      // Scan top-level composables
      'composables',
      // ... or scan modules nested one level deep with a specific name and file extension
      'composables/*/index.{ts,js,mjs,mts}',
      // ... or scan all modules within given directory
      'composables/**',

      // Scan modules-level composables
      'modules/*/composables',
      'modules/*/composables/*/index.{ts,js,mjs,mts}',
      'modules/*/composables/**',
    ],
  },
  modules: [
    '@nuxtjs/tailwindcss',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
  ],
  svg: {
    vueSvgLoader: {
      // vue-svg-loader options
    },
    svgSpriteLoader: {
      // svg-sprite-loader options
    },
    fileLoader: {
      // file-loader options
    },
  },
  vite: {
    plugins: [svgLoader()],
  },
});
