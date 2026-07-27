"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="text-muted-foreground hover:text-foreground"
    >
      {/* Swapped via the `dark` class so the server and client render the same
          markup — no mounted flag, no hydration mismatch. */}
      <Moon className="size-[17px] dark:hidden" />
      <Sun className="hidden size-[17px] dark:block" />
    </Button>
  )
}
