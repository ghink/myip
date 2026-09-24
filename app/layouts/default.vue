<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white font-sans text-slate-900 antialiased">
    <div class="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-12">
      <header class="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <div>
          <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">{{ t('app.title') }}</h1>
          <p class="mt-1.5 max-w-prose text-sm text-slate-500 sm:text-base">{{ t('app.tagline') }}</p>
        </div>
        <LanguageSwitcher class="shrink-0" />
      </header>

      <main>
        <slot />
      </main>
    </div>
  </div>
</template>
