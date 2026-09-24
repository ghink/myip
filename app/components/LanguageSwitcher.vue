<script setup lang="ts">
import type { LocaleObject } from '@nuxtjs/i18n'
import { ArrowDown, Check } from '@element-plus/icons-vue'

const { t, locales } = useI18n()
const { current, apply } = useAppLocale()

const available = computed(() => unref(locales) as LocaleObject[])
const currentName = computed(
  () => available.value.find(entry => entry.code === current.value)?.name ?? current.value,
)
</script>

<template>
  <ElDropdown trigger="click" @command="apply">
    <ElButton
      class="min-w-40 justify-between"
      :icon="ArrowDown"
      :aria-label="t('action.language')"
      icon-position="end"
    >
      <span class="font-medium">{{ currentName }}</span>
    </ElButton>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem v-for="entry in available" :key="entry.code" :command="entry.code">
          <span class="flex w-36 items-center justify-between gap-2">
            <span>{{ entry.name }}</span>
            <ElIcon v-if="entry.code === current" :size="14"><Check /></ElIcon>
          </span>
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>
