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

export const BENCHMARK_ROWS = [
  { tool: "viparse" },
  { tool: "unstructured" },
  { tool: "llamaparse" },
  { tool: "docling" },
] as const

export type FaqItem = {
  question: string
  answer: string
}

export const FAQ: FaqItem[] = [
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
