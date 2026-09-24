<script setup lang="ts">
import { IP_ENDPOINTS } from '~/composables/use-ip-probes'
import { CopyDocument } from '@element-plus/icons-vue'

const { t } = useI18n()
const { copy } = useClipboardCopy()

const FACTS = ['anyPath', 'body', 'cors'] as const
const command = (host: string) => `curl https://${host}/`
</script>

<template>
  <section class="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
    <header>
      <h2 class="text-base font-semibold text-slate-900">{{ t('api.title') }}</h2>
      <p class="mt-1 text-sm text-slate-500">{{ t('api.intro') }}</p>
    </header>

    <ul class="flex flex-col gap-3">
      <li v-for="endpoint in IP_ENDPOINTS" :key="endpoint.key" class="flex flex-col gap-1.5">
        <div class="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
          <p class="flex flex-wrap items-baseline gap-x-2">
            <span class="text-sm font-medium text-slate-900">{{ t(`endpoint.${endpoint.key}.label`) }}</span>
            <span class="text-xs text-slate-400">{{ t(`api.records.${endpoint.key}`) }}</span>
          </p>
          <ElButton :icon="CopyDocument" size="small" @click="copy(command(endpoint.host))">
            {{ t('action.copy') }}
          </ElButton>
        </div>
        <pre
          class="overflow-x-auto rounded-xl bg-slate-900 px-3 py-2.5 font-mono text-xs leading-relaxed text-slate-100 sm:text-[13px]"
          dir="ltr"
        >{{ command(endpoint.host) }}</pre>
      </li>
    </ul>

    <ul class="flex flex-col gap-2 border-t border-slate-100 pt-3">
      <li
        v-for="fact in FACTS"
        :key="fact"
        class="flex gap-2 text-xs leading-relaxed text-slate-500 sm:text-sm"
      >
        <span aria-hidden="true" class="shrink-0 text-slate-300">&bull;</span>
        <span>{{ t(`api.facts.${fact}`) }}</span>
      </li>
    </ul>
  </section>
</template>
