const STORAGE_KEY = 'myip.locale'

/**
 * SSG ships exactly one pre-rendered language, so the visitor's own language can
 * only be applied after hydration — switching earlier rewrites server text and
 * trips Vue's hydration check. `settled` lets the page stay behind a language-neutral
 * skeleton until that switch is over, instead of flashing the pre-rendered language.
 */
export function useAppLocale() {
  const { locale, locales, setLocale } = useI18n()

  const current = computed(() => locale.value as string)
  const codes = computed<string[]>(() => unref(locales).map(entry => entry.code))
  const settled = useState('locale-settled', () => false)

  function pick(): string | null {
    const supported = codes.value
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && supported.includes(saved)) return saved
    for (const tag of navigator.languages ?? [navigator.language]) {
      const base = tag?.split('-')[0]
      if (base && supported.includes(base)) return base
    }
    return null
  }

  async function apply(code: string) {
    if (code === current.value) return
    localStorage.setItem(STORAGE_KEY, code)
    await setLocale(code as Parameters<typeof setLocale>[0])
  }

  async function restore() {
    try {
      await apply(pick() ?? current.value)
    } finally {
      settled.value = true
    }
  }

  return { current, settled, apply, restore }
}
