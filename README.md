# viparse — landing page

Next.js 16 (App Router) + Tailwind CSS v4 + shadcn/ui rebuild of the original
standalone HTML prototype (kept at `reference/viparse-landing-standalone.html`).

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Structure

```
src/
  app/
    layout.tsx        fonts, metadata, ThemeProvider
    globals.css       design tokens (light + dark), Tailwind theme mapping
    page.tsx          section composition
  components/
    site-header.tsx   sticky nav, PyPI version chip, theme toggle
    site-footer.tsx
    section.tsx       <Section> + <SectionHeader> (eyebrow / title / description)
    theme-*.tsx       next-themes wiring
    icons.tsx         GitHub mark (not in lucide)
    sections/         hero, problem, how-it-works, features,
                      quickstart, playground, benchmark, faq
    ui/               shadcn components
  hooks/
    use-copy-to-clipboard.ts
  lib/
    site.ts           name, version, description, external links
    content.ts        features, steps, FAQ, code samples, benchmark rows
```

All copy lives in `src/lib/content.ts` and `src/lib/site.ts` — editing the page
text does not mean touching components.

## Design tokens

The prototype's CSS variables are mapped onto shadcn's token names in
`globals.css`, so the shadcn components inherit the design without per-component
overrides:

| Prototype   | Here                             |
| ----------- | -------------------------------- |
| `--bg`      | `--background`                   |
| `--fg`      | `--foreground`                   |
| `--muted`   | `--muted-foreground`             |
| `--subtle`  | `--muted` / `--accent`           |
| `--code`    | `--secondary`                    |
| `--btn`     | `--primary`                      |
| `--accent`  | `--brand` (renamed to avoid a collision with shadcn's `--accent`) |
| `--bad`     | `--legacy` / `--legacy-surface`  |

Dark mode is class-based (`next-themes`, storage key `viparse-theme`), replacing
the prototype's `html[data-theme]` attribute.

## Fonts

Geist and Geist Mono come from the self-hosted `geist` package rather than
`next/font/google`: the Google-hosted build is split into subsets and Next's
bundled font metadata has no `vietnamese` entry for Geist, which would drop every
ế/ị/ườ to a fallback face. JetBrains Mono (`--font-legacy`) renders the
pre-Unicode mojibake samples.

## Not implemented

The playground Convert button and the benchmark numbers are inert in the
prototype too — both are marked "Coming soon" and ship with v0.2.
