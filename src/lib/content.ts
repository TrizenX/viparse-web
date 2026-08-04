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
    body: "DOCX, XLSX, PDF, RTF, legacy .doc/.xls/.ppt — plus scans and page images via OCR.",
    icon: File,
  },
  {
    title: "RAG-native chunking",
    body: "Section-aware chunks that never split a table row, and repeat its header.",
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
export const PLAYGROUND_STATUS = "Paste something, or pick a sample."

/**
 * Real mojibake, so the first thing a visitor sees is the actual problem rather than a
 * contrived one. Every string is quoted from a document in the corpus.
 */
export const PLAYGROUND_SAMPLES = [
  { label: "TCVN3", text: "céng hßa x· héi chñ nghÜa viÖt nam\n§éc lËp - Tù do - H¹nh phóc\nQuyÕt ®Þnh cña Bé tr\u00adëng Bé Tµi chÝnh" },
  { label: "VNI", text: "COÄNG HOØA XAÕ HOÄI CHUÛ NGHÓA VIEÄT NAM\nÑoäc laäp - Töï do - Haïnh phuùc\nCaên cöù Luaät Toå chöùc HÑND vaø UBND" },
  { label: "Already Unicode", text: "Cộng hòa xã hội chủ nghĩa Việt Nam\nĐộc lập - Tự do - Hạnh phúc" },
  { label: "Not Vietnamese", text: "Señor Muñoz vivía en la mañana con niños pequeños en España, la señora enseñaba español a los niños" },
] as const

export const BENCHMARK_STATUS =
  "96 Vietnamese government documents from 2002–2009 — Word, Excel, RTF, PDF and PowerPoint — transcribed by hand and scored on diacritic accuracy. The corpus, the metric, the raw results and the command that regenerates them are public."

/**
 * Measured, not estimated. Both rows come from `TrizenX/viparse-corpus`, scored against
 * hand-written transcripts of the same 96 documents.
 *
 * Same reader, same files, one flag apart — the baseline is viparse with conversion
 * switched off. That was not true until 2026-08-04: the baseline had been scored on 93
 * documents and viparse on 96, so the two rows were never strictly a comparison, and
 * the figure quoted publicly came from a third file that belonged to neither release.
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
    char: "0.772",
    diacritic: "0.019",
    syllable: "0.223",
  },
  {
    tool: "viparse 0.1.24",
    note: "96 documents, end-to-end",
    char: "0.978",
    diacritic: "0.982",
    syllable: "0.981",
  },
] as const

/** Stated on the page, not buried in a repo. See METRIC.md and RESULTS.md. */
export const BENCHMARK_CAVEAT =
  "The 0.019 row is the honest headline: text that looks 77% intact carries 1.9% of the Vietnamese. viparse's own row is a weaker claim than it looks — the transcripts and the conversion tables were derived from the same corpus, so it measures self-consistency as much as correctness. Both numbers, the method, every document and the command that regenerates them are published so the second one can be argued with."

export const BENCHMARK_LINKS = {
  corpus: "https://github.com/TrizenX/viparse-corpus",
  results: "https://github.com/TrizenX/viparse-corpus/blob/main/RESULTS.md",
  metric: "https://github.com/TrizenX/viparse-corpus/blob/main/METRIC.md",
} as const

/**
 * What viparse does with ordinary Unicode documents — the other benchmark.
 *
 * Stated on the page rather than left to be discovered, because the failure it describes
 * is invisible: nothing is dropped, so a multi-column PDF comes back complete, fluent and
 * in the wrong order. Figures from `TrizenX/viparse-corpus/structure`.
 */
export const STRUCTURE_ROWS = [
  { document: "DOCX · XLSX · PPTX", order: "1.000", completeness: "1.000", headings: "1.000" },
  { document: "PDF, one column", order: "1.000", completeness: "1.000", headings: "0.000" },
  { document: "PDF, two columns", order: "0.600", completeness: "1.000", headings: "0.000" },
] as const

export const STRUCTURE_NOTE =
  "Nothing is ever lost — completeness is 1.000 everywhere. Both failures are failures of arrangement, which is the harder kind to notice. A PDF has no headings, so every chunk from one carries an empty section; and a multi-column PDF is read across the page rather than down the columns. Recovering columns means layout analysis, which viparse does not do: use a layout-aware loader for those and pass its output through viparse.fix()."

export type FaqItem = {
  question: string
  answer: string
}

export const FAQ: FaqItem[] = [
  {
    question: "How accurate is it, really?",
    answer:
      "0.982 diacritic accuracy over 96 Vietnamese government documents from 2002-2009 — Word, Excel, RTF, PDF and PowerPoint — against hand-written transcripts. The same reader with conversion switched off scores 0.019 on the same 96 files. The corpus, the metric, the raw results and the command that regenerates them are public, including the ways the number is weaker than it looks.",
  },
  {
    question: "Does it work on ordinary Unicode documents, not just legacy ones?",
    answer:
      "On DOCX, XLSX and PPTX, yes — order, completeness and heading recovery all score 1.000 on the published structure benchmark. On PDF it recovers the text and the tables but not the structure: there are no headings, and a multi-column PDF is read across the page rather than down the columns, so paragraph 1 is followed by paragraph 19. Nothing is dropped either way, which is what makes it worth stating.",
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
    question: "What about scans and image files?",
    answer:
      "viparse[ocr] reads a scanned PDF and a page image — .png, .jpg, .tif, including multi-page TIFF — with Tesseract's Vietnamese model. It is measured now, and it is the weakest path here: 0.967 diacritic accuracy on cleanly rendered prose and 0.898 on degraded pages, against 0.982 for the conversion path on the same documents. 0.967 is a ceiling — a perfect render with no skew, noise or paper texture — and no real scanned Vietnamese document has been measured at all. The errors are almost entirely tone marks, which is exactly what the product exists to preserve.",
  },
  {
    question: "Who's behind it?",
    answer:
      "Built by a Vietnamese engineer who spent years cleaning enterprise document pipelines. Issues and PRs welcome on GitHub.",
  },
]
