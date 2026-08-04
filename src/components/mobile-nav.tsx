"use client"

import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { languages, navFor, siteConfig, type Lang } from "@/lib/site"

/** Below `sm` the nav links and the PyPI chip don't fit the 56px bar. */
export function MobileNav({
  version,
  lang = "en",
}: {
  version: string
  lang?: Lang
}) {
  const other = languages[lang]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="sm:hidden">
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="size-[17px]" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        {navFor(lang).map((link) => (
          <DropdownMenuItem key={link.label} asChild>
            <a
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener" } : {})}
            >
              {link.label}
            </a>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={other.href} hrefLang={other.hrefLang}>
            {other.label}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a href={siteConfig.links.pypi} target="_blank" rel="noopener">
            <span className="font-mono text-xs">PyPI</span>
            <span className="ml-auto font-mono text-xs text-brand">
              {version}
            </span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
