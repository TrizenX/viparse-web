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

/**
 * Labels, so `/vi` can render this in Vietnamese without a second copy of the
 * conversion logic. Two playgrounds would be two chances to disagree with the library.
 *
 * Plain strings with `{placeholders}` rather than functions: this is a client
 * component, and a server page cannot hand a function across that boundary.
 */
export type PlaygroundCopy = {
  eyebrow: string
  title: string
  description: string
  tryLabel: string
  inputLabel: string
  outputLabel: string
  /** Sample-button labels, keyed by the English label in PLAYGROUND_SAMPLES. */
  sampleLabels?: Record<string, string>
  /** `{version}` is substituted. */
  note: string
  status: {
    /** `{encoding}` is substituted in both. */
    forced: string
    converted: string
    notVietnamese: string
    alreadyUnicode: string
  }
}

const EN: PlaygroundCopy = {
  eyebrow: "Playground",
  title: "Try it in your browser.",
  description:
    "Paste garbled Vietnamese text, get clean Unicode back. It runs in the page — nothing is uploaded, and it works offline once loaded.",
  tryLabel: "Try",
  inputLabel: "Input",
  outputLabel: "Output",
  note: "The conversion tables and the detection thresholds here are generated from viparse {version} itself, so they cannot drift from the library. What runs in the page is the text path only — the .doc, PDF and spreadsheet engines need a file and are most of what `pip install viparse` gives you.",
  status: {
    forced: "Converted as {encoding}.",
    converted: "Detected {encoding} and converted.",
    notVietnamese:
      "A legacy table fits these bytes, but the result is not Vietnamese — left alone.",
    alreadyUnicode: "No legacy encoding found. Text returned unchanged.",
  },
}

/** What the result line says, and whether it reads as success. */
function status(
  result: ConversionResult,
  mode: Mode,
  copy: PlaygroundCopy,
  idle: string,
): { text: string; muted: boolean } {
  if (mode !== "auto") {
    return { text: copy.status.forced.replace("{encoding}", mode), muted: false }
  }
  switch (result.reason) {
    case "converted":
      return {
        text: copy.status.converted.replace("{encoding}", String(result.encoding)),
        muted: false,
      }
    case "not-vietnamese":
      return { text: copy.status.notVietnamese, muted: true }
    case "already-unicode":
      return { text: copy.status.alreadyUnicode, muted: true }
    default:
      return { text: idle, muted: true }
  }
}

export function Playground({
  copy = EN,
  idleStatus = PLAYGROUND_STATUS,
}: {
  copy?: PlaygroundCopy
  idleStatus?: string
} = {}) {
  const [input, setInput] = useState("")
  const [mode, setMode] = useState<Mode>("auto")

  const result = useMemo<ConversionResult>(
    () =>
      mode === "auto"
        ? convertAuto(input)
        : { text: convert(input, mode), encoding: mode, reason: "converted" },
    [input, mode],
  )
  const { text: statusText, muted } = status(result, mode, copy, idleStatus)

  return (
    <Section id="playground">
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        className="mb-6"
      />

      <Card>
        <CardContent className="grid gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase">
              {copy.tryLabel}
            </span>
            {PLAYGROUND_SAMPLES.map((sample) => (
              <Button
                key={sample.label}
                variant="outline"
                size="sm"
                onClick={() => setInput(sample.text)}
                className="h-7 bg-transparent px-2.5 font-mono text-[12px] font-normal"
              >
                {copy.sampleLabels?.[sample.label] ?? sample.label}
              </Button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label
                htmlFor="pg-in"
                className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase"
              >
                {copy.inputLabel}
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
                {copy.outputLabel}
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
            {copy.note.replace("{version}", VIPARSE_VERSION)}
          </p>
        </CardContent>
      </Card>
    </Section>
  )
}
