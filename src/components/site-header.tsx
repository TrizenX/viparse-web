import Link from "next/link"

import { BrandMark } from "@/components/brand-mark"
import { GitHubIcon } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getVersion, languages, navFor, siteConfig, type Lang } from "@/lib/site"

export async function SiteHeader({ lang = "en" }: { lang?: Lang } = {}) {
  const version = await getVersion()
  const other = languages[lang]
  const links = navFor(lang)

  return (
    <header className="sticky top-0 z-50 border-b bg-[color-mix(in_srgb,var(--background)_82%,transparent)] backdrop-blur-[10px]">
      <nav className="mx-auto flex h-14 max-w-[1100px] items-center justify-between gap-6 px-6">
        <Link
          href={lang === "vi" ? "/vi" : "/"}
          className="inline-flex items-center gap-2.5 font-mono text-[15px] font-semibold tracking-[-0.02em]"
        >
          <BrandMark className="text-brand" />
          {siteConfig.name}
        </Link>

        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-0.5 sm:flex">
            {links.map((link) => (
              <Button key={link.label} variant="ghost" size="sm" asChild>
                <a
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener" }
                    : {})}
                  className="text-[13.5px] font-normal text-muted-foreground"
                >
                  {link.label}
                </a>
              </Button>
            ))}
          </div>

          <Separator
            orientation="vertical"
            className="mx-2 hidden !h-5 sm:block"
          />

          <Button variant="ghost" size="icon" asChild>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
              className="text-muted-foreground"
            >
              <GitHubIcon className="size-[17px]" />
            </a>
          </Button>

          <a
            href={siteConfig.links.pypi}
            target="_blank"
            rel="noopener"
            className="hidden items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[11.5px] leading-none text-muted-foreground transition-colors hover:border-foreground hover:text-foreground sm:inline-flex"
          >
            <span>PyPI</span>
            <span className="font-medium text-brand">{version}</span>
          </a>

          <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
            <Link
              href={other.href}
              hrefLang={other.hrefLang}
              className="text-[13px] font-normal text-muted-foreground"
            >
              {other.label}
            </Link>
          </Button>

          <ThemeToggle />
          <MobileNav version={version} lang={lang} />
        </div>
      </nav>
    </header>
  )
}
