import { Section, SectionHeader } from "@/components/section"
import { ComingSoonBadge } from "@/components/coming-soon-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function Playground() {
  return (
    <Section id="playground">
      <SectionHeader
        eyebrow="Playground"
        badge={<ComingSoonBadge />}
        title="Try it in your browser."
        description="Paste garbled Vietnamese text, get clean Unicode back — runs entirely client-side via Pyodide. No upload, no server."
        className="mb-6"
      />

      <Card>
        <CardContent className="grid gap-4">
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
                placeholder="B¸o c¸o tµi chÝnh quý II…"
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
                placeholder="Báo cáo tài chính quý II…"
                className="min-h-[9.5rem] resize-y bg-muted font-mono text-[13.5px] leading-[1.7] text-muted-foreground"
              />
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <Button
              variant="outline"
              size="lg"
              disabled
              className="h-9 border-dashed bg-transparent px-4 text-[13.5px] opacity-55"
            >
              Convert
            </Button>
            <span className="text-[12.5px] text-muted-foreground">
              Wiring up the Pyodide build — ships with v0.2.
            </span>
          </div>
        </CardContent>
      </Card>
    </Section>
  )
}
