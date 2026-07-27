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
import { navLinks, siteConfig } from "@/lib/site"

/** Below `sm` the nav links and the PyPI chip don't fit the 56px bar. */
export function MobileNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="sm:hidden">
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="size-[17px]" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        {navLinks.map((link) => (
          <DropdownMenuItem key={link.label} asChild>
            <Link
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener" } : {})}
            >
              {link.label}
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <a href={siteConfig.links.pypi} target="_blank" rel="noopener">
            <span className="font-mono text-xs">PyPI</span>
            <span className="ml-auto font-mono text-xs text-brand">
              {siteConfig.version}
            </span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
