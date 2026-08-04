"use client"

import { useMemo, useState } from "react"

import { Section, SectionHeader } from "@/components/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ENCODINGS,
  VIPARSE_VERSION,
  convert,
  convertAuto,
  type ConversionResult,
  type Encoding,
} from "@/lib/convert"
import { PLAYGROUND_SAMPLES, PLAYGROUND_STATUS } from "@/lib/content"

type Mode = "auto" | Encoding

/** What the result line says, and whether it reads as success. */
function status(result: ConversionResult, mode: Mode): { text: string; muted: boolean } {
  if (mode !== "auto") {
    return { text: `Converted as ${mode}.`, muted: false }
  }
  switch (result.reason) {
    case "converted":
      return { text: `Detected ${result.encoding} and converted.`, muted: false }
    case "not-vietnamese":
      return {
        text: "A legacy table fits these bytes, but the result is not Vietnamese — left alone.",
        muted: true,
      }
    case "already-unicode":
      return {
        text: "No legacy encoding found. Text returned unchanged.",
        muted: true,
      }
    default:
      return { text: PLAYGROUND_STATUS, muted: true }
  }
}

export function Playground() {
  const [input, setInput] = useState("")
  const [mode, setMode] = useState<Mode>("auto")

  const result = useMemo<ConversionResult>(
    () =>
      mode === "auto"
        ? convertAuto(input)
        : { text: convert(input, mode), encoding: mode, reason: "converted" },
    [input, mode],
  )
  const { text: statusText, muted } = status(result, mode)

  return (
    <Section id="playground">
      <SectionHeader
        eyebrow="Playground"
        title="Try it in your browser."
        description="Paste garbled Vietnamese text, get clean Unicode back. It runs in the page — nothing is uploaded, and it works offline once loaded."
        className="mb-6"
      />

      <Card>
        <CardContent className="grid gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase">
              Try
            </span>
            {PLAYGROUND_SAMPLES.map((sample) => (
              <Button
                key={sample.label}
                variant="outline"
                size="sm"
                onClick={() => setInput(sample.text)}
                className="h-7 bg-transparent px-2.5 font-mono text-[12px] font-normal"
              >
                {sample.label}
              </Button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label
                htmlFor="pg-in"
                className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase"
              >
                Input
              </Label>
              <Textarea
                id="pg-in"
                rows={6}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="B¸o c¸o tµi chÝnh quý II…"
                spellCheck={false}
                className="min-h-[9.5rem] resize-y bg-muted font-legacy text-[13.5px] leading-[1.7]"
              />
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="pg-out"
                className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase"
              >
                Output
              </Label>
              <Textarea
                id="pg-out"
                rows={6}
                readOnly
                value={result.text}
                placeholder="Báo cáo tài chính quý II…"
                className="min-h-[9.5rem] resize-y bg-muted font-mono text-[13.5px] leading-[1.7]"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
            <div className="flex items-center gap-1">
              {(["auto", ...ENCODINGS] as Mode[]).map((option) => (
                <Button
                  key={option}
                  variant={mode === option ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setMode(option)}
                  className="h-7 px-2.5 font-mono text-[12px] font-normal"
                >
                  {option}
                </Button>
              ))}
            </div>
            <span
              className={`text-[12.5px] ${muted ? "text-muted-foreground" : "text-foreground"}`}
            >
              {statusText}
            </span>
          </div>

          <p className="max-w-[68ch] text-[12.5px] leading-relaxed text-muted-foreground">
            The conversion tables and the detection thresholds here are generated from
            viparse {VIPARSE_VERSION} itself, so they cannot drift from the library. What
            runs in the page is the text path only — the `.doc`, PDF and spreadsheet
            engines need a file and are most of what `pip install viparse` gives you.
          </p>
        </CardContent>
      </Card>
    </Section>
  )
}
