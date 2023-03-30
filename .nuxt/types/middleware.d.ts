import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/Users/Jay/Documents/CMGT/Jaar 3/PLE/queerly-optimistic/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}