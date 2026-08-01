import { Section, SectionHeader } from "@/components/section"
import { ComingSoonBadge } from "@/components/coming-soon-badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { BENCHMARK_ROWS, BENCHMARK_STATUS } from "@/lib/content"

const columns = ["Tool", "Diacritic accuracy", "Formats", "Speed"]

export function Benchmark() {
  return (
    <Section id="benchmark">
      <SectionHeader
        eyebrow="Benchmark"
        badge={<ComingSoonBadge />}
        title="Measured on real broken files."
        description={BENCHMARK_STATUS}
        className="mb-6"
      />

      <div className="overflow-hidden rounded-lg border bg-card">
        <Table className="text-[13.5px]">
          <TableHeader>
            <TableRow className="bg-muted hover:bg-muted">
              {columns.map((column) => (
                <TableHead
                  key={column}
                  className="h-auto px-4.5 py-3 text-[11.5px] font-medium tracking-[0.08em] text-muted-foreground uppercase"
                >
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {BENCHMARK_ROWS.map((row) => (
              <TableRow key={row.tool} className="last:border-b-0">
                <TableCell className="px-4.5 py-3.5 font-mono text-[13px]">
                  {row.tool}
                </TableCell>
                {[0, 1, 2].map((i) => (
                  <TableCell
                    key={i}
                    className="px-4.5 py-3.5 font-mono text-muted-foreground"
                  >
                    —
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Section>
  )
}
