<script setup lang="ts">
import { IP_ENDPOINTS } from '~/composables/use-ip-probes'
import { Refresh } from '@element-plus/icons-vue'

const { t } = useI18n()
const { probes, checking, detected, total, lastCheckedAt, checkAll } = useIpProbes()

const checkedAtLabel = computed(() =>
  lastCheckedAt.value ? new Date(lastCheckedAt.value).toLocaleTimeString() : '',
)
</script>

<template>
  <div class="flex flex-col gap-4 sm:gap-6">
    <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <p class="flex items-baseline gap-2">
        <span class="text-sm text-slate-500">{{ t('app.answered') }}</span>
        <span class="font-mono text-sm font-semibold tabular-nums">{{ detected }}/{{ total }}</span>
      </p>
      <p class="flex items-center gap-3">
        <span v-if="checkedAtLabel" class="text-xs text-slate-400 tabular-nums">
          {{ t('app.updatedAt', { time: checkedAtLabel }) }}
        </span>
        <ElButton type="primary" :icon="Refresh" :loading="checking" @click="checkAll">
          {{ t('action.refresh') }}
        </ElButton>
      </p>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
      <ProbeCard
        v-for="endpoint in IP_ENDPOINTS"
        :key="endpoint.key"
        :endpoint="endpoint"
        :probe="probes[endpoint.key]"
      />
    </div>

    <p class="max-w-prose text-xs leading-relaxed text-slate-500 sm:text-sm">{{ t('hint.unreachable') }}</p>

    <ApiGuide />
  </div>
</template>
