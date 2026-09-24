export type ProbeState = 'pending' | 'detected' | 'unavailable' | 'failed'
export type ProbeReason = 'unreachable' | 'timeout' | 'empty' | 'http'

export interface IpEndpoint {
  key: 'auto' | 'v4' | 'v6'
  host: string
}

export interface ProbeResult {
  state: ProbeState
  value: string
  reason: ProbeReason | null
  /** Raw, untranslated technical hint (error name, HTTP status, elapsed ms). */
  detail: string
  checkedAt: number
}

export const IP_ENDPOINTS: readonly IpEndpoint[] = [
  { key: 'auto', host: 'ip-myip.gh.ink' },
  { key: 'v4', host: 'v4-myip.gh.ink' },
  { key: 'v6', host: 'v6-myip.gh.ink' },
]

/** Long enough for a cold DNS + TCP + TLS path, short enough to unblock the card. */
const PROBE_TIMEOUT_MS = 8000

const PENDING: ProbeResult = { state: 'pending', value: '', reason: null, detail: '', checkedAt: 0 }

export function useIpProbes() {
  const probes = useState<Record<IpEndpoint['key'], ProbeResult>>('ip-probes', () => ({
    auto: { ...PENDING },
    v4: { ...PENDING },
    v6: { ...PENDING },
  }))
  const checking = useState('ip-probes-checking', () => false)

  const detected = computed(() => IP_ENDPOINTS.filter(e => probes.value[e.key].state === 'detected').length)
  const total = IP_ENDPOINTS.length
  const lastCheckedAt = computed(() =>
    Math.max(0, ...IP_ENDPOINTS.map(e => probes.value[e.key].checkedAt)),
  )

  async function probe(endpoint: IpEndpoint): Promise<ProbeResult> {
    const startedAt = performance.now()
    let timedOut = false
    const controller = new AbortController()
    const timer = setTimeout(() => {
      timedOut = true
      controller.abort()
    }, PROBE_TIMEOUT_MS)

    try {
      // Cache-buster: the endpoints sit behind CDNs that may key on the caller address.
      const res = await fetch(`https://${endpoint.host}/?t=${Date.now()}`, {
        cache: 'no-store',
        signal: controller.signal,
      })
      const text = (await res.text()).trim()
      if (!res.ok) {
        return { state: 'failed', value: '', reason: 'http', detail: `HTTP ${res.status}`, checkedAt: Date.now() }
      }
      if (!text) {
        return { state: 'unavailable', value: '', reason: 'empty', detail: `HTTP ${res.status}`, checkedAt: Date.now() }
      }
      return { state: 'detected', value: text.split(/\r?\n/)[0]!, reason: null, detail: '', checkedAt: Date.now() }
    } catch (error) {
      const seconds = (performance.now() - startedAt) / 1000
      if (timedOut) {
        return { state: 'unavailable', value: '', reason: 'timeout', detail: `> ${seconds.toFixed(1)}s`, checkedAt: Date.now() }
      }
      const name = error instanceof Error ? error.name : 'Error'
      return { state: 'unavailable', value: '', reason: 'unreachable', detail: name, checkedAt: Date.now() }
    } finally {
      clearTimeout(timer)
    }
  }

  async function checkAll() {
    if (checking.value) return
    checking.value = true
    for (const endpoint of IP_ENDPOINTS) {
      probes.value[endpoint.key] = { ...PENDING }
    }
    try {
      const results = await Promise.all(IP_ENDPOINTS.map(probe))
      IP_ENDPOINTS.forEach((endpoint, index) => {
        probes.value[endpoint.key] = results[index]!
      })
    } finally {
      checking.value = false
    }
  }

  onMounted(checkAll)

  return { probes, checking, detected, total, lastCheckedAt, checkAll }
}
