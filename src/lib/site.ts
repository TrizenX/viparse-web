export const siteConfig = {
  name: "viparse",
  // Fallback only. The live version comes from PyPI via getVersion() below — this
  // string was already three releases stale (site said v0.1.5 while PyPI shipped
  // 0.1.7), which is what a hand-maintained copy of someone else's number does.
  version: "v0.1.8",
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
  },
} as const

export const navLinks = [
  { label: "Docs", href: siteConfig.links.docs, external: true },
  { label: "Playground", href: "#playground", external: false },
  { label: "Benchmark", href: "#benchmark", external: false },
] as const

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
