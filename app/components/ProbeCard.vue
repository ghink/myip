<script setup lang="ts">
import type { IpEndpoint, ProbeResult } from '~/composables/use-ip-probes'
import { CopyDocument } from '@element-plus/icons-vue'

defineProps<{ endpoint: IpEndpoint; probe: ProbeResult }>()

const { t } = useI18n()
const { copy } = useClipboardCopy()
</script>

<template>
  <section class="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
    <header class="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
      <h2 class="text-base font-semibold text-slate-900">{{ t(`endpoint.${endpoint.key}.label`) }}</h2>
      <span class="font-mono text-xs text-slate-400" dir="ltr">{{ endpoint.host }}</span>
    </header>

    <ProbeState
      :state="probe.state"
      :value="probe.value"
      :reason="probe.reason"
      :detail="probe.detail"
    />

    <footer class="mt-auto flex items-end justify-between gap-3 pt-1">
      <p class="flex-1 text-xs leading-snug text-slate-500">{{ t(`endpoint.${endpoint.key}.blurb`) }}</p>
      <ElButton
        :icon="CopyDocument"
        :disabled="probe.state !== 'detected'"
        size="small"
        @click="copy(probe.value)"
      >
        {{ t('action.copy') }}
      </ElButton>
    </footer>
  </section>
</template>
