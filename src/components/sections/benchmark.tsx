import { Section, SectionHeader } from "@/components/section"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  BENCHMARK_CAVEAT,
  BENCHMARK_LINKS,
  BENCHMARK_ROWS,
  BENCHMARK_STATUS,
  STRUCTURE_NOTE,
  STRUCTURE_ROWS,
} from "@/lib/content"

const columns = ["Reading", "Character", "Diacritic", "Syllable"]

/**
 * The second benchmark, on the same page as the first.
 *
 * Split out rather than merged into the table above because they answer different
 * questions — one is about bytes, the other about arrangement — and a single table would
 * invite reading a 0.000 in the heading column as an accuracy figure.
 */
export function StructureTable({
  heading,
  columns,
  note,
  rowLabels,
}: {
  heading: string
  columns: readonly string[]
  note: string
  /** Localized document labels, keyed by the English label in STRUCTURE_ROWS. */
  rowLabels?: Record<string, string>
}) {
  return (
    <>
      <h3 className="mt-9 mb-3 text-[15px] font-medium">{heading}</h3>
      <div className="overflow-x-auto rounded-lg border bg-card">
        <Table className="text-[13.5px]">
          <TableHeader>
            <TableRow className="bg-muted hover:bg-muted">
              {columns.map((column, i) => (
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
            {STRUCTURE_ROWS.map((row) => (
              <TableRow key={row.document} className="last:border-b-0">
                <TableCell className="px-4.5 py-3.5 font-mono text-[13px]">
                  {rowLabels?.[row.document] ?? row.document}
                </TableCell>
                {/* Order is the column that fails, so it is the one left un-greyed. */}
                <TableCell className="px-4.5 py-3.5 text-right font-mono font-medium text-foreground">
                  {row.order}
                </TableCell>
                <TableCell className="px-4.5 py-3.5 text-right font-mono text-muted-foreground">
                  {row.completeness}
                </TableCell>
                <TableCell className="px-4.5 py-3.5 text-right font-mono text-muted-foreground">
                  {row.headings}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <p className="mt-4 max-w-[68ch] text-[13.5px] leading-relaxed text-muted-foreground">
        {note}
      </p>
    </>
  )
}

export function Benchmark() {
  return (
    <Section id="benchmark">
      <SectionHeader
        eyebrow="Benchmark"
        title="Measured on real broken files."
        description={BENCHMARK_STATUS}
        className="mb-6"
      />

      <div className="overflow-x-auto rounded-lg border bg-card">
        <Table className="text-[13.5px]">
          <TableHeader>
            <TableRow className="bg-muted hover:bg-muted">
              {columns.map((column, i) => (
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
                    {row.note}
                  </span>
                </TableCell>
                {/* Diacritic is the column the product is about, so it is the one
                    that is not greyed out. */}
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
        {BENCHMARK_CAVEAT}
      </p>

      <StructureTable
        heading="And on ordinary Unicode documents"
        columns={["Document", "Order", "Completeness", "Headings"]}
        note={STRUCTURE_NOTE}
      />

      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px]">
        <a
          href={BENCHMARK_LINKS.corpus}
          target="_blank"
          rel="noopener"
          className="text-brand underline-offset-4 hover:underline"
        >
          The corpus
        </a>
        <a
          href={BENCHMARK_LINKS.metric}
          target="_blank"
          rel="noopener"
          className="text-brand underline-offset-4 hover:underline"
        >
          How it is scored
        </a>
        <a
          href={BENCHMARK_LINKS.results}
          target="_blank"
          rel="noopener"
          className="text-brand underline-offset-4 hover:underline"
        >
          Full results, including what is wrong with them
        </a>
      </div>
    </Section>
  )
}
