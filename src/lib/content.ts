import { File, Layers, Rows3, Shield, Terminal, Type } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export const INSTALL_COMMAND = "pip install viparse"

/** The hero before/after pair. `bad` segments are the mojibake to highlight. */
export const SAMPLE = {
  legacy: [
    { text: "B¸o c¸o tµi chÝnh", bad: true },
    { text: " quý II ", bad: false },
    { text: "n¨m", bad: true },
    { text: " 2026 ", bad: false },
    { text: "cña c«ng", bad: true },
    { text: " ty.\n", bad: false },
    { text: "ThÞ tr­êng ViÖt", bad: true },
    { text: " Nam ", bad: false },
    { text: "ph¸t triÓn m¹nh.", bad: true },
  ],
  unicode:
    "Báo cáo tài chính quý II năm 2026 của công ty.\nThị trường Việt Nam phát triển mạnh.",
} as const

export type Step = {
  number: string
  title: string
  body: string
}

export const STEPS: Step[] = [
  {
    number: "01",
    title: "Detect",
    body: "Font signals and syllable-frequency scoring identify TCVN3, VNI, VISCII or VPS — per run, not per file, so mixed documents convert cleanly.",
  },
  {
    number: "02",
    title: "Convert",
    body: "Legacy sequences are mapped to correct Vietnamese letters and normalized to NFC. Already-Unicode text is never touched.",
  },
  {
    number: "03",
    title: "Load",
    body: "Get Markdown, text or JSON with headings, tables and provenance — chunked for retrieval, with LangChain and LlamaIndex adapters built in.",
  },
]

export type Feature = {
  title: string
  body: string
  icon: LucideIcon
}

export const FEATURES: Feature[] = [
  {
    title: "Legacy encodings",
    body: "TCVN3 · VNI · VISCII · VPS → Unicode NFC, round-trip tested.",
    icon: Type,
  },
  {
    title: "Every format",
    body: "DOCX, XLSX, PDF, scanned PDF (OCR), RTF, legacy .doc/.xls.",
    icon: File,
  },
  {
    title: "RAG-native chunking",
    body: "Section-aware chunks that never split a table row.",
    icon: Rows3,
  },
  {
    title: "Zero-dep core",
    body: "Pure stdlib; heavy engines live behind extras like viparse[ocr].",
    icon: Layers,
  },
  {
    title: "Safe on untrusted files",
    body: "Size limits, zip-bomb guard, per-engine timeouts.",
    icon: Shield,
  },
  {
    title: "CLI included",
    body: "viparse ./docs/**/*.pdf -o md, plus viparse doctor.",
    icon: Terminal,
  },
]

export type CodeTab = {
  value: "python" | "cli"
  label: string
  filename: string
  code: string
}

export const CODE_TABS: CodeTab[] = [
  {
    value: "python",
    label: "Python",
    filename: "quickstart.py",
    code: `import viparse

docs = viparse.load("bao_cao_cu.doc")          # list[Document], already NFC
docs = viparse.load("scan.pdf", ocr=True, output="markdown")`,
  },
  {
    value: "cli",
    label: "CLI",
    filename: "shell",
    code: `pip install "viparse[all]"
viparse ./docs/**/*.pdf -o md
viparse doctor   # show available engines`,
  },
]

/**
 * Copy for the two unshipped sections. Kept here so a slipped milestone is a
 * one-line edit rather than a hunt through components — and so the version a
 * feature is promised against is stated in exactly one place.
 */
export const PLAYGROUND_STATUS = "Wiring up the Pyodide build — ships with v0.3."

export const BENCHMARK_STATUS =
  "48 Vietnamese government documents from 2001–2009, transcribed by hand and scored on diacritic accuracy. The corpus, the metric and the raw results are public."

/**
 * Measured, not estimated. Every figure comes from `TrizenX/viparse-corpus`, scored
 * against hand-written transcripts of the same 48 documents.
 *
 * The baseline row is the one that needs no trust: it is what a loader that extracts
 * the bytes correctly and does nothing about the encoding produces. There is no
 * competitor in this table because no competitor has been run — putting names in a
 * comparison nobody can check is worse than leaving it out.
 */
export const BENCHMARK_ROWS = [
  {
    tool: "No conversion",
    note: "bytes extracted faithfully",
    char: "0.787",
    diacritic: "0.014",
    syllable: "0.201",
  },
  {
    tool: "viparse 0.1.14",
    note: "48 documents, end-to-end",
    char: "0.969",
    diacritic: "0.977",
    syllable: "0.975",
  },
] as const

/** Stated on the page, not buried in a repo. See METRIC.md and RESULTS.md. */
export const BENCHMARK_CAVEAT =
  "The 0.014 row is the honest headline: text that looks 79% intact carries 1.4% of the Vietnamese. viparse's own row is a weaker claim than it looks — the transcripts and the conversion tables were derived from the same corpus, so it measures self-consistency as much as correctness. Both numbers, the method and every document are published so the second one can be argued with."

export const BENCHMARK_LINKS = {
  corpus: "https://github.com/TrizenX/viparse-corpus",
  results: "https://github.com/TrizenX/viparse-corpus/blob/main/RESULTS.md",
  metric: "https://github.com/TrizenX/viparse-corpus/blob/main/METRIC.md",
} as const

export type FaqItem = {
  question: string
  answer: string
}

export const FAQ: FaqItem[] = [
  {
    question: "How accurate is it, really?",
    answer:
      "0.977 diacritic accuracy over 48 Vietnamese government documents from 2001-2009, against hand-written transcripts. A loader that extracts the bytes and ignores the encoding scores 0.014 on the same set. The corpus, the metric and the raw results are public, including the ways the number is weaker than it looks.",
  },
  {
    question: "Is it free?",
    answer:
      "MIT-licensed, free forever as a library. A hosted API for teams is planned.",
  },
  {
    question: "Does it change text that's already Unicode?",
    answer:
      "No. Detection runs per run; Unicode runs pass through byte-identical.",
  },
  {
    question: "What about scanned PDFs?",
    answer: "Install viparse[ocr] (Tesseract) for diacritic-aware OCR.",
  },
  {
    question: "Who's behind it?",
    answer:
      "Built by a Vietnamese engineer who spent years cleaning enterprise document pipelines. Issues and PRs welcome on GitHub.",
  },
]
