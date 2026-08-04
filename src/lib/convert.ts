/**
 * The conversion path viparse runs on *text*, ported for the browser.
 *
 * Only the text path. The extraction engines — `.doc` piece tables, OOXML runs, PDF
 * glyph codes — are most of the library and irrelevant without a file, so the playground
 * ports the charmaps, the glyph substitutions and the frequency model, and nothing else.
 *
 * A port can drift from what it ports. The data it uses is generated verbatim out of the
 * installed package by `scripts/generate-tables.py`, so the two cannot disagree about a
 * mapping; `npm run check:tables` fails if the checked-in file is stale. The *logic*
 * below is a hand port and could still drift, which is why it is kept as small as it is.
 */

import { VIPARSE_DATA } from "@/lib/viparse-tables.generated"

export type Encoding = "tcvn3" | "vni" | "viscii" | "vps"

export type ConversionResult = {
  text: string
  encoding: Encoding | null
  /** Why nothing was converted, when nothing was. */
  reason: "converted" | "already-unicode" | "not-vietnamese" | "empty"
}

const { charmaps, autoDetect, glyphSubstitutions, frequency, thresholds } = VIPARSE_DATA

const ALIEN = new Set(thresholds.alienLetters.split(""))
const LOGP = frequency.logp as Record<string, number>

/** Longest legacy sequence first, so `aù` is matched before a bare `a`. */
const ORDERED: Record<string, [string, string][]> = Object.fromEntries(
  Object.entries(charmaps).map(([name, pairs]) => [
    name,
    [...(pairs as readonly (readonly [string, string])[])]
      .map(([from, to]) => [from, to] as [string, string])
      .sort((a, b) => b[0].length - a[0].length),
  ]),
)

/**
 * Undo the codepoints a PDF text layer substitutes for legacy bytes — but only where the
 * result is a letter. A minus sign between digits is a minus sign, and these documents
 * are full of statistics tables.
 */
function restoreGlyphs(text: string): string {
  const subs = glyphSubstitutions as Record<string, string>
  if (!Object.keys(subs).some((ch) => text.includes(ch))) return text
  const out = [...text]
  out.forEach((ch, i) => {
    const replacement = subs[ch]
    if (!replacement) return
    const before = text[i - 1] ?? ""
    const after = text[i + 1] ?? ""
    if (isLetter(before) || isLetter(after)) out[i] = replacement
  })
  return out.join("")
}

function isLetter(ch: string): boolean {
  return ch !== "" && /\p{L}/u.test(ch)
}

/** One left-to-right scan, longest match first; unmatched characters pass through. */
export function convert(text: string, encoding: Encoding): string {
  const table = ORDERED[encoding]
  if (!table) return text
  const source = restoreGlyphs(text)
  let out = ""
  let i = 0
  outer: while (i < source.length) {
    for (const [from, to] of table) {
      if (source.startsWith(from, i)) {
        out += to
        i += from.length
        continue outer
      }
    }
    out += source[i]
    i += 1
  }
  return out.normalize("NFC")
}

/** Mean per-character log-probability under the Vietnamese unigram model. */
function vietnameseScore(text: string): number {
  const normalized = text.normalize("NFC").toLowerCase()
  if (!normalized) return frequency.floor
  let total = 0
  for (const ch of normalized) total += LOGP[ch] ?? frequency.floor
  return total / [...normalized].length
}

/**
 * Whether a converted string looks like Vietnamese rather than another language.
 *
 * Frequency scoring alone cannot tell them apart — Spanish and German both *outscore*
 * real TCVN3 against the model. What separates them is what the conversion produces:
 * Vietnamese writes each syllable as its own word, so long words barely exist, and the
 * alphabet has no f, j, w or z.
 */
function readsAsVietnamese(text: string): boolean {
  const words = (text.match(/\p{L}+/gu) ?? []).filter((w) => [...w].length > 1)
  if (words.length === 0) return true
  const alien = words.filter((w) => [...w].some((ch) => ALIEN.has(ch))).length / words.length
  const long =
    words.filter((w) => [...w].length > thresholds.longWordLetters).length / words.length
  return alien <= thresholds.alienRateCeiling && long <= thresholds.longWordRateCeiling
}

/**
 * Convert text whose encoding is not known.
 *
 * Every candidate table is trial-applied and scored; one wins only if it beats leaving
 * the text alone by a margin *and* clearly beats the runner-up *and* the result reads as
 * Vietnamese. Anything less returns the input untouched — never corrupting correct text
 * matters more than converting every case.
 */
export function convertAuto(text: string): ConversionResult {
  if (!text.trim()) return { text, encoding: null, reason: "empty" }

  const base = vietnameseScore(text)
  const ranked = (autoDetect as readonly string[])
    .map((name) => {
      const output = convert(text, name as Encoding)
      return { name: name as Encoding, output, gain: vietnameseScore(output) - base }
    })
    .sort((a, b) => b.gain - a.gain)

  const best = ranked[0]
  const runnerUp = ranked[1]?.gain ?? 0
  if (
    !best ||
    best.gain < thresholds.contentMargin ||
    best.gain - runnerUp < thresholds.contentSeparation
  ) {
    return { text, encoding: null, reason: "already-unicode" }
  }
  if (!readsAsVietnamese(best.output)) {
    return { text, encoding: null, reason: "not-vietnamese" }
  }
  return { text: best.output, encoding: best.name, reason: "converted" }
}

export const VIPARSE_VERSION = VIPARSE_DATA.viparseVersion
export const ENCODINGS = Object.keys(charmaps) as Encoding[]
