<script setup lang="ts">
import enUs from 'element-plus/es/locale/lang/en'
import eo from 'element-plus/es/locale/lang/eo'
import es from 'element-plus/es/locale/lang/es'
import fr from 'element-plus/es/locale/lang/fr'
import ru from 'element-plus/es/locale/lang/ru'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import type { ConfigProviderContext } from 'element-plus'

const EP_LOCALES: Record<string, ConfigProviderContext['locale']> = { en: enUs, fr, es, ru, zh: zhCn, eo }

const { locale, localeProperties, t } = useI18n()
const { settled, restore } = useAppLocale()

const elementLocale = computed(() => EP_LOCALES[locale.value] ?? enUs)

useHead({ htmlAttrs: { lang: () => localeProperties.value.language ?? locale.value } })
useSeoMeta({ title: () => t('app.title') })

onMounted(restore)
</script>

<template>
  <ElConfigProvider :locale="elementLocale">
    <noscript>
      <style>.locale-gate{display:none}.locale-content{visibility:visible}</style>
    </noscript>
    <LocaleGate v-if="!settled" />
    <div class="locale-content" :class="{ invisible: !settled }">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </ElConfigProvider>
</template>
