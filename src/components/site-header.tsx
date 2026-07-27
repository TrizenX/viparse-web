import Link from "next/link"

import { GitHubIcon } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { navLinks, siteConfig } from "@/lib/site"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-[color-mix(in_srgb,var(--background)_82%,transparent)] backdrop-blur-[10px]">
      <nav className="mx-auto flex h-14 max-w-[1100px] items-center justify-between gap-6 px-6">
        <Link
          href="#top"
          className="font-mono text-[15px] font-semibold tracking-[-0.02em]"
        >
          {siteConfig.name}
        </Link>

        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-0.5 sm:flex">
            {navLinks.map((link) => (
              <Button key={link.label} variant="ghost" size="sm" asChild>
                <Link
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener" }
                    : {})}
                  className="text-[13.5px] font-normal text-muted-foreground"
                >
                  {link.label}
                </Link>
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
            <span className="font-medium text-brand">{siteConfig.version}</span>
          </a>

          <ThemeToggle />
          <MobileNav />
        </div>
      </nav>
    </header>
  )
}
