import Link from "next/link"

import { languages, siteConfig, type Lang } from "@/lib/site"

const footerLinks = [
  { label: "GitHub", href: siteConfig.links.github, external: true },
  { label: "PyPI", href: siteConfig.links.pypi, external: true },
  { label: "Changelog", href: siteConfig.links.releases, external: true },
  { label: "Contact", href: siteConfig.links.email, external: false },
]

export function SiteFooter({ lang = "en" }: { lang?: Lang } = {}) {
  const other = languages[lang]

  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 px-6 pt-8 pb-10">
        <div className="flex flex-wrap items-center gap-3.5">
          <span className="font-mono text-[13.5px] font-semibold">
            {siteConfig.name}
          </span>
          <span className="text-[12.5px] text-muted-foreground">MIT © 2026</span>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener" } : {})}
              className="text-[12.5px] text-muted-foreground transition-colors hover:text-brand"
            >
              {link.label}
            </a>
          ))}
          <Link
            href={other.href}
            hrefLang={other.hrefLang}
            className="text-[12.5px] text-muted-foreground transition-colors hover:text-brand"
          >
            {other.label}
          </Link>
          <span className="text-[12.5px] text-muted-foreground">
            Made in Vietnam 🇻🇳
          </span>
        </div>
      </div>
    </footer>
  )
}
