# myip

Shows a visitor's own IP address as seen by three endpoints, in six languages.

| Card | Endpoint | Records |
| --- | --- | --- |
| Automatic | `ip-myip.gh.ink` | A + AAAA |
| IPv4 only | `v4-myip.gh.ink` | A |
| IPv6 only | `v6-myip.gh.ink` | AAAA |

Each card answers with the plain-text body of its endpoint and renders one of four
states: `pending`, `detected`, `unavailable` (no route / timeout / empty body) or
`failed` (HTTP error). All three cards share the same state component, so the
symmetric cases work too: an IPv6-only visitor sees the IPv4 card report
`unavailable`, and the summary counter simply shows how many endpoints answered.

Verified behaviour of the three endpoints (the page's **API usage** section says the
same in six languages):

* Any path and any query string return the same body; `GET` and `POST` both work and
  `http://` redirects to `https://`.
* The body is `text/plain` and contains only the address, with no trailing newline.
* `Access-Control-Allow-Origin: *`, so browser code may call them directly.

## Stack

Nuxt 4 (static generation) · Vue 3 · Tailwind CSS 4 (`@tailwindcss/vite`) ·
Element Plus (`@element-plus/nuxt`) · `@nuxtjs/i18n`.

Locales: English, Français, Español, Русский, 中文, Esperanto — the UN working
languages except Arabic, plus Esperanto. All are LTR, so no RTL handling.

## Commands

```sh
pnpm install          # deps
pnpm dev              # dev server
pnpm build            # nuxt generate -> .output/public (static files only)
pnpm preview          # serve the generated site
pnpm typecheck        # vue-tsc via nuxt typecheck
```

## Notes

* `public/favicon.ico` is a vendored copy of
  `https://cdn.gh.ink/image/ghink/square/color/trn.ico` (single 128x128 image), so the
  site does not depend on that CDN for its own chrome.
* Addresses are fetched by the browser, never by the build: the page is static, so
  the server that generates it cannot know the visitor.
* A statically generated page can only pre-render one language, so the HTML shell is
  English and `use-app-locale.ts` applies the stored or browser language after
  hydration. Switching earlier would rewrite server-rendered text and trip Vue's
  hydration check. Until that switch finishes, `<LocaleGate>` keeps a language-neutral
  skeleton over the page so the pre-rendered language never flashes; a `<noscript>`
  rule reveals the English shell for visitors without JavaScript.
* `pnpm-workspace.yaml` exists so pnpm stops treating `~` as the workspace root on
  this machine; `pnpm install --ignore-workspace` is the fallback.
* Deploy `.output/public` to any static host; the endpoints send
  `Access-Control-Allow-Origin: *`.
