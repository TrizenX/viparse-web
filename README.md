# viparse — landing page

The marketing site for [**viparse**](https://github.com/TrizenX/viparse),
a Python library that turns legacy Vietnamese documents (TCVN3 / VNI / VISCII
fonts, scanned PDFs, old `.doc`/`.xls`) into clean Unicode NFC text for RAG
pipelines.

**Live:** https://viparse.trizenx.com

This repo is only the website — it contains no parsing code. It is a port of a
standalone HTML prototype (kept at `reference/viparse-landing-standalone.html`)
to Next.js 16 App Router, Tailwind CSS v4 and shadcn/ui.

---

## How it is put together

The page is one route (`src/app/page.tsx`) composing eight sections, and it is
built around a strict split:

| Layer          | Where                                   | What lives there                                       |
| -------------- | --------------------------------------- | ------------------------------------------------------ |
| **Content**    | `src/lib/content.ts`, `src/lib/site.ts` | Every word, link, code sample and version number       |
| **Sections**   | `src/components/sections/*`             | Layout for one section each — no hardcoded copy        |
| **Primitives** | `src/components/ui/*`                   | shadcn components, edited to match the prototype       |
| **Theme**      | `src/app/globals.css`                   | Colour tokens for light and dark                       |

The practical consequence: **changing what the page says never means opening a
component.** Section files read from the content modules, so copy edits, link
changes and version bumps are all single-file edits in `src/lib/`.

```
src/
  app/
    layout.tsx        fonts, metadata, ThemeProvider
    globals.css       design tokens + Tailwind theme mapping
    page.tsx          section order
  components/
    site-header.tsx   sticky nav, PyPI version chip, theme toggle
    mobile-nav.tsx    dropdown nav below the sm breakpoint
    site-footer.tsx
    section.tsx       <Section> + <SectionHeader> (eyebrow / title / description)
    theme-*.tsx       next-themes wiring
    icons.tsx         GitHub mark (not in lucide)
    sections/         hero, problem, how-it-works, features,
                      quickstart, playground, benchmark, faq
    ui/               shadcn primitives
  hooks/
    use-copy-to-clipboard.ts
  lib/
    site.ts           name, version, tagline, description, external links
    content.ts        features, steps, FAQ, code samples, benchmark rows
```

---

## Common changes

### Bump the advertised version

`src/lib/site.ts` → `version`. Drives the PyPI chip in the header and in the
mobile menu.

### Change a link

`src/lib/site.ts` → `links`. One place feeds the header, the hero CTA, the
mobile menu and the footer — there are no other GitHub/PyPI URLs in the source.

### Edit headline or description

`src/lib/site.ts` → `tagline` / `description`. Both are also used to build the
page `<title>` and the OpenGraph tags, so they stay in sync automatically.

### Add a FAQ entry

Append to `FAQ` in `src/lib/content.ts`. The accordion renders whatever is in
the array; the first item is open by default.

### Add a feature card

Append to `FEATURES` in `src/lib/content.ts` with a `lucide-react` icon:

```ts
import { Gauge } from "lucide-react"

{ title: "Streaming output", body: "...", icon: Gauge }
```

The grid is `sm:grid-cols-2 lg:grid-cols-3`, so any count reflows on its own.

### Fill in the benchmark table

`BENCHMARK_ROWS` in `src/lib/content.ts` currently holds tool names only, and
`src/components/sections/benchmark.tsx` renders `—` for the three data columns.
Give the rows real fields and read them in the cell loop.

### Add a whole section

Create `src/components/sections/your-section.tsx` using the shared shell, then
drop it into `page.tsx` in the right order:

```tsx
<Section id="pricing">
  <SectionHeader eyebrow="Pricing" title="..." description="..." />
  {/* ... */}
</Section>
```

`Section` supplies the bottom padding and `scroll-margin` that makes anchor
links land below the sticky header; `SectionHeader` gives the eyebrow/title/
description rhythm every other section uses.

### Recolour the brand

`--brand` in `src/app/globals.css`, in both `:root` and `.dark`. It is used for
the version number, section accents and the FAQ hover state.

---

## Design tokens

The prototype's CSS variables are mapped onto shadcn's token names, so the
shadcn primitives inherit the design without per-component overrides:

| Prototype  | Here                                                              |
| ---------- | ----------------------------------------------------------------- |
| `--bg`     | `--background`                                                    |
| `--fg`     | `--foreground`                                                    |
| `--muted`  | `--muted-foreground`                                              |
| `--subtle` | `--muted` / `--accent`                                            |
| `--code`   | `--secondary`                                                     |
| `--btn`    | `--primary`                                                       |
| `--accent` | `--brand` (renamed — shadcn already uses `--accent` for surfaces) |
| `--bad`    | `--legacy` / `--legacy-surface`                                   |

Dark mode is class-based via `next-themes` (storage key `viparse-theme`),
replacing the prototype's `html[data-theme]` attribute.

Three `ui/` primitives were edited rather than overridden at every call site:
`card.tsx` (border instead of ring, 10px radius, 20px padding), `button.tsx`
and `textarea.tsx` (dropped the `bg-input/30` dark fill the prototype does not
have). Re-running `shadcn add` for those will revert the edits.

---

## Fonts

Geist and Geist Mono come from the self-hosted `geist` package, **not**
`next/font/google`. The Google-hosted build is split into subsets and Next's
bundled font metadata lists no `vietnamese` subset for Geist, so every ế/ị/ườ
on the page would fall back to a system face. The self-hosted variable font
covers all 90 codepoints in U+1EA0–U+1EF9.

JetBrains Mono is loaded as `--font-legacy` and used only for the mojibake
samples, so the broken text looks the way it does in a real legacy document.

---

## Deployment

Hosted on Vercel under the **trizenxs-projects** team, project **viparse-web**,
serving `viparse.trizenx.com`. DNS for `trizenx.com` is managed at Cloudflare,
not Vercel, so the subdomain is a `CNAME` record there pointing at
`cname.vercel-dns.com` (DNS-only, proxy off).

```bash
vercel deploy --prod    # production
vercel deploy           # preview URL
```

---

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

---

## Not implemented

The playground Convert button and the benchmark numbers are inert here, as they
are in the prototype — both are marked "Coming soon" and ship with viparse v0.2.
The playground is meant to run the parser client-side via Pyodide.
