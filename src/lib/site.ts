export const siteConfig = {
  name: "viparse",
  version: "v0.1.5",
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
