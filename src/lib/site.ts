export const siteConfig = {
  name: "viparse",
  // Fallback only. The live version comes from PyPI via getVersion() below — this
  // string was already three releases stale (site said v0.1.5 while PyPI shipped
  // 0.1.7), which is what a hand-maintained copy of someone else's number does.
  version: "v0.1.22",
  tagline: "Vietnamese documents, finally readable by your RAG stack.",
  description:
    "viparse turns legacy Vietnamese files — TCVN3/VNI/VISCII fonts, scanned PDFs, old .doc/.xls — into clean Unicode NFC Markdown or JSON. One function call, ready for your vector DB.",
  // Tracks requires-python in the library's pyproject.toml.
  heroBadge: "Open source · MIT · Python 3.11+",
  // The canonical origin. Everything SEO-facing derives from it — metadataBase,
  // og:url, the canonical link, robots.txt and the sitemap — so it must be the
  // domain the site is actually served from.
  url: "https://viparse.trizenx.com",
  // The portfolio publishes the Person node this author reference points at;
  // both sites must name the same @id or the graphs stay disconnected.
  author: {
    name: "Đinh Minh Trí",
    alternateName: "Kayden",
    id: "https://portfolio.trizenx.com/#person",
    url: "https://portfolio.trizenx.com",
  },
  links: {
    github: "https://github.com/TrizenX/viparse",
    docs: "https://github.com/TrizenX/viparse/tree/main/docs",
    pypi: "https://pypi.org/project/viparse/",
    releases: "https://github.com/TrizenX/viparse/releases",
    email: "mailto:hello@trizenx.com",
    // The studio index. viparse is one row on it, and until this existed the
    // estate linked outward only: trizenx.com points here, nothing pointed back,
    // so a reader who wanted to know who builds this had nowhere to click and a
    // crawler had no path to the homepage except a sitemap.
    studio: "https://trizenx.com",
  },
} as const

/**
 * The other language, from wherever you are.
 *
 * Two locales, so a lookup table would be longer than the thing it replaces. Named in
 * its own language on purpose: someone who needs the Vietnamese page cannot necessarily
 * read the word "Vietnamese".
 */
export const languages = {
  en: { label: "Tiếng Việt", href: "/vi", hrefLang: "vi-VN" },
  vi: { label: "English", href: "/", hrefLang: "en-US" },
} as const

export type Lang = keyof typeof languages

// In-page links are bare hashes and are rendered as native anchors, not `Link`.
// Both alternatives were tried and both are broken: a `Link` with a bare hash resolves
// against the current URL, so following it while a hash was already present produced
// "/vi#playground#playground" and a blank page; a `Link` with "/vi#playground" is a
// same-route navigation that never scrolled at all. A plain <a> does the one thing
// wanted here, in the browser, with no router involved.
const nav = {
  en: [
    { label: "Docs", href: siteConfig.links.docs, external: true },
    { label: "Playground", href: "#playground", external: false },
    { label: "Benchmark", href: "#benchmark", external: false },
  ],
  vi: [
    // Points at README.vi.md rather than docs/: someone reading the Vietnamese page
    // should not land on an English page one click later.
    { label: "Tài liệu", href: `${siteConfig.links.github}/blob/main/README.vi.md`, external: true },
    { label: "Thử ngay", href: "#playground", external: false },
    { label: "Đo đạc", href: "#benchmark", external: false },
  ],
} as const

export function navFor(lang: Lang) {
  return nav[lang]
}

/** The English nav, for callers that predate the language split. */
export const navLinks = nav.en

/**
 * The published version, read from PyPI at build time and refreshed hourly.
 *
 * A version number maintained by hand in two places drifts, and this one did:
 * the site advertised v0.1.5 through three releases. Fetching it makes the
 * question "is this current?" unanswerable-by-being-wrong.
 *
 * Revalidation matters because the site only rebuilds when this repo changes,
 * and a library release does not touch it.
 */
export async function getVersion(): Promise<string> {
  try {
    const res = await fetch("https://pypi.org/pypi/viparse/json", {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return siteConfig.version
    const data = (await res.json()) as { info?: { version?: string } }
    const version = data.info?.version
    return version ? `v${version}` : siteConfig.version
  } catch {
    // Never fail the page over a version badge.
    return siteConfig.version
  }
}
