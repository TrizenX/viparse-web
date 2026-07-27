"use client"

import * as React from "react"

import { Section, SectionHeader } from "@/components/section"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { CODE_TABS } from "@/lib/content"

export function Quickstart() {
  const [tab, setTab] = React.useState(CODE_TABS[0].value)

  return (
    <Section id="quickstart">
      <SectionHeader eyebrow="Quickstart" title="Two lines to clean text." />

      <Tabs value={tab} onValueChange={(value) => setTab(value as typeof tab)}>
        <TabsList className="h-[38px] rounded-md bg-secondary p-1">
          {CODE_TABS.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className="h-[30px] rounded-sm px-3.5 text-[13px]"
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {CODE_TABS.map((item) => (
          <TabsContent key={item.value} value={item.value} className="mt-1.5">
            <CodeBlock filename={item.filename} code={item.code} />
          </TabsContent>
        ))}
      </Tabs>
    </Section>
  )
}

function CodeBlock({ filename, code }: { filename: string; code: string }) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="flex items-center justify-between border-b bg-muted px-3.5 py-2.5">
        <span className="font-mono text-[11.5px] text-muted-foreground">
          {filename}
        </span>
        <Button
          variant="outline"
          size="xs"
          onClick={() => copy(code)}
          className="font-mono text-[11.5px] text-muted-foreground hover:text-foreground"
        >
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13.5px] leading-[1.8]">
        {code}
      </pre>
    </div>
  )
}
