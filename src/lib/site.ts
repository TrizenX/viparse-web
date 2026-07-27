export const siteConfig = {
  name: "viparse",
  version: "v0.1.5",
  tagline: "Vietnamese documents, finally readable by your RAG stack.",
  description:
    "viparse turns legacy Vietnamese files — TCVN3/VNI/VISCII fonts, scanned PDFs, old .doc/.xls — into clean Unicode NFC Markdown or JSON. One function call, ready for your vector DB.",
  url: "https://viparse.dev",
  links: {
    github: "https://github.com/minhtridinh-kayden/viparse",
    docs: "https://github.com/minhtridinh-kayden/viparse/tree/main/docs",
    pypi: "https://pypi.org/project/viparse/",
    releases: "https://github.com/minhtridinh-kayden/viparse/releases",
    email: "mailto:hello@viparse.dev",
  },
} as const

export const navLinks = [
  { label: "Docs", href: siteConfig.links.docs, external: true },
  { label: "Playground", href: "#playground", external: false },
  { label: "Benchmark", href: "#benchmark", external: false },
] as const
