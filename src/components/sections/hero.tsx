"use client"

import { ArrowDown, Check, Copy } from "lucide-react"

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { INSTALL_COMMAND, SAMPLE } from "@/lib/content"
import { siteConfig } from "@/lib/site"

export function Hero() {
  const { copied, copy } = useCopyToClipboard()

  return (
    <section className="pt-9 pb-16">
      <div className="grid max-w-[760px] gap-4.5">
        <Badge
          variant="outline"
          className="h-auto justify-self-start rounded-full px-3 py-[5px] font-mono text-[11.5px] font-normal text-muted-foreground"
        >
          {siteConfig.heroBadge}
        </Badge>

        <h1 className="text-[clamp(30px,5.2vw,46px)] leading-[1.06] font-semibold tracking-[-0.035em] text-balance">
          {siteConfig.tagline}
        </h1>

        <p className="max-w-[660px] text-[17px] leading-[1.65] text-pretty text-muted-foreground">
          {siteConfig.description}
        </p>

        <div className="mt-0.5 flex flex-wrap items-center gap-2.5">
          <Button
            size="lg"
            onClick={() => copy(INSTALL_COMMAND)}
            className="h-10 gap-2.5 px-4 font-mono text-[13.5px] hover:opacity-90"
          >
            <span>{INSTALL_COMMAND}</span>
            {copied ? (
              <Check className="size-3.5" />
            ) : (
              <Copy className="size-3.5 opacity-70" />
            )}
            <span className="sr-only" role="status">
              {copied ? "Copied to clipboard" : ""}
            </span>
          </Button>

          <Button variant="outline" size="lg" asChild className="h-10 px-4">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener"
              className="text-[13.5px]"
            >
              Star on GitHub →
            </a>
          </Button>
        </div>
      </div>

      <BeforeAfter />
    </section>
  )
}

function BeforeAfter() {
  return (
    <div className="mt-11 overflow-hidden rounded-xl border bg-card">
      <div className="grid px-5 pt-4.5 pb-5">
        <div className="flex items-center gap-2 pb-2.5">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-legacy uppercase">
            Input
          </span>
          <span className="text-[11.5px] text-muted-foreground">
            what generic loaders give you
          </span>
        </div>

        <pre className="overflow-x-auto rounded-md border bg-legacy-surface px-4.5 py-4 font-legacy text-[13.5px] leading-[1.75] whitespace-pre-wrap text-muted-foreground">
          {SAMPLE.legacy.map((chunk, i) => (
            <span key={i} className={chunk.bad ? "text-legacy" : undefined}>
              {chunk.text}
            </span>
          ))}
        </pre>

        <div className="flex items-center justify-center gap-2.5 pt-3.5 pb-3">
          <div className="h-px flex-1 bg-border" />
          <span className="inline-flex items-center gap-2 rounded-full border bg-muted px-3 py-[5px] font-mono text-[12px] leading-none">
            <ArrowDown className="size-3 text-brand" strokeWidth={2.5} />
            viparse.load()
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="flex items-center gap-2 pb-2.5">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-brand uppercase">
            Output
          </span>
          <span className="text-[11.5px] text-muted-foreground">
            Unicode NFC
          </span>
        </div>

        <pre className="overflow-x-auto rounded-md border bg-muted px-4.5 py-4 font-mono text-[14px] leading-[1.75] whitespace-pre-wrap">
          {SAMPLE.unicode}
        </pre>
      </div>
    </div>
  )
}
