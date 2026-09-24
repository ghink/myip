<script setup lang="ts">
import type { ProbeReason, ProbeState } from '~/composables/use-ip-probes'
import {
  CircleCheck,
  CircleClose,
  Clock,
  WarningFilled,
} from '@element-plus/icons-vue'

const props = defineProps<{
  state: ProbeState
  value: string
  reason: ProbeReason | null
  detail: string
}>()

const { t } = useI18n()

const TAG_TYPE: Record<ProbeState, 'primary' | 'success' | 'warning' | 'danger'> = {
  pending: 'primary',
  detected: 'success',
  unavailable: 'warning',
  failed: 'danger',
}

const ICON: Record<ProbeState, typeof CircleCheck> = {
  pending: Clock,
  detected: CircleCheck,
  unavailable: WarningFilled,
  failed: CircleClose,
}

const label = computed(() => `status.${props.state}`)
const explanation = computed(() => (props.reason ? `reason.${props.reason}` : ''))
</script>

<template>
  <div class="flex min-h-16 flex-col items-start gap-2">
    <ElTag :type="TAG_TYPE[state]" effect="light" round size="small">
      <span class="flex items-center gap-1">
        <ElIcon :size="12"><component :is="ICON[state]" /></ElIcon>
        {{ t(label) }}
      </span>
    </ElTag>

    <ElSkeleton v-if="state === 'pending'" class="w-full" :rows="1" animated />

    <p
      v-else-if="state === 'detected'"
      class="w-full select-all font-mono text-lg leading-snug break-all text-slate-900 sm:text-xl"
      dir="ltr"
    >
      {{ value }}
    </p>

    <div v-else class="w-full space-y-1">
      <p class="text-sm leading-snug text-slate-600">{{ t(explanation) }}</p>
      <p v-if="detail" class="font-mono text-xs text-slate-400" dir="ltr">{{ detail }}</p>
    </div>
  </div>
</template>
