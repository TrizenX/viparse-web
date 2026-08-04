import type { Metadata } from "next"

import { Section, SectionHeader } from "@/components/section"
import { Playground } from "@/components/sections/playground"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { BENCHMARK_LINKS, BENCHMARK_ROWS, SAMPLE } from "@/lib/content"
import {
  VI_BENCHMARK,
  VI_FAQ,
  VI_FEATURES,
  VI_HERO,
  VI_PLAYGROUND,
  VI_PLAYGROUND_IDLE,
  VI_PROBLEM,
  VI_QUICKSTART,
  VI_STEPS,
} from "@/lib/content.vi"
import { siteConfig } from "@/lib/site"

/**
 * The Vietnamese page.
 *
 * Not a translation of `/`. The English page addresses someone choosing a document
 * loader; this one addresses someone who just opened a `.doc` and found
 * `B¸o c¸o tµi chÝnh` in it — so it leads with the diagnosis (*your file is fine, your
 * machine is missing a font*) rather than with the product.
 *
 * Every measured figure comes from the shared constants in `content.ts`, so the two
 * pages cannot disagree about a number. Only the prose is written twice, which is what
 * writing in two languages means.
 */
export const metadata: Metadata = {
  // `absolute` because the root layout's template appends "— viparse", and this title
  // already opens with it.
  title: {
    absolute: "viparse — Sửa lỗi phông tiếng Việt trong file: TCVN3, VNI sang Unicode",
  },
  description:
    "Thư viện Python chuyển tài liệu tiếng Việt dùng bảng mã cũ (TCVN3 .VnTime, VNI-Times, VISCII, VPS) sang Unicode dựng sẵn NFC. Đọc được .doc, .xls, .ppt đời cũ, RTF, PDF và PDF scan — giữ nguyên bảng biểu.",
  alternates: {
    canonical: "/vi",
    languages: { "vi-VN": "/vi", "en-US": "/", "x-default": "/" },
  },
  keywords: [
    "lỗi phông tiếng việt",
    "chuyển bảng mã",
    "tcvn3 sang unicode",
    "vni sang unicode",
    "font .VnTime",
    "file word bị lỗi phông",
    "đọc file doc cũ python",
    "unicode dựng sẵn",
    "viscii",
    "vps",
  ],
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/vi`,
    locale: "vi_VN",
    title: "viparse — Sửa lỗi phông tiếng Việt trong file",
    description:
      "Chuyển TCVN3, VNI, VISCII, VPS sang Unicode NFC — trên cả file .doc, .xls, .ppt, RTF, PDF, không chỉ trên đoạn văn bản dán vào.",
    siteName: siteConfig.name,
  },
}

export default function VietnamesePage() {
  return (
    <div lang="vi">
      <SiteHeader lang="vi" />

      <main id="top" className="mx-auto w-full max-w-[1100px] flex-1 px-6">
        <ViHero />
        <Separator />
        <ViProblem />
        <ViSteps />
        <ViFeatures />
        <ViQuickstart />
        <Playground copy={VI_PLAYGROUND} idleStatus={VI_PLAYGROUND_IDLE} />
        <ViBenchmark />
        <ViFaq />
      </main>

      <SiteFooter lang="vi" />
    </div>
  )
}

function ViHero() {
  return (
    <section className="pt-9 pb-16">
      <div className="grid max-w-[760px] gap-4.5">
        <Badge
          variant="outline"
          className="h-auto justify-self-start rounded-full px-3 py-[5px] font-mono text-[11.5px] font-normal text-muted-foreground"
        >
          {VI_HERO.badge}
        </Badge>

        <h1 className="text-[clamp(30px,5.2vw,46px)] leading-[1.06] font-semibold tracking-[-0.035em] text-balance">
          {VI_HERO.tagline}
        </h1>

        <p className="max-w-[660px] text-[17px] leading-[1.65] text-pretty text-muted-foreground">
          {VI_HERO.description}
        </p>

        <div className="mt-0.5 flex flex-wrap items-center gap-2.5">
          {/* Not a copy button: the install command is the same in every language,
              and a second copy-to-clipboard hook here would be a client component
              for no reason. */}
          <Button size="lg" asChild className="h-10 px-4 hover:opacity-90">
            <a href="#quickstart" className="font-mono text-[13.5px]">
              pip install viparse
            </a>
          </Button>

          <Button variant="outline" size="lg" asChild className="h-10 px-4">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener"
              className="text-[13.5px]"
            >
              {VI_HERO.githubCta}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

function ViProblem() {
  return (
    <Section id="problem" className="pt-14">
      <SectionHeader
        eyebrow={VI_PROBLEM.eyebrow}
        title={VI_PROBLEM.title}
        description={VI_PROBLEM.body}
        className="mb-6"
      />

      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="grid px-5 pt-4.5 pb-5">
          <div className="flex items-center gap-2 pb-2.5">
            <span className="font-mono text-[10.5px] tracking-[0.14em] text-legacy uppercase">
              {VI_PROBLEM.inputLabel}
            </span>
            <span className="text-[11.5px] text-muted-foreground">
              {VI_PROBLEM.inputNote}
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
              viparse.load()
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="flex items-center gap-2 pb-2.5">
            <span className="font-mono text-[10.5px] tracking-[0.14em] text-brand uppercase">
              {VI_PROBLEM.outputLabel}
            </span>
            <span className="text-[11.5px] text-muted-foreground">
              {VI_PROBLEM.outputNote}
            </span>
          </div>

          <pre className="overflow-x-auto rounded-md border bg-muted px-4.5 py-4 font-mono text-[14px] leading-[1.75] whitespace-pre-wrap">
            {SAMPLE.unicode}
          </pre>
        </div>
      </div>

      <p className="mt-4 max-w-[68ch] text-[13.5px] leading-relaxed text-muted-foreground">
        {VI_PROBLEM.aside}
      </p>
    </Section>
  )
}

function ViSteps() {
  return (
    <Section>
      <SectionHeader eyebrow="Cách hoạt động" title="Ba bước." className="mb-6" />
      <div className="grid gap-4 sm:grid-cols-3">
        {VI_STEPS.map((step) => (
          <Card key={step.number}>
            <CardContent className="grid gap-2.5">
              <span className="font-mono text-[12px] text-brand">{step.number}</span>
              <h3 className="text-[15.5px] font-medium">{step.title}</h3>
              <p className="text-[13.5px] leading-[1.7] text-muted-foreground">
                {step.body}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}

function ViFeatures() {
  return (
    <Section>
      <SectionHeader eyebrow="Tính năng" title="Những gì có sẵn." className="mb-6" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {VI_FEATURES.map((feature) => (
          <Card key={feature.title}>
            <CardContent className="grid gap-2.5">
              <feature.icon className="size-[18px] text-brand" strokeWidth={1.8} />
              <h3 className="text-[15px] font-medium">{feature.title}</h3>
              <p className="text-[13.5px] leading-[1.7] text-muted-foreground">
                {feature.body}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}

function ViQuickstart() {
  return (
    <Section id="quickstart">
      <SectionHeader
        eyebrow={VI_QUICKSTART.eyebrow}
        title={VI_QUICKSTART.title}
        className="mb-6"
      />
      <div className="overflow-hidden rounded-lg border bg-card">
        <pre className="overflow-x-auto px-5 py-4.5 font-mono text-[13.5px] leading-[1.75]">
          {VI_QUICKSTART.code}
        </pre>
      </div>
      <p className="mt-4 max-w-[68ch] text-[13.5px] leading-relaxed text-muted-foreground">
        {VI_QUICKSTART.note}
      </p>
    </Section>
  )
}

function ViBenchmark() {
  return (
    <Section id="benchmark">
      <SectionHeader
        eyebrow={VI_BENCHMARK.eyebrow}
        title={VI_BENCHMARK.title}
        description={VI_BENCHMARK.description}
        className="mb-6"
      />

      <div className="overflow-x-auto rounded-lg border bg-card">
        <Table className="text-[13.5px]">
          <TableHeader>
            <TableRow className="bg-muted hover:bg-muted">
              {VI_BENCHMARK.columns.map((column, i) => (
                <TableHead
                  key={column}
                  className={`h-auto px-4.5 py-3 text-[11.5px] font-medium tracking-[0.08em] text-muted-foreground uppercase ${
                    i === 0 ? "" : "text-right"
                  }`}
                >
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {BENCHMARK_ROWS.map((row) => (
              <TableRow key={row.tool} className="last:border-b-0">
                <TableCell className="px-4.5 py-3.5">
                  <span className="font-mono text-[13px]">{row.tool}</span>
                  <span className="ml-2 text-[12.5px] text-muted-foreground">
                    {VI_BENCHMARK.rowNotes[row.tool] ?? row.note}
                  </span>
                </TableCell>
                <TableCell className="px-4.5 py-3.5 text-right font-mono text-muted-foreground">
                  {row.char}
                </TableCell>
                <TableCell className="px-4.5 py-3.5 text-right font-mono font-medium text-foreground">
                  {row.diacritic}
                </TableCell>
                <TableCell className="px-4.5 py-3.5 text-right font-mono text-muted-foreground">
                  {row.syllable}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="mt-4 max-w-[68ch] text-[13.5px] leading-relaxed text-muted-foreground">
        {VI_BENCHMARK.caveat}
      </p>

      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px]">
        {(["corpus", "metric", "results"] as const).map((key) => (
          <a
            key={key}
            href={BENCHMARK_LINKS[key]}
            target="_blank"
            rel="noopener"
            className="text-brand underline-offset-4 hover:underline"
          >
            {VI_BENCHMARK.links[key]}
          </a>
        ))}
      </div>
    </Section>
  )
}

function ViFaq() {
  return (
    <Section>
      <SectionHeader eyebrow="Hỏi đáp" title="Câu hỏi thường gặp." className="mb-6" />
      <Accordion
        type="multiple"
        defaultValue={[VI_FAQ[0].question]}
        className="max-w-[780px] border-t"
      >
        {VI_FAQ.map((item) => (
          <AccordionItem
            key={item.question}
            value={item.question}
            className="border-b not-last:border-b"
          >
            <AccordionTrigger className="py-4.5 text-[15px] hover:no-underline hover:text-brand">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="max-w-[640px] pb-5 text-[14.5px] leading-[1.7] text-pretty text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  )
}
