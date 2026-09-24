/** Clipboard write with a legacy path; resolves to whether the text got copied. */
async function copyText(value: string) {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(value)
      return true
    }
  } catch {
    // Rejected when the document lacks focus/user activation: try the legacy path.
  }
  const field = document.createElement('textarea')
  field.value = value
  field.setAttribute('readonly', '')
  field.style.position = 'fixed'
  field.style.opacity = '0'
  document.body.append(field)
  field.select()
  try {
    return document.execCommand('copy')
  } finally {
    field.remove()
  }
}

export function useClipboardCopy() {
  const { t } = useI18n()

  async function copy(value: string) {
    if (!value) return
    if (await copyText(value)) ElMessage.success(t('action.copyDone'))
    else ElMessage.warning(t('action.copyBlocked'))
  }

  return { copy }
}
