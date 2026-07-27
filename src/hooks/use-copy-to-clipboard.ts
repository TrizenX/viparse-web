"use client"

import * as React from "react"

/** Copies text and flips `copied` for a moment so the UI can confirm it. */
export function useCopyToClipboard(resetAfter = 1600) {
  const [copied, setCopied] = React.useState(false)
  const timeout = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current)
    }
  }, [])

  const copy = React.useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard?.writeText(text)
      } catch {
        // Clipboard can be blocked (insecure origin, denied permission); still
        // acknowledge the click rather than leaving the button inert.
      }
      setCopied(true)
      if (timeout.current) clearTimeout(timeout.current)
      timeout.current = setTimeout(() => setCopied(false), resetAfter)
    },
    [resetAfter]
  )

  return { copied, copy }
}
