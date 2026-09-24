import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-22',
  ssr: true,
  devtools: { enabled: false },
  modules: ['@element-plus/nuxt', '@nuxtjs/i18n'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'color-scheme', content: 'light' },
      ],
    },
  },
  i18n: {
    defaultLocale: 'en',
    strategy: 'no_prefix',
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
      { code: 'fr', language: 'fr-FR', file: 'fr.json', name: 'Français' },
      { code: 'es', language: 'es-ES', file: 'es.json', name: 'Español' },
      { code: 'ru', language: 'ru-RU', file: 'ru.json', name: 'Русский' },
      { code: 'zh', language: 'zh-CN', file: 'zh.json', name: '中文' },
      { code: 'eo', language: 'eo', file: 'eo.json', name: 'Esperanto' },
    ],
    // Detection happens in the browser after hydration (see use-app-locale.ts):
    // a statically generated page can only pre-render one language.
    detectBrowserLanguage: false,
  },
  nitro: {
    static: true,
    prerender: { routes: ['/'] },
  },
  typescript: { strict: true },
})
